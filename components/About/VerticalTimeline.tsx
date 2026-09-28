'use client';

import React from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import {
  careerTimelineEvents,
  careerTimelineLanes,
  CareerLaneId,
} from '@/data/career-timeline';
import styles from './About.module.css';

const laneClassNames: Record<CareerLaneId, string> = {
  'chef-work': styles.verticalLaneChef,
  'software-education': styles.verticalLaneEducation,
  'software-experience': styles.verticalLaneExperience,
};

const labelClassNames: Record<CareerLaneId, string> = {
  'chef-work': styles.verticalLabelRight,
  'software-education': styles.verticalLabelRight,
  'software-experience': styles.verticalLabelLeft,
};

export default function VerticalTimeline() {
  const { t } = useLanguage();

  return (
    <div className={styles.verticalTimeline} aria-label={t('about.timeline.heading')}>
      <div className={styles.verticalTimelineLabels} aria-hidden="true">
        {careerTimelineLanes.map((lane) => (
          <span key={lane.id} className={laneClassNames[lane.id]}>
            {t(lane.labelKey)}
          </span>
        ))}
      </div>

      <div className={styles.verticalTimelinePlot}>
        <div className={styles.verticalYearMarkers} aria-hidden="true">
          <span style={{ '--marker-position': '8%' } as React.CSSProperties}>
            {t('about.timeline.markers.startYear')}
          </span>
          <span style={{ '--marker-position': '39%' } as React.CSSProperties}>2023</span>
          <span style={{ '--marker-position': '72%' } as React.CSSProperties}>
            {t('about.timeline.markers.year2026')}
          </span>
          <span style={{ '--marker-position': '82%' } as React.CSSProperties}>
            {t('about.timeline.markers.future').replace('→', '↓')}
          </span>
        </div>

        <div className={styles.verticalTracks} aria-hidden="true">
          {careerTimelineLanes.map((lane) => (
            <React.Fragment key={lane.id}>
              <span
                className={`${styles.verticalTrack} ${styles.verticalTrackSolid} ${laneClassNames[lane.id]}`}
                style={{
                  '--track-start': `${lane.start}%`,
                  '--track-end': `${lane.currentEnd}%`,
                } as React.CSSProperties}
              />
              {lane.id !== 'chef-work' && (
                <span
                  className={`${styles.verticalTrack} ${styles.verticalTrackFuture} ${laneClassNames[lane.id]}`}
                  style={{ '--track-start': `${lane.currentEnd}%` } as React.CSSProperties}
                />
              )}
            </React.Fragment>
          ))}
          <span className={`${styles.verticalConnector} ${styles.verticalConnector2022}`} />
          <span className={`${styles.verticalConnector} ${styles.verticalConnector2023}`} />
        </div>

        <ol className={styles.verticalEventList}>
          {careerTimelineEvents.map((event) => (
            <li
              key={event.id}
              data-event-id={event.id}
              className={`${styles.verticalEvent} ${laneClassNames[event.lane]} ${labelClassNames[event.lane]} ${event.future ? styles.verticalEventFuture : ''} ${event.transitionTo ? styles.verticalEventTransition : ''}`}
              style={{ '--event-position': `${event.position}%` } as React.CSSProperties}
            >
              <span className={styles.verticalEventDot} aria-hidden="true" />
              <span className={styles.verticalEventContent}>
                <strong>{t(event.titleKey)}</strong>
                {event.descriptionKey && <small>{t(event.descriptionKey)}</small>}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
