import { useState, useCallback, useEffect, useRef } from "react";
import { marked } from "marked";

type Language = "en" | "pa" | "hi" | "auto";
type Role = "user" | "assistant";
type DepartmentCode = string;
type Message = {
  role: Role;
  content: string;
  rawContent?: string;
  timestamp: Date;
  citations?: Citation[];
  containsHtml?: boolean;
  isStreaming?: boolean;
  departmentOptions?: string[];
};

type Citation = {
  title?: string;
  url?: string;
};

type Toast = {
  message: string;
  type: "success" | "error" | "info" | "loading";
  icon?: React.ReactNode;  
  duration?: number;
};

interface ScrollOptions {
  target?: HTMLElement | null;
  step?: number;
  duration?: number;
}

// Define department mapping with translations
export const DEPARTMENT_MAPPING = {
  en: {
    "Sewa Kendras & G2C Services": "punchatbotindex",
    "Procurement Rules 2022": "procurement",
    "Department of Agriculture": "agriculture",
    "Excise & Taxation": "tax",
    "Water Resources": "waterresource",
    "Department of Transport": "transport",
    "Department of Social Security": "dossawacd",
  },
  pa: {
    "ਸੇਵਾ ਕੇਂਦਰ ਅਤੇ G2C ਸੇਵਾਵਾਂ": "punchatbotindex",
    "ਖਰੀਦ ਨਿਯਮ 2022": "procurement",
    "ਖੇਤੀਬਾੜੀ ਵਿਭਾਗ": "agriculture",
    "ਆਬਕਾਰੀ ਅਤੇ ਕਰਾਧਾਨ": "tax",
    "ਪਾਣੀ ਸਰੋਤ": "waterresource",
    "ਪਰਿਵਹਨ ਵਿਭਾਗ": "transport",
    "ਸਮਾਜਿਕ ਸੁਰੱਖਿਆ ਵਿਭਾਗ": "dossawacd",
  },
  hi: {
    "सेवा केंद्र और G2C सेवाएं": "punchatbotindex",
    "खरीद नियम 2022": "procurement",
    "कृषि विभाग": "agriculture",
    "आबकारी और कराधान": "tax",
    "जल संसाधन": "waterresource",
    "परिवहन विभाग": "transport",
    "सामाजिक सुरक्षा विभाग": "dossawacd",
  },
};

// Translation content for different languages
export const TRANSLATIONS = {
  en: {
    disclaimer:
      "Disclaimer:\nThis chatbot provides general information for facilitation only. Usage for legal or administrative purposes is subject to validation against relevant acts/rules. For detailed information, please check reference documents.",
    welcomeMessage:
      "Dear Visitor, 😊\n\nWelcome to the AI Bot of Punjab Government!\n\n Hello👋\n\n I'm here to help you with your queries on \n\n 📙 About Sewa Kendra\n\n👨‍👩‍👧‍👦 Citizen Centric Services\n\n🏦 Pension Scheme\n\n👶 Birth & Death Certificate\n\n📜 Caste Certificate\n\n🏠 Residence Certificate\n\n🧓🏾 Senior Citizen ID Card\n\n💍 Marriage Certificate\n\n🏢 Sewa Kendra Project RFP 2023-2028\n\n🛒 Public Procurement Rules 2022\n\nFeel free to ask specific questions, and I'll do my best to help you.",
    selectDepartment: "Select the department to get relevant information ✅",
    departmentOptions: [
      "Sewa Kendras & G2C Services",
      "Procurement Rules 2022",
      "Department of Agriculture",
      "Excise & Taxation",
      "Water Resources",
      "Department of Transport",
      "Department of Social Security",
    ],
    departmentWelcome: (department: string) =>
      `Welcome to the Punjab Government e-Connect Portal! 🙏\n\nThank you for reaching out to the ${department}. How can we assist you today? 🙂\n\nOur chatbot 🤖 is here to help you with any queries you may have. Whether you need information, guidance, or support, we're here to ensure you get the answers you need promptly. 😊\n\nPlease type your question, and we'll do our best to assist you based on the resources and documents available.`,
    errorMessage: "An error occurred. Please try again later.",
    privacyPolicy: "Chatbot Privacy Policy",
  },
  pa: {
    disclaimer:
      "ਸਾਵਧਾਨੀ:\nਇਹ ਚੈਟਬੋਟ ਸਿਰਫ ਸਹੂਲਤ ਲਈ ਸਧਾਰਨ ਜਾਣਕਾਰੀ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ। ਕਾਨੂੰਨੀ ਜਾਂ ਪ੍ਰਸ਼ਾਸਨਿਕ ਉਦੇਸ਼ਾਂ ਲਈ ਵਰਤੋਂ ਸੰਬੰਧਿਤ ਐਕਟ/ਨਿਯਮਾਂ ਦੇ ਵਿਰੁੱਧ ਪ੍ਰਮਾਣਿਤ ਕੀਤੀ ਜਾਣੀ ਚਾਹੀਦੀ ਹੈ। ਵਿਸਤ੍ਰਿਤ ਜਾਣਕਾਰੀ ਲਈ, ਕਿਰਪਾ ਕਰਕੇ ਹਵਾਲਾ ਦਸਤਾਵੇਜ਼ਾਂ ਦੀ ਜਾਂਚ ਕਰੋ।",
    welcomeMessage:
      "ਪਿਆਰੇ ਵਿਜ਼ਟਰ, 😊\n\nਪੰਜਾਬ ਸਰਕਾਰ ਦੇ ਏਆਈ ਬੋਟ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ!\n\nਹੈਲੋ👋\n\nਮੈਂ ਤੁਹਾਡੇ ਸਵਾਲਾਂ ਦੇ ਜਵਾਬਾਂ ਵਿੱਚ ਤੁਹਾਡੀ ਮਦਦ ਕਰਨ ਲਈ ਹਾਂ\n\n 📙 ਸੇਵਾ ਕੇਂਦਰ ਬਾਰੇ\n\n👨‍👩‍👧‍👦 ਨਾਗਰਿਕ-ਕੇਂਦਰਿਤ ਸੇਵਾਵਾਂ\n\n🏦 ਪੈਨਸ਼ਨ ਸਕੀਮ\n\n👶 ਜਨਮ ਅਤੇ ਮੌਤ ਸਰਟੀਫਿਕੇਟ\n\n📜 ਜਾਤੀ ਪ੍ਰਮਾਣ ਪੱਤਰ\n\n🏠 ਨਿਵਾਸ ਪ੍ਰਮਾਣ ਪੱਤਰ\n\n🧓🏾 ਸੀਨੀਅਰ ਸਿਟੀਜ਼ਨ ਆਈਡੀ ਕਾਰਡ\n\n💍 ਵਿਆਹ ਪ੍ਰਮਾਣ ਪੱਤਰ\n\n🏢 ਸੇਵਾ ਕੇਂਦਰ ਪ੍ਰੋਜੈਕਟ RFP 2023-2028\n\n🛒 ਜਨਤਕ ਖਰੀਦ ਨਿਯਮ 2022\n\nਕਿਰਪਾ ਕਰਕੇ ਖਾਸ ਸਵਾਲ ਪੁੱਛੋ, ਅਤੇ ਮੈਂ ਤੁਹਾਡੀ ਮਦਦ ਕਰਨ ਦੀ ਪੂਰੀ ਕੋਸ਼ਿਸ਼ ਕਰਾਂਗਾ।",
    selectDepartment: "ਸੰਬੰਧਿਤ ਜਾਣਕਾਰੀ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਵਿਭਾਗ ਚੁਣੋ ✅",
    departmentOptions: [
      "ਸੇਵਾ ਕੇਂਦਰ ਅਤੇ G2C ਸੇਵਾਵਾਂ",
      "ਖਰੀਦ ਨਿਯਮ 2022",
      "ਖੇਤੀਬਾੜੀ ਵਿਭਾਗ",
      "ਆਬਕਾਰੀ ਅਤੇ ਕਰਾਧਾਨ",
      "ਪਾਣੀ ਸਰੋਤ",
      "ਪਰਿਵਹਨ ਵਿਭਾਗ",
      "ਸਮਾਜਿਕ ਸੁਰੱਖਿਆ ਵਿਭਾਗ",
    ],
    departmentWelcome: (department: string) =>
      `ਪੰਜਾਬ ਸਰਕਾਰ ਈ-ਕਨੈਕਟ ਪੋਰਟਲ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ! 🙏\n\n${department} ਨਾਲ ਜੁੜਨ ਲਈ ਤੁਹਾਡਾ ਧੰਨਵਾਦ। ਅੱਜ ਅਸੀਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ? 🙂\n\nਸਾਡਾ ਚੈਟਬੋਟ 🤖 ਤੁਹਾਡੇ ਕਿਸੇ ਵੀ ਸਵਾਲ ਦਾ ਜਵਾਬ ਦੇਣ ਲਈ ਹੈ। ਭਾਵੇਂ ਤੁਹਾਨੂੰ ਜਾਣਕਾਰੀ, ਮਾਰਗਦਰਸ਼ਨ ਜਾਂ ਸਹਾਇਤਾ ਦੀ ਲੋੜ ਹੈ, ਅਸੀਂ ਇਹ ਸੁਨਿਸ਼ਚਿਤ ਕਰਨ ਲਈ ਹਾਂ ਕਿ ਤੁਹਾਨੂੰ ਲੋੜੀਂਦੇ ਜਵਾਬ ਸਮੇਂ ਸਿਰ ਮਿਲਣ। 😊\n\nਕਿਰਪਾ ਕਰਕੇ ਆਪਣਾ ਸਵਾਲ ਟਾਈਪ ਕਰੋ, ਅਤੇ ਅਸੀਂ ਉਪਲਬਧ ਸਰੋਤਾਂ ਅਤੇ ਦਸਤਾਵੇਜ਼ਾਂ ਦੇ ਆਧਾਰ 'ਤੇ ਤੁਹਾਡੀ ਮਦਦ ਕਰਨ ਦੀ ਪੂਰੀ ਕੋਸ਼ਿਸ਼ ਕਰਾਂਗੇ।`,
    errorMessage: "ਇੱਕ ਗਲਤੀ ਆਈ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।",
    privacyPolicy: "ਚੈਟਬੋਟ ਗੋਪਨੀਯਤਾ ਨੀਤੀ",
  },
  hi: {
    disclaimer:
      "अस्वीकरण:\nयह चैटबॉट केवल सुविधा के लिए सामान्य जानकारी प्रदान करता है। कानूनी या प्रशासनिक उद्देश्यों के लिए उपयोग संबंधित अधिनियमों/नियमों के विरुद्ध सत्यापन के अधीन है। विस्तृत जानकारी के लिए, कृपया संदर्भ दस्तावेजों की जांच करें।",
    welcomeMessage:
      "प्रिय आगंतुक, 😊\n\nपंजाब सरकार के एआई बॉट में आपका स्वागत है!\n\nनमस्ते👋\n\nमैं आपके प्रश्नों के उत्तर देने में आपकी सहायता के लिए यहां हूं\n\n 📙 सेवा केंद्र के बारे में\n\n👨‍👩‍👧‍👦 नागरिक-केंद्रित सेवाएं\n\n🏦 पेंशन योजना\n\n👶 जन्म और मृत्यु प्रमाणपत्र\n\n📜 जाति प्रमाणपत्र\n\n🏠 निवास प्रमाणपत्र\n\n🧓🏾 वरिष्ठ नागरिक आईडी कार्ड\n\n💍 विवाह प्रमाणपत्र\n\n🏢 सेवा केंद्र परियोजना RFP 2023-2028\n\n🛒 सार्वजनिक खरीद नियम 2022\n\nकृपया विशिष्ट प्रश्न पूछें, और मैं आपकी सहायता करने की पूरी कोशिश करूंगा।",
    selectDepartment:
      "प्रासंगिक जानकारी प्राप्त करने के लिए विभाग का चयन करें ✅",
    departmentOptions: [
      "सेवा केंद्र और G2C सेवाएं",
      "खरीद नियम 2022",
      "कृषि विभाग",
      "आबकारी और कराधान",
      "जल संसाधन",
      "परिवहन विभाग",
      "सामाजिक सुरक्षा विभाग",
    ],
    departmentWelcome: (department: string) =>
      `पंजाब सरकार ई-कनेक्ट पोर्टल में आपका स्वागत है! 🙏\n\n${department} से संपर्क करने के लिए धन्यवाद। आज हम आपकी कैसे मदद कर सकते हैं? 🙂\n\nहमारा चैटबॉट 🤖 आपके किसी भी प्रश्न का उत्तर देने के लिए यहां है। चाहे आपको जानकारी, मार्गदर्शन या सहायता की आवश्यकता हो, हम यह सुनिश्चित करने के लिए हैं कि आपको आवश्यक उत्तर समय पर मिलें। 😊\n\nकृपया अपना प्रश्न टाइप करें, और हम उपलब्ध संसाधनों और दस्तावेजों के आधार पर आपकी सहायता करने की पूरी कोशिश करेंगे।`,
    errorMessage: "एक त्रुटि हुई। कृपया बाद में पुनः प्रयास करें।",
    privacyPolicy: "चैटबॉट गोपनीयता नीति",
  },
};
// Default department if none selected
const DEFAULT_DEPARTMENT = "punchatbotindex";

export const useCustomChat = (language = "en") => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDepartment, setCurrentDepartment] =
    useState(DEFAULT_DEPARTMENT);
  const [isDepartmentLocked, setIsDepartmentLocked] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
 
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  // const streamingRef = useRef(false);
  const [currentLanguage, setCurrentLanguage] = useState<Language>(language as Language);
  const [isLanguageChanging, setIsLanguageChanging] = useState(false);

  const t =
  TRANSLATIONS[(language === "auto" ? "en" : language) as keyof typeof TRANSLATIONS] ||
  TRANSLATIONS.en;

const deptMapping =
  DEPARTMENT_MAPPING[(language === "auto" ? "en" : language) as keyof typeof DEPARTMENT_MAPPING] ||
  DEPARTMENT_MAPPING.en;

  const getLanguageLabel = (languageCode: Language): string => {
    const languageLabels: Record<Language, string> = {
      en: "English",
      pa: "Punjabi", 
      hi: "Hindi",
      auto: "Auto Detect"
    };
    return languageLabels[languageCode] || languageCode;
  };
  
  const createDepartmentOptionsMessage = useCallback(
    (lang?: Language) => {
      const langKey = (lang || currentLanguage) === "auto" ? "en" : (lang || currentLanguage);
      const langTranslations = TRANSLATIONS[langKey as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;
      return langTranslations.selectDepartment;
    },
    [currentLanguage]
  );
  
  useEffect(() => {
    if (language !== currentLanguage && !isLanguageChanging) {
      setIsLanguageChanging(true);
  
      // Reset chat state
      setMessages([]);
      setInput("");
      setIsLoading(false);
      setError(null);
      setCurrentDepartment(DEFAULT_DEPARTMENT);
      setIsDepartmentLocked(false);
  
      // Get translations for the new language
      const langTranslations = TRANSLATIONS[language as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;
  
      // Create fresh initial messages with proper typing
      const resetInitialMessages: Message[] = [
        {
          role: "assistant" as Role,  // Explicitly type the role
          content: `${langTranslations.disclaimer}\n<a href='#' class='privacy-policy-link text-red-700 underline'>${langTranslations.privacyPolicy}</a>`,
          timestamp: new Date(),
          containsHtml: true,
        },
        {
          role: "assistant" as Role,
          content: langTranslations.welcomeMessage,
          timestamp: new Date(),
        },
        {
          role: "assistant" as Role,
          content: langTranslations.selectDepartment,
          departmentOptions: langTranslations.departmentOptions,
          timestamp: new Date(),
        },
      ];
  
      setMessages(resetInitialMessages);
      setCurrentLanguage(language as Language);
      setIsLanguageChanging(false);
    }
  }, [language]);

  const handleLanguageChange = useCallback(
    async (selectedLanguage: string) => {
      setIsLanguageChanging(true);

      try {
        // Reset chat state
        setMessages([]);
        setInput("");
        setIsLoading(false);
        setError(null);
        setCurrentDepartment(DEFAULT_DEPARTMENT);
        setIsDepartmentLocked(false);

        // Get translations for the new language
        const langTranslations = TRANSLATIONS[selectedLanguage as keyof typeof TRANSLATIONS] || TRANSLATIONS.en;
        // Create fresh initial messages
        const resetInitialMessages: Message[] = [
          {
            role: "assistant",
            content: `${langTranslations.disclaimer}\n<a href='#' class='privacy-policy-link text-red-700 underline'>${langTranslations.privacyPolicy}</a>`,
            timestamp: new Date(),
            containsHtml: true,
          } as Message,
          {
            role: "assistant",
            content: langTranslations.welcomeMessage,
            timestamp: new Date(),
          } as Message,
          {
            role: "assistant",
            content: langTranslations.selectDepartment,
            departmentOptions: langTranslations.departmentOptions,
            timestamp: new Date(),
          } as Message
        ];

        // Update state in a single batch
        setMessages(resetInitialMessages);
        setCurrentLanguage(selectedLanguage as Language);


        return {
          success: true,
          message:
            selectedLanguage === "auto"
              ? "Auto language detection enabled"
              : `Switched to ${getLanguageLabel(selectedLanguage as Language)}`,
        };
      } catch (error) {
        console.error("Language change error:", error);
        return {
          success: false,
          message: "Failed to change language",
        };
      } finally {
        setIsLanguageChanging(false);
      }
    },
    [
      setMessages,
      setInput,
      setIsLoading,
      setError,
      setCurrentDepartment,
      setIsDepartmentLocked,
    ]
  );

  // Storage management functions
  const getStorageItem = useCallback((key: string): string => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key) || "";
    }
    return "";
  }, []);
  
  const setStorageItem = useCallback((key: string, value: string): void => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, value);
    }
  }, []);
  
  const getAuthToken = useCallback((): string => {
    return getStorageItem("x-auth-token");
  }, [getStorageItem]);
  
  const setAuthToken = useCallback((token: string): void => {
    setStorageItem("x-auth-token", token);
  }, [setStorageItem]);
  
  const getVerificationToken = useCallback((): string => {
    return getStorageItem("verification-token");
  }, [getStorageItem]);
  
  const setVerificationToken = useCallback((token: string): void => {
    setStorageItem("verification-token", token);
  }, [setStorageItem]);

  // Function to check if the token is expired or about to expire
  const isTokenExpired = useCallback((token:string) => {
    try {
      if (!token) return true;

      const base64Url = token.split(".")[1];
      if (!base64Url) return true;

      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload =
        typeof window !== "undefined"
          ? window.atob(base64)
          : Buffer.from(base64, "base64").toString();

      const payload = JSON.parse(jsonPayload);

      if (!payload || !payload.exp) return true;
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime + 300;
    } catch (error) {
      console.error("Error checking token expiration:", error);
      return true;
    }
  }, []);

  // Function to refresh tokens
  // const refreshTokens = useCallback(async () => {
  //   try {
  //     const response = await fetch("/api/generate-tokens");
  //     if (!response.ok) {
  //       throw new Error(`Failed to refresh tokens: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     if (data.authToken && data.verificationToken) {
  //       setAuthToken(data.authToken);
  //       setVerificationToken(data.verificationToken);
  //       return {
  //         authToken: data.authToken,
  //         verificationToken: data.verificationToken,
  //       };
  //     }
  //     throw new Error("Invalid token data received");
  //   } catch (err) {
  //     console.error("Error refreshing tokens:", err);
  //     setError("Failed to refresh authentication tokens");
  //     return null;
  //   }
  // }, [setAuthToken, setVerificationToken]);


const refreshTokens = useCallback(async () => {
  try {
    const response = await fetch("/api/generate-tokens", {
      cache: 'no-store'  
    });
    
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const data = await response.json();
    if (!data.authToken || !data.verificationToken) {
      throw new Error('Invalid token response');
    }
    
    setAuthToken(data.authToken);
    setVerificationToken(data.verificationToken);
    return data;
  } catch (err) {
    console.error("Token refresh failed:", err);
    setToast({
      message: "Session expired - please refresh the page",
      type: "error",
      duration: 5000
    });
    return null;
  }
}, [setAuthToken, setVerificationToken]);
  
  // Check and refresh tokens if needed
  const ensureValidTokens = useCallback(async () => {
    const authToken = getAuthToken();
    if (!authToken || isTokenExpired(authToken)) {
      return await refreshTokens();
    }
    return { authToken, verificationToken: getVerificationToken() };
  }, [getAuthToken, getVerificationToken, isTokenExpired, refreshTokens]);

  // Function to manage message history by limiting the size
  const updateMessagesWithHistoryLimit = useCallback((newMessages: Message[]) => {
    const threshold = 13;
  
    if (newMessages.length > threshold) {
      const historyNote: Message = {
        role: "assistant",
        content: "Some earlier messages have been removed to manage chat history length.",
        timestamp: new Date(),
      };
  
      return [
        newMessages[0],
        newMessages[1],
        historyNote,
        ...newMessages.slice(newMessages.length - (threshold - 3)),
      ];
    }
  
    return newMessages;
  }, []);

  const scrollToBottom = useCallback((options: ScrollOptions = {}) => {
    const {
      target = chatContainerRef.current?.querySelector<HTMLElement>(
        "[data-radix-scroll-area-viewport]"
      ),
      step = 50,
      duration = 100,
    } = options;
  
    if (!target) return;
  
    // Calculate total height including referenced documents
    const contentHeight = target.scrollHeight;
    const containerHeight = target.clientHeight;
   const referencedDocs = target.querySelector(".referenced-docs");
const referencedDocsHeight = referencedDocs instanceof HTMLElement
  ? referencedDocs.offsetHeight
  : 0;
    const targetPosition =
      contentHeight - containerHeight + referencedDocsHeight;
  
    const startPosition = target.scrollTop;
    const distance = targetPosition - startPosition;
  
    if (distance <= 0) return;
  
    let start: number | null = null;
    const animation = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const percentage = Math.min(progress / duration, 1);
      const currentStep = startPosition + distance * percentage;
  
      target.scrollTop = currentStep;
  
      if (percentage < 1) {
        requestAnimationFrame(animation);
      }
    };
  
    requestAnimationFrame(animation);
  }, []);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.isStreaming) {
      requestAnimationFrame(() => {
        scrollToBottom();
      });
    }
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const initialize = async () => {
      try {
        const currentToken = getAuthToken();
        if (!currentToken || isTokenExpired(currentToken)) {
          await refreshTokens();
        }
      } catch (err) {
        console.error("Error initializing tokens:", err);
        setError("Failed to initialize authentication");
      }
    };
  
    initialize();
    sendInitialMessages();
  
    // Use a callback function to set the ref
    const container = document.querySelector(".chat-container");
    if (container) {
      chatContainerRef.current = container as HTMLDivElement;
    }
  }, [getAuthToken, isTokenExpired, refreshTokens]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }, []);

  const getDepartmentCode = useCallback(
    (departmentName: string): DepartmentCode => {
      // First try to find in current language mapping
      if (Object.prototype.hasOwnProperty.call(deptMapping, departmentName)) {
        return (deptMapping as Record<string, string>)[departmentName];
      }
  
      // If not found, check all language mappings
      for (const lang of ["en", "pa", "hi"] as const) {
        const mapping = DEPARTMENT_MAPPING[lang];
        if (Object.prototype.hasOwnProperty.call(mapping, departmentName)) {
          return (mapping as Record<string, string>)[departmentName];
        }
      }
  
      // If still not found, try to match by value
      for (const lang of ["en", "pa", "hi"] as const) {
        const mapping = DEPARTMENT_MAPPING[lang];
        for (const [key, value] of Object.entries(mapping)) {
          if (value === departmentName) {
            return value;
          }
        }
      }
  
      return DEFAULT_DEPARTMENT;
    },
    [deptMapping]
  );
  
  const replaceDocsWithAnchors = useCallback(
    (content: string, citations: Citation[] = []): string => {
      if (!content) return content;
  
      let processedContent = content.replace(
        /(?:https?:\/\/[^\s]+)/g,
        (url) =>
          `<a href="${url}" target="_blank" class="text-blue-600 underline">Link</a>`
      );
  
      citations.forEach((citation, i) => {
        const docNum = i + 1;
        const docRegex = new RegExp(`\\[doc${docNum}\\]`, "gi");
  
        const linkHtml = citation.url
          ? `<a href="${citation.url}" target="_blank" class="doc-link" 
              style="color: #0066cc; text-decoration: underline; font-weight: bold;">
              [${citation.title || "Document " + docNum}]</a>`
          : `<span class="doc-reference" title="Document not available" 
              style="color: #999; cursor: not-allowed;">[${
                citation.title || "Document " + docNum
              }]</span>`;
  
        processedContent = processedContent.replace(docRegex, linkHtml);
      });
  
      const pdfMatches = [...processedContent.matchAll(/\[([^\]]+\.pdf)\]/gi)];
  
      pdfMatches.forEach((match, index) => {
        const pdfName = match[1];
        const citation = citations[index] || {};
  
        const regex = new RegExp(`\\[${pdfName}\\]`, "g");
        const linkHtml = citation.url
          ? `<a href="${citation.url}" target="_blank" class="doc-link" 
              style="color: #0066cc; text-decoration: underline; font-weight: bold;">
              [${citation.title || pdfName}]</a>`
          : `<span class="doc-reference" title="Document not available" 
              style="color: #999; cursor: not-allowed;">[${pdfName}]</span>`;
  
        processedContent = processedContent.replace(regex, linkHtml);
      });
  
      return processedContent.replace(/\[doc\d+\]:\s*.*?\.\w+|\[doc\d+\]/g, "");
    },
    []
  );
  const sendInitialMessages = useCallback(() => {
    const lang = language === "auto" ? "en" : language;
    const langTranslations = 
      (TRANSLATIONS as Record<string, typeof TRANSLATIONS.en>)[lang] || 
      TRANSLATIONS.en;
  
    const initialMessages: Message[] = [
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
  
    setIsDepartmentLocked(false);
    setCurrentDepartment(DEFAULT_DEPARTMENT);
    setMessages(initialMessages);
  }, [language === "auto" ? "en" : language]);
  // Trigger initial messages on language change
  useEffect(() => {
    sendInitialMessages();
  }, [currentLanguage, sendInitialMessages]);

  const resetChat = useCallback(() => {
    // Use the current language when resetting, default to 'en' if 'auto'
    const langKey = currentLanguage === 'auto' ? 'en' : currentLanguage;
    const langTranslations = TRANSLATIONS[langKey] || TRANSLATIONS.en;
  
    setMessages([]);
    setInput("");
    setIsLoading(false);
    setError(null);
    setCurrentDepartment(DEFAULT_DEPARTMENT);
    setIsDepartmentLocked(false);
  
    // Create initial messages with the current language
    const initialMessages: Message[] = [
      {
        role: "assistant",
        content: `${langTranslations.disclaimer}\n<a href='#' class='privacy-policy-link text-red-700 underline'>${langTranslations.privacyPolicy}</a>`,
        timestamp: new Date(),
        containsHtml: true,
      },
      {
        role: "assistant",
        content: langTranslations.welcomeMessage,
        timestamp: new Date(),
      },
      {
        role: "assistant",
        content: createDepartmentOptionsMessage(),
        timestamp: new Date(),
      },
    ];
  
    setMessages(initialMessages);
  }, [currentLanguage, createDepartmentOptionsMessage]);


  const sendDepartmentMessage = useCallback(
    async (departmentName: string) => {
      if (isLoading || (isDepartmentLocked && !isLanguageChanging)) return;
  
      setIsLoading(true);
  
      try {
        // Find the department code
        const departmentCode = getDepartmentCode(departmentName);
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
    [
      isLoading,
      isDepartmentLocked,
      isLanguageChanging,
      t,
      updateMessagesWithHistoryLimit,
      getDepartmentCode,
    ]
  );

  const processStreamResponse = useCallback(
    async (
      reader: ReadableStreamDefaultReader<Uint8Array>,
      currentMessages: Message[]
    ): Promise<string> => {
      const decoder = new TextDecoder();
      let messageContent = "";
      let streamData = "";
      let messageCitations: Citation[] = [];
      let buffer = "";
      let chunkCount = 0;
      let hasStartedStreaming = false;
      let hasCitationsRendered = false;

      try {
        // Add initial loading dots
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
            let sanitizedMessage = message.trim().replace(/^data:\s*/, "");

            try {
              if (!sanitizedMessage) continue;

              const parsedData = JSON.parse(sanitizedMessage);

              if (parsedData?.context?.length > 0) {
                messageCitations = parsedData.context;
              }

              if (parsedData?.content?.length >= 1) {
                if (!hasStartedStreaming) {
                  hasStartedStreaming = true;
                  // Replace loading dots with actual content
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
                    (match:string, url:string) =>
                      `<a href="${url}" target="_blank" rel="noopener noreferrer" class="link-icon">🔗</a>`
                  )
                  .replace(/\[doc(\d+)\]/gi, (match:string, docNum:string) => {
                    const index = parseInt(docNum) - 1;
                    if (index >= 0 && index < messageCitations.length) {
                      const citation = messageCitations[index];
                      if (citation?.url) {
                        return `<a href="${citation.url}" target="_blank" rel="noopener noreferrer" class="doc-link">🔗</a>`;
                      }
                    }
                    return "";
                  });

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

        // Final update with citations
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const parsedContent = marked.parse(streamData) as string;
          const finalMessage: Message = {
            role: "assistant",
            content: parsedContent || t.errorMessage,
            rawContent: streamData,
            timestamp: new Date(),
            citations: messageCitations,
            containsHtml: true,
            isStreaming: false,
          };
          updatedMessages[updatedMessages.length - 1] = finalMessage;

          // Scroll only if citations are present
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

        const errorMessage =
          error instanceof Error ? `${t.errorMessage} ` : t.errorMessage;

        setMessages((prevMessages) => [
          ...prevMessages,
          {
            role: "assistant",
            content: errorMessage,
            timestamp: new Date(),
          },
        ]);

        setToast({
          message: errorMessage,
          type: "error",
        });

        throw error;
      }
    },
    [replaceDocsWithAnchors, scrollToBottom, t]
  );

  // const handleSubmit = useCallback(
  //   async (e: React.FormEvent<HTMLFormElement>, messageContent?: string) => {
  //     e?.preventDefault();
  //     const content = messageContent || input;

  //     if (!content.trim()) return;

  //     setIsLoading(true);
  //     setError(null);

  //     const safeApiCall = async (callback: () => Promise<any>) => {
  //       try {
  //         const result = await callback();
  //         setIsLoading(false);
  //         return result;
  //       } catch (err) {
  //         console.error("API Call Error:", err);

  //         // Custom error message
  //         const errorMessage =
  //           "An error occurred. Please refresh or try again later.";

  //         setMessages((prev) => [
  //           ...prev,
  //           {
  //             role: "assistant" as const,
  //             content: errorMessage,
  //             timestamp: new Date(),
  //           },
  //         ]);

  //         setToast({
  //           message: errorMessage,
  //           type: "error",
  //         });

  //         setIsLoading(false);
  //         return null;
  //       }
  //     };

  //     // Handle department selection
  //     if (!isDepartmentLocked) {
  //       const potentialDepartmentCode = getDepartmentCode(content);
  //       const isDepartmentSelection =
  //         Object.values(deptMapping).includes(potentialDepartmentCode) ||
  //         Object.keys(deptMapping).some(
  //           (dept) =>
  //             dept.toLowerCase().includes(content.toLowerCase()) ||
  //             content.toLowerCase().includes(dept.toLowerCase())
  //         );

  //       if (isDepartmentSelection) {
  //         await safeApiCall(async () => {
  //           await sendDepartmentMessage(content);
  //           setInput("");
  //         });
  //         return;
  //       }
  //     }

  //     // Handle normal messages
  //     await safeApiCall(async () => {
  //       const newMessages = updateMessagesWithHistoryLimit([
  //         ...messages,
  //         {
  //           role: "user",
  //           content,
  //           timestamp: new Date(),
  //         },
  //       ]);

  //       setMessages(newMessages);
  //       setInput("");

  //       const tokens = await ensureValidTokens();
  //       if (!tokens) throw new Error("Unable to get valid tokens");

  //       const response = await fetch("/api/chat", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-Auth-Token": tokens.authToken,
  //           "X-Request-Verification-Token": tokens.verificationToken,
  //         },
  //         body: JSON.stringify({
  //           message: newMessages.map(({ role, content }) => ({
  //             role,
  //             content,
  //           })),
  //           department: currentDepartment,
  //           lang: currentLanguage === "auto" ? "auto" : currentLanguage,
  //         }),
  //       });

  //       if (!response.ok) {
  //         const errorText = await response.text();
  //         throw new Error(
  //           `API request failed: ${response.status} - ${errorText}`
  //         );
  //       }

  //       const reader = response.body?.getReader();
  //       if (!reader) {
  //         throw new Error("Could not get response reader");
  //       }

  //       // Wait for the streaming to complete
  //       await processStreamResponse(reader, newMessages);
  //     });
  //   },
  //   [
  //     input,
  //     messages,
  //     currentDepartment,
  //     isDepartmentLocked,
  //     t,
  //     deptMapping,
  //     updateMessagesWithHistoryLimit,
  //     ensureValidTokens,
  //     processStreamResponse,
  //     getDepartmentCode,
  //     sendDepartmentMessage,
  //   ]
  // );

   const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>, messageContent?: string) => {
      e?.preventDefault();
      const content = messageContent || input;

      if (!content.trim()) return;

      setIsLoading(true);
      setError(null);

      const safeApiCall = async (callback: () => Promise<any>) => {
        try {
          const result = await callback();
          setIsLoading(false);
          return result;
        } catch (err) {
          console.error("API Call Error:", err);

          // Custom error message
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

      // Handle department selection
      if (!isDepartmentLocked) {
        const potentialDepartmentCode = getDepartmentCode(content);
        const isDepartmentSelection =
          Object.values(deptMapping).includes(potentialDepartmentCode) ||
          Object.keys(deptMapping).some(
            (dept) =>
              dept.toLowerCase().includes(content.toLowerCase()) ||
              content.toLowerCase().includes(dept.toLowerCase())
          );

        if (isDepartmentSelection) {
          await safeApiCall(async () => {
            await sendDepartmentMessage(content);
            setInput("");
          });
          return;
        }
      }

      // Handle normal messages
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

        const tokens = await ensureValidTokens();
        if (!tokens) throw new Error("Unable to get valid tokens");

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": tokens.authToken,
            "X-Request-Verification-Token": tokens.verificationToken,
          },
          body: JSON.stringify({
            message: newMessages.map(({ role, content }) => ({
              role,
              content,
            })),
            department: currentDepartment,
            lang: currentLanguage === "auto" ? "auto" : currentLanguage,
          }),
        });

        if (response.ok && response.body) {
      const reader = response.body.getReader();
      await processStreamResponse(reader, newMessages);
    }

        if (!response.ok ) {
          const errorText = await response.text();
          throw new Error(
            `API request failed: ${response.status} - ${errorText}`
          );
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error("Could not get response reader");
        }

        // Wait for the streaming to complete
        await processStreamResponse(reader, newMessages);
      });
    },
    [
      input,
      messages,
      currentDepartment,
      isDepartmentLocked,
      t,
      deptMapping,
      updateMessagesWithHistoryLimit,
      ensureValidTokens,
      processStreamResponse,
      getDepartmentCode,
      sendDepartmentMessage,
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












