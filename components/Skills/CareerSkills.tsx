'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { careerContent } from '@/data/career-content';
import styles from './CareerSkills.module.css';

export default function CareerSkills() {
  const { language } = useLanguage();
  const content = careerContent[language].skills;

  return (
    <section id="skills" className={styles.skills} aria-labelledby="skills-title">
      <p className={styles.subtitle}>{content.subtitle}</p>
      <h2 id="skills-title" className={styles.title}>{content.title}</h2>
      <div className={styles.groups}>
        {content.groups.map((group) => (
          <article className={styles.group} key={group.title}>
            <h3>{group.title}</h3>
            <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
          </article>
        ))}
      </div>
    </section>
  );
}
