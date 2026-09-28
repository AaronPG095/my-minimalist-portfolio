'use client';

import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import { careerContent } from '@/data/career-content';
import styles from './CareerProjects.module.css';

export default function CareerProjects() {
  const { language } = useLanguage();
  const content = careerContent[language].projects;

  return (
    <section id="projects" className={styles.projects} aria-labelledby="projects-title">
      <p className={styles.subtitle}>{content.subtitle}</p>
      <h2 id="projects-title" className={styles.title}>{content.title}</h2>
      <div className={styles.grid}>
        {content.items.map((project) => (
          <article className={styles.project} key={project.id}>
            <div className={styles.imageWrap}>
              <Image src={project.image} alt="" fill sizes="(max-width: 700px) 100vw, 400px" className={styles.image} />
            </div>
            <div className={styles.body}>
              <p className={styles.category}>{project.category}</p>
              <h3>{project.title}</h3>
              <p className={styles.summary}>{project.summary}</p>
              <p className={styles.contribution}><strong>{content.role}:</strong> {project.contribution}</p>
              <div className={styles.stack} aria-label={content.stack}>
                {project.technologies.map((technology) => <span key={technology}>{technology}</span>)}
              </div>
              <div className={styles.links}>
                {'site' in project && <a href={project.site} target="_blank" rel="noopener noreferrer">{content[project.linkLabel]} <span aria-hidden="true">↗</span></a>}
                {'code' in project && <a href={project.code} target="_blank" rel="noopener noreferrer">{content.viewCode} <span aria-hidden="true">↗</span></a>}
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className={styles.earlier}>
        <h3>{content.earlier}</h3>
        <p>{content.earlierIntro}</p>
        <ul>
          <li><a href="https://github.com/AaronPG095/brainwave" target="_blank" rel="noopener noreferrer">Brainwave ↗</a></li>
          <li><a href="https://github.com/AaronPG095/React-Ecommerce-Project" target="_blank" rel="noopener noreferrer">ASK Online Store ↗</a></li>
        </ul>
      </div>
    </section>
  );
}
