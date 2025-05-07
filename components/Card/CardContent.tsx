import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Message } from "@/lib/utils";
import { useMemo } from "react";

interface Translations {
  [key: string]: {
    disclaimer: string;
    welcomeMessage: string;
    selectDepartment: string;
    departmentOptions: string[];
    departmentWelcome: (department: string) => string;
    errorMessage: string;
    privacyPolicy: string;
  };
}

interface CardContentProps {
  messages: Message[];
  chatContainerRef: React.RefObject<HTMLDivElement>;
  isMaximized: boolean;
  t: {
    selectDepartment: string;
    disclaimerPrefix: string;
    assistant: string;
    referencedDocuments: string;
    document: string;
  };
  isDepartmentLocked: boolean;
  sendDepartmentMessage: (department: string) => void;
  TRANSLATIONS: Translations;
  language: string;
  setIsPolicyModalOpen: (open: boolean) => void;
}

export default function CardContent({
  messages,
  chatContainerRef,
  isMaximized,
  t,
  isDepartmentLocked,
  sendDepartmentMessage,
  TRANSLATIONS,
  language,
  setIsPolicyModalOpen,
}: CardContentProps) {
 

  const departmentOptions = useMemo(() => {
    const defaultLang = "en";
    const currentLang = language === "auto" ? defaultLang : language;
    
    return TRANSLATIONS[currentLang as keyof typeof TRANSLATIONS]?.departmentOptions || 
           TRANSLATIONS[defaultLang]?.departmentOptions || 
           [];
  }, [TRANSLATIONS, language]);

  
  const formatTimestamp = (timestamp?: string | Date) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getDocumentName = (url: string) => {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split("/");
      const fileName = pathParts[pathParts.length - 1];
      return fileName.replace(/\.[^/.]+$/, "");
    } catch {
      return "Document";
    }
  };

  const isDepartmentSelectionMessage = (content: string) => {
    return content === t.selectDepartment;
  };
  
  const hasCitations = (message: Message): boolean => {
    return !message.isStreaming && Array.isArray(message.citations) && message.citations.length > 0;
  };

  return (
    <ScrollArea
      ref={chatContainerRef}
      className={`${isMaximized ? "h-[calc(100vh-170px)]" : "h-[330px]"} pl-4 overflow-y-auto w-full chat-container`}
      style={{
        scrollbarGutter: "stable",
        scrollBehavior: "smooth",
      }}
    >
      <div className="space-y-3 pr-2">
        {messages.map((message: Message, index) => {
          const isUserMessage = message.role === "user";
          const isDisclaimerMessage = !isUserMessage && message.content.startsWith(t.disclaimerPrefix);
          const hasReferences = hasCitations(message);
          
          return (
            <div
              key={index}
              className={`flex ${isUserMessage ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex flex-col pr-2 ${isMaximized ? "max-w-4xl" : "max-w-[85%]"} w-full`}
              >
                <div
                  className={`flex items-center text-xs text-gray-500 mb-1 ${
                    isUserMessage ? "justify-end" : ""
                  }`}
                >
                  {!isUserMessage && (
                    <span className="font-semibold">{t.assistant}</span>
                  )}
                  <span className="ml-2 mr-2">
                    {formatTimestamp(message.timestamp)}
                  </span>
                </div>
  
                <div
                  className={`px-4 py-2 rounded-lg shadow-sm text-sm leading-relaxed border border-gray-200 w-full ${
                    isUserMessage
                      ? "bg-blue-100 text-gray-900 rounded-br-none"
                      : isDisclaimerMessage
                      ? "bg-red-50 text-gray-600 border-red-200 rounded-bl-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                  style={{
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                  }}
                >
                  {isDepartmentSelectionMessage(message.content) ? (
                    <div>
                      <div className="mb-3 font-medium text-gray-700">
                        {message.content}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {departmentOptions.map((department: string, idx: number) => (
                          <button
                            key={`${department}-${idx}`}
                            className={`px-4 py-2 bg-white border border-gray-200 rounded-lg transition-all duration-200 ${
                              isDepartmentLocked
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-blue-50 hover:border-blue-300 cursor-pointer"
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sendDepartmentMessage(department);
                            }}
                            disabled={isDepartmentLocked}
                            >
                              {department.trim()}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    

                    <div className="markdown-content">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                          a: ({ href, children }) => {
                            if (href === "#") {
                              return (
                                <span
                                  className="privacy-policy-link text-red-700 underline cursor-pointer"
                                  onClick={() => setIsPolicyModalOpen(true)}
                                >
                                  {children}
                                </span>
                              );
                            }
  
                            const citation = Array.isArray(message.citations) 
                              ? message.citations.find((cit) => cit.url === href)
                              : undefined;
                            const displayName =
                              citation?.title || 
                              (href ? getDocumentName(href) : "Document");
  
                            return (
                              <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline inline-flex items-center relative group"
                              >
                                🔗
                                <span className="absolute hidden group-hover:block bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap">
                                  {displayName}
                                </span>
                              </a>
                            );
                          },
                          ul: ({ children }) => (
                            <ul className="list-disc ml-5">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal ml-5">{children}</ol>
                          ),
                          li: ({ children }) => (
                            <li className="mb-1">{children}</li>
                          ),
                          p: ({ children }) => (
                            <p className="mb-2 last:mb-0">{children}</p>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
                
                {hasReferences && Array.isArray(message.citations) && (
                  <div className="mt-2 p-2 bg-gray-50 border border-gray-200 rounded-md referenced-docs">
                    <div className="text-xs font-medium text-gray-700 mb-2">
                      {t.referencedDocuments}
                    </div>
                    <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto pr-2">
                      {message.citations.map((citation, idx) => (
                        <a
                          key={idx}
                          href={citation.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs flex items-center hover:bg-blue-50 p-2 rounded transition-colors border border-gray-100"
                        >
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-xs font-medium mr-2">
                            {idx + 1}
                          </span>
                          <span className="flex-grow text-blue-600 hover:underline truncate">
                            {citation.title || `${t.document} ${idx + 1}`}
                          </span>
                          <span className="flex-shrink-0 ml-2 text-gray-400">
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}






