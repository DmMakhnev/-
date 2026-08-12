import React, { useState } from 'react';
import { ViewMode, ThemeId, ArchModule } from './types';
import { Header } from './components/Header';
import { SlideView } from './components/SlideView';
import { DiagramView } from './components/DiagramView';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { PrototypeView } from './components/PrototypeView';
import { ArticleTextView } from './components/ArticleTextView';
import { BlockDetailModal } from './components/BlockDetailModal';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { ExportModal } from './components/ExportModal';

export default function App() {
  const [activeView, setActiveView] = useState<ViewMode>('slide');
  const [activeTheme, setActiveTheme] = useState<ThemeId>('academic-blue');
  const [selectedModule, setSelectedModule] = useState<ArchModule | null>(null);
  const [prototypeTab, setPrototypeTab] = useState<'prescriptions' | 'trends' | 'assistant' | 'ai' | 'access'>('prescriptions');
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const handleOpenPrototypeTab = (tab: 'prescriptions' | 'trends' | 'assistant' | 'ai' | 'access') => {
    setPrototypeTab(tab);
    setActiveView('prototype');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Top Header Navigation */}
      <Header
        activeView={activeView}
        onViewChange={setActiveView}
        activeTheme={activeTheme}
        onThemeChange={setActiveTheme}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenAiAssistant={() => setIsAiOpen(true)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Main View Area */}
      <main className="flex-1 py-6">
        {activeView === 'slide' && (
          <SlideView
            themeId={activeTheme}
            onSelectModule={(m) => setSelectedModule(m)}
          />
        )}

        {activeView === 'diagram' && (
          <DiagramView
            onSelectModule={(m) => setSelectedModule(m)}
          />
        )}

        {activeView === 'comparison' && (
          <ComparisonMatrix />
        )}

        {activeView === 'prototype' && (
          <PrototypeView 
            key={prototypeTab}
            initialTab={prototypeTab}
          />
        )}

        {activeView === 'article' && (
          <ArticleTextView />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-4 px-6 text-center text-xs text-slate-500 font-mono">
        Архитектура МИС Пациента и Партисипативность
      </footer>

      {/* Modals & Drawers */}
      <BlockDetailModal
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
        onOpenPrototype={handleOpenPrototypeTab}
      />

      <AiAssistantDrawer
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
      />

      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        activeView={activeView}
      />

    </div>
  );
}
