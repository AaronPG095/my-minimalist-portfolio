'use client';

import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import ApgMonogram from './ApgMonogram';
import styles from './Header.module.css';

interface MobileNavProps {
  onMenuToggle: () => void;
  isOpen: boolean;
}

export default function MobileNav({ onMenuToggle, isOpen }: MobileNavProps) {
  const { language } = useLanguage();
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <nav className={styles.mobileNav} role="navigation" aria-label="Mobile navigation">
      <Link 
        href="#" 
        className={styles.logo} 
        aria-label={language === 'de' ? 'Zum Seitenanfang' : 'Go to top of page'}
        onClick={handleLogoClick}
      >
        <ApgMonogram />
        Aaron Paul Greyling
      </Link>
      <button
        className={`${styles.hamburgerIcon} ${isOpen ? styles.open : ''}`}
        onClick={onMenuToggle}
        aria-label={language === 'de' ? 'Menü öffnen oder schließen' : 'Toggle menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
      >
        <svg className={styles.hamburgerSvg} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor">
          <path className={`${styles.hamburgerLine} ${styles.line1}`} d="M120-680v-80h720v80H120Z"/>
          <path className={`${styles.hamburgerLine} ${styles.line2}`} d="M120-200v-80h720v80H120Z"/>
          <path className={`${styles.hamburgerLine} ${styles.line3}`} d="M120-440v-80h720v80H120Z"/>
        </svg>
      </button>
    </nav>
  );
}
