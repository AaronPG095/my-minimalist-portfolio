'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getAllTranslations, getStoredLanguage, setStoredLanguage, getTranslation } from '@/lib/translations';
import type { Language, TranslationsData } from '@/types';
import { siteMetadata } from '@/lib/site-metadata';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
  translations: TranslationsData | null;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
  initialTranslations?: TranslationsData | null;
}

export function LanguageProvider({
  children,
  initialLanguage,
  initialTranslations,
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(initialLanguage ?? 'en');
  const [translations] = useState<TranslationsData | null>(
    initialTranslations ?? getAllTranslations(),
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedLang = getStoredLanguage();
    setLanguageState(storedLang);
    document.documentElement.lang = storedLang;
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    setStoredLanguage(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('lang', lang);
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'de' : 'en';
    setLanguage(newLang);
  };

  const t = (key: string) => {
    if (!translations) return key;
    return getTranslation(translations, key, language);
  };

  useEffect(() => {
    document.documentElement.lang = language;
    const { title, description } = siteMetadata[language];
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    const skipLink = document.querySelector<HTMLAnchorElement>('.skip-link');
    if (skipLink) skipLink.textContent = language === 'de' ? 'Zum Hauptinhalt springen' : 'Skip to main content';
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t, translations, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
