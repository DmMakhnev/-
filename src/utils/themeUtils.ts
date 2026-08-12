import { ThemeId } from '../types';

export interface ThemeStyles {
  id: ThemeId;
  name: string;
  badge: string;
  slideBg: string;
  cardBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  coreHighlight: string;
  coreBg: string;
  badgeCoreBg: string;
  headerBg: string;
}

export const THEMES: Record<ThemeId, ThemeStyles> = {
  'academic-blue': {
    id: 'academic-blue',
    name: 'Академический Синий (Классика)',
    badge: 'Презентация / Доклад',
    slideBg: 'bg-slate-900 text-slate-100',
    cardBg: 'bg-slate-800/90 border-slate-700',
    cardBorder: 'border-slate-700',
    textPrimary: 'text-slate-100',
    textSecondary: 'text-slate-400',
    accent: 'bg-blue-600 text-white',
    coreHighlight: 'border-amber-500/80 ring-2 ring-amber-500/30',
    coreBg: 'bg-amber-950/30',
    badgeCoreBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    headerBg: 'bg-slate-950/80 border-slate-800'
  },
  'print-monochrome': {
    id: 'print-monochrome',
    name: 'Монохром Печатный (Статья ВАК/Scopus)',
    badge: 'Печать / Монография',
    slideBg: 'bg-white text-slate-900',
    cardBg: 'bg-slate-50 border-slate-900',
    cardBorder: 'border-slate-900',
    textPrimary: 'text-slate-950',
    textSecondary: 'text-slate-700',
    accent: 'bg-slate-900 text-white',
    coreHighlight: 'border-2 border-slate-950 bg-slate-100',
    coreBg: 'bg-slate-100',
    badgeCoreBg: 'bg-slate-950 text-white font-bold border-slate-950',
    headerBg: 'bg-slate-100 border-slate-300'
  },
  'dark-executive': {
    id: 'dark-executive',
    name: 'Тёмная Презентация (Executive)',
    badge: 'Слайд 16:9',
    slideBg: 'bg-gray-950 text-gray-100',
    cardBg: 'bg-gray-900/90 border-gray-800',
    cardBorder: 'border-gray-800',
    textPrimary: 'text-gray-100',
    textSecondary: 'text-gray-400',
    accent: 'bg-indigo-600 text-white',
    coreHighlight: 'border-emerald-500/80 ring-2 ring-emerald-500/30',
    coreBg: 'bg-emerald-950/30',
    badgeCoreBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    headerBg: 'bg-gray-900 border-gray-800'
  },
  'clinical-teal': {
    id: 'clinical-teal',
    name: 'Медицинский Минимализм',
    badge: 'Клинический',
    slideBg: 'bg-slate-50 text-slate-900',
    cardBg: 'bg-white border-teal-200/80 shadow-xs',
    cardBorder: 'border-teal-200',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-600',
    accent: 'bg-teal-700 text-white',
    coreHighlight: 'border-amber-500 ring-2 ring-amber-500/20',
    coreBg: 'bg-amber-50/70',
    badgeCoreBg: 'bg-amber-100 text-amber-900 border-amber-300',
    headerBg: 'bg-white border-slate-200'
  },
  'high-density': {
    id: 'high-density',
    name: 'High Density (Высокая плотность)',
    badge: 'Компактный',
    slideBg: 'bg-slate-50 text-slate-900',
    cardBg: 'bg-white border-slate-300 shadow-2xs',
    cardBorder: 'border-slate-300',
    textPrimary: 'text-slate-900',
    textSecondary: 'text-slate-600',
    accent: 'bg-blue-600 text-white',
    coreHighlight: 'border-blue-600 ring-2 ring-blue-500/20',
    coreBg: 'bg-blue-50/60',
    badgeCoreBg: 'bg-blue-100 text-blue-900 border-blue-300',
    headerBg: 'bg-slate-100 border-slate-300'
  }
};
