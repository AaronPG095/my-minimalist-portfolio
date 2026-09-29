'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { useCarousel } from '@/hooks/useCarousel';
import { useLanguage } from '@/hooks/useLanguage';
import styles from './Projects.module.css';

interface ProjectsCarouselProps {
  children: React.ReactNode;
}

export default function ProjectsCarousel({ children }: ProjectsCarouselProps) {
  const { t } = useLanguage();
  // React.Children.toArray handles both single child and multiple children
  const items = React.Children.toArray(children);
  const {
    containerRef,
    currentIndex,
    scrollToIndex,
    scroll,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
  } = useCarousel(items, { duration: 600, snapDuration: 300 });

  useEffect(() => {
    const handleMouseMoveGlobal = (e: Event) => {
      // DOM MouseEvent from addEventListener - handleMouseMove accepts both DOM and React events
      if (e instanceof MouseEvent) {
        handleMouseMove(e);
      }
    };
    const handleMouseUpGlobal = () => handleMouseUp();

    if (containerRef.current) {
      document.addEventListener('mousemove', handleMouseMoveGlobal);
      document.addEventListener('mouseup', handleMouseUpGlobal);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMoveGlobal);
      document.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, [containerRef, handleMouseMove, handleMouseUp]);

  // Function to center the first project
  const centerFirstProject = useCallback(() => {
    if (!containerRef.current || items.length === 0) return;
    
    // Find projects container - it's the direct child div
    const projectsContainer = containerRef.current.firstElementChild;
    const firstProject = containerRef.current.querySelector('.carousel-item') as HTMLElement;
    
    if (firstProject && projectsContainer) {
      const containerWidth = containerRef.current.clientWidth;
      // offsetLeft is relative to projects-container (not carousel-container)
      const projectLeft = firstProject.offsetLeft;
      const projectWidth = firstProject.offsetWidth;
      // Calculate scroll position to center the project
      const centerScroll = projectLeft - (containerWidth / 2) + (projectWidth / 2);
      
      containerRef.current.style.scrollBehavior = 'auto';
      containerRef.current.scrollLeft = Math.max(0, centerScroll);
      
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.scrollBehavior = 'smooth';
        }
      }, 0);
    }
  }, [containerRef, items.length]);

  // Center the first project on initial load
  useEffect(() => {
    // Wait for layout to calculate proper widths
    setTimeout(() => {
      centerFirstProject();
    }, 100);
  }, [items.length, centerFirstProject]);

  // Re-center on window resize to handle responsive breakpoints
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        centerFirstProject();
      }, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, [centerFirstProject]);

  return (
    <div className={styles.carouselShell}>
      <div className={styles.carouselWrapper}>
        <div
          id="projects-carousel"
          ref={containerRef}
          className={styles.carouselContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          aria-live="polite"
        >
          <div className={styles.projectsContainer}>
            {items.map((item, index) => (
              <div key={index} className={`${styles.colorContainer} carousel-item`}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      {items.length > 1 && (
        <div className={styles.carouselNavigation}>
          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.carouselArrowPrevious}`}
            onClick={() => scroll('left')}
            disabled={currentIndex === 0}
            aria-label={t('projects.previousProject')}
            aria-controls="projects-carousel"
          >
            <LuChevronLeft aria-hidden="true" />
          </button>
          <div className={styles.dots} id="projects-carousel-dots" aria-label="Projects carousel navigation" role="tablist">
            {items.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => scrollToIndex(index)}
                aria-label={`Show project ${index + 1}`}
                aria-selected={index === currentIndex}
                tabIndex={index === currentIndex ? 0 : -1}
                role="tab"
              />
            ))}
          </div>
          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.carouselArrowNext}`}
            onClick={() => scroll('right')}
            disabled={currentIndex === items.length - 1}
            aria-label={t('projects.nextProject')}
            aria-controls="projects-carousel"
          >
            <LuChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
