'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { useKeyboardShortcut } from '@/hooks/useKeyboardShortcuts';
import styles from './LanguageToggle.module.css';

interface LanguageToggleProps {
  isMobile?: boolean;
}

export default function LanguageToggle({ isMobile = false }: LanguageToggleProps) {
  const { language, toggleLanguage, mounted } = useLanguage();

  // Keyboard shortcut: 'L' to toggle language
  useKeyboardShortcut('l', toggleLanguage, mounted);

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.toggle}
        id={isMobile ? 'language-toggle-mobile' : 'language-toggle'}
        aria-label={language === 'en' ? 'Switch to German' : 'Zu Englisch wechseln'}
        type="button"
        onClick={toggleLanguage}
      >
        <span
          className={`${styles.option} ${language === 'en' ? styles.active : ''}`}
          data-lang="en"
        >
          EN
        </span>
        <span className={styles.separator}>/</span>
        <span
          className={`${styles.option} ${language === 'de' ? styles.active : ''}`}
          data-lang="de"
        >
          DE
        </span>
      </button>
    </div>
  );
}
