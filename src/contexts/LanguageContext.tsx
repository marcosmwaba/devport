
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'zh' | 'es' | 'ko';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const defaultValues: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
};

const LanguageContext = createContext<LanguageContextType>(defaultValues);

export const useLanguage = () => useContext(LanguageContext);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});

  useEffect(() => {
    // Load translations
    const loadTranslations = async () => {
      const translationsData = {
        en: await import('../translations/en.json').then(module => module.default),
        fr: await import('../translations/fr.json').then(module => module.default),
        zh: await import('../translations/zh.json').then(module => module.default),
        es: await import('../translations/es.json').then(module => module.default),
        ko: await import('../translations/ko.json').then(module => module.default),
      };
      setTranslations(translationsData);
    };

    loadTranslations();
  }, []);

  useEffect(() => {
    // Store the language preference in localStorage
    localStorage.setItem('preferredLanguage', language);
    // Update document language attribute
    document.documentElement.lang = language;
  }, [language]);

  // Initialize language from localStorage if available
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage') as Language | null;
    if (savedLanguage && ['en', 'fr', 'zh', 'es', 'ko'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const t = (key: string): string => {
    if (!translations[language]) return key;
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
