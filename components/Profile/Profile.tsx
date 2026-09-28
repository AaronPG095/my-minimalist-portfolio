'use client';

import OptimizedImage from '@/components/ui/OptimizedImage';
import { useLanguage } from '@/hooks/useLanguage';
import { careerContent } from '@/data/career-content';
import styles from './Profile.module.css';

export default function Profile() {
  const { t, language } = useLanguage();
  const nameText = t('profile.name');
  const titleText = t('profile.title');
  const cvFile = language === 'de' ? '/assets/Aaron_Greyling_CV_Technical_DE.pdf' : '/assets/Aaron_Greyling_CV_Technical_EN.pdf';

  const handleContactClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const targetPosition = contactSection.offsetTop - headerHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="profile" className={styles.profile} aria-label={language === 'de' ? 'Profil' : 'Profile'}>
      <div className={styles.picContainer}>
        <OptimizedImage
          src="/assets/aaron-greyling-portrait.jpg"
          alt="Aaron Greyling"
          className={styles.profilePic}
          width={400}
          height={533}
          quality={90}
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
      </div>
      <div className={styles.text}>
        <p className={styles.textP1}>{t('profile.greeting')}</p>
        <h1 className={styles.title}>{nameText}</h1>
        <p className={styles.textP2}>{titleText}</p>
        <p className={styles.summary}>{careerContent[language].profileSummary}</p>
        <div className={styles.btnContainer}>
          <button
            className={`${styles.btn} ${styles.btnColor1}`}
            onClick={handleContactClick}
          >
            {t('profile.contactInfo')}
          </button>
          <a className={`${styles.btn} ${styles.btnColor2}`} href={cvFile} target="_blank" rel="noopener noreferrer" aria-label={language === 'de' ? 'Technischen Lebenslauf auf Deutsch öffnen' : 'Open technical CV in English'}>
            {t('profile.downloadCV')}
          </a>
        </div>
        <div id="socials-container" className={styles.socialsContainer}>
          <a
            href="https://linkedin.com/in/aaron-paul-greyling-54a8a954"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn profile"
            className={styles.socialLink}
            data-tooltip="LinkedIn"
          >
            <OptimizedImage
              src="/assets/linkedin.png"
              alt="LinkedIn icon"
              className={styles.icon}
              width={32}
              height={32}
              quality={90}
              sizes="32px"
            />
          </a>
          <a
            href="https://github.com/AaronPG095"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit GitHub profile"
            className={styles.socialLink}
            data-tooltip="GitHub"
          >
            <OptimizedImage
              src="/assets/github.png"
              alt="GitHub icon"
              className={styles.icon}
              width={32}
              height={32}
              quality={90}
              sizes="32px"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
