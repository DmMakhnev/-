import React, { useState } from 'react';
import { ArchModule } from '../types';
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
  CheckCircle2, 
  Lock, 
  Database, 
  ArrowDown, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Info,
  Server,
  Download,
  Presentation,
  Loader2
} from 'lucide-react';

interface DiagramViewProps {
  onSelectModule: (module: ArchModule) => void;
}

export const DiagramView: React.FC<DiagramViewProps> = ({ onSelectModule }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const handleDownloadPdf = async () => {
    try {
      setIsExporting(true);
      setExportMessage('Формирование PDF схемы...');
      await exportToPdf('diagram-view-canvas', {
        fileName: `mis-patient-diagram-${Date.now()}.pdf`,
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
      setExportMessage('Генерация презентации PPTX...');
      await exportToPptx('diagram-view-canvas', {
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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Pill': return <Pill className="w-5 h-5 text-amber-400" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'Bell': return <Bell className="w-5 h-5 text-blue-400" />;
      case 'FileText': return <FileText className="w-5 h-5 text-sky-400" />;
      case 'Bot': return <Bot className="w-5 h-5 text-indigo-400" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-teal-400" />;
      case 'AlertTriangle': return <AlertTriangle className="w-5 h-5 text-rose-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-violet-400" />;
      default: return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  const filteredModules = ARCH_MODULES.filter((m) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'core') return m.isCore;
    return m.category === filterCategory;
  });

  return (
    <div id="diagram-view-canvas" className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      
      {/* Category Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Фильтр компонентов:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Все 8 Модулей' },
              { id: 'core', label: '⭐ Ядро (6.1.2, 6.1.3, 6.1.4)' },
              { id: 'interaction', label: 'Сервисы пациента' },
              { id: 'ai', label: 'ИИ-Консультант' },
              { id: 'integration', label: 'IoT & Телеметрия' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCategory(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  filterCategory === cat.id
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {exportMessage && (
            <span className="text-blue-400 font-mono text-xs flex items-center gap-1.5 bg-blue-950/60 px-2.5 py-1 rounded-lg border border-blue-800/60">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              {exportMessage}
            </span>
          )}

          <button
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            title="Скачать схему в PDF"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF Схема</span>
          </button>

          <button
            onClick={handleDownloadPptx}
            disabled={isExporting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold shadow-xs disabled:opacity-50 transition-all cursor-pointer"
            title="Скачать презентацию PowerPoint (.pptx)"
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>PPTX Слайды</span>
          </button>
        </div>
      </div>

      {/* CORE HIGHLIGHT ARCHITECTURAL PREREQUISITE BANNER */}
      <div className="p-4 rounded-2xl bg-amber-950/40 border-2 border-amber-500/60 text-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-amber-200 flex items-center gap-2">
              Архитектурная Аксиома МИС Пациента
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/30 text-amber-100">
                Обязательный Контур
              </span>
            </h3>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              Без элементов <strong>6.1.2 (Единый лист назначений)</strong>, <strong>6.1.3 (Наглядная визуализация)</strong> и <strong>6.1.4 (Персональный ассистент)</strong> любая МИС остаётся «чёрным ящиком» для человека. Прозрачность и понятность динамики — не опция комфорта, а строгое архитектурное требование.
            </p>
          </div>
        </div>
      </div>

      {/* 8 ARCHITECTURAL MODULES GRID */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span>Модули МИС Пациента (Раздел 6.1)</span>
          <span className="h-px bg-slate-800 flex-1" />
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredModules.map((m) => (
            <div
              key={m.id}
              onClick={() => onSelectModule(m)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                m.isCore
                  ? 'bg-amber-950/20 border-amber-500/60 hover:border-amber-400 shadow-md ring-1 ring-amber-500/20'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/80'
              }`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    m.isCore
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {m.code}
                  </span>

                  {m.isCore && (
                    <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                      ⭐ ЯДРО
                    </span>
                  )}
                </div>

                <div className="flex items-start gap-3 mb-2">
                  <div className={`p-2 rounded-xl shrink-0 ${
                    m.isCore ? 'bg-amber-500/20 border border-amber-500/30' : 'bg-slate-800'
                  }`}>
                    {getIcon(m.iconName)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">
                      {m.title}
                    </h4>
                    <p className="text-xs text-slate-400 font-medium">
                      {m.subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-3">
                  {m.description}
                </p>
              </div>

              <div>
                <div className="border-t border-slate-800 pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Раздел МИС: {m.code}</span>
                  <span className="text-blue-400 group-hover:underline font-semibold">ТЗ →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FEDERATED LEARNING ARCHITECTURE SECTION (6.2) */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                6.2. Федеративный подход к обучению моделей ИИ
                <span className="text-xs font-mono font-normal text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30">
                  Privacy-Preserving Federated AI
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Принцип конфиденциальности: Данные медицинских карт не покидают контур организации — перемещаются только «веса» моделей
              </p>
            </div>
          </div>
        </div>

        {/* 3-Tier Federated Pipeline Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEDERATED_LAYERS.map((fl, idx) => (
            <div key={fl.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 relative">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-indigo-400 px-2 py-0.5 rounded bg-indigo-950 border border-indigo-800">
                  {fl.codeRef}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Уровень {idx + 1}</span>
              </div>

              <h4 className="font-bold text-sm text-white">{fl.title}</h4>
              <p className="text-xs text-slate-300">{fl.description}</p>
              
              <div className="pt-2 border-t border-slate-800 text-[11px] text-indigo-200/90 font-mono">
                ⚡ {fl.dataFlow}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DATA RIGHTS & ACCESS CONTROL SECTION (6.3) */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white flex items-center gap-2">
                6.3. Право пациента на данные и Модель Согласия
                <span className="text-xs font-mono font-normal text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Data Ownership & Granular Access
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Пациент — не источник данных для организации, а их единственный законный владелец. Выдача в машиночитаемом формате (FHIR).
              </p>
            </div>
          </div>
        </div>

        {/* Granular Access Matrix Example Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {ACCESS_RULES.map((rule) => (
            <div key={rule.id} className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-emerald-300">
                <span>{rule.role}</span>
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div className="text-xs text-slate-200 font-semibold">{rule.scope}</div>
              <p className="text-[11px] text-slate-400 leading-snug">{rule.example}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
