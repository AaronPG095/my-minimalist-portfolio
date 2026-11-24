'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import VerticalTimeline from './VerticalTimeline';
import styles from './About.module.css';

/**
 * Calculates the number of years between a start date and today, rounded to the nearest whole number.
 */
function calculateYears(startDate: Date): number {
  const today = new Date();
  const diffTime = today.getTime() - startDate.getTime();
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25); // Account for leap years
  return Math.round(diffYears);
}

/**
 * Extracts time unit and category from text like "3 Years Frontend" or "3 Jahre Frontend"
 * Returns data formatted as "Category - Number Time"
 */
function parseExperienceText(text: string): { 
  timeUnit: string; 
  category: string;
} {
  // Match pattern: "3 Years Frontend" or "1 Year Backend"
  // Format: number + time unit + category
  const match = text.match(/^(?:\d+(?:\.\d+)?\s+)?(Years|Year|Months|Month|Jahre|Jahr|Monate|Monat)\s+(.+)$/i);
  if (match) {
    return {
      timeUnit: match[1],
      category: match[2].trim(),
    };
  }
  
  // Fallback: try to extract time unit and category
  const timeUnitMatch = text.match(/(Years|Year|Months|Month|Jahre|Jahr|Monate|Monat)/i);
  if (timeUnitMatch) {
    const timeUnit = timeUnitMatch[1];
    const parts = text.split(timeUnit);
    const category = parts[1]?.trim() || 'Experience';
    return {
      timeUnit,
      category,
    };
  }
  
  // Fallback: no time unit found
  return { timeUnit: 'Years', category: text };
}

export default function About() {
  const { language, t } = useLanguage();
  
  // Intersection observers for both cards
  const [experienceCardRef, , hasExperienceIntersected] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
  });

  const [educationCardRef, , hasEducationIntersected] = useIntersectionObserver({
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px',
  });

  // Parse experience text to extract time units and categories
  const experienceYearsText = t('about.experienceYears');
  const experienceMonthsText = t('about.experienceMonths');
  
  const yearsData = parseExperienceText(experienceYearsText);
  const monthsData = parseExperienceText(experienceMonthsText);

  // Calculate years dynamically from start dates
  // Using Date(year, monthIndex, day) to avoid timezone issues
  // monthIndex: 0 = January, so 0 = January 1st
  const frontendStartDate = new Date(2023, 0, 1); // January 1, 2023
  const backendStartDate = new Date(2025, 0, 1); // January 1, 2025
  
  const frontendYears = calculateYears(frontendStartDate);
  const backendYears = calculateYears(backendStartDate);

  return (
    <section id="about" className={styles.about} aria-label={language === 'de' ? 'Über mich' : 'About section'}>
      <div className={styles.titleContainer}>
        <div className={styles.titleText}>
          <p className={styles.subtitle}>{t('about.subtitle')}</p>
          <h1 className={styles.title}>{t('about.title')}</h1>
        </div>
      </div>
      <div className={styles.detailsContainer}>
        <div className={styles.containers}>
          <div 
            ref={experienceCardRef as React.RefObject<HTMLDivElement>}
            className={styles.detailsCard}
          >
            <Image
              src="/assets/experience.png"
              alt=""
              className={`${styles.icon} ${hasExperienceIntersected ? styles.iconAnimated : styles.iconInitial} ${styles.iconDelay1}`}
              width={32}
              height={32}
              quality={90}
              sizes="32px"
              aria-hidden="true"
            />
            <h3>{t('about.experience')}</h3>
            <p className={styles.counterText}>
              <span>{yearsData.category} </span>
              <span className={styles.counterNumber} aria-label={`${frontendYears} ${yearsData.timeUnit} ${yearsData.category}`}>
                {frontendYears}
              </span>
              <span> {yearsData.timeUnit}</span>
            </p>
            <p className={styles.counterText}>
              <span>{monthsData.category} </span>
              <span className={styles.counterNumber} aria-label={`${backendYears} ${monthsData.timeUnit} ${monthsData.category}`}>
                {backendYears}
              </span>
              <span> {monthsData.timeUnit}</span>
            </p>
          </div>
          <div 
            ref={educationCardRef as React.RefObject<HTMLDivElement>}
            className={styles.detailsCard}
          >
            <Image
              src="/assets/education.png"
              alt=""
              className={`${styles.icon} ${hasEducationIntersected ? styles.iconAnimated : styles.iconInitial} ${styles.iconDelay2}`}
              width={32}
              height={32}
              quality={90}
              sizes="32px"
              aria-hidden="true"
            />
            <h3>{t('about.education')}</h3>
            <p>
              <a
                href="https://digitalcareerinstitute.org/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={language === 'de' ? 'Website des DCI-Bootcamps öffnen' : 'Visit DCI Bootcamp website'}
              >
                {t('about.education1')}
              </a>
              <br />
              {t('about.education2')}
            </p>
          </div>
        </div>
        <div className={styles.textContainer}>
          <div className={styles.textContent}>
            <p>{t('about.description1')}</p>
            <p>{t('about.description2')}</p>
          </div>
        </div>
      </div>
      <div className={styles.timelineSection}>
        <h2 className={styles.timelineHeading}>{t('about.timeline.heading')}</h2>
        <p className={styles.timelineSubtitle}>{t('about.timeline.subtitle')}</p>
        <div className={styles.timelineWrapper}>
          <VerticalTimeline />
        </div>
      </div>
    </section>
  );
}
