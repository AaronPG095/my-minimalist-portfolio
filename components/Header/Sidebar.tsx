'use client';

import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { useScrollToSection } from '@/hooks/useScrollToSection';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import LanguageToggle from '../LanguageToggle/LanguageToggle';
import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection?: string;
}

export default function Sidebar({ isOpen, onClose, activeSection = '' }: SidebarProps) {
  const { t, language } = useLanguage();
  const scrollToSection = useScrollToSection();
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { onClose(); return; }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('keydown', handleKeyDown); opener?.focus(); };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onClose();
    // Wait for sidebar close animation to complete (~300ms) before scrolling
    scrollToSection(href, 300);
  };

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.open : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        ref={dialogRef}
        id="mobile-menu"
        className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={t('sidebar.menu')}
      >
        <div className={styles.header}>
          <span className={styles.title}>{t('sidebar.menu')}</span>
          <button ref={closeRef} type="button" className={styles.close} onClick={onClose} aria-label={language === 'de' ? 'Menü schließen' : 'Close menu'}>×</button>
        </div>
        <div className={styles.toggles}>
          <div className={styles.toggleItem}>
            <span className={styles.toggleLabel}>{t('sidebar.language')}</span>
            <LanguageToggle isMobile={true} />
          </div>
          <div className={styles.toggleItem}>
            <span className={styles.toggleLabel}>{t('sidebar.theme')}</span>
            <ThemeToggle />
          </div>
        </div>
        <ul className={styles.links}>
          <li>
            <a
              href="#about"
              onClick={(e) => handleLinkClick(e, '#about')}
              className={activeSection === 'about' ? 'active' : ''}
              aria-current={activeSection === 'about' ? 'page' : undefined}
            >
              {t('nav.about')}
            </a>
          </li>
          <li>
            <a
              href="#skills"
              onClick={(e) => handleLinkClick(e, '#skills')}
              className={activeSection === 'skills' ? 'active' : ''}
              aria-current={activeSection === 'skills' ? 'page' : undefined}
            >
              {t('nav.skills')}
            </a>
          </li>
          <li>
            <a
              href="#projects"
              onClick={(e) => handleLinkClick(e, '#projects')}
              className={activeSection === 'projects' ? 'active' : ''}
              aria-current={activeSection === 'projects' ? 'page' : undefined}
            >
              {t('nav.projects')}
            </a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, '#contact')}
              className={activeSection === 'contact' ? 'active' : ''}
              aria-current={activeSection === 'contact' ? 'page' : undefined}
            >
              {t('nav.contact')}
            </a>
          </li>
        </ul>
      </aside>
    </>
  );
}
