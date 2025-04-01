"use client";

import { useState, useEffect, useRef } from "react";
import rehypeRaw from "rehype-raw";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toast } from "@/components/Toast";
import { TRANSLATIONS, DEPARTMENT_MAPPING } from "@/hooks/useCustomChat";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import PrivacyPolicyModal from "@/components/PrivacyPolicyModal";
import {
  X,
  MessageCircle,
  Send,
  Loader2,
  Maximize,
  ArrowDownCircle,
  RefreshCw,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCustomChat } from "@/hooks/useCustomChat";

interface Message {
  role: string;
  content: string;
  timestamp: Date;
  containsHtml?: boolean;
  citations?: any[];
  rawContent?: string;
  isStreaming?: boolean;
}

interface ToastType {
  message: string;
  type: "success" | "error" | "info" | "loading"; 
  icon?: React.ReactNode; 
  duration?: number; 
}

// Translation content for different languages
const translations = {
  en: {
    chatTitle: "Punjab Gov Help Guide",
    noMessages: "No messages yet.",
    assistant: "Assistant",
    typePlaceholder: "Type your message here...",
    selectDepartment: "Select the department to get relevant information ✅",
    disclaimerPrefix: "Disclaimer:",
    referencedDocuments: "Referenced Documents:",
    document: "Document",
    noMessagesText: "No messages yet.",
  },
  pa: {
    chatTitle: "ਪੰਜਾਬ ਸਰਕਾਰ ਮਦਦ ਗਾਈਡ",
    noMessages: "ਅਜੇ ਕੋਈ ਸੁਨੇਹੇ ਨਹੀਂ।",
    assistant: "ਸਹਾਇਕ",
    typePlaceholder: "ਆਪਣਾ ਸੁਨੇਹਾ ਇੱਥੇ ਟਾਈਪ ਕਰੋ...",
    selectDepartment: "ਸੰਬੰਧਿਤ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਵਿਭਾਗ ਚੁਣੋ ✅",
    disclaimerPrefix: "ਸਾਵਧਾਨੀ:",
    referencedDocuments: "ਹਵਾਲਾ ਦਸਤਾਵੇਜ਼:",
    document: "ਦਸਤਾਵੇਜ਼",
    noMessagesText: "ਅਜੇ ਕੋਈ ਸੁਨੇਹੇ ਨਹੀਂ।",
  },
  hi: {
    chatTitle: "पंजाब सरकार सहायता मार्गदर्शक",
    noMessages: "अभी तक कोई संदेश नहीं।",
    assistant: "सहायक",
    typePlaceholder: "अपना संदेश यहां टाइप करें...",
    selectDepartment:
      "प्रासंगिक जानकारी प्राप्त करने के लिए विभाग का चयन करें ✅",
    disclaimerPrefix: "अस्वीकरण:",
    referencedDocuments: "संदर्भित दस्तावेज़:",
    document: "दस्तावेज़",
    noMessagesText: "अभी तक कोई संदेश नहीं।",
  },
};

// Department translations
const departmentTranslations = {
  en: {
    punchatbotindex: { name: "Sewa Kendras & G2C Services", emoji: "📙" },
    procurement: { name: "Procurement Rules 2022", emoji: "🛒" },
    agriculture: { name: "Agriculture", emoji: "🌾" },
    tax: { name: "Excise & Taxation", emoji: "💰" },
    waterresource: { name: "Water Resources", emoji: "💧" },
    transport: { name: "Transport", emoji: "🚗" },
    dossawacd: { name: "Social Security", emoji: "👨‍👩‍👧‍👦" },
  },
  pa: {
    punchatbotindex: { name: "ਸੇਵਾ ਕੇਂਦਰ ਅਤੇ G2C ਸੇਵਾਵਾਂ", emoji: "📙" },
    procurement: { name: "ਖਰੀਦ ਨਿਯਮ 2022", emoji: "🛒" },
    agriculture: { name: "ਖੇਤੀਬਾੜੀ", emoji: "🌾" },
    tax: { name: "ਆਬਕਾਰੀ ਅਤੇ ਕਰਾਧਾਨ", emoji: "💰" },
    waterresource: { name: "ਪਾਣੀ ਸਰੋਤ", emoji: "💧" },
    transport: { name: "ਟਰਾਂਸਪੋਰਟ", emoji: "🚗" },
    dossawacd: { name: "ਸਮਾਜਿਕ ਸੁਰੱਖਿਆ", emoji: "👨‍👩‍👧‍👦" },
  },
  hi: {
    punchatbotindex: { name: "सेवा केंद्र और G2C सेवाएं", emoji: "📙" },
    procurement: { name: "खरीद नियम 2022", emoji: "🛒" },
    agriculture: { name: "कृषि", emoji: "🌾" },
    tax: { name: "आबकारी और कराधान", emoji: "💰" },
    waterresource: { name: "जल संसाधन", emoji: "💧" },
    transport: { name: "परिवहन", emoji: "🚗" },
    dossawacd: { name: "सामाजिक सुरक्षा", emoji: "👨‍👩‍👧‍👦" },
  },
};

const getDepartmentInfo = (
  currentLanguage: string,
  currentDepartment: string
) => {
  const lang = currentLanguage === "auto" ? "en" : currentLanguage;
  const deptMap =
    departmentTranslations[lang as keyof typeof departmentTranslations] ||
    departmentTranslations.en;
  return (
    deptMap[currentDepartment as keyof typeof deptMap] ||
    deptMap["punchatbotindex"]
  );
};

export default function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(true);
  const [showIcons, setShowIcons] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDepartmentLocked, setIsDepartmentLocked] = useState(false);

  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const chatIconRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const [showQRImage, setShowQRImage] = useState(false);
  // Set default language to auto
  const [language, setLanguage] = useState("auto");
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    resetChat,
    toast,
    setToast,
    sendInitialMessages,
    currentDepartment,
    chatContainerRef,
  } = useCustomChat(language);

  const departmentInfo = getDepartmentInfo(language, currentDepartment);

  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  // Show/hide chat icon based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowChatIcon(true);
      } else {
        setShowChatIcon(false);
        setIsChatOpen(false);
        setShowIcons(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
    setIsMaximized(false);
    setShowQRImage(false);

    if (!isChatOpen) {
      sendInitialMessages();
    }
  };

  // const handleLanguageChange = async (selectedLanguage: string) => {
  //   setIsLanguageDropdownOpen(false);

  //   // Show loading state with yellow rotating icon
  //   setToast({
  //     message:
  //       selectedLanguage === "auto"
  //         ? "Switching to auto language detection..."
  //         : `Switching to ${getLanguageLabel(selectedLanguage)}...`,
  //     type: "loading", 
  //     icon: <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />,
  //   });

  //   try {
  //     // Update language state - this will trigger the chat reset
  //     setLanguage(selectedLanguage);

  //     // Wait a bit to ensure the language change is processed
  //     await new Promise((resolve) => setTimeout(resolve, 300));

  //     // Show success notification
  //     setToast({
  //       message:
  //         selectedLanguage === "auto"
  //           ? "Auto language detection enabled"
  //           : `Switched to ${getLanguageLabel(selectedLanguage)}`,
  //       type: "success",
  //       duration: 2000, 
  //     });
  //   } catch (error) {
  //     console.error("Language change error:", error);
  //     setToast({
  //       message: "Failed to change language. Please try again.",
  //       type: "error",
  //       duration: 3000,
  //     });
  //   }
  // };

  const handleLanguageChange = async (selectedLanguage: string) => {
    setIsLanguageDropdownOpen(false);
  
    // Show loading state with yellow rotating icon
    setToast({
      message: selectedLanguage === "auto"
        ? "Switching to auto language detection..."
        : `Switching to ${getLanguageLabel(selectedLanguage)}...`,
      type: "loading",
      icon: <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
    } as ToastType); // Explicitly type it
  
    try {
      // Update language state - this will trigger the chat reset
      setLanguage(selectedLanguage);
  
      // Wait a bit to ensure the language change is processed
      await new Promise((resolve) => setTimeout(resolve, 300));
  
      // Show success notification
      setToast({
        message: selectedLanguage === "auto"
          ? "Auto language detection enabled"
          : `Switched to ${getLanguageLabel(selectedLanguage)}`,
        type: "success",
        duration: 2000
      } as ToastType);
  
    } catch (error) {
      console.error("Language change error:", error);
      setToast({
        message: "Failed to change language. Please try again.",
        type: "error",
        duration: 3000
      } as ToastType);
    }
  };
  
  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen((prev) => !prev);
  };

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case "en":
        return "English";
      case "pa":
        return "ਪੰਜਾਬੀ";
      case "hi":
        return "हिंदी";
      case "auto":
        return "Auto";
      default:
        return "Auto";
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleSubmit(e);
    } catch (err) {
      console.error("Error in onSubmit:", err);
      setToast({
        message: "Failed to send message. Please try again.",
        type: "error",
      });
    }
  };

  const toggleIcons = () => setShowIcons((prev) => !prev);
  const handleMaximize = () => setIsMaximized(true);
  const handleRestore = () => setIsMaximized(false);

  const handleResetChat = () => {
    resetChat();
    setIsDepartmentLocked(false);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "A") {
      e.preventDefault();
      const link = target as HTMLAnchorElement;
      window.open(link.href, "_blank", "noopener,noreferrer");
      console.log("Link clicked:", link.href);
    }
  };

  const handleWhatsAppClick = () =>
    window.open("https://wa.me/919855501076", "_blank");
  const handlePhoneClick = () => window.open("tel:919855501076", "_blank");

  const handleQRClick = () => {
    setIsChatOpen(true);
    setShowQRImage(true);
    setIsMaximized(false);
  };

  const handleCloseQR = () => {
    setShowQRImage(false);
    setIsChatOpen(false);
  };
  const sendDepartmentMessage = (department: string) => {
    const customEvent = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>;

    handleSubmit(customEvent, department);
    setIsDepartmentLocked(true);
  };

  const t =
    translations[
      language === "auto" ? "en" : (language as keyof typeof translations)
    ] || translations.en;

  // Helper function to check if a message is a department selection message
  const isDepartmentSelectionMessage = (content: string) => {
    const langTranslations =
      translations[language as keyof typeof translations] || translations.en;
    return content === langTranslations.selectDepartment;
  };

  // Helper function to check if a message is a disclaimer
  const isDisclaimerMessage = (content: string) => {
    return (
      content.startsWith("Disclaimer:") ||
      content.startsWith("ਸਾਵਧਾਨੀ:") ||
      content.startsWith("अस्वीकरण:")
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <TooltipProvider>
        <AnimatePresence>
          {showChatIcon && !showIcons && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed bottom-4 right-6 z-50"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    ref={chatIconRef}
                    onClick={toggleIcons}
                    size="icon"
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all duration-300"
                    aria-label="Toggle chat icons"
                  >
                    <motion.div
                      key={showIcons ? "arrow" : "message"}
                      initial={{ rotate: 0 }}
                      animate={{ rotate: showIcons ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {showIcons ? (
                        <ArrowDownCircle size={24} className="w-6 h-6" />
                      ) : (
                        <MessageCircle size={24} className="w-6 h-6" />
                      )}
                    </motion.div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{"Punjab Govt. Chatbot"}</p>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showIcons && (
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-2 right-4 z-50 flex items-center bg-surface-container-low rounded-[28px] shadow-md p-2"
            >
              <div className="flex items-center mr-40 ml-1">
                {[
                  {
                    src: "/images/finalbot.gif",
                    alt: "Chatbot",
                    onClick: toggleChat,
                    tooltip: "Chat with Punjab Govt. AI Assistant",
                  },
                  {
                    src: "/images/awhatsapp.gif",
                    alt: "WhatsApp",
                    onClick: handleWhatsAppClick,
                    tooltip: "WhatsApp Chatbot",
                  },
                  {
                    src: "/images/acall.gif",
                    alt: "Contact",
                    onClick: handlePhoneClick,
                    tooltip: "State Helpline 1100",
                  },
                  {
                    src: "/images/aqr.gif",
                    alt: "QR Scan",
                    onClick: handleQRClick,
                    tooltip: "QR Code to open Whatsapp Chatbot",
                  },
                ].map((item, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div className="w-12 h-12 flex items-center justify-center rounded-full shadow-md bg-white hover:shadow-lg transition-all duration-200 mx-1">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={48}
                          height={48}
                          className="rounded-full cursor-pointer hover:scale-110 transition-transform duration-200"
                          onClick={item.onClick}
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>{item.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={toggleIcons}
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 shadow-sm transition ml-11 mr-1"
                    aria-label="Close icons"
                    size="icon"
                  >
                    <X className="size-6 text-white" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>{"Close"}</p>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              key="chat-window"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                width: isMaximized ? "100%" : "95%",
                height: isMaximized ? "100vh" : "auto",
                borderRadius: isMaximized ? "0" : "12px",
              }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className={`fixed ${
                isMaximized
                  ? "inset-0 bottom-0 p-0"
                  : "bottom-20 right-4 w-[95%] max-w-[500px]"
              } z-50`}
            >
              {showQRImage ? (
                <Card
                  className={`border-none rounded-${
                    isMaximized ? "none" : "[20px]"
                  } shadow-lg bg-white overflow-hidden ${
                    isMaximized ? "h-full" : "h-auto"
                  }`}
                >
                  <CardHeader className="flex border-b border-outline-variant p-4 bg-surface-container">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/images/logo.png"
                        alt="Logo"
                        width={48}
                        height={48}
                        className="rounded-[12px]"
                      />
                      <CardTitle className="text-base font-medium text-on-surface">
                        Scan QR Code
                      </CardTitle>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            onClick={handleCloseQR}
                            className="ml-auto w-12 h-12 rounded-full bg-surface-container-highest shadow-sm hover:bg-on-surface/10 transition"
                            size="icon"
                            variant="outlined"
                            aria-label="Close QR view"
                          >
                            <X className="size-6 text-on-surface-variant" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p>Close QR Code</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center p-2">
                    <Image
                      src="/images/qr-photo.png"
                      alt="QR Code"
                      width={450}
                      height={450}
                      className="rounded-lg"
                    />
                  </CardContent>
                </Card>
              ) : (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Card
                    className={`border-none rounded-${
                      isMaximized ? "none" : "[20px]"
                    } shadow-lg bg-white overflow-hidden ${
                      isMaximized ? "h-full" : "h-auto"
                    }`}
                  >
                    <CardHeader className="flex border-b border-outline-variant p-4 bg-surface-container">
                      <div className="flex items-center gap-2">
                        <Image
                          src="/images/logo.png"
                          alt="Logo"
                          width={48}
                          height={48}
                          className="rounded-[12px]"
                        />
                        <div className="flex flex-col">
                          <CardTitle className="text-base font-medium text-on-surface">
                            {t.chatTitle}
                          </CardTitle>
                          <div className="text-xs text-on-surface-variant flex items-center">
                            <span>{departmentInfo.emoji}</span>
                            <span className="ml-1">{departmentInfo.name}</span>
                          </div>
                        </div>
                        <div className="flex ml-auto gap-1">
                          {!isMaximized && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="outlined"
                                  aria-label="Maximize"
                                  className="w-12 h-12 rounded-full bg-surface-container-highest shadow-sm hover:bg-on-surface/10 transition"
                                  onClick={handleMaximize}
                                >
                                  <Maximize className="size-6 text-on-surface-variant" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <p>Maximize Chat Window</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                          {isMaximized && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  size="icon"
                                  variant="outlined"
                                  aria-label="Restore"
                                  className="w-12 h-12 rounded-full bg-surface-container-highest shadow-sm hover:bg-on-surface/10 transition"
                                  onClick={handleRestore}
                                >
                                  <Maximize className="size-6 text-on-surface-variant rotate-45" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                <p>Restore Chat Window</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon"
                                variant="outlined"
                                aria-label="Reset Chat"
                                className="w-12 h-12 rounded-full bg-surface-container-highest shadow-sm hover:bg-on-surface/10 transition"
                                onClick={handleResetChat}
                              >
                                <RefreshCw className="size-6 text-on-surface-variant" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>Reset Chat</p>
                            </TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                onClick={toggleChat}
                                size="icon"
                                variant="outlined"
                                aria-label="Close"
                                className="w-12 h-12 rounded-full bg-surface-container-highest shadow-sm hover:bg-on-surface/10 transition"
                              >
                                <X className="size-6 text-on-surface-variant" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>Close Chat</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="m-4 p-0 w-full">
                      <ScrollArea
                        ref={chatContainerRef}
                        className={`${
                          isMaximized ? "h-[calc(100vh-170px)]" : "h-[350px]"
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

                        <div className="space-y-3 pr-2 ">
                          {messages.map((message, index) => (
                            <div
                              key={index}
                              className={`flex ${
                                message.role === "user"
                                  ? "justify-end"
                                  : "justify-start"
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
                                    <span className="font-semibold">
                                      {t.assistant}
                                    </span>
                                  )}
                                  <span className="ml-2 mr-2">
                                    {message.timestamp
                                      ? moment(message.timestamp).format(
                                          "hh:mm A"
                                        )
                                      : ""}
                                  </span>
                                </div>
                                <div
                                  className={`px-4 py-2 rounded-lg shadow-sm text-sm leading-relaxed border border-gray-200 w-full ${
                                    message.role === "user"
                                      ? "bg-blue-100 text-gray-900 rounded-br-none"
                                      : message.content.startsWith(
                                          t.disclaimerPrefix
                                        )
                                      ? "bg-red-50 text-gray-600 border-red-200 rounded-bl-none"
                                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                                  }`}
                                  style={{
                                    wordWrap: "break-word",
                                    overflowWrap: "break-word",
                                  }}
                                >
                                  {isDepartmentSelectionMessage(
                                    message.content
                                  ) ? (
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
                                        ).map((department, idx) => (
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
                                      {message.isStreaming &&
                                      !message.content ? (
                                        <div className="flex space-x-1">
                                          <span className="animate-bounce">
                                            .
                                          </span>
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
                                                    onClick={() =>
                                                      setIsPolicyModalOpen(true)
                                                    }
                                                  >
                                                    {children}
                                                  </span>
                                                );
                                              }

                                              const getDocumentName = (url) => {
                                                try {
                                                  const urlObj = new URL(url);
                                                  // Get the last part of the path (filename)
                                                  const pathParts =
                                                    urlObj.pathname.split("/");
                                                  const fileName =
                                                    pathParts[
                                                      pathParts.length - 1
                                                    ];
                                                  // Remove file extension if present
                                                  return fileName.replace(
                                                    /\.[^/.]+$/,
                                                    ""
                                                  );
                                                } catch {
                                                  return "Document";
                                                }
                                              };

                                              const citation =
                                                message.citations?.find(
                                                  (cit) => cit.url === href
                                                );
                                              const displayName =
                                                citation?.title ||
                                                getDocumentName(href);
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
                                            code: ({
                                              inline,
                                              className,
                                              children,
                                              ...props
                                            }) => {
                                              return inline ? (
                                                <code
                                                  className="bg-gray-200 px-1 rounded text-xs"
                                                  {...props}
                                                >
                                                  {children}
                                                </code>
                                              ) : (
                                                <pre
                                                  className="bg-gray-200 p-2 rounded text-xs"
                                                  {...props}
                                                >
                                                  <code>{children}</code>
                                                </pre>
                                              );
                                            },
                                            ul: ({ children }) => (
                                              <ul className="list-disc ml-5">
                                                {children}
                                              </ul>
                                            ),
                                            ol: ({ children }) => (
                                              <ol className="list-decimal ml-5">
                                                {children}
                                              </ol>
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
                                        {message.citations.map(
                                          (citation, idx) => (
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
                                                {citation.title ||
                                                  `${t.document} ${idx + 1}`}
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
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                    <CardFooter
                      className={`p-3 border-t bg-gray-50 ${
                        isMaximized ? "fixed bottom-1 left-1 right-1" : ""
                      }`}
                    >
                      <form
                        onSubmit={onSubmit}
                        className="flex w-full items-center gap-2"
                      >
                        <Input
                          value={input}
                          onChange={handleInputChange}
                          className="flex-1 rounded-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                          placeholder={t.typePlaceholder}
                          aria-label="Type your message"
                        />

                        <div className="relative" ref={languageDropdownRef}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                type="button"
                                onClick={toggleLanguageDropdown}
                                className="rounded-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 flex items-center justify-center"
                                aria-label="Change language"
                                size="sm"
                              >
                                <Globe className="size-8" />
                                <span className="text-xs font-medium hidden sm:inline">
                                  {getLanguageLabel(language)}
                                </span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>Change Language</p>
                            </TooltipContent>
                          </Tooltip>

                          {isLanguageDropdownOpen && (
                            <div className="absolute bottom-full mb-2 right-0 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 min-w-[120px] z-50">
                              {["en", "pa", "hi", "auto"].map((lang) => (
                                <button
                                  key={lang}
                                  type="button"
                                  className={`w-full px-4 py-2 text-left text-sm hover:bg-blue-50 transition-colors duration-150 flex items-center ${
                                    lang === language
                                      ? "bg-blue-50 text-blue-600 font-medium"
                                      : "text-gray-700"
                                  }`}
                                  onClick={() => handleLanguageChange(lang)}
                                >
                                  {lang === language && (
                                    <span className="mr-2 text-blue-600">
                                      ✓
                                    </span>
                                  )}
                                  {getLanguageLabel(lang)}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              type="submit"
                              className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white"
                              disabled={isLoading}
                              size="icon"
                              aria-label="Send message"
                            >
                              {isLoading ? (
                                <Loader2 className="w-9 h-9 animate-spin" />
                              ) : (
                                <Send className="w-9 h-9" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p>Send Message</p>
                          </TooltipContent>
                        </Tooltip>
                      </form>
                    </CardFooter>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        <PrivacyPolicyModal
          isOpen={isPolicyModalOpen}
          onClose={() => setIsPolicyModalOpen(false)}
        />
      </TooltipProvider>
    </div>
  );
}
