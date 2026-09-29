'use client';

import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  careerTimelineEvents,
  careerTimelineLanes,
  careerTimelineMarkers,
  CareerLaneId,
} from '@/data/career-timeline';
import styles from './About.module.css';

const laneClassNames: Record<CareerLaneId, string> = {
  'chef-work': styles.verticalLaneChef,
  'software-education': styles.verticalLaneEducation,
  'software-experience': styles.verticalLaneExperience,
};

export default function VerticalTimeline() {
  const { t } = useLanguage();
  const viewportRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const lanesById = useMemo(
    () => new Map(careerTimelineLanes.map((lane) => [lane.id, lane])),
    [],
  );

  const updateScrollIndicators = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const maximumScroll = viewport.scrollWidth - viewport.clientWidth;
    setCanScrollLeft(viewport.scrollLeft > 1);
    setCanScrollRight(maximumScroll > 1 && viewport.scrollLeft < maximumScroll - 1);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.scrollLeft = 0;
    updateScrollIndicators();

    const resizeObserver = new ResizeObserver(updateScrollIndicators);
    resizeObserver.observe(viewport);
    window.addEventListener('resize', updateScrollIndicators);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateScrollIndicators);
    };
  }, [updateScrollIndicators]);

  return (
    <div className={styles.verticalTimelineShell}>
      <div
        ref={viewportRef}
        className={styles.verticalTimelineViewport}
        role="region"
        aria-label={t('about.timeline.heading')}
        tabIndex={0}
        onScroll={updateScrollIndicators}
      >
        <div className={styles.verticalTimeline}>
          <div className={styles.verticalTimelinePlot}>
            <div
              className={styles.verticalYearMarkers}
              style={{
                '--timeline-start': `${careerTimelineMarkers[0].position}%`,
                '--timeline-future': `${careerTimelineMarkers.find((marker) => marker.id === 'future')?.position}%`,
                '--timeline-end': `${careerTimelineLanes[0].futureEnd}%`,
              } as CSSProperties}
            >
              {careerTimelineMarkers.map((marker) => {
                const label = marker.labelKey ? t(marker.labelKey) : marker.label;

                return (
                  <span
                    key={marker.id}
                    className={styles.verticalYearMarker}
                    style={{ '--marker-position': `${marker.position}%` } as CSSProperties}
                    role="img"
                    aria-label={label?.replace(/[→↓]/g, '').trim()}
                    tabIndex={0}
                  >
                    <span className={styles.verticalYearLabel}>
                      {label}
                    </span>
                    <span className={styles.verticalYearDot} />
                  </span>
                );
              })}
            </div>

            <div className={styles.verticalTracks} aria-hidden="true">
              {careerTimelineLanes.map((lane) => {
                const laneStyle = {
                  '--lane-position': `${lane.position}%`,
                  '--lane-start': `${lane.start}%`,
                  '--lane-solid-end': `${lane.solidEnd}%`,
                  '--lane-future-end': `${lane.futureEnd}%`,
                } as CSSProperties;

                return (
                  <React.Fragment key={lane.id}>
                    <span
                      className={`${styles.verticalLaneLabel} ${laneClassNames[lane.id]}`}
                      style={laneStyle}
                    >
                      <strong>{t(lane.labelKey)}</strong>
                      {lane.subtitleKey && <small>{t(lane.subtitleKey)}</small>}
                    </span>
                    <span
                      className={`${styles.verticalTrack} ${styles.verticalTrackSolid} ${laneClassNames[lane.id]}`}
                      style={laneStyle}
                    />
                    <span
                      className={`${styles.verticalTrack} ${styles.verticalTrackFuture} ${laneClassNames[lane.id]}`}
                      style={laneStyle}
                    />
                  </React.Fragment>
                );
              })}

              {careerTimelineEvents
                .filter((event) => event.transitionTo)
                .map((event) => {
                  const sourceLane = lanesById.get(event.lane);
                  const targetLane = event.transitionTo
                    ? lanesById.get(event.transitionTo)
                    : undefined;
                  if (!sourceLane || !targetLane) return null;

                  return (
                    <span
                      key={`${event.id}-connector`}
                      className={styles.verticalConnector}
                      style={{
                        '--connector-position': `${event.position}%`,
                        '--connector-start': `${Math.min(sourceLane.position, targetLane.position)}%`,
                        '--connector-width': `${Math.abs(targetLane.position - sourceLane.position)}%`,
                      } as CSSProperties}
                    />
                  );
                })}
            </div>

            <ol className={styles.verticalEventList}>
              {careerTimelineEvents.map((event) => {
                const lane = lanesById.get(event.lane);
                if (!lane) return null;

                const title = t(event.titleKey);
                const description = event.descriptionKey ? t(event.descriptionKey) : undefined;
                const timeContext = event.future
                  ? t('about.timeline.markers.future').replace(/[→↓]/g, '').trim()
                  : event.year;
                const labelSideClass = (event.labelSide ?? lane.labelSide) === 'left'
                  ? styles.verticalLabelLeft
                  : styles.verticalLabelRight;

                return (
                  <li
                    key={event.id}
                    data-event-id={event.id}
                    className={`${styles.verticalEvent} ${laneClassNames[event.lane]} ${labelSideClass} ${event.future ? styles.verticalEventFuture : ''} ${event.transitionTo ? styles.verticalEventTransition : ''}`}
                    style={{
                      '--event-position': `${event.position}%`,
                      '--lane-position': `${lane.position}%`,
                    } as CSSProperties}
                    tabIndex={0}
                    aria-label={[title, description, t(lane.labelKey), timeContext]
                      .filter(Boolean)
                      .join(', ')}
                  >
                    <span className={styles.verticalEventDot} aria-hidden="true" />
                    <span className={styles.verticalEventContent} aria-hidden="true">
                      <strong>{title}</strong>
                      {description && <small>{description}</small>}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      {canScrollLeft && (
        <span
          className={`${styles.timelineScrollHint} ${styles.timelineScrollHintLeft}`}
          aria-hidden="true"
        >
          ‹
        </span>
      )}
      {canScrollRight && (
        <span
          className={`${styles.timelineScrollHint} ${styles.timelineScrollHintRight}`}
          aria-hidden="true"
        >
          ›
        </span>
      )}
    </div>
  );
}
