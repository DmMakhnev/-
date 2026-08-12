import React, { useState } from 'react';
import { ThemeId, ArchModule } from '../types';
import { THEMES } from '../utils/themeUtils';
import { ARCH_MODULES, FEDERATED_LAYERS, ACCESS_RULES } from '../data/architectureData';
import { exportToPdf, exportToPptx } from '../utils/exportUtils';
import { 
  Pill, 
  TrendingUp, 
  Bell, 
  FileText, 
  Bot, 
  MessageSquare, 
  AlertTriangle, 
  Activity, 
  ShieldCheck, 
  Cpu, 
  Users, 
  Building2, 
  MapPin, 
  UserCheck, 
  CheckCircle2,
  Lock,
  ArrowRight,
  Download,
  Presentation,
  Loader2
} from 'lucide-react';

interface SlideViewProps {
  themeId: ThemeId;
  onSelectModule: (module: ArchModule) => void;
}

export const SlideView: React.FC<SlideViewProps> = ({ themeId, onSelectModule }) => {
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const theme = THEMES[themeId];

  const handleDownloadPdf = async () => {
    try {
      setIsExporting(true);
      setExportMessage('Формирование PDF слайда...');
      await exportToPdf('presentation-slide-canvas', {
        fileName: `mis-patient-slide-${Date.now()}.pdf`,
        onProgress: (m) => setExportMessage(m)
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
      setExportMessage(null);
    }
  };

  const handleDownloadPptx = async () => {
    try {
      setIsExporting(true);
      setExportMessage('Создание презентации PowerPoint (.pptx)...');
      await exportToPptx('presentation-slide-canvas', {
        fileName: `mis-patient-presentation-${Date.now()}.pptx`,
        onProgress: (m) => setExportMessage(m)
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
      setExportMessage(null);
    }
  };

  // Helper to get Lucide icon
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Pill': return <Pill className="w-4 h-4 text-amber-400" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case 'Bell': return <Bell className="w-4 h-4 text-blue-400" />;
      case 'FileText': return <FileText className="w-4 h-4 text-sky-400" />;
      case 'Bot': return <Bot className="w-4 h-4 text-indigo-400" />;
      case 'MessageSquare': return <MessageSquare className="w-4 h-4 text-teal-400" />;
      case 'AlertTriangle': return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      case 'Activity': return <Activity className="w-4 h-4 text-violet-400" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const coreModules = ARCH_MODULES.filter((m) => m.isCore);
  const secondaryModules = ARCH_MODULES.filter((m) => !m.isCore);

  return (
    <div className="w-full flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 overflow-x-auto space-y-3">
      {/* Quick Download Actions Toolbar */}
      <div className="w-full max-w-[1024px] flex items-center justify-between gap-2 px-1">
        <div className="text-xs text-slate-400 font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Презентационный Слайд 4:3</span>
          {exportMessage && (
            <span className="text-blue-400 font-mono text-[11px] flex items-center gap-1.5 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-800/60">
              <Loader2 className="w-3 h-3 animate-spin" />
              {exportMessage}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            title="Скачать текущий слайд в PDF высокого качества"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Скачать PDF (4:3)</span>
          </button>

          <button
            onClick={handleDownloadPptx}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            title="Скачать презентацию PowerPoint (.pptx)"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Скачать PPTX (PowerPoint 4:3)</span>
          </button>
        </div>
      </div>

      {/* 4:3 Presentation Frame Container */}
      <div 
        id="presentation-slide-canvas"
        className={`w-full max-w-[1024px] aspect-[4/3] min-h-[680px] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 relative border ${theme.slideBg} ${theme.cardBorder}`}
      >
        
        {/* Slide Header */}
        <div className="border-b border-current/10 pb-3 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${theme.badgeCoreBg}`}>
                АРХИТЕКТУРНАЯ СХЕМА
              </span>
              <span className="text-xs font-mono opacity-60">Слайд 4:3 / Для презентаций и проекторов</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug">
              Разворот ИТ-архитектуры: МИС Пациента и Партисипативность
            </h2>
            <p className="text-xs sm:text-sm opacity-80 mt-0.5">
              Концепция перевода человека из «объекта помощи» в активного владельца данных и участника терапии
            </p>
          </div>

          <div className="text-right hidden sm:block">
            <div className="text-xs font-semibold tracking-wide">МИС ПАЦИЕНТА</div>
          </div>
        </div>

        {/* Top Paradigm Shift Bar */}
        <div className="grid grid-cols-3 gap-2 my-2 text-xs">
          <div className={`p-2.5 rounded-xl border ${theme.cardBg} opacity-60 flex items-center gap-2`}>
            <Building2 className="w-4 h-4 shrink-0 opacity-70" />
            <div>
              <div className="font-semibold text-[11px]">МИС Медорганизации</div>
              <div className="text-[10px] opacity-70">Управление ресурсами ЛПУ («Сколько оказали услуг»)</div>
            </div>
          </div>

          <div className={`p-2.5 rounded-xl border ${theme.cardBg} opacity-60 flex items-center gap-2`}>
            <MapPin className="w-4 h-4 shrink-0 opacity-70" />
            <div>
              <div className="font-semibold text-[11px]">МИС Региона</div>
              <div className="text-[10px] opacity-70">Управление территорией («Статистика заболеваемости»)</div>
            </div>
          </div>

          <div className={`p-2.5 rounded-xl border-2 border-emerald-500/80 bg-emerald-950/30 text-emerald-100 flex items-center gap-2 shadow-sm`}>
            <UserCheck className="w-5 h-5 shrink-0 text-emerald-400" />
            <div>
              <div className="font-bold text-xs text-emerald-300 flex items-center gap-1">
                МИС Пациента (Персональный помощник)
                <span className="text-[9px] bg-emerald-500/30 text-emerald-200 px-1.5 py-0.2 rounded font-mono">В ЦЕНТРЕ</span>
              </div>
              <div className="text-[10px] opacity-90">Потребности человека, приверженность, партисипативность</div>
            </div>
          </div>
        </div>

        {/* Main Architecture Diagram Content Grid */}
        <div className="grid grid-cols-12 gap-3 my-1 flex-1">
          
          {/* Column 1: Core Engine (6.1.2, 6.1.3, 6.1.4) - 5 cols */}
          <div className={`col-span-12 lg:col-span-5 p-3 rounded-xl border ${theme.coreBg} ${theme.coreHighlight} flex flex-col justify-between`}>
            <div className="flex items-center justify-between border-b border-current/10 pb-1.5 mb-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-xs tracking-tight uppercase">Обязательное Ядро Архитектуры</span>
              </div>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-semibold">
                Без них МИС — «черный ящик»
              </span>
            </div>

            <div className="space-y-2 flex-1 flex flex-col justify-around">
              {coreModules.map((m) => (
                <div 
                  key={m.id}
                  onClick={() => onSelectModule(m)}
                  className={`p-2.5 rounded-lg border ${theme.cardBg} hover:scale-[1.01] transition-all cursor-pointer flex items-start gap-2.5 group shadow-xs`}
                >
                  <div className="p-1.5 rounded-md bg-slate-800 border border-slate-700 shrink-0 mt-0.5 group-hover:border-amber-400 transition-colors">
                    {getIcon(m.iconName)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs group-hover:text-amber-300 transition-colors">
                        {m.code} {m.title}
                      </span>
                    </div>
                    <p className="text-[11px] opacity-80 leading-snug line-clamp-2 mt-0.5">
                      {m.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Interaction & Platform Modules (6.1.1, 6.1.5, 6.1.6, 6.1.7, 6.1.8) - 4 cols */}
          <div className={`col-span-12 lg:col-span-4 p-3 rounded-xl border ${theme.cardBg} flex flex-col justify-between`}>
            <div className="flex items-center justify-between border-b border-current/10 pb-1.5 mb-2">
              <span className="font-bold text-xs tracking-tight uppercase opacity-90">
                Сервисы Взаимодействия и Интеграции
              </span>
              <span className="text-[10px] opacity-60 font-mono">6.1.1, 6.1.5–6.1.8</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5 flex-1 overflow-y-auto">
              {secondaryModules.map((m) => (
                <div 
                  key={m.id}
                  onClick={() => onSelectModule(m)}
                  className={`p-2 rounded-lg border border-current/10 hover:border-blue-400/50 hover:bg-current/5 transition-all cursor-pointer flex items-center gap-2 group`}
                >
                  <div className="p-1 rounded bg-current/5 shrink-0">
                    {getIcon(m.iconName)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-[11px] truncate group-hover:text-blue-300">
                        {m.code} {m.shortTitle}
                      </span>
                    </div>
                    <p className="text-[10px] opacity-70 truncate">{m.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Federated AI (6.2) & Data Rights / Security (6.3) - 3 cols */}
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-2">
            
            {/* Federated Learning Box */}
            <div className={`p-2.5 rounded-xl border ${theme.cardBg} flex-1 flex flex-col justify-between`}>
              <div>
                <div className="flex items-center gap-1.5 border-b border-current/10 pb-1 mb-1.5">
                  <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="font-bold text-xs tracking-tight">6.2. Федеративное ИИ-обучение</span>
                </div>
                <p className="text-[10px] opacity-80 leading-snug mb-1.5">
                  «Данные не покидают контур ЛПУ — перемещаются только веса моделей»
                </p>
              </div>

              <div className="space-y-1 font-mono text-[10px]">
                {FEDERATED_LAYERS.map((fl) => (
                  <div key={fl.id} className="p-1 rounded bg-current/5 flex items-center justify-between">
                    <span className="font-semibold">{fl.title.split(' ')[0]} {fl.title.split(' ')[1]}</span>
                    <span className="text-[9px] opacity-70">Веса →</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Ownership & Granular Access Box */}
            <div className={`p-2.5 rounded-xl border ${theme.cardBg} flex-1 flex flex-col justify-between`}>
              <div>
                <div className="flex items-center gap-1.5 border-b border-current/10 pb-1 mb-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="font-bold text-xs tracking-tight">6.3. Право на данные</span>
                </div>
                <p className="text-[10px] opacity-80 leading-snug">
                  Данные принадлежат пациенту (собственник). Гранулярный доступ и машиночитаемый экспорт.
                </p>
              </div>

              <div className="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-200 mt-1 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>«Кардиолог видит всё, работодатель — только факт нетрудоспособности»</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Axiom Citation Banner */}
        <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs flex items-center justify-between gap-3 mt-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-400 uppercase text-[10px] tracking-wide px-1.5 py-0.5 rounded bg-amber-500/20">
              Архитектурная Позиция
            </span>
            <p className="text-[11px] leading-tight">
              Без реализации <strong>6.1.2, 6.1.3, 6.1.4</strong> любая МИС остаётся «чёрным ящиком». Прозрачность динамики и понятность — фундаментальное архитектурное требование.
            </p>
          </div>
          <div className="text-[10px] font-mono opacity-80 shrink-0 hidden md:block">
            Партисипативность = Осознанность + Приверженность
          </div>
        </div>

      </div>
    </div>
  );
};
