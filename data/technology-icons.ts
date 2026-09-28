import type { IconType } from 'react-icons';
import { FaCode, FaMousePointer, FaTheaterMasks } from 'react-icons/fa';
import {
  SiAnthropic,
  SiClaude,
  SiCss3,
  SiDotnet,
  SiExpress,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiReact,
  SiSass,
  SiSharp,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVitest,
} from 'react-icons/si';
import {
  TbBrandVisualStudio,
  TbBrandWindows,
  TbPlugConnected,
} from 'react-icons/tb';
import { VscFileCode } from 'react-icons/vsc';

const techIconMap: Record<string, IconType> = {
  HTML: SiHtml5,
  CSS: SiCss3,
  JavaScript: SiJavascript,
  Javascript: SiJavascript,
  SCSS: SiSass,
  SASS: SiSass,
  'React.js': SiReact,
  React: SiReact,
  Tailwind: SiTailwindcss,
  TypeScript: SiTypescript,
  Typescript: SiTypescript,
  'Next.js': SiNextdotjs,
  NextJS: SiNextdotjs,
  'Node.js': SiNodedotjs,
  NodeJS: SiNodedotjs,
  'Express.js': SiExpress,
  ExpressJS: SiExpress,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  Postgres: SiPostgresql,
  Supabase: SiSupabase,
  Vitest: SiVitest,
  Playwright: FaTheaterMasks,
  'C#': SiSharp,
  'WinUI 3': TbBrandWindows,
  '.NET 10': SiDotnet,
  XAML: VscFileCode,
  'Visual Studio': TbBrandVisualStudio,
  MCP: TbPlugConnected,
  Codex: SiOpenai,
  'Claude Code': SiClaude,
  Claude: SiAnthropic,
  Cursor: FaMousePointer,
};

const techColorMap: Record<string, string> = {
  HTML: '#E34F26',
  CSS: '#1572B6',
  JavaScript: '#F7DF1E',
  Javascript: '#F7DF1E',
  SCSS: '#CC6699',
  SASS: '#CC6699',
  'React.js': '#61DAFB',
  React: '#61DAFB',
  Tailwind: '#38BDF8',
  TypeScript: '#3178C6',
  Typescript: '#3178C6',
  'Next.js': '#000000',
  NextJS: '#000000',
  'Node.js': '#339933',
  NodeJS: '#339933',
  'Express.js': '#000000',
  ExpressJS: '#000000',
  MongoDB: '#47A248',
  PostgreSQL: '#336791',
  Postgres: '#336791',
  Supabase: '#3ECF8E',
  Vitest: '#6E9F18',
  Playwright: '#2EAD33',
  'C#': '#512BD4',
  'WinUI 3': '#0078D4',
  '.NET 10': '#512BD4',
  XAML: '#0C54C2',
  'Visual Studio': '#5C2D91',
  MCP: '#7C3AED',
  Codex: '#10A37F',
  'Claude Code': '#D97757',
  Claude: '#D97757',
  Cursor: '#111111',
};

export function getTechIcon(techName: string): IconType {
  return techIconMap[techName] || FaCode;
}

export function getTechColor(techName: string): string {
  return techColorMap[techName] || 'var(--color-accent, #6366f1)';
}
