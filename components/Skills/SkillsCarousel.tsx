'use client';

import React from 'react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { useCarousel } from '@/hooks/useCarousel';
import { useLanguage } from '@/hooks/useLanguage';
import styles from './Skills.module.css';

interface SkillsCarouselProps {
  children: React.ReactNode;
  dots?: number[];
}

export default function SkillsCarousel({ children, dots }: SkillsCarouselProps) {
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
    handlePointerDown,
    handleDragStart,
    handleClickCapture,
  } = useCarousel(items, { duration: 280, snapDuration: 300 });

  const getDotLabel = (index: number): string => {
    if (index === 0) return 'Frontend';
    if (index === 1) return 'Backend';
    return 'Tools';
  };

  return (
    <>
      <div className={styles.carouselWrapper}>
        <div
          id="skills-carousel"
          ref={containerRef}
          className={styles.carouselContainer}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onPointerDown={handlePointerDown}
          onDragStart={handleDragStart}
          onClickCapture={handleClickCapture}
        >
          <div className={styles.containers}>
            {items.map((item, index) => (
              <div key={index} className={`${styles.detailsCard} carousel-item`}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      {dots && dots.length > 0 && (
        <div className={styles.carouselNavigation}>
          <button
            type="button"
            className={styles.carouselArrow}
            onClick={() => scroll('left')}
            disabled={currentIndex === 0}
            aria-label={t('skills.previousCard')}
            aria-controls="skills-carousel"
          >
            <LuChevronLeft aria-hidden="true" />
          </button>
          <div className={styles.dots} aria-label="Skills carousel navigation">
            {dots.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => scrollToIndex(index)}
                aria-label={`Show ${getDotLabel(index)} Development`}
                data-index={index}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.carouselArrow}
            onClick={() => scroll('right')}
            disabled={currentIndex === items.length - 1}
            aria-label={t('skills.nextCard')}
            aria-controls="skills-carousel"
          >
            <LuChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
}
