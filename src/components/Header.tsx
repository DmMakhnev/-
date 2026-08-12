import React from 'react';
import { ViewMode, ThemeId } from '../types';
import { THEMES } from '../utils/themeUtils';
import { 
  Presentation, 
  Network, 
  TableProperties, 
  Smartphone, 
  FileText, 
  Palette, 
  Download, 
  Sparkles,
  Maximize2
} from 'lucide-react';

interface HeaderProps {
  activeView: ViewMode;
  onViewChange: (mode: ViewMode) => void;
  activeTheme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
  onOpenExport: () => void;
  onOpenAiAssistant: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onViewChange,
  activeTheme,
  onThemeChange,
  onOpenExport,
  onOpenAiAssistant,
  isFullscreen,
  onToggleFullscreen
}) => {
  const navItems: { mode: ViewMode; label: string; icon: React.ReactNode; desc: string }[] = [
    { mode: 'slide', label: 'Слайд 16:9', icon: <Presentation className="w-4 h-4" />, desc: 'Готовый слайд для презентации' },
    { mode: 'diagram', label: 'Интерактивная Схема', icon: <Network className="w-4 h-4" />, desc: 'Схема архитектуры 8 блоков' },
    { mode: 'comparison', label: 'Сравнение МИС', icon: <TableProperties className="w-4 h-4" />, desc: 'Матрица сдвига парадигмы' },
    { mode: 'prototype', label: 'Прототип МИС', icon: <Smartphone className="w-4 h-4" />, desc: 'Живая эмуляция работы МИС' },
    { mode: 'article', label: 'Текст & Источники', icon: <FileText className="w-4 h-4" />, desc: 'Аннотация и источники для статьи' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-slate-100 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Title / Brand */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs tracking-wider uppercase shadow-xs">
              МИС Пациента
            </div>
            <div>
              <h1 className="font-semibold text-base tracking-tight text-white flex items-center gap-2">
                Архитектура МИС Пациента
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                  Партисипативность
                </span>
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                Человекоцентричная ИТ-архитектура здравоохранения
              </p>
            </div>
          </div>

          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={onOpenAiAssistant}
              className="p-2 rounded-lg bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onOpenExport}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 text-xs"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800/80 overflow-x-auto max-w-full">
          {navItems.map((item) => {
            const isActive = activeView === item.mode;
            return (
              <button
                key={item.mode}
                onClick={() => onViewChange(item.mode)}
                title={item.desc}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="hidden md:flex items-center gap-2">
          {/* Theme Selector */}
          <div className="relative group">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-300 hover:text-white cursor-pointer">
              <Palette className="w-3.5 h-3.5 text-blue-400" />
              <select
                value={activeTheme}
                onChange={(e) => onThemeChange(e.target.value as ThemeId)}
                className="bg-transparent border-none text-xs focus:ring-0 cursor-pointer text-slate-200 pr-1 outline-none"
              >
                {Object.values(THEMES).map((t) => (
                  <option key={t.id} value={t.id} className="bg-slate-900 text-slate-200">
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Fullscreen Button */}
          <button
            onClick={onToggleFullscreen}
            title={isFullscreen ? "Выйти из полноэкранного режима" : "Полноэкранный режим слайда"}
            className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>

          {/* AI Assistant Button */}
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 text-xs font-medium transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>ИИ-Ассистент</span>
          </button>

          {/* Export Button */}
          <button
            onClick={onOpenExport}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Экспорт / Печать</span>
          </button>
        </div>

      </div>
    </header>
  );
};
