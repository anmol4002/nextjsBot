import { marked } from "marked";
import { DEPARTMENT_MAPPING, TRANSLATIONS } from "@/lib/mapping";
import { 
  Language, 
  Message, 
  Citation, 
  ScrollOptions,
  DEFAULT_DEPARTMENT, 
  DepartmentCode ,
  updateMessagesWithHistoryLimit,
  getSystemMessage
} from "@/lib/utils";


export const getDepartmentCode = (departmentName: string, currentLanguage: Language): DepartmentCode => {
  const langKey = currentLanguage === "auto" ? "en" : currentLanguage;
  const deptMapping = DEPARTMENT_MAPPING[langKey] || DEPARTMENT_MAPPING.en;


  if (Object.prototype.hasOwnProperty.call(deptMapping, departmentName)) {
    return deptMapping[departmentName as keyof typeof deptMapping];
  }
  for (const lang of ["en", "pa", "hi"] as const) {
    const mapping = DEPARTMENT_MAPPING[lang];
    if (Object.prototype.hasOwnProperty.call(mapping, departmentName)) {
      return mapping[departmentName as keyof typeof mapping];
    }
  }

  for (const lang of ["en", "pa", "hi"] as const) {
    const mapping = DEPARTMENT_MAPPING[lang];
    for (const [, value] of Object.entries(mapping)) {
      if (value === departmentName) {
        return value;
      }
    }
  }

  return DEFAULT_DEPARTMENT;
};

export const getTranslations = (language: Language) => {
  const langKey = language === "auto" ? "en" : language;
  return TRANSLATIONS[langKey as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;
};

export const isDepartmentSelectionMessage = (
  content: string,
  currentLanguage: Language,
  deptMapping: Record<string, DepartmentCode>
): boolean => {
  const potentialDepartmentCode = getDepartmentCode(content, currentLanguage);
  return (
    Object.values(deptMapping).includes(potentialDepartmentCode) ||
    Object.keys(deptMapping).some(
      (dept) =>
        dept.toLowerCase().includes(content.toLowerCase()) ||
        content.toLowerCase().includes(dept.toLowerCase())
    )
  );
};

export const createDepartmentOptionsMessage = (currentLanguage: Language) => {
  const langKey = currentLanguage === "auto" ? "en" : currentLanguage;
  const langTranslations =
    TRANSLATIONS[langKey as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;
  return langTranslations.selectDepartment;
};

export const getInitialMessages = (language: Language): Message[] => {
  const langKey = language === "auto" ? "en" : language;
  const langTranslations = TRANSLATIONS[langKey] || TRANSLATIONS.en;

  return [
    {
      role: "assistant" as const,
      content: `${langTranslations.disclaimer}\n<a href='#' class='privacy-policy-link text-red-700 underline'>${langTranslations.privacyPolicy}</a>`,
      timestamp: new Date(),
      containsHtml: true,
    },
    {
      role: "assistant" as const,
      content: langTranslations.welcomeMessage,
      timestamp: new Date(),
    },
    {
      role: "assistant" as const,
      content: langTranslations.selectDepartment,
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


export const replaceDocsWithAnchors = (content: string, citations: Citation[] = []): string => {

  if (!content) return '';

  const createLink = (url: string | undefined, title: string, defaultText: string): string => {
    const displayText = title || defaultText;
    
    return url
      ? `<a href="${url}" target="_blank" rel="noopener noreferrer" class="doc-link" 
          style="color: #0066cc; text-decoration: underline; font-weight: bold;">
          [${displayText}]</a>`
      : `<span class="doc-reference" title="Document not available" 
          style="color: #999; cursor: not-allowed;">[${displayText}]</span>`;
  };

  let processedContent = content.replace(
    /(https?:\/\/[^\s]+)/g,
    (url) => `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">Link</a>`
  );

  citations.forEach((citation, i) => {
    const docNum = i + 1;
    const docRegex = new RegExp(`\\[doc${docNum}\\]`, "gi");
    const defaultText = `Document ${docNum}`;
    
    processedContent = processedContent.replace(
      docRegex, 
      createLink(citation.url, citation.title || '', defaultText)
    );
  });

  const pdfRegex = /\[([^\]]+\.pdf)\]/gi;
  let match;
  
  while ((match = pdfRegex.exec(processedContent)) !== null) {
    const pdfName = match[1];
    const index = match.index;
    const fullMatch = match[0];
  
    const citation = citations.find(c => 
      c.title?.toLowerCase() === pdfName.toLowerCase() || 
      c.url?.toLowerCase().endsWith(pdfName.toLowerCase())
    );
    
    const replacement = createLink(citation?.url, citation?.title || '', pdfName);
   
    processedContent = 
      processedContent.substring(0, index) + 
      replacement + 
      processedContent.substring(index + fullMatch.length);
  
    pdfRegex.lastIndex = index + replacement.length;
  }
  return processedContent.replace(/\[doc\d+\]:\s*.*?\.\w+|\[doc\d+\]/g, "");
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
          '<div class="flex space-x-2 items-center"><span class="animate-bounce text-2xl">•</span><span class="animate-bounce text-2xl" style="animation-delay:150ms">•</span><span class="animate-bounce text-2xl" style="animation-delay:300ms">•</span></div>',
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












