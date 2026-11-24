'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '@/hooks/useLanguage';
import SkillsCarousel from './SkillsCarousel';
import SkillIcon from './SkillIcon';
import styles from './Skills.module.css';
import type { Skill } from '@/types';
import { IconType } from 'react-icons';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiSass,
  SiReact,
  SiTailwindcss,
  SiFramer,
  SiTypescript,
  SiNextdotjs,
  SiPhp,
  SiLaravel,
  SiMongodb,
  SiNodedotjs,
  SiExpress,
  SiGit,
  SiMysql,
  SiDocker,
  SiDotnet,
  SiPostgresql,
  SiSqlite,
  SiSupabase,
  SiVitest,
  SiGithub,
  SiGithubactions,
  SiClaude,
  SiOpenai,
  SiSharp,
} from 'react-icons/si';
import { FaCode, FaProjectDiagram } from 'react-icons/fa';
import { TbBrandVisualStudio, TbBrandWindows, TbPlugConnected } from 'react-icons/tb';

const frontendSkills: Skill[] = [
  { name: 'HTML' },
  { name: 'CSS' },
  { name: 'JavaScript' },
  { name: 'TypeScript' },
  { name: 'React.js' },
  { name: 'Next.js' },
  { name: 'Tailwind' },
  { name: 'SASS' },
  { name: 'Framer' },
];

const backendSkills: Skill[] = [
  { name: 'Node.js' },
  { name: 'Express.js' },
  { name: 'PostgreSQL' },
  { name: 'SQLite' },
  { name: 'Supabase' },
  { name: 'MySQL' },
  { name: 'MongoDB' },
  { name: 'APIs' },
  { name: 'PHP' },
  { name: 'Laravel' },
];

const toolsSkills: Skill[] = [
  { name: 'C#' },
  { name: '.NET 10' },
  { name: 'WPF' },
  { name: 'WinUI 3' },
  { name: 'Visual Studio' },
  { name: 'Git' },
  { name: 'GitHub' },
  { name: 'GitHub Actions' },
  { name: 'Docker' },
  { name: 'Vitest' },
  { name: 'MCP' },
  { name: 'Claude Code' },
  { name: 'Codex' },
  { name: 'Cursor' },
  { name: 'Prompt Engineering' },
  { name: 'SPRINT' },
  { name: 'Project Management' },
];

const skillIconMap: Record<string, IconType> = {
  HTML: SiHtml5,
  CSS: SiCss3,
  JavaScript: SiJavascript,
  SASS: SiSass,
  'React.js': SiReact,
  Tailwind: SiTailwindcss,
  Framer: SiFramer,
  TypeScript: SiTypescript,
  'Next.js': SiNextdotjs,
  PHP: SiPhp,
  Laravel: SiLaravel,
  MongoDB: SiMongodb,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  Git: SiGit,
  MySQL: SiMysql,
  APIs: FaCode,
  PostgreSQL: SiPostgresql,
  SQLite: SiSqlite,
  Supabase: SiSupabase,
  Docker: SiDocker,
  MCP: TbPlugConnected,
  'Prompt Engineering': FaCode,
  SPRINT: FaProjectDiagram,
  'Project Management': FaProjectDiagram,
  'Visual Studio': TbBrandVisualStudio,
  WPF: TbBrandWindows,
  'WinUI 3': TbBrandWindows,
  '.NET 10': SiDotnet,
  'C#': SiSharp,
  Vitest: SiVitest,
  GitHub: SiGithub,
  'GitHub Actions': SiGithubactions,
  'Claude Code': SiClaude,
  Codex: SiOpenai,
};

const skillCustomIconMap: Record<string, string> = {
  Cursor: 'cursor',
};

const skillDarkColorMap: Record<string, string> = {
  Cursor: '#FFFFFF',
};

const skillColorMap: Record<string, string> = {
  HTML: '#E34F26',
  CSS: '#1572B6',
  JavaScript: '#F7DF1E',
  SASS: '#CC6699',
  'React.js': '#61DAFB',
  Tailwind: '#38BDF8',
  Framer: '#E11D48',
  TypeScript: '#3178C6',
  'Next.js': '#000000',
  PHP: '#777BB4',
  Laravel: '#FF2D20',
  MongoDB: '#47A248',
  'Node.js': '#339933',
  'Express.js': '#000000',
  Git: '#F05032',
  MySQL: '#00758F',
  APIs: '#6366F1',
  PostgreSQL: '#4169E1',
  SQLite: '#003B57',
  Supabase: '#3ECF8E',
  Docker: '#0DB7ED',
  Cursor: '#000000',
  MCP: '#22C55E',
  'Prompt Engineering': '#A855F7',
  SPRINT: '#EC4899',
  'Project Management': '#F97316',
  'Visual Studio': '#5C2D91',
  WPF: '#0078D4',
  'WinUI 3': '#0078D4',
  '.NET 10': '#512BD4',
  'C#': '#512BD4',
  Vitest: '#6E9F18',
  GitHub: '#181717',
  'GitHub Actions': '#2088FF',
  'Claude Code': '#D97757',
  Codex: '#10A37F',
};

function getSkillIconComponent(skillName: string): IconType | undefined {
  if (skillName in skillIconMap) return skillIconMap[skillName];
  if (skillName in skillCustomIconMap) return undefined;
  return FaCode;
}

function getSkillCustomIcon(skillName: string): string | undefined {
  return skillCustomIconMap[skillName];
}

function getSkillColor(skillName: string): string {
  return skillColorMap[skillName] || 'var(--color-accent, #6366f1)';
}

function getSkillDarkColor(skillName: string): string | undefined {
  return skillDarkColorMap[skillName];
}

interface TooltipState {
  skillName: string;
  text: string;
  x: number;
  y: number;
  pinned: boolean;
}

interface SkillCardProps {
  title: string;
  skills: Skill[];
  activeSkillName: string | null;
  onTooltipShow: (skillName: string, text: string, x: number, y: number, pinned: boolean) => void;
  onTooltipHide: (force?: boolean) => void;
}

function SkillCard({
  title,
  skills,
  activeSkillName,
  onTooltipShow,
  onTooltipHide,
}: SkillCardProps) {
  const { translations, language } = useLanguage();
  const chipRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const getTooltipPosition = (skillName: string) => {
    const element = chipRefs.current.get(skillName);
    if (!element) return null;
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    };
  };

  const currentLangTranslations = translations?.[language];
  const descriptions = (currentLangTranslations as Record<string, any>)?.skills?.descriptions as
    | Record<string, string>
    | undefined;

  return (
    <div className={styles.skillCard}>
      <h2 className={styles.subTitle}>{title}</h2>
      <div className={styles.articleContainer}>
        {skills.map((skill) => {
          const iconComponent = getSkillIconComponent(skill.name);
          const customIcon = getSkillCustomIcon(skill.name);
          const fallbackComponent = !iconComponent && !customIcon ? FaCode : undefined;
          const tooltipText =
            descriptions && typeof descriptions === 'object' && skill.name in descriptions
              ? descriptions[skill.name]
              : '';
          const isActive = activeSkillName === skill.name;

          return (
            <button
              key={skill.name}
              type="button"
              ref={(el) => {
                if (el) chipRefs.current.set(skill.name, el);
                else chipRefs.current.delete(skill.name);
              }}
              className={`${styles.skillChip} ${isActive ? styles.skillChipActive : ''}`}
              aria-pressed={isActive}
              onMouseEnter={() => {
                if (!tooltipText) return;
                const pos = getTooltipPosition(skill.name);
                if (pos) onTooltipShow(skill.name, tooltipText, pos.x, pos.y, false);
              }}
              onMouseLeave={() => onTooltipHide(false)}
              onFocus={() => {
                if (!tooltipText) return;
                const pos = getTooltipPosition(skill.name);
                if (pos) onTooltipShow(skill.name, tooltipText, pos.x, pos.y, false);
              }}
              onBlur={() => onTooltipHide(false)}
              onClick={(event) => {
                event.stopPropagation();
                if (!tooltipText) return;
                if (isActive) {
                  onTooltipHide(true);
                  return;
                }
                const pos = getTooltipPosition(skill.name);
                if (pos) onTooltipShow(skill.name, tooltipText, pos.x, pos.y, true);
              }}
            >
              <SkillIcon
                skillName={skill.name}
                iconComponent={iconComponent ?? fallbackComponent}
                customIcon={customIcon}
                color={getSkillColor(skill.name)}
                darkColor={getSkillDarkColor(skill.name)}
              />
              <span className={styles.skillName}>{skill.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  const { language, t } = useLanguage();
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleTooltipShow = useCallback(
    (skillName: string, text: string, x: number, y: number, pinned: boolean) => {
      setTooltip((prev) => {
        if (!pinned && prev?.pinned && prev.skillName !== skillName) {
          return prev;
        }
        return { skillName, text, x, y, pinned };
      });
    },
    []
  );

  const handleTooltipHide = useCallback((force = false) => {
    setTooltip((prev) => {
      if (!prev) return null;
      if (prev.pinned && !force) return prev;
      return null;
    });
  }, []);

  useEffect(() => {
    if (!tooltip) return;
    const dismiss = () => setTooltip(null);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') dismiss();
    };
    window.addEventListener('click', dismiss);
    window.addEventListener('scroll', dismiss, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('click', dismiss);
      window.removeEventListener('scroll', dismiss);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tooltip]);

  const activeSkillName = tooltip?.skillName ?? null;

  const frontendCard = (
    <SkillCard
      title={t('skills.frontend')}
      skills={frontendSkills}
      activeSkillName={activeSkillName}
      onTooltipShow={handleTooltipShow}
      onTooltipHide={handleTooltipHide}
    />
  );
  const backendCard = (
    <SkillCard
      title={t('skills.backend')}
      skills={backendSkills}
      activeSkillName={activeSkillName}
      onTooltipShow={handleTooltipShow}
      onTooltipHide={handleTooltipHide}
    />
  );
  const toolsCard = (
    <SkillCard
      title={t('skills.tools')}
      skills={toolsSkills}
      activeSkillName={activeSkillName}
      onTooltipShow={handleTooltipShow}
      onTooltipHide={handleTooltipHide}
    />
  );

  const tooltipPosition = (() => {
    if (!tooltip || !mounted) return null;
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const halfTooltip = 148;
    const minCenter = Math.min(halfTooltip, viewportWidth / 2);
    const maxCenter = Math.max(minCenter, viewportWidth - halfTooltip);
    const clampedX = Math.min(Math.max(tooltip.x, minCenter), maxCenter);
    const arrowOffsetPx = tooltip.x - clampedX;
    return { clampedX, arrowOffsetPx };
  })();

  const tooltipElement =
    tooltip && tooltipPosition && mounted ? (
      <div
        className={styles.fixedTooltip}
        role="tooltip"
        style={{
          left: `${tooltipPosition.clampedX}px`,
          top: `${tooltip.y}px`,
          transform: 'translate(-50%, -100%)',
        }}
      >
        {tooltip.text}
        <div
          className={styles.fixedTooltipArrow}
          style={{
            left: `calc(50% + ${tooltipPosition.arrowOffsetPx}px)`,
            transform: 'translateX(-50%)',
          }}
        />
      </div>
    ) : null;

  return (
    <>
      <section
        id="skills"
        className={styles.skills}
        aria-label={language === 'de' ? 'Fähigkeiten' : 'Skills section'}
      >
        <p className={styles.subtitle}>{t('skills.subtitle')}</p>
        <h1 className={styles.title}>{t('skills.title')}</h1>
        <div className={styles.detailsContainer}>
          <div className={styles.desktopView}>
            <SkillCard
              title={t('skills.frontend')}
              skills={frontendSkills}
              activeSkillName={activeSkillName}
              onTooltipShow={handleTooltipShow}
              onTooltipHide={handleTooltipHide}
            />
            <SkillCard
              title={t('skills.backend')}
              skills={backendSkills}
              activeSkillName={activeSkillName}
              onTooltipShow={handleTooltipShow}
              onTooltipHide={handleTooltipHide}
            />
            <SkillCard
              title={t('skills.tools')}
              skills={toolsSkills}
              activeSkillName={activeSkillName}
              onTooltipShow={handleTooltipShow}
              onTooltipHide={handleTooltipHide}
            />
          </div>
          <div className={styles.mobileView}>
            <SkillsCarousel dots={[0, 1, 2]}>
              {frontendCard}
              {backendCard}
              {toolsCard}
            </SkillsCarousel>
          </div>
        </div>
      </section>
      {mounted && tooltipElement && createPortal(tooltipElement, document.body)}
    </>
  );
}
