'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { careerContent } from '@/data/career-content';
import styles from './CareerAbout.module.css';

export default function CareerAbout() {
  const { language } = useLanguage();
  const content = careerContent[language].about;

  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <header className={styles.heading}>
        <p className={styles.subtitle}>{content.subtitle}</p>
        <h2 id="about-title" className={styles.title}>{content.title}</h2>
      </header>
      <div className={styles.intro}>
        <p>{content.intro}</p>
        <p>{content.background}</p>
      </div>
      <div className={styles.highlights}>
        <article>
          <h3>{content.experienceTitle}</h3>
          <p>{content.experience}</p>
        </article>
        <article>
          <h3>{content.educationTitle}</h3>
          <p>{content.education}</p>
        </article>
      </div>
      <div className={styles.path}>
        <h3>{content.pathTitle}</h3>
        <ol>
          {content.path.map((step) => (
            <li key={`${step.date}-${step.title}`}>
              <span className={styles.date}>{step.date}</span>
              <div><strong>{step.title}</strong><p>{step.detail}</p></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
