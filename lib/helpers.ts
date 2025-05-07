import { marked } from "marked";
import { DEPARTMENT_MAPPING, TRANSLATIONS } from "@/lib/mapping";
import { 
  Language, 
  Message, 
  Citation, 
  ScrollOptions,
  DepartmentCode ,
  updateMessagesWithHistoryLimit,
  getSystemMessage
} from "@/lib/utils";

const getLangKey = (language: Language): keyof typeof TRANSLATIONS => {
  return language === "auto" ? "en" : language;
};

export const getDepartmentCode = (
  departmentName: string,
  currentLanguage: Language
): DepartmentCode => {
  const deptMapping = DEPARTMENT_MAPPING[getLangKey(currentLanguage)];
  return deptMapping[departmentName as keyof typeof deptMapping] || 'punchatbotindex';
};

export const getTranslations = (language: Language) => {
  return TRANSLATIONS[getLangKey(language)];
};

export const isDepartmentSelectionMessage = (
  content: string,
  currentLanguage: Language
): boolean => {
  return TRANSLATIONS[getLangKey(currentLanguage)].departmentOptions.includes(content);
};

export const createDepartmentOptionsMessage = (currentLanguage: Language) => {
  return TRANSLATIONS[getLangKey(currentLanguage)].selectDepartment;
};

export const getInitialMessages = (language: Language): Message[] => {
  const { disclaimer, privacyPolicy, welcomeMessage, selectDepartment } = 
    TRANSLATIONS[getLangKey(language)];

  return [
    {
      role: "assistant",
      content: `${disclaimer}\n<a href='#' class='privacy-policy-link text-red-700 underline'>${privacyPolicy}</a>`,
      timestamp: new Date(),
      containsHtml: true,
    },
    {
      role: "assistant",
      content: welcomeMessage,
      timestamp: new Date(),
    },
    {
      role: "assistant",
      content: selectDepartment,
      timestamp: new Date(),
    },
  ];
};


export const createChatbotAPIRequest = (
  message: string,
  department: string,
  language: Language,
  tokens: { authToken: string; verificationToken: string },
  previousMessages: Message[] = []
) => {

  const limitedMessages = updateMessagesWithHistoryLimit([
    ...previousMessages,
    {
      role: "user",
      content: message,
      timestamp: new Date(),
    }
  ]);
  
  const messageHistory = limitedMessages.map(msg => ({
    role: msg.role,
    content: msg.content.replace(/<[^>]*>?/gm, ''), 
  }));

  const messageArray = [
    {
      role: "system",
      content: getSystemMessage(),
    },
    ...messageHistory,
    {
      role: "user",
      content: message,
    },
  ];

  return fetch("https://chatbotapi.psegs.in/dgr-stream", {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "text/event-stream",
      "Content-Type": "application/json",
      "X-Auth-Token": tokens.authToken,
      "X-Request-Verification-Token": tokens.verificationToken,
      Connection: "keep-alive",
    },
    body: JSON.stringify({
      message: messageArray,
      department,
      lang: language === "auto" ? "auto" : language,
    }),
  });
};

export const processStreamResponse = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  currentMessages: Message[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  scrollToBottom: (options?:  ScrollOptions) => void,
  errorMessage: string
): Promise<string> => {
  const decoder = new TextDecoder();
  let messageContent = "";
  let streamData = "";
  let messageCitations: Citation[] = [];
  let buffer = "";
  let chunkCount = 0;
  let hasStartedStreaming = false;

  try {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      updatedMessages.push({
        role: "assistant",
        content:
        '<div class="flex space-x-2"><span class="animate-bounce ">•</span><span class="animate-bounce" style="animation-delay:150ms">•</span><span class="animate-bounce" style="animation-delay:300ms">•</span></div>',
        rawContent: "",
        timestamp: new Date(),
        citations: [],
        containsHtml: true,
        isStreaming: true,
      });
      return updatedMessages;
    });

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      buffer += chunk;

      const messages = buffer.split("\n\n");
      buffer = messages.pop() || "";

      for (const message of messages) {
        const sanitizedMessage = message.trim().replace(/^data:\s*/, "");

        try {
          if (!sanitizedMessage) continue;

          const parsedData = JSON.parse(sanitizedMessage);

          if (parsedData?.context?.length > 0) {
            messageCitations = parsedData.context;
          }

          if (parsedData?.content?.length >= 1) {
            if (!hasStartedStreaming) {
              hasStartedStreaming = true;
              setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages[updatedMessages.length - 1] = {
                  role: "assistant",
                  content: "",
                  rawContent: "",
                  timestamp: new Date(),
                  citations: [],
                  containsHtml: true,
                  isStreaming: true,
                };
                return updatedMessages;
              });
            }

            chunkCount++;
            messageContent += parsedData.content;

            const processedContent = parsedData.content
              .replace(
                /(https?:\/\/[^\s]+)/g,
                (match: string, url: string) =>
                  `<a href="${url}" target="_blank" rel="noopener noreferrer" class="link-icon">🔗</a>`
              )
              .replace(
                /\[doc(\d+)\]/gi,
                (match: string, docNum: string) => {
                  const index = parseInt(docNum) - 1;
                  if (index >= 0 && index < messageCitations.length) {
                    const citation = messageCitations[index];
                    if (citation?.url) {
                      return `<a href="${citation.url}" target="_blank" rel="noopener noreferrer" class="doc-link">🔗</a>`;
                    }
                  }
                  return "";
                }
              );

            streamData += processedContent;

            setMessages((prevMessages) => {
              const updatedMessages = [...prevMessages];
              updatedMessages[updatedMessages.length - 1] = {
                role: "assistant",
                content: marked.parse(streamData) as string,
                rawContent: streamData,
                timestamp: new Date(),
                citations: messageCitations,
                containsHtml: true,
                isStreaming: true,
              };
              return updatedMessages;
            });

            if (chunkCount % 2 === 0) {
              requestAnimationFrame(() => {
                scrollToBottom({
                  duration: 150,
                  step: 30,
                });
              });
            }

            await new Promise((resolve) => setTimeout(resolve, 50));
          }
        } catch (error) {
          console.error("Chunk processing error:", error);
        }
      }
    }

    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages];
      const parsedContent = marked.parse(streamData) as string;
      const finalMessage: Message = {
        role: "assistant",
        content: parsedContent || errorMessage,
        rawContent: streamData,
        timestamp: new Date(),
        citations: messageCitations,
        containsHtml: true,
        isStreaming: false,
      };
      updatedMessages[updatedMessages.length - 1] = finalMessage;

      if (messageCitations.length > 0) {
        requestAnimationFrame(() => {
          scrollToBottom({
            duration: 200,
            step: 40,
          });
        });
      }

      return updatedMessages;
    });

    return messageContent;
  } catch (error) {
    console.error("Stream processing error:", error);

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: "assistant",
        content: errorMessage,
        timestamp: new Date(),
      },
    ]);

    throw error;
  }
};
















