import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import moment from "moment";


interface Message {
  role: string;
  content: string;
  timestamp: Date;
  containsHtml?: boolean;
  citations?: any[];
  rawContent?: string;
  isStreaming?: boolean;
}

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
  t: any;
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
  const isDepartmentSelectionMessage = (content: string) => {
    return content === t.selectDepartment;
  };

  return (
    <ScrollArea
      ref={chatContainerRef}
      className={`${
        isMaximized ? "h-[calc(100vh-170px)]" : "h-[340px]"
      } pl-4 overflow-y-auto w-full chat-container`}
      style={{
        scrollbarGutter: "stable",
        scrollBehavior: "smooth",
        overflowAnchor: "none",
      }}
    >
      {messages.length === 0 && (
        <div className="w-full mt-6 text-gray-500 flex flex-col items-center gap-1 text-sm">
          {t.noMessagesText}
        </div>
      )}

      <div className="space-y-3 pr-2">
        {messages.map((message: Message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex flex-col pr-2 ${
                isMaximized ? "max-w-4xl" : "max-w-[85%]"
              } w-full`}
            >
            
              <div
                className={`flex items-center text-xs text-gray-500 mb-1 ${
                  message.role === "user" ? "justify-end" : ""
                }`}
              >
                {message.role !== "user" && (
                  <span className="font-semibold">{t.assistant}</span>
                )}
                <span className="ml-2 mr-2">
                  {message.timestamp
                    ? moment(message.timestamp).format("hh:mm A")
                    : ""}
                </span>
              </div>

             
              <div
                className={`px-4 py-2 rounded-lg shadow-sm text-sm leading-relaxed border border-gray-200 w-full ${
                  message.role === "user"
                    ? "bg-blue-100 text-gray-900 rounded-br-none"
                    : message.content.startsWith(t.disclaimerPrefix)
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
                      {(
                        TRANSLATIONS[
                          language === "auto"
                            ? "en"
                            : (language as keyof typeof TRANSLATIONS)
                        ]?.departmentOptions || []
                      ).map((department: string, idx: number) => (
                        <button
                          key={`${department}-${idx}`}
                          className={`px-4 py-2 bg-white border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 ${
                            isDepartmentLocked
                              ? "opacity-50 cursor-not-allowed"
                              : "hover:bg-blue-50 hover:border-blue-300"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            sendDepartmentMessage(department);
                          }}
                          disabled={isDepartmentLocked}
                          type="button"
                        >
                          {department.trim()}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="markdown-content">
                    {message.isStreaming && !message.content ? (
                      <div className="flex space-x-1">
                        <span className="animate-bounce">.</span>
                        <span
                          className="animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        >
                          .
                        </span>
                        <span
                          className="animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        >
                          .
                        </span>
                      </div>
                    ) : (
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

                            const citation = message.citations?.find(
                              (cit) => cit.url === href
                            );
                            const displayName =
                              citation?.title || getDocumentName(href || "");

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
                          code: (props) => {
                            const inline = "inline" in props ? (props as any).inline : false;
                            const { children, ...restProps } = props;

                            return inline ? (
                              <code
                                className="bg-gray-200 px-1 rounded text-xs"
                                {...restProps}
                              >
                                {children}
                              </code>
                            ) : (
                              <pre className="bg-gray-200 p-2 rounded text-xs">
                                <code {...restProps}>{children}</code>
                              </pre>
                            );
                          },
                          ul: ({ children }) => (
                            <ul className="list-disc ml-5">{children}</ul>
                          ),
                          ol: ({ children }) => (
                            <ol className="list-decimal ml-5">{children}</ol>
                          ),
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
                    )}
                  </div>
                )}
              </div>

           
              {!message.isStreaming &&
                message.citations &&
                message.citations.length > 0 && (
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
        ))}
      </div>
    </ScrollArea>
  );
}












