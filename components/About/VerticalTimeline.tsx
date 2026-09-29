'use client';

import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { LuGrab, LuMinus, LuPlus } from 'react-icons/lu';
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
  const dragRef = useRef<{ pointerId: number; startX: number; startScrollLeft: number; active: boolean } | null>(null);
  const scrollRatioRef = useRef(0);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(100);
  const visitorChangedZoomRef = useRef(false);

  const lanesById = useMemo(
    () => new Map(careerTimelineLanes.map((lane) => [lane.id, lane])),
    [],
  );

  const updateOverflow = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    setHasOverflow(viewport.scrollWidth > viewport.clientWidth + 1);
  }, []);

  useLayoutEffect(() => {
    const phoneWidth = window.matchMedia('(max-width: 600px)');
    const setStartingZoom = () => {
      if (!visitorChangedZoomRef.current) setZoom(phoneWidth.matches ? 75 : 100);
    };

    setStartingZoom();
    phoneWidth.addEventListener('change', setStartingZoom);
    return () => phoneWidth.removeEventListener('change', setStartingZoom);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    viewport.scrollLeft = 0;
    updateOverflow();

    const resizeObserver = new ResizeObserver(updateOverflow);
    resizeObserver.observe(viewport);
    if (viewport.firstElementChild) resizeObserver.observe(viewport.firstElementChild);
    window.addEventListener('resize', updateOverflow);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateOverflow);
    };
  }, [updateOverflow]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
    viewport.scrollLeft = scrollRatioRef.current * maxScroll;
    updateOverflow();
  }, [zoom, updateOverflow]);

  const changeZoom = (nextZoom: number) => {
    visitorChangedZoomRef.current = true;
    const viewport = viewportRef.current;
    if (viewport) {
      const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      scrollRatioRef.current = maxScroll ? viewport.scrollLeft / maxScroll : 0;
    }
    setZoom(nextZoom);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const startDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    if (!hasOverflow || !event.isPrimary || event.button !== 0 ||
      (event.pointerType !== 'mouse' && event.pointerType !== 'pen')) return;

    const target = event.target;
    if (!(target instanceof Element) || target.closest([
      `.${styles.verticalEvent}`,
      `.${styles.verticalYearMarker}`,
      `.${styles.verticalLaneLabel}`,
      'a', 'button', '[contenteditable]',
    ].join(', '))) return;

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
      active: false,
    };
  };

  const moveDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    if (!(event.buttons & 1)) {
      dragRef.current = null;
      setIsDragging(false);
      return;
    }

    const distance = event.clientX - drag.startX;
    if (!drag.active && Math.abs(distance) < 5) return;

    if (!drag.active) {
      drag.active = true;
      event.currentTarget.setPointerCapture(event.pointerId);
      setIsDragging(true);
    }
    event.preventDefault();
    event.currentTarget.scrollLeft = drag.startScrollLeft - distance;
  };

  const leaveDrag = () => {
    if (!dragRef.current?.active) dragRef.current = null;
  };

  return (
    <div className={styles.verticalTimelineShell}>
      <div className={styles.timelineToolbar}>
        {hasOverflow && (
          <div className={styles.timelineDragHint}>
            <LuGrab aria-hidden="true" />
            <span>{t('about.timeline.dragHint')}</span>
          </div>
        )}
        <div className={styles.timelineZoomControls} role="group" aria-label={t('about.timeline.zoomControls')}>
          <button type="button" onClick={() => changeZoom(Math.max(75, zoom - 25))} disabled={zoom === 75} aria-label={t('about.timeline.zoomOut')}>
            <LuMinus aria-hidden="true" />
          </button>
          <output aria-live="polite">{zoom}%</output>
          <button type="button" onClick={() => changeZoom(Math.min(125, zoom + 25))} disabled={zoom === 125} aria-label={t('about.timeline.zoomIn')}>
            <LuPlus aria-hidden="true" />
          </button>
        </div>
      </div>
      <div
        ref={viewportRef}
        className={`${styles.verticalTimelineViewport} ${hasOverflow ? styles.verticalTimelineDraggable : ''} ${isDragging ? styles.verticalTimelineDragging : ''}`}
        role="region"
        aria-label={t('about.timeline.heading')}
        tabIndex={0}
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerLeave={leaveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
      >
        <div className={styles.verticalTimeline} style={{ '--timeline-zoom': zoom / 100 } as CSSProperties}>
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
    </div>
  );
}
