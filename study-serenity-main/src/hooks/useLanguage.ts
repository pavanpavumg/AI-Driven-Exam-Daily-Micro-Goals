import { useState, useCallback, createContext, useContext, ReactNode } from 'react';

type Language = 'en' | 'kn' | 'mr';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (translations: { en: string; kn: string; mr: string }) => string;
  languageLabel: string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const languageLabels: Record<Language, string> = {
  en: 'English',
  kn: 'ಕನ್ನಡ',
  mr: 'मराठी'
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('preferredLanguage');
    return (saved as Language) || 'en';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('preferredLanguage', lang);
  }, []);

  const t = useCallback((translations: { en: string; kn: string; mr: string }) => {
    return translations[language] || translations.en;
  }, [language]);

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage,
      t,
      languageLabel: languageLabels[language]
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Static translations for UI elements
export const uiTranslations = {
  todaysGoals: {
    en: "Today's Gentle Goals",
    kn: "ಇಂದಿನ ಸೌಮ್ಯ ಗುರಿಗಳು",
    mr: "आजची सौम्य उद्दिष्टे"
  },
  focusOnProgress: {
    en: "Focus on progress, not perfection",
    kn: "ಪರಿಪೂರ್ಣತೆಯಲ್ಲ, ಪ್ರಗತಿಯ ಮೇಲೆ ಗಮನ ಕೊಡಿ",
    mr: "परिपूर्णतेवर नाही, प्रगतीवर लक्ष द्या"
  },
  smallStepsBigConfidence: {
    en: "Small steps, big confidence. Complete what feels right — there's no pressure here.",
    kn: "ಸಣ್ಣ ಹೆಜ್ಜೆಗಳು, ದೊಡ್ಡ ಆತ್ಮವಿಶ್ವಾಸ. ಸರಿ ಎನಿಸಿದ್ದನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ — ಇಲ್ಲಿ ಒತ್ತಡವಿಲ್ಲ.",
    mr: "लहान पावले, मोठा आत्मविश्वास. योग्य वाटेल ते पूर्ण करा — येथे दबाव नाही."
  },
  goalsToday: {
    en: "goals today",
    kn: "ಇಂದಿನ ಗುರಿಗಳು",
    mr: "आजची उद्दिष्टे"
  },
  allDone: {
    en: "All done! You're amazing!",
    kn: "ಎಲ್ಲಾ ಮುಗಿಯಿತು! ನೀವು ಅದ್ಭುತ!",
    mr: "सर्व पूर्ण! तुम्ही अप्रतिम आहात!"
  },
  confidenceScore: {
    en: "Confidence Score",
    kn: "ಆತ್ಮವಿಶ್ವಾಸ ಅಂಕ",
    mr: "आत्मविश्वास गुण"
  },
  improving: {
    en: "Improving",
    kn: "ಸುಧಾರಣೆ",
    mr: "सुधारणा"
  },
  steady: {
    en: "Steady",
    kn: "ಸ್ಥಿರ",
    mr: "स्थिर"
  },
  takeItEasy: {
    en: "Take it easy",
    kn: "ಆರಾಮ ತೆಗೆದುಕೊಳ್ಳಿ",
    mr: "आराम करा"
  },
  whyThisScore: {
    en: "Why this score?",
    kn: "ಈ ಅಂಕ ಏಕೆ?",
    mr: "हे गुण का?"
  },
  dailyEncouragement: {
    en: "Daily Encouragement",
    kn: "ದೈನಂದಿನ ಪ್ರೋತ್ಸಾಹ",
    mr: "दैनंदिन प्रोत्साहन"
  },
  whyThisMessage: {
    en: "Why this message?",
    kn: "ಈ ಸಂದೇಶ ಏಕೆ?",
    mr: "हा संदेश का?"
  },
  studyStreak: {
    en: "Study Streak",
    kn: "ಅಧ್ಯಯನ ಸ್ಟ್ರೀಕ್",
    mr: "अभ्यास स्ट्रीक"
  },
  days: {
    en: "days",
    kn: "ದಿನಗಳು",
    mr: "दिवस"
  },
  totalGoals: {
    en: "Total goals completed",
    kn: "ಒಟ್ಟು ಗುರಿಗಳು ಪೂರ್ಣ",
    mr: "एकूण उद्दिष्टे पूर्ण"
  },
  weeklyProgress: {
    en: "Weekly Progress",
    kn: "ಸಾಪ್ತಾಹಿಕ ಪ್ರಗತಿ",
    mr: "साप्ताहिक प्रगती"
  },
  subjectComfort: {
    en: "Subject Comfort",
    kn: "ವಿಷಯ ಆರಾಮ",
    mr: "विषय आराम"
  },
  minutes: {
    en: "min",
    kn: "ನಿಮಿ",
    mr: "मिनि"
  },
  markComplete: {
    en: "Mark as complete",
    kn: "ಪೂರ್ಣ ಎಂದು ಗುರುತಿಸಿ",
    mr: "पूर्ण म्हणून चिन्हांकित करा"
  },
  completed: {
    en: "Completed",
    kn: "ಪೂರ್ಣ",
    mr: "पूर्ण"
  },
  footerMessage: {
    en: "Remember: Learning is a journey, not a race. Take breaks when you need them.",
    kn: "ನೆನಪಿಡಿ: ಕಲಿಕೆ ಒಂದು ಪ್ರಯಾಣ, ಓಟವಲ್ಲ. ಅಗತ್ಯವಿದ್ದಾಗ ವಿರಾಮ ತೆಗೆದುಕೊಳ್ಳಿ.",
    mr: "लक्षात ठेवा: शिक्षण हा एक प्रवास आहे, शर्यत नाही. आवश्यक असेल तेव्हा विश्रांती घ्या."
  }
};
