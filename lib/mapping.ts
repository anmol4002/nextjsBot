export const translations = {
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

export const departmentTranslations = {
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
