import { useState, useCallback, useEffect, useRef } from "react";
import { DEPARTMENT_MAPPING } from "@/lib/mapping";
import { useTokenManagement } from "@/lib/auth";
import {
  Language,
  Message,
  Toast,
  DEFAULT_DEPARTMENT,
  updateMessagesWithHistoryLimit,
  scrollToBottom,
} from "@/lib/utils";
import {
  getDepartmentCode,
  getTranslations,
  processStreamResponse,
  getInitialMessages,
  createChatbotAPIRequest,
  isDepartmentSelectionMessage,
} from "@/lib/helpers";

export const useCustomChat = (language = "en") => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDepartment, setCurrentDepartment] =
    useState(DEFAULT_DEPARTMENT);
  const [isDepartmentLocked, setIsDepartmentLocked] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const { ensureValidTokens, isInitialized } = useTokenManagement();

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    language as Language
  );
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);

  const t = getTranslations(currentLanguage);
  const deptMapping =
    DEPARTMENT_MAPPING[currentLanguage === "auto" ? "en" : currentLanguage] ||
    DEPARTMENT_MAPPING.en;

  // Handling language change
  useEffect(() => {
    if (language !== currentLanguage && !isLanguageChanging) {
      setIsLanguageChanging(true);

      setMessages([]);
      setInput("");
      setIsLoading(false);
      setError(null);
      setCurrentDepartment(DEFAULT_DEPARTMENT);
      setIsDepartmentLocked(false);

    
      setMessages(getInitialMessages(language as Language));
      setCurrentLanguage(language as Language);
      setIsLanguageChanging(false);
    }
  }, [language,currentLanguage, isLanguageChanging]);

  // Auto-scrolling on new messages
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.isStreaming) {
      requestAnimationFrame(() => {
        scrollToBottom({}, chatContainerRef);
      });
    }
  }, [messages]);


  const sendInitialMessages = useCallback(() => {
    setIsDepartmentLocked(false);
    setCurrentDepartment(DEFAULT_DEPARTMENT);
    setMessages(getInitialMessages(currentLanguage));
  }, [currentLanguage]);

  useEffect(() => {
    if (!isInitialized) return;
    sendInitialMessages();
   
  }, [isInitialized, sendInitialMessages]);

  const callChatbotAPI = useCallback(
    async (
      message: string,
      department: string,
      lang: Language,
      previousMessages: Message[] = []
    ) => {
      const tokens = await ensureValidTokens();
      if (!tokens) throw new Error("Unable to get valid tokens");

      const response = await createChatbotAPIRequest(
        message,
        department,
        lang,
        tokens,
        previousMessages
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("API Error Response:", errorResponse);

        if (errorResponse.error === "Invalid X-Auth-Token") {
          console.error("Invalid X-Auth-Token error. Details:", {
            authToken: tokens.authToken,
            verificationToken: tokens.verificationToken,
          });
          throw new Error("Invalid X-Auth-Token");
        }

        if (response.status === 429) {
          throw new Error("The stream is busy. Please try again later.");
        }
        throw new Error(
          errorResponse.error || `HTTP error! Status: ${response.status}`
        );
      }
      return response;
    },
    [ensureValidTokens]
  );

 
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setInput(e.target.value);
    },
    []
  );


  const resetChat = useCallback(() => {
    setMessages([]);
    setInput("");
    setIsLoading(false);
    setError(null);
    setCurrentDepartment(DEFAULT_DEPARTMENT);
    setIsDepartmentLocked(false);

    // Creating initial messages with the current language
    setMessages(getInitialMessages(currentLanguage));
  }, [currentLanguage]);

  const sendDepartmentMessage = useCallback(
    async (departmentName: string) => {
      if (isLoading || (isDepartmentLocked && !isLanguageChanging)) return;

      setIsLoading(true);

      try {
        // Finding the department code
        const departmentCode = getDepartmentCode(
          departmentName,
          currentLanguage
        );
        setCurrentDepartment(departmentCode);
        setIsDepartmentLocked(true);

        const userSelectionMessage: Message = {
          role: "user",
          content: departmentName,
          timestamp: new Date(),
        };

        const notificationMessage: Message = {
          role: "assistant",
          content: t.departmentWelcome(departmentName),
          timestamp: new Date(),
        };

        setMessages((prev) =>
          updateMessagesWithHistoryLimit([
            ...prev,
            userSelectionMessage,
            notificationMessage,
          ])
        );

        setToast({
          message: `Enter your message 😊.`,
          type: "success",
        });
      } catch (err) {
        console.error("Error in department selection:", err);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: t.errorMessage,
            timestamp: new Date(),
          },
        ]);
        setIsDepartmentLocked(false);
        setToast({ message: "Failed to select department", type: "error" });
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, isDepartmentLocked, isLanguageChanging, t, currentLanguage]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>, messageContent?: string) => {
      e?.preventDefault();
      const content = messageContent || input;

      if (!content.trim()) return;

      setIsLoading(true);
      setError(null);

      const safeApiCall = async  <T>(callback: () => Promise<T>): Promise<T | null> => {
        try {
          const result = await callback();
          setIsLoading(false);
          return result;
        } catch (err) {
          console.error("API Call Error:", err);
          const errorMessage =
            "An error occurred. Please refresh or try again later.";

          setMessages((prev) => [
            ...prev,
            {
              role: "assistant" as const,
              content: errorMessage,
              timestamp: new Date(),
            },
          ]);

          setToast({
            message: errorMessage,
            type: "error",
          });

          setIsLoading(false);
          return null;
        }
      };

      // Handling department selection
      if (!isDepartmentLocked) {
        if (
          isDepartmentSelectionMessage(content, currentLanguage, deptMapping)
        ) {
          await safeApiCall(async () => {
            await sendDepartmentMessage(content);
            setInput("");
          });
          return;
        }
      }

      // Handling normal messages
      await safeApiCall(async () => {
        const newMessages = updateMessagesWithHistoryLimit([
          ...messages,
          {
            role: "user",
            content,
            timestamp: new Date(),
          },
        ]);

        setMessages(newMessages);
        setInput("");

        const response = await callChatbotAPI(
          content,
          currentDepartment,
          currentLanguage,
          messages
        );

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("Could not get response reader");
        }

        // Waiting for the streaming to complete
        await processStreamResponse(
          reader,
          newMessages,
          setMessages,
          (options) => scrollToBottom(options, chatContainerRef),
          t.errorMessage
        );
      });
    },
    [
      input,
      messages,
      currentDepartment,
      isDepartmentLocked,
      t,
      deptMapping,
      callChatbotAPI,
      sendDepartmentMessage,
      currentLanguage,
    ]
  );

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    sendInitialMessages,
    resetChat,
    toast,
    setToast,
    currentDepartment,
    isDepartmentLocked,
    sendDepartmentMessage,
    chatContainerRef,
    currentLanguage,
    isLanguageChanging,
  };
};

export default useCustomChat;



