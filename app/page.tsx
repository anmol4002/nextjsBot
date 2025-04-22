// "use client";
// import dynamic from "next/dynamic";

// const CardHeader = dynamic(() => import("@/components/Card/CardHeader"));
// const CardContent = dynamic(() => import("@/components/Card/CardContent"));
// const CardFooter = dynamic(() => import("@/components/Card/CardFooter"));
// const PrivacyPolicyModal = dynamic(
//   () => import("@/components/PrivacyPolicyModal")
// );
// const QRCard = dynamic(() => import("@/components/Card/QRCard"));
// import { useState, useEffect, useRef } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";
// import { Toast } from "@/components/Toast";
// import { TRANSLATIONS } from "@/lib/mapping";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Card } from "@/components/ui/card";

// import { X, MessageCircle, Loader2, ArrowDownCircle } from "lucide-react";

// import { useCustomChat } from "@/hooks/useCustomChat";
// import { translations, departmentTranslations } from "@/lib/mapping";

// interface Toast {
//   message: string;
//   type: "success" | "error" | "info" | "loading";
//   icon?: React.ReactNode;
//   duration?: number;
// }

// const getDepartmentInfo = (
//   currentLanguage: string,
//   currentDepartment: string
// ) => {
//   const lang = currentLanguage === "auto" ? "en" : currentLanguage;
//   const deptMap =
//     departmentTranslations[lang as keyof typeof departmentTranslations] ||
//     departmentTranslations.en;
//   return (
//     deptMap[currentDepartment as keyof typeof deptMap] ||
//     deptMap["punchatbotindex"]
//   );
// };

// export default function Chat() {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [showIcons, setShowIcons] = useState(false);
//   const [isMaximized, setIsMaximized] = useState(false);
//   const [isDepartmentLocked, setIsDepartmentLocked] = useState(false);
//   const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
//   const [isInIframe, setIsInIframe] = useState(false);

//   const chatIconRef = useRef<HTMLButtonElement>(null);
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const languageDropdownRef = useRef<HTMLDivElement>(null);
//   const [showQRImage, setShowQRImage] = useState(false);
//   const [language, setLanguage] = useState("auto");
//   const {
//     messages,
//     input,
//     handleInputChange,
//     handleSubmit,
//     isLoading,
//     resetChat,
//     toast,
//     setToast,
//     sendInitialMessages,
//     currentDepartment,
//     chatContainerRef,
//   } = useCustomChat(language);

//   const departmentInfo = getDepartmentInfo(language, currentDepartment);
//   const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

//   function sendMessageToParent(state: string) {
//     if (window.self !== window.top) {
//       try {
//         window.parent.postMessage(
//           {
//             type: "widgetState",
//             state: state,
//           },
//           "*"
//         );
//       } catch (e) {
//         console.error("Error sending message to parent:", e);
//       }
//     }
//   }

//   useEffect(() => {
//     if (isInIframe) {
//       let currentState = "icon";
//       if (!showIcons && !isChatOpen) currentState = "icon";
//       if (showIcons) currentState = "icons";
//       if (isChatOpen && !isMaximized && !showQRImage) currentState = "chat";
//       if (isMaximized) currentState = "maximized";
//       if (showQRImage) currentState = "qr";

//       sendMessageToParent(currentState);
//     }
//   }, [isInIframe, showIcons, isChatOpen, isMaximized, showQRImage]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         languageDropdownRef.current &&
//         !languageDropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsLanguageDropdownOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleChat = () => {
//     const newChatState = !isChatOpen;
//     setIsChatOpen(newChatState);
//     setIsMaximized(false);
//     setShowQRImage(false);
//     setShowIcons(true); // Keep icons visible when chat is opened
    
//     if (newChatState) {
//       sendMessageToParent("chat");
//       sendInitialMessages();
//     } else {
//       sendMessageToParent("icons");
//     }
//   };

//   const handleCloseChat = () => {
//     setIsChatOpen(false);
//     setShowIcons(true); // Show icons when chat is closed
//     sendMessageToParent("icons");
//   };

//   const handleLanguageChange = async (selectedLanguage: string) => {
//     setIsLanguageDropdownOpen(false);
//     setToast({
//       message:
//         selectedLanguage === "auto"
//           ? "Switching to auto language detection..."
//           : `Switching to ${getLanguageLabel(selectedLanguage)}...`,
//       type: "loading",
//       icon: <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />,
//     } as Toast);
//     try {
//       setLanguage(selectedLanguage);
//       await new Promise((resolve) => setTimeout(resolve, 300));

//       setToast({
//         message:
//           selectedLanguage === "auto"
//             ? "Auto language detection enabled"
//             : `Switched to ${getLanguageLabel(selectedLanguage)}`,
//         type: "success",
//         duration: 2000,
//       } as Toast);
//     } catch (error) {
//       console.error("Language change error:", error);
//       setToast({
//         message: "Failed to change language. Please try again.",
//         type: "error",
//         duration: 2000,
//       } as Toast);
//     }
//   };

//   const toggleLanguageDropdown = () => {
//     setIsLanguageDropdownOpen((prev) => !prev);
//   };

//   const getLanguageLabel = (lang: string) => {
//     switch (lang) {
//       case "en":
//         return "English";
//       case "pa":
//         return "ਪੰਜਾਬੀ";
//       case "hi":
//         return "हिंदी";
//       case "auto":
//         return "Auto";
//       default:
//         return "Auto";
//     }
//   };

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await handleSubmit(e, input);
//     } catch (err) {
//       console.error("Error in onSubmit:", err);
//       setToast({
//         message: "Failed to send message. Please try again.",
//         type: "error",
//       } as Toast);
//     }
//   };

//   const toggleIcons = () => {
//     const newIconsState = !showIcons;
//     setShowIcons(newIconsState);
//     if (newIconsState) {
//       sendMessageToParent("icons");
//     } else {
//       sendMessageToParent("icon");
//     }
//   };

//   const handleMaximize = () => {
//     setIsMaximized(true);
//     sendMessageToParent("maximized");
//   };

//   const handleRestore = () => {
//     setIsMaximized(false);
//     sendMessageToParent("chat");
//   };

//   const handleResetChat = () => {
//     resetChat();
//     setIsDepartmentLocked(false);
//     if (scrollRef.current) {
//       scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   const handleWhatsAppClick = () =>
//     window.open("https://wa.me/919855501076", "_blank");

//   const handlePhoneClick = () => window.open("tel:919855501076", "_blank");

//   const handleQRClick = () => {
//     setIsChatOpen(true);
//     setShowQRImage(true);
//     setIsMaximized(false);
//     sendMessageToParent("qr");
//   };

//   const handleCloseQR = () => {
//     setShowQRImage(false);
//     setIsChatOpen(false);
//     setShowIcons(true); // Show icons when QR is closed
//     sendMessageToParent("icons");
//   };

//   const sendDepartmentMessage = (department: string) => {
//     const customEvent = {
//       preventDefault: () => {},
//     } as React.FormEvent<HTMLFormElement>;

//     handleSubmit(customEvent, department);
//     setIsDepartmentLocked(true);
//   };

//   const t =
//     translations[
//       language === "auto" ? "en" : (language as keyof typeof translations)
//     ] || translations.en;

//   return (
//     <div
//       className={`${isInIframe ? "pt-0 bg-transparent" : "flex flex-col min-h-screen"}`}
//     >
//       <TooltipProvider>
//         {!showIcons && !isChatOpen && (
//           <div
//             className={`fixed bottom-4 right-6 z-50 ${
//               !showIcons ? "animate-fadeInUp" : "animate-fadeOutDown"
//             }`}
//           >
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button
//                   ref={chatIconRef}
//                   onClick={toggleIcons}
//                   size="icon"
//                   className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105 active:scale-95"
//                   aria-label="Toggle chat icons"
//                 >
//                   <div
//                     className={`transition-transform duration-500 ease-out ${
//                       showIcons ? "rotate-180" : "rotate-0"
//                     }`}
//                   >
//                     {showIcons ? (
//                       <ArrowDownCircle size={28} className="w-7 h-7" />
//                     ) : (
//                       <MessageCircle size={28} className="w-7 h-7" />
//                     )}
//                   </div>
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent side="top" className="bg-gray-800 text-white">
//                 <p>{"Punjab Govt. Chatbot"}</p>
//               </TooltipContent>
//             </Tooltip>
//           </div>
//         )}

//         {showIcons && (
//           <div className="fixed bottom-2 z-50 right-4 w-[95%] max-w-[500px] mx-auto flex items-center justify-between bg-white rounded-[28px] shadow-lg p-2 animate-slideInRight">
//             <div className="flex items-center space-x-1 sm:space-x-2">
//               {[
//                 {
//                   src: "/images/finalbot.gif",
//                   alt: "Chatbot",
//                   onClick: toggleChat,
//                   tooltip: "Chat with Punjab Govt. AI Assistant",
//                 },
//                 {
//                   src: "/images/awhatsapp.gif",
//                   alt: "WhatsApp",
//                   onClick: handleWhatsAppClick,
//                   tooltip: "WhatsApp Chatbot",
//                 },
//                 {
//                   src: "/images/acall.gif",
//                   alt: "Contact",
//                   onClick: handlePhoneClick,
//                   tooltip: "State Helpline 1100",
//                 },
//                 {
//                   src: "/images/aqr.gif",
//                   alt: "QR Scan",
//                   onClick: handleQRClick,
//                   tooltip: "QR Code to open Whatsapp Chatbot",
//                 },
//               ].map((item, index) => (
//                 <div
//                   key={index}
//                   className="animate-iconAppear flex-shrink-0"
//                   style={{ animationDelay: `${index * 0.1}s` }}
//                 >
//                   <Tooltip>
//                     <TooltipTrigger asChild>
//                       <div className="w-12 h-12 flex items-center justify-center rounded-full shadow-md bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
//                         <Image
//                           src={item.src}
//                           alt={item.alt}
//                           width={48}
//                           height={48}
//                           className="rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 ease-out"
//                           onClick={item.onClick}
//                         />
//                       </div>
//                     </TooltipTrigger>
//                     <TooltipContent side="top" className="bg-gray-800 text-white">
//                       <p>{item.tooltip}</p>
//                     </TooltipContent>
//                   </Tooltip>
//                 </div>
//               ))}
//             </div>

//             <div
//               className="animate-iconAppear flex-shrink-0 ml-1"
//               style={{ animationDelay: "0.4s" }}
//             >
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <Button
//                     onClick={toggleIcons}
//                     className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
//                     aria-label="Close icons"
//                     size="icon"
//                   >
//                     <X className="size-6 text-white" />
//                   </Button>
//                 </TooltipTrigger>
//                 <TooltipContent side="top" className="bg-gray-800 text-white">
//                   <p>Close</p>
//                 </TooltipContent>
//               </Tooltip>
//             </div>
//           </div>
//         )}

//         {isChatOpen && (
//           <div
//             className={`fixed z-50 ${
//               isMaximized
//                 ? "inset-0 bottom-0 p-0 animate-fadeIn"
//                 : "bottom-20 right-4 w-[95%] max-w-[500px] animate-scaleIn"
//             }`}
//             style={{
//               width: isMaximized ? "100%" : "95%",
//               height: isMaximized ? "100vh" : "auto",
//               borderRadius: isMaximized ? "0" : "12px",
//             }}
//           >
//             <Card
//               className={`border-none shadow-xl bg-white overflow-hidden transition-all duration-300 ease-out ${
//                 isMaximized ? "maximized-chat" : ""
//               }`}
//             >
//               {showQRImage ? (
//                 <QRCard onClose={handleCloseQR} />
//               ) : (
//                 <>
//                   <div>
//                     <CardHeader
//                       title={t.chatTitle}
//                       emoji={departmentInfo.emoji}
//                       name={departmentInfo.name}
//                       isMaximized={isMaximized}
//                       onMaximize={handleMaximize}
//                       onRestore={handleRestore}
//                       onReset={handleResetChat}
//                       onClose={handleCloseChat}
//                     />
//                   </div>

//                   <div className="m-4 p-0 w-full">
//                     <CardContent
//                       messages={messages}
//                       chatContainerRef={chatContainerRef}
//                       isMaximized={isMaximized}
//                       t={t}
//                       isDepartmentLocked={isDepartmentLocked}
//                       sendDepartmentMessage={sendDepartmentMessage}
//                       TRANSLATIONS={TRANSLATIONS}
//                       language={language}
//                       setIsPolicyModalOpen={setIsPolicyModalOpen}
//                     />
//                   </div>

//                   <div
//                     className={`${
//                       isMaximized ? "absolute bottom-0 left-0 right-0" : ""
//                     }`}
//                   >
//                     <CardFooter
//                       input={input}
//                       isLoading={isLoading}
//                       language={language}
//                       isLanguageDropdownOpen={isLanguageDropdownOpen}
//                       onInputChange={handleInputChange}
//                       onSubmit={onSubmit}
//                       onLanguageChange={handleLanguageChange}
//                       onToggleLanguageDropdown={toggleLanguageDropdown}
//                       getLanguageLabel={getLanguageLabel}
//                       t={t}
//                       languageDropdownRef={languageDropdownRef}
//                     />
//                   </div>
//                 </>
//               )}
//             </Card>
//           </div>
//         )}

//         {toast && (
//           <Toast
//             message={toast.message}
//             type={toast.type}
//             onClose={() => setToast(null)}
//           />
//         )}
//         <PrivacyPolicyModal
//           isOpen={isPolicyModalOpen}
//           onClose={() => setIsPolicyModalOpen(false)}
//         />
//       </TooltipProvider>
//     </div>
//   );
// }




"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, MessageCircle, Loader2, ArrowDownCircle, Maximize2, Minimize2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCustomChat } from "@/hooks/useCustomChat";
import { translations, departmentTranslations } from "@/lib/mapping";
import { TRANSLATIONS } from "@/lib/mapping";

// Dynamically import components for better performance
const CardHeader = dynamic(() => import("@/components/Card/CardHeader"), { ssr: false });
const CardContent = dynamic(() => import("@/components/Card/CardContent"), { ssr: false });
const CardFooter = dynamic(() => import("@/components/Card/CardFooter"), { ssr: false });
const PrivacyPolicyModal = dynamic(() => import("@/components/PrivacyPolicyModal"), { ssr: false });
const QRCard = dynamic(() => import("@/components/Card/QRCard"), { ssr: false });
const Toast = dynamic(() => import("@/components/Toast").then((mod) => mod.Toast), { ssr: false });

interface Toast {
  message: string;
  type: "success" | "error" | "info" | "loading";
  icon?: React.ReactNode;
  duration?: number;
}

const ANIMATION_DURATION = {
  FAST: 300,
  MEDIUM: 500,
  SLOW: 800,
};

const WIDGET_STATES = {
  ICON: "icon",
  ICONS: "icons",
  CHAT: "chat",
  MAXIMIZED: "maximized",
  QR: "qr",
};

const ICON_CONFIG = [
  {
    src: "/images/finalbot.gif",
    alt: "Chatbot",
    tooltip: "Chat with Punjab Govt. AI Assistant",
    action: "chat",
  },
  {
    src: "/images/awhatsapp.gif",
    alt: "WhatsApp",
    tooltip: "WhatsApp Chatbot",
    action: "whatsapp",
  },
  {
    src: "/images/acall.gif",
    alt: "Contact",
    tooltip: "State Helpline 1100",
    action: "phone",
  },
  {
    src: "/images/aqr.gif",
    alt: "QR Scan",
    tooltip: "QR Code to open Whatsapp Chatbot",
    action: "qr",
  },
];

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
  // UI state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [showQRImage, setShowQRImage] = useState(false);
  const [isDepartmentLocked, setIsDepartmentLocked] = useState(false);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);
  const [widgetState, setWidgetState] = useState(WIDGET_STATES.ICON);
  const [language, setLanguage] = useState("auto");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Refs
  const chatIconRef = useRef<HTMLButtonElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Custom hook for chat functionality
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

  // Check if we're in an iframe
  useEffect(() => {
    setIsInIframe(window.self !== window.top);
  }, []);

  // Handle messages to parent window when in iframe
  useEffect(() => {
    if (!isInIframe) return;
    
    sendMessageToParent(widgetState);
  }, [isInIframe, widgetState]);

  // Set up click outside listener for language dropdown
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update widget state based on UI changes
  useEffect(() => {
    let newState = WIDGET_STATES.ICON;
    
    if (showIcons && !isChatOpen) {
      newState = WIDGET_STATES.ICONS;
    } else if (isChatOpen && !isMaximized && !showQRImage) {
      newState = WIDGET_STATES.CHAT;
    } else if (isMaximized) {
      newState = WIDGET_STATES.MAXIMIZED;
    } else if (showQRImage) {
      newState = WIDGET_STATES.QR;
    }
    
    setWidgetState(newState);
  }, [showIcons, isChatOpen, isMaximized, showQRImage]);

  // Utility functions
  function sendMessageToParent(state: string) {
    if (window.self !== window.top) {
      try {
        window.parent.postMessage(
          {
            type: "widgetState",
            state: state,
          },
          "*"
        );
      } catch (e) {
        console.error("Error sending message to parent:", e);
      }
    }
  }

  const handleTransitionState = (callback: () => void) => {
    setIsTransitioning(true);
    setTimeout(() => {
      callback();
      setIsTransitioning(false);
    }, 50);
  };

  // Event handlers
  const toggleIcons = () => {
    handleTransitionState(() => {
      setShowIcons(!showIcons);
      if (isChatOpen) {
        setIsChatOpen(false);
      }
    });
  };

  const toggleChat = () => {
    handleTransitionState(() => {
      const newChatState = !isChatOpen;
      setIsChatOpen(newChatState);
      setIsMaximized(false);
      setShowQRImage(false);
      
      if (newChatState) {
        setShowIcons(false);
        sendInitialMessages();
      } else {
        setShowIcons(true);
      }
    });
  };

  const handleCloseChat = () => {
    handleTransitionState(() => {
      setIsChatOpen(false);
      setShowIcons(true);
    });
  };

  const handleMaximize = () => {
    handleTransitionState(() => {
      setIsMaximized(true);
    });
  };

  const handleRestore = () => {
    handleTransitionState(() => {
      setIsMaximized(false);
    });
  };

  const handleResetChat = () => {
    resetChat();
    setIsDepartmentLocked(false);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleQRClick = () => {
    handleTransitionState(() => {
      setIsChatOpen(true);
      setShowQRImage(true);
      setIsMaximized(false);
      setShowIcons(false);
    });
  };

  const handleCloseQR = () => {
    handleTransitionState(() => {
      setShowQRImage(false);
      setIsChatOpen(false);
      setShowIcons(true);
    });
  };

  const handleWhatsAppClick = () => window.open("https://wa.me/919855501076", "_blank");
  const handlePhoneClick = () => window.open("tel:919855501076", "_blank");

  const handleLanguageChange = async (selectedLanguage: string) => {
    setIsLanguageDropdownOpen(false);
    setToast({
      message:
        selectedLanguage === "auto"
          ? "Switching to auto language detection..."
          : `Switching to ${getLanguageLabel(selectedLanguage)}...`,
      type: "loading",
      icon: <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />,
    } as Toast);
    
    try {
      setLanguage(selectedLanguage);
      await new Promise((resolve) => setTimeout(resolve, ANIMATION_DURATION.FAST));

      setToast({
        message:
          selectedLanguage === "auto"
            ? "Auto language detection enabled"
            : `Switched to ${getLanguageLabel(selectedLanguage)}`,
        type: "success",
        duration: 2000,
      } as Toast);
    } catch (error) {
      console.error("Language change error:", error);
      setToast({
        message: "Failed to change language. Please try again.",
        type: "error",
        duration: 2000,
      } as Toast);
    }
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen((prev) => !prev);
  };

  const getLanguageLabel = (lang: string) => {
    switch (lang) {
      case "en": return "English";
      case "pa": return "ਪੰਜਾਬੀ";
      case "hi": return "हिंदी";
      case "auto": return "Auto";
      default: return "Auto";
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await handleSubmit(e, input);
    } catch (err) {
      console.error("Error in onSubmit:", err);
      setToast({
        message: "Failed to send message. Please try again.",
        type: "error",
      } as Toast);
    }
  };

  const sendDepartmentMessage = (department: string) => {
    const customEvent = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>;

    handleSubmit(customEvent, department);
    setIsDepartmentLocked(true);
  };

  const handleIconAction = (action: string) => {
    switch (action) {
      case "chat":
        toggleChat();
        break;
      case "whatsapp":
        handleWhatsAppClick();
        break;
      case "phone":
        handlePhoneClick();
        break;
      case "qr":
        handleQRClick();
        break;
      default:
        break;
    }
  };

  // Translations
  const t =
    translations[
      language === "auto" ? "en" : (language as keyof typeof translations)
    ] || translations.en;

  return (
    <div
      ref={containerRef}
      className={`${isInIframe ? "pt-0 bg-transparent" : "flex flex-col min-h-screen"}`}
    >
      <TooltipProvider>
        {/* Main button when icons are hidden */}
        {!showIcons && !isChatOpen && (
          <div
            className={`fixed bottom-4 right-6 z-50 ${
              isTransitioning ? "opacity-0" : "animate-fadeInUp"
            }`}
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  ref={chatIconRef}
                  onClick={toggleIcons}
                  size="icon"
                  className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105 active:scale-95"
                  aria-label="Toggle chat icons"
                >
                  <MessageCircle className="w-7 h-7" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-gray-800 text-white">
                <p>{"Punjab Govt. Chatbot"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}

        {/* Icons tray */}
        {showIcons && (
          <div className={`fixed bottom-4 right-4 z-50 w-[95%] max-w-[500px] mx-auto ${
            isTransitioning ? "opacity-0" : "animate-slideInRight"
          }`}>
            <div className="flex items-center justify-between bg-white rounded-[28px] shadow-lg p-2 backdrop-blur-sm bg-opacity-95">
              <div className="flex items-center space-x-1 sm:space-x-2">
                {ICON_CONFIG.map((item, index) => (
                  <div
                    key={index}
                    className="animate-iconAppear flex-shrink-0"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div 
                          className="w-12 h-12 flex items-center justify-center rounded-full shadow-md bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                          onClick={() => handleIconAction(item.action)}
                        >
                          <Image
                            src={item.src}
                            alt={item.alt}
                            width={48}
                            height={48}
                            className="rounded-full hover:scale-110 transition-transform duration-300 ease-out"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="bg-gray-800 text-white">
                        <p>{item.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                ))}
              </div>

              <div
                className="animate-iconAppear flex-shrink-0 ml-1"
                style={{ animationDelay: "0.4s" }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={toggleIcons}
                      className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
                      aria-label="Close icons"
                      size="icon"
                    >
                      <X className="size-6 text-white" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-gray-800 text-white">
                    <p>Close</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        )}

        {/* Chat window */}
        {isChatOpen && (
          <div
            className={`fixed z-50 ${
              isMaximized
                ? "inset-0 bottom-0 p-0"
                : "bottom-20 right-4 w-[95%] max-w-[500px]"
            } ${isTransitioning ? "opacity-0" : isMaximized ? "animate-fadeIn" : "animate-scaleIn"}`}
            style={{
              width: isMaximized ? "100%" : "95%",
              height: isMaximized ? "100vh" : "auto",
              maxHeight: isMaximized ? "100vh" : "80vh",
              borderRadius: isMaximized ? "0" : "12px",
              transition: "all 0.3s ease-out",
            }}
          >
            <Card
              className={`border-none shadow-xl bg-white overflow-hidden transition-all duration-300 ease-out h-full flex flex-col ${
                isMaximized ? "maximized-chat" : ""
              }`}
            >
              {showQRImage ? (
                <QRCard onClose={handleCloseQR} />
              ) : (
                <>
                  <CardHeader
                    title={t.chatTitle}
                    emoji={departmentInfo.emoji}
                    name={departmentInfo.name}
                    isMaximized={isMaximized}
                    onMaximize={handleMaximize}
                    onRestore={handleRestore}
                    onReset={handleResetChat}
                    onClose={handleCloseChat}
                  />

                  <div className="flex-grow overflow-hidden p-4">
                    <CardContent
                      messages={messages}
                      chatContainerRef={chatContainerRef}
                      isMaximized={isMaximized}
                      t={t}
                      isDepartmentLocked={isDepartmentLocked}
                      sendDepartmentMessage={sendDepartmentMessage}
                      TRANSLATIONS={TRANSLATIONS}
                      language={language}
                      setIsPolicyModalOpen={setIsPolicyModalOpen}
                    />
                  </div>

                  <CardFooter
                    input={input}
                    isLoading={isLoading}
                    language={language}
                    isLanguageDropdownOpen={isLanguageDropdownOpen}
                    onInputChange={handleInputChange}
                    onSubmit={onSubmit}
                    onLanguageChange={handleLanguageChange}
                    onToggleLanguageDropdown={toggleLanguageDropdown}
                    getLanguageLabel={getLanguageLabel}
                    t={t}
                    languageDropdownRef={languageDropdownRef}
                  />
                </>
              )}
            </Card>
          </div>
        )}

        {/* Toast notifications */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        
        {/* Privacy policy modal */}
        <PrivacyPolicyModal
          isOpen={isPolicyModalOpen}
          onClose={() => setIsPolicyModalOpen(false)}
        />
      </TooltipProvider>
    </div>
  );
}





