'use client';

import { useState } from 'react';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { useLanguage } from '@/hooks/useLanguage';
import ProjectsCarousel from './ProjectsCarousel';
import ProjectModal from '../ProjectModal/ProjectModal';
import styles from './Projects.module.css';
import type { Project } from '@/types';
import { getTechColor, getTechIcon } from '@/data/technology-icons';

const projects: Project[] = [
  {
    id: 6,
    image: '/assets/fluent-studio-hero-en.webp',
    imageDe: '/assets/fluent-studio-hero-de.webp',
    titleKey: 'projects.fluentStudio.title',
    descriptionKey: 'projects.fluentStudio.description',
    modalDescriptionKey: 'projects.fluentStudio.description',
    liveDemo: 'https://www.fluent-studio.com/en',
    liveDemoDe: 'https://www.fluent-studio.com/de',
    liveDemoLabelKey: 'projects.visitWebsite',
    technologies: [
      'Next.js',
      'React.js',
      'TypeScript',
      'Supabase',
      'Tailwind',
      'PostgreSQL',
      'Vitest',
      'Playwright',
      'Codex',
      'Claude Code',
      'Cursor',
    ],
  },
  {
    id: 7,
    image: '/assets/fluentoverlay-project.png',
    titleKey: 'projects.fluentOverlay.title',
    descriptionKey: 'projects.fluentOverlay.description',
    modalDescriptionKey: 'projects.fluentOverlay.description',
    liveDemo: 'https://www.fluent-studio.com/en/fluentoverlay',
    liveDemoDe: 'https://www.fluent-studio.com/de/fluentoverlay',
    liveDemoLabelKey: 'projects.viewProductPage',
    technologies: [
      'C#',
      'WinUI 3',
      '.NET 10',
      'XAML',
      'Visual Studio',
      'MCP',
      'Codex',
      'Claude Code',
      'Cursor',
    ],
  },
  {
    id: 5,
    image: '/assets/Screenshot 2025-11-12 203334.png',
    titleKey: 'projects.project5.title',
    descriptionKey: 'projects.project5.description',
    modalDescriptionKey: 'projects.project5.description',
    github: 'https://github.com/AaronPG095/kollektiv-spinnen-website',
    liveDemo: 'https://kollektiv-spinnen-festival.vercel.app/',
    technologies: ['React.js', 'TypeScript', 'Tailwind', 'Supabase', 'PostgreSQL'],
  },
  {
    id: 1,
    image: '/assets/Screenshot 2024-05-08 140820.png',
    titleKey: 'projects.project1.title',
    descriptionKey: 'projects.project1.description',
    modalDescriptionKey: 'projects.project1.description',
    github: 'https://github.com/AaronPG095/my-minimalist-portfolio',
    liveDemo: 'https://aaronpaulgreyling.netlify.app/',
    technologies: ['Next.js', 'React.js', 'TypeScript', 'CSS'],
  },
  {
    id: 4,
    image: '/assets/Screenshot 2024-05-23 211320.png',
    titleKey: 'projects.project4.title',
    descriptionKey: 'projects.project4.description',
    modalDescriptionKey: 'projects.project4.description',
    github: 'https://github.com/AaronPG095/brainwave',
    liveDemo: 'https://braynewave.netlify.app/',
    technologies: ['HTML', 'Tailwind', 'JavaScript', 'React.js'],
  },
  {
    id: 2,
    image: '/assets/project-2.png',
    titleKey: 'projects.project2.title',
    descriptionKey: 'projects.project2.description',
    modalDescriptionKey: 'projects.project2.description',
    github: 'https://github.com/AaronPG095/BohemianKidsFrontEnd',
    technologies: ['SCSS', 'React.js', 'Node.js', 'MongoDB', 'Express.js'],
  },
  {
    id: 3,
    image: '/assets/Screenshot 2024-05-08 152922.png',
    titleKey: 'projects.project3.title',
    descriptionKey: 'projects.project3.description',
    modalDescriptionKey: 'projects.project3.description',
    github: 'https://github.com/AaronPG095/React-Ecommerce-Project?tab=readme-ov-file',
    liveDemo: 'https://sunnyeyles.github.io/React-Ecommerce-Project/',
    technologies: ['HTML', 'SCSS', 'JavaScript', 'React.js'],
  },
];

export default function Projects() {
  const { language, t } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProjectLink = (url: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Small delay to allow animation to complete before clearing project
    setTimeout(() => {
      setSelectedProject(null);
    }, 300);
  };

  const getProjectLink = (project: Project) =>
    language === 'de' && project.liveDemoDe ? project.liveDemoDe : project.liveDemo;

  const projectCards = projects.map((project) => (
    <div 
      key={project.id} 
      className={styles.projectCard}
      onClick={() => handleProjectClick(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleProjectClick(project);
        }
      }}
      aria-label={language === 'de' ? `Details zum Projekt ${t(project.titleKey)} anzeigen` : `View details for ${t(project.titleKey)} project`}
    >
      <div className={styles.articleContainer}>
        <OptimizedImage
          src={language === 'de' && project.imageDe ? project.imageDe : project.image}
          alt={language === 'de' ? `Screenshot des Projekts ${t(project.titleKey)}` : `${t(project.titleKey)} project screenshot`}
          className={styles.projectImg}
          width={500}
          height={400}
          quality={85}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 500px"
        />
      </div>
      <h2 className={styles.projectTitle}>{t(project.titleKey)}</h2>
      {project.technologies && project.technologies.length > 0 && (
        <div className={styles.techTags}>
          {project.technologies.map((tech, index) => {
            const TechIcon = getTechIcon(tech);
            return (
              <span key={index} className={styles.techTag}>
                <TechIcon
                  className={styles.techIcon}
                  style={{ color: getTechColor(tech) }}
                  aria-hidden="true"
                />
                {tech}
              </span>
            );
          })}
        </div>
      )}
      <div className={styles.btnContainer}>
        {project.github && (
          <button
            className={`${styles.btn} ${styles.projectBtn}`}
            onClick={(e) => openProjectLink(project.github!, e)}
            aria-label={language === 'de' ? `Projekt ${t(project.titleKey)} auf GitHub ansehen` : `View ${t(project.titleKey)} project on GitHub`}
          >
            {t('projects.github')}
          </button>
        )}
        {getProjectLink(project) && (
          <button
            className={`${styles.btn} ${styles.projectBtn}`}
            onClick={(e) => openProjectLink(getProjectLink(project)!, e)}
            aria-label={`${t(project.liveDemoLabelKey ?? 'projects.liveDemo')}: ${t(project.titleKey)}`}
          >
            {t(project.liveDemoLabelKey ?? 'projects.liveDemo')}
          </button>
        )}
      </div>
    </div>
  ));

  return (
    <>
      <section id="projects" className={styles.projects} aria-label={language === 'de' ? 'Projekte' : 'Projects section'}>
        <p className={styles.subtitle}>{t('projects.subtitle')}</p>
        <h1 className={styles.title}>{t('projects.title')}</h1>
        <div className={styles.detailsContainer}>
          <ProjectsCarousel>{projectCards}</ProjectsCarousel>
        </div>
      </section>
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
