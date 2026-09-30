'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/hooks/useLanguage';
import type { Project } from '@/types';
import { FaTimes, FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { getTechColor, getTechIcon } from '@/data/technology-icons';
import styles from './ProjectModal.module.css';
import projectStyles from '../Projects/Projects.module.css';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

export default function ProjectModal({ project, isOpen, onClose, onPrevious, onNext }: ProjectModalProps) {
  const { language, t } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        onPrevious();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        onNext();
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (!modalRef.current.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose, onPrevious, onNext]);

  // Handle click outside modal to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen || !project) {
    return null;
  }

  const projectLink = language === 'de' && project.liveDemoDe
    ? project.liveDemoDe
    : project.liveDemo;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={handleOverlayClick}
      aria-modal="true"
      aria-labelledby="modal-title"
      role="dialog"
    >
      <div ref={modalRef} className={styles.modal}>
        <button
          ref={closeButtonRef}
          className={styles.closeButton}
          onClick={onClose}
          aria-label={language === 'de' ? 'Projektfenster schließen' : 'Close modal'}
        >
          <FaTimes aria-hidden="true" />
        </button>
        <div className={styles.modalNavigation}>
          <button type="button" className={styles.navigationButton} onClick={onPrevious} aria-label={t('projects.previousProject')}>
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button type="button" className={styles.navigationButton} onClick={onNext} aria-label={t('projects.nextProject')}>
            <FaChevronRight aria-hidden="true" />
          </button>
        </div>

        <div className={styles.modalContent}>
          <div className={styles.imageSection}>
            <Image
              src={language === 'de' && project.imageDe ? project.imageDe : project.image}
              alt={language === 'de' ? `Screenshot des Projekts ${t(project.titleKey)}` : `${t(project.titleKey)} project screenshot`}
              className={styles.modalImage}
              width={800}
              height={600}
              quality={90}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 800px"
              priority
            />
          </div>

          <div className={styles.contentSection}>
            <h2 id="modal-title" className={styles.modalTitle}>
              {project.icon && <Image src={project.icon} alt="" className={styles.modalProjectIcon} width={44} height={44} />}
              <span>{t(project.titleKey)}</span>
            </h2>

            <section className={styles.summarySection} aria-label={language === 'de' ? 'Projektbeschreibung' : 'Project summary'}>
              <h3 className={styles.summaryTitle}>{t('projects.projectSummary')}</h3>
              <p className={styles.summaryText}>{t(project.descriptionKey)}</p>
            </section>

            {project.technologies && project.technologies.length > 0 && (
              <div className={styles.techSection}>
                <h3 className={styles.techSectionTitle}>{t('projects.technologies')}</h3>
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
              </div>
            )}

            <div className={styles.linksSection}>
              {project.github && (
                <a
                  className={`${projectStyles.btn} ${projectStyles.projectBtn} ${styles.linkButton}`}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={language === 'de' ? `Projekt ${t(project.titleKey)} auf GitHub ansehen` : `View ${t(project.titleKey)} project on GitHub`}
                >
                  <FaGithub aria-hidden="true" />
                  <span>{t('projects.github')}</span>
                </a>
              )}
              {projectLink && (
                <a
                  className={`${projectStyles.btn} ${projectStyles.projectBtn} ${styles.linkButton}`}
                  href={projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${t(project.liveDemoLabelKey ?? 'projects.liveDemo')}: ${t(project.titleKey)}`}
                >
                  <FaExternalLinkAlt aria-hidden="true" />
                  <span>{t(project.liveDemoLabelKey ?? 'projects.liveDemo')}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
