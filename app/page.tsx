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

// import { X, MessageCircle, Loader2 } from "lucide-react";

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

//   useEffect(() => {
//     try {
//       setIsInIframe(window.self !== window.top);
//     } catch (e) {
//       setIsInIframe(true);
//       console.error("Error checking iframe status:", e);
//     }
//   }, []);

//   useEffect(() => {
//     if (!isInIframe) return;

//     let state = "icon-only";
//     if (!showIcons && !isChatOpen && !showQRImage) {
//       state = "icon-only";
//     } else if (showIcons && !isChatOpen && !showQRImage) {
//       state = "icons-panel";
//     } else if (isChatOpen && !isMaximized) {
//       state = "chat-open";
//     } else if (isChatOpen && isMaximized) {
//       state = "chat-maximized";
//     } else if (showQRImage) {
//       state = "qr-open";
//     }

//     window.parent.postMessage(
//       {
//         type: "resize",
//         state: state,
//         showIcons: showIcons,
//       },
//       "*"
//     );
//   }, [isInIframe, isChatOpen, showIcons, isMaximized, showQRImage]);

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
//     if (!isChatOpen) {
//       setIsChatOpen(true);
//       sendInitialMessages();
//       setShowQRImage(false);
//     } else {
//       setIsChatOpen(false);
//       setIsMaximized(false);
//     }
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
//     setShowIcons((prev) => !prev);

//     if (showIcons) {
//       setIsChatOpen(false);
//       setShowQRImage(false);
//       setIsMaximized(false);
//     }
//   };

//   const handleMaximize = () => setIsMaximized(true);
//   const handleRestore = () => setIsMaximized(false);

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
//     setShowQRImage(true);
//     setIsChatOpen(true);
//     setIsMaximized(false);
//   };

//   const handleCloseQR = () => {
//     setShowQRImage(false);
//     setIsChatOpen(false);
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
//       className={`${
//         isInIframe ? "bg-transparent" : "flex flex-col min-h-screen"
//       }`}
//     >
//       <TooltipProvider>
//         {!showIcons &&  !isMaximized && (
//           <div className={`fixed bottom-4 right-6 z-50 animate-fadeInUp`}>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <Button
//                   ref={chatIconRef}
//                   onClick={toggleIcons}
//                   size="icon"
//                   className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105 active:scale-95"
//                   aria-label="Toggle chat icons"
//                 >
//                   <MessageCircle size={28} className="w-7 h-7" />
//                 </Button>
//               </TooltipTrigger>
//               <TooltipContent side="top" className="bg-gray-800 text-white">
//                 <p>{"Punjab Govt. Chatbot"}</p>
//               </TooltipContent>
//             </Tooltip>
//           </div>
//         )}

//         {showIcons &&   !isMaximized && (
//           <div className="fixed bottom-2 z-50 right-0 w-[500px] mx-auto flex items-center justify-between bg-white rounded-[28px] shadow-lg p-2 animate-slideInRight">
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
//                     <TooltipContent
//                       side="top"
//                       className="bg-gray-800 text-white"
//                     >
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

//         <div className="fixed bottom-0 right-0 z-40 flex flex-col items-end">
//           {isChatOpen && (
//             <div
//               className={`${
//                 isMaximized
//                   ? "fixed inset-0 bottom-20 p-0 animate-fadeIn z-50"
//                   : "w-[500px] animate-scaleIn"
//               }`}
//               style={{
//                 width: isMaximized ? "100%" : "500px",
//                 height: isMaximized ? "100vh" : "600px",
//                 borderRadius: isMaximized ? "0" : "12px 12px 0 0",
//               }}
//             >
//               <Card className="border-none shadow-xl bg-white overflow-hidden transition-all duration-300 ease-out h-full">
//                 {showQRImage ? (
//                   <QRCard onClose={handleCloseQR} />
//                 ) : (
//                   <>
//                     <div>
//                       <CardHeader
//                         title={t.chatTitle}
//                         emoji={departmentInfo.emoji}
//                         name={departmentInfo.name}
//                         isMaximized={isMaximized}
//                         onMaximize={handleMaximize}
//                         onRestore={handleRestore}
//                         onReset={handleResetChat}
//                         onClose={toggleChat}
//                       />
//                     </div>

//                     <div className="m-4 p-0 w-full">
//                       <CardContent
//                         messages={messages}
//                         chatContainerRef={chatContainerRef}
//                         isMaximized={isMaximized}
//                         t={t}
//                         isDepartmentLocked={isDepartmentLocked}
//                         sendDepartmentMessage={sendDepartmentMessage}
//                         TRANSLATIONS={TRANSLATIONS}
//                         language={language}
//                         setIsPolicyModalOpen={setIsPolicyModalOpen}
//                       />
//                     </div>

//                     <div
//                       className={`${
//                         isMaximized ? "absolute bottom-0 left-0 right-0" : ""
//                       }`}
//                     >
//                       <CardFooter
//                         input={input}
//                         isLoading={isLoading}
//                         language={language}
//                         isLanguageDropdownOpen={isLanguageDropdownOpen}
//                         onInputChange={handleInputChange}
//                         onSubmit={onSubmit}
//                         onLanguageChange={handleLanguageChange}
//                         onToggleLanguageDropdown={toggleLanguageDropdown}
//                         getLanguageLabel={getLanguageLabel}
//                         t={t}
//                         languageDropdownRef={languageDropdownRef}
//                       />
//                     </div>
//                   </>
//                 )}
//               </Card>
//             </div>
//           )}
//         </div>

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

//🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸🌸 






// "use client";
// import dynamic from "next/dynamic";
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

// const CardHeader = dynamic(() => import("@/components/Card/CardHeader"));
// const CardContent = dynamic(() => import("@/components/Card/CardContent"));
// const CardFooter = dynamic(() => import("@/components/Card/CardFooter"));
// const PrivacyPolicyModal = dynamic(
//   () => import("@/components/PrivacyPolicyModal")
// );
// const QRCard = dynamic(() => import("@/components/Card/QRCard"));

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
//   const [isMounted, setIsMounted] = useState(false);
//   const [showQRImage, setShowQRImage] = useState(false);
//   const [language, setLanguage] = useState("auto");
//   const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

//   const chatIconRef = useRef<HTMLButtonElement>(null);
//   const widgetRef = useRef<HTMLDivElement>(null);
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const languageDropdownRef = useRef<HTMLDivElement>(null);

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
//   const t =
//     translations[
//       language === "auto" ? "en" : (language as keyof typeof translations)
//     ] || translations.en;

//   useEffect(() => {
//     setIsMounted(true);
//     try {
//       setIsInIframe(window.self !== window.top);
//     } catch (e) {
//       setIsInIframe(true);
//       console.error("Error checking iframe status:", e);
//     }
//   }, []);

//   useEffect(() => {
//     if (!isMounted) return;

//     const state = isChatOpen
//       ? "chatOpen"
//       : showIcons
//       ? "showIcons"
//       : "collapsed";
//     window.parent.postMessage(
//       {
//         type: "widgetState",
//         state: state,
//       },
//       "*"
//     );
//   }, [showIcons, isChatOpen, isMounted]);

//   useEffect(() => {
//     const handleParentMessage = (event: MessageEvent) => {
//       if (event.data.type === "closeWidget") {
//         setShowIcons(false);
//         setIsChatOpen(false);
//       }
//     };

//     window.addEventListener("message", handleParentMessage);
//     return () => window.removeEventListener("message", handleParentMessage);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         !widgetRef.current?.contains(event.target as Node) &&
//         !chatIconRef.current?.contains(event.target as Node)
//       ) {
//         if (showIcons || isChatOpen) {
//           setShowIcons(false);
//           setIsChatOpen(false);
//         }
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [showIcons, isChatOpen]);

//   const toggleChat = () => {
//     setIsChatOpen((prev) => !prev);
//     setIsMaximized(false);
//     setShowQRImage(false);
//     if (!isChatOpen) sendInitialMessages();
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

//   const toggleLanguageDropdown = () =>
//     setIsLanguageDropdownOpen((prev) => !prev);
//   const toggleIcons = () => setShowIcons((prev) => !prev);
//   const handleMaximize = () => setIsMaximized(true);
//   const handleRestore = () => setIsMaximized(false);

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
//   };

//   const handleCloseQR = () => {
//     setShowQRImage(false);
//     setIsChatOpen(false);
//   };

//   const sendDepartmentMessage = (department: string) => {
//     const customEvent = {
//       preventDefault: () => {},
//     } as React.FormEvent<HTMLFormElement>;
//     handleSubmit(customEvent, department);
//     setIsDepartmentLocked(true);
//   };

//   return (
//     <div
//       className={`${
//         isInIframe ? "pt-0 bg-transparent" : "flex flex-col min-h-screen"
//       }`}
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

//         <div ref={widgetRef}>
//           {showIcons && (
//             <div className="fixed bottom-2 z-50 right-4 w-[95%] max-w-[500px] mx-auto flex items-center justify-between bg-white rounded-[28px] shadow-lg p-2 animate-slideInRight">
//               <div className="flex items-center space-x-1 sm:space-x-2">
//                 {[
//                   {
//                     src: "/images/finalbot.gif",
//                     alt: "Chatbot",
//                     onClick: toggleChat,
//                     tooltip: "Chat with Punjab Govt. AI Assistant",
//                   },
//                   {
//                     src: "/images/awhatsapp.gif",
//                     alt: "WhatsApp",
//                     onClick: handleWhatsAppClick,
//                     tooltip: "WhatsApp Chatbot",
//                   },
//                   {
//                     src: "/images/acall.gif",
//                     alt: "Contact",
//                     onClick: handlePhoneClick,
//                     tooltip: "State Helpline 1100",
//                   },
//                   {
//                     src: "/images/aqr.gif",
//                     alt: "QR Scan",
//                     onClick: handleQRClick,
//                     tooltip: "QR Code to open Whatsapp Chatbot",
//                   },
//                 ].map((item, index) => (
//                   <div
//                     key={index}
//                     className="animate-iconAppear flex-shrink-0"
//                     style={{ animationDelay: `${index * 0.1}s` }}
//                   >
//                     <Tooltip>
//                       <TooltipTrigger asChild>
//                         <div className="w-12 h-12 flex items-center justify-center rounded-full shadow-md bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
//                           <Image
//                             src={item.src}
//                             alt={item.alt}
//                             width={48}
//                             height={48}
//                             className="rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 ease-out"
//                             onClick={item.onClick}
//                           />
//                         </div>
//                       </TooltipTrigger>
//                       <TooltipContent
//                         side="top"
//                         className="bg-gray-800 text-white"
//                       >
//                         <p>{item.tooltip}</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </div>
//                 ))}
//               </div>

//               <div
//                 className="animate-iconAppear flex-shrink-0 ml-1"
//                 style={{ animationDelay: "0.4s" }}
//               >
//                 <Tooltip>
//                   <TooltipTrigger asChild>
//                     <Button
//                       onClick={toggleIcons}
//                       className="flex items-center justify-center w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
//                       aria-label="Close icons"
//                       size="icon"
//                     >
//                       <X className="size-6 text-white" />
//                     </Button>
//                   </TooltipTrigger>
//                   <TooltipContent side="top" className="bg-gray-800 text-white">
//                     <p>Close</p>
//                   </TooltipContent>
//                 </Tooltip>
//               </div>
//             </div>
//           )}

//           {isChatOpen && (
//             <div
//               className={`fixed z-50 ${
//                 isMaximized
//                   ? "inset-0 bottom-0 p-0 animate-fadeIn"
//                   : "bottom-20 right-4 w-[95%] max-w-[500px] animate-scaleIn"
//               }`}
//               style={{
//                 width: isMaximized ? "100%" : "95%",
//                 height: isMaximized ? "100vh" : "auto",
//                 borderRadius: isMaximized ? "0" : "12px",
//               }}
//             >
//               <Card className="border-none shadow-xl bg-white overflow-hidden transition-all duration-300 ease-out">
//                 {showQRImage ? (
//                   <QRCard onClose={handleCloseQR} />
//                 ) : (
//                   <>
//                     <div>
//                       <CardHeader
//                         title={t.chatTitle}
//                         emoji={departmentInfo.emoji}
//                         name={departmentInfo.name}
//                         isMaximized={isMaximized}
//                         onMaximize={handleMaximize}
//                         onRestore={handleRestore}
//                         onReset={handleResetChat}
//                         onClose={toggleChat}
//                       />
//                     </div>

//                     <div className="m-4 p-0 w-full">
//                       <CardContent
//                         messages={messages}
//                         chatContainerRef={chatContainerRef}
//                         isMaximized={isMaximized}
//                         t={t}
//                         isDepartmentLocked={isDepartmentLocked}
//                         sendDepartmentMessage={sendDepartmentMessage}
//                         TRANSLATIONS={TRANSLATIONS}
//                         language={language}
//                         setIsPolicyModalOpen={setIsPolicyModalOpen}
//                       />
//                     </div>

//                     <div
//                       className={`${
//                         isMaximized ? "absolute bottom-0 left-0 right-0" : ""
//                       }`}
//                     >
//                       <CardFooter
//                         input={input}
//                         isLoading={isLoading}
//                         language={language}
//                         isLanguageDropdownOpen={isLanguageDropdownOpen}
//                         onInputChange={handleInputChange}
//                         onSubmit={onSubmit}
//                         onLanguageChange={handleLanguageChange}
//                         onToggleLanguageDropdown={toggleLanguageDropdown}
//                         getLanguageLabel={getLanguageLabel}
//                         t={t}
//                         languageDropdownRef={languageDropdownRef}
//                       />
//                     </div>
//                   </>
//                 )}
//               </Card>
//             </div>
//           )}
//         </div>

//         {toast && (
//           <Toast
//             message={toast.message}
//             type={toast.type}
//             onClose={() => setToast(null)}
//           />
//         )}
//          <PrivacyPolicyModal
//           isOpen={isPolicyModalOpen}
//           onClose={() => setIsPolicyModalOpen(false)}
//         />
//       </TooltipProvider>
//     </div>
//   );
// }
// 😊😊😊😊😊😊😊😊

"use client";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/Toast";
import { TRANSLATIONS } from "@/lib/mapping";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card } from "@/components/ui/card";
import { X, MessageCircle, Loader2, ArrowDownCircle } from "lucide-react";
import { useCustomChat } from "@/hooks/useCustomChat";
import { translations, departmentTranslations } from "@/lib/mapping";

const CardHeader = dynamic(() => import("@/components/Card/CardHeader"));
const CardContent = dynamic(() => import("@/components/Card/CardContent"));
const CardFooter = dynamic(() => import("@/components/Card/CardFooter"));
const PrivacyPolicyModal = dynamic(
  () => import("@/components/PrivacyPolicyModal")
);
const QRCard = dynamic(() => import("@/components/Card/QRCard"));

interface Toast {
  message: string;
  type: "success" | "error" | "info" | "loading";
  icon?: React.ReactNode;
  duration?: number;
}

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
  const [showIcons, setShowIcons] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDepartmentLocked, setIsDepartmentLocked] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isInIframe, setIsInIframe] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showQRImage, setShowQRImage] = useState(false);
  const [language, setLanguage] = useState("auto");
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  const chatIconRef = useRef<HTMLButtonElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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
  const t =
    translations[
      language === "auto" ? "en" : (language as keyof typeof translations)
    ] || translations.en;

  useEffect(() => {
    setIsMounted(true);
    try {
      setIsInIframe(window.self !== window.top);
    } catch (e) {
      setIsInIframe(true);
      console.error("Error checking iframe status:", e);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const state = isChatOpen
      ? "chatOpen"
      : showIcons
      ? "showIcons"
      : "collapsed";
    window.parent.postMessage(
      {
        type: "widgetState",
        state: state,
      },
      "*"
    );
  }, [showIcons, isChatOpen, isMounted]);

  useEffect(() => {
    const handleParentMessage = (event: MessageEvent) => {
      if (event.data.type === "closeWidget") {
        setShowIcons(false);
        setIsChatOpen(false);
      }
    };

    window.addEventListener("message", handleParentMessage);
    return () => window.removeEventListener("message", handleParentMessage);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Don't process click outside if privacy policy modal is open
      if (isPolicyModalOpen) {
        // Only process clicks outside the modal itself
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
          setIsPolicyModalOpen(false);
          // Reset to show message circle
          setShowIcons(false);
          setIsChatOpen(false);
          
          // Notify parent frame of state change
          if (isMounted) {
            window.parent.postMessage(
              {
                type: "widgetState",
                state: "collapsed",
              },
              "*"
            );
          }
        }
        return;
      }

      if (
        !widgetRef.current?.contains(event.target as Node) &&
        !chatIconRef.current?.contains(event.target as Node)
      ) {
        if (showIcons || isChatOpen) {
          setShowIcons(false);
          setIsChatOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showIcons, isChatOpen, isPolicyModalOpen, isMounted]);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
    setIsMaximized(false);
    setShowQRImage(false);
    if (!isChatOpen) sendInitialMessages();
  };

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
      await new Promise((resolve) => setTimeout(resolve, 300));
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

  const toggleLanguageDropdown = () =>
    setIsLanguageDropdownOpen((prev) => !prev);
  const toggleIcons = () => setShowIcons((prev) => !prev);
  const handleMaximize = () => setIsMaximized(true);
  const handleRestore = () => setIsMaximized(false);

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
      await handleSubmit(e, input);
    } catch (err) {
      console.error("Error in onSubmit:", err);
      setToast({
        message: "Failed to send message. Please try again.",
        type: "error",
      } as Toast);
    }
  };

  const handleResetChat = () => {
    resetChat();
    setIsDepartmentLocked(false);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: "smooth" });
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

  const handleClosePolicyModal = () => {
    setIsPolicyModalOpen(false);
    
    // Notify parent about the state change - always return to message circle
    if (isMounted) {
      setShowIcons(false);
      setIsChatOpen(false);
      
      window.parent.postMessage(
        {
          type: "widgetState",
          state: "collapsed",
        },
        "*"
      );
    }
  };

  const sendDepartmentMessage = (department: string) => {
    const customEvent = {
      preventDefault: () => {},
    } as React.FormEvent<HTMLFormElement>;
    handleSubmit(customEvent, department);
    setIsDepartmentLocked(true);
  };

  return (
    <div
      className={`${
        isInIframe ? "pt-0 bg-transparent" : "flex flex-col min-h-screen"
      }`}
    >
      <TooltipProvider>
        {!showIcons && !isChatOpen && !isPolicyModalOpen && (
          <div
            className={`fixed bottom-4 right-6 z-50 ${
              !showIcons ? "animate-fadeInUp" : "animate-fadeOutDown"
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
                  <div
                    className={`transition-transform duration-500 ease-out ${
                      showIcons ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    {showIcons ? (
                      <ArrowDownCircle size={28} className="w-7 h-7" />
                    ) : (
                      <MessageCircle size={28} className="w-7 h-7" />
                    )}
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top" className="bg-gray-800 text-white">
                <p>{"Punjab Govt. Chatbot"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}

        <div ref={widgetRef}>
          {showIcons && !isPolicyModalOpen && (
            <div className="fixed bottom-2 z-50 right-4 w-[95%] max-w-[500px] mx-auto flex items-center justify-between bg-white rounded-[28px] shadow-lg p-2 animate-slideInRight">
              <div className="flex items-center space-x-1 sm:space-x-2">
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
                  <div
                    key={index}
                    className="animate-iconAppear flex-shrink-0"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-12 h-12 flex items-center justify-center rounded-full shadow-md bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          <Image
                            src={item.src}
                            alt={item.alt}
                            width={48}
                            height={48}
                            className="rounded-full cursor-pointer hover:scale-110 transition-transform duration-300 ease-out"
                            onClick={item.onClick}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        side="top"
                        className="bg-gray-800 text-white"
                      >
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
          )}

          {isChatOpen && !isPolicyModalOpen && (
            <div
              className={`fixed z-50 ${
                isMaximized
                  ? "inset-0 bottom-0 p-0 animate-fadeIn"
                  : "bottom-20 right-4 w-[95%] max-w-[500px] animate-scaleIn"
              }`}
              style={{
                width: isMaximized ? "100%" : "95%",
                height: isMaximized ? "100vh" : "auto",
                borderRadius: isMaximized ? "0" : "12px",
              }}
            >
              <Card className="border-none shadow-xl bg-white overflow-hidden transition-all duration-300 ease-out">
                {showQRImage ? (
                  <QRCard onClose={handleCloseQR} />
                ) : (
                  <>
                    <div>
                      <CardHeader
                        title={t.chatTitle}
                        emoji={departmentInfo.emoji}
                        name={departmentInfo.name}
                        isMaximized={isMaximized}
                        onMaximize={handleMaximize}
                        onRestore={handleRestore}
                        onReset={handleResetChat}
                        onClose={toggleChat}
                      />
                    </div>

                    <div className="m-4 p-0 w-full">
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

                    <div
                      className={`${
                        isMaximized ? "absolute bottom-0 left-0 right-0" : ""
                      }`}
                    >
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
                    </div>
                  </>
                )}
              </Card>
            </div>
          )}
        </div>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
        
        <PrivacyPolicyModal
          isOpen={isPolicyModalOpen}
          onClose={handleClosePolicyModal}
          ref={modalRef}
        />
      </TooltipProvider>
    </div>
  );
}
