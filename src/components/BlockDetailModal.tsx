import React from 'react';
import { ArchModule } from '../types';
import { X, CheckCircle2, User, UserCheck, ArrowRight, BookOpen, Layers, ShieldCheck, Play } from 'lucide-react';

interface BlockDetailModalProps {
  module: ArchModule | null;
  onClose: () => void;
  onOpenPrototype?: (tab: 'prescriptions' | 'trends' | 'assistant' | 'ai' | 'access') => void;
}

export const BlockDetailModal: React.FC<BlockDetailModalProps> = ({ module, onClose, onOpenPrototype }) => {
  if (!module) return null;

  const handleOpenDemo = () => {
    let tab: 'prescriptions' | 'trends' | 'assistant' | 'ai' | 'access' = 'prescriptions';
    if (module.code === '6.1.3') tab = 'trends';
    if (module.code === '6.1.4') tab = 'assistant';
    if (module.code === '6.1.5') tab = 'ai';
    if (module.code === '6.3') tab = 'access';

    onClose();
    if (onOpenPrototype) {
      onOpenPrototype(tab);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className={`p-5 flex items-start justify-between border-b ${
          module.isCore 
            ? 'bg-amber-950/40 border-amber-500/40 text-amber-200' 
            : 'bg-slate-950 border-slate-800 text-white'
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                module.isCore ? 'bg-amber-500/30 text-amber-200' : 'bg-slate-800 text-slate-300'
              }`}>
                Раздел {module.code}
              </span>
              {module.isCore && (
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  ⭐ Обязательное Ядро Архитектуры
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold">{module.title}</h3>
            <p className="text-xs opacity-80 mt-0.5">{module.subtitle}</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 space-y-5 overflow-y-auto text-xs sm:text-sm text-slate-200">
          
          {/* Main Description */}
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-400 mb-1">Описание и концепция</h4>
            <p className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-200 leading-relaxed">
              {module.description}
            </p>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Технические требования и функции</h4>
            <div className="space-y-1.5">
              {module.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-800/50 text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Comparison (Patient vs Doctor) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-800/40 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-blue-300">
                <User className="w-4 h-4 text-blue-400" />
                <span>Эффект для Пациента</span>
              </div>
              <p className="text-xs text-blue-100/90 leading-snug">{module.patientImpact}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-800/40 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-teal-300">
                <UserCheck className="w-4 h-4 text-teal-400" />
                <span>Эффект для Врача</span>
              </div>
              <p className="text-xs text-teal-100/90 leading-snug">{module.doctorImpact}</p>
            </div>
          </div>

          {/* Data Inputs / Outputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Входные потоки данных:</span>
              <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                {module.dataInputs.map((inp, idx) => (
                  <li key={idx}>{inp}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Выходные результаты:</span>
              <ul className="list-disc list-inside text-slate-300 space-y-0.5 text-[11px]">
                {module.dataOutputs.map((out, idx) => (
                  <li key={idx}>{out}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Архитектурный спецификатор МИС Пациента</span>
            </div>
            <span className="font-mono text-[11px] text-slate-500">Раздел 6.1 Архитектуры</span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          {onOpenPrototype && (
            <button
              onClick={handleOpenDemo}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-md transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>
                {module.code === '6.1.2' && 'Открыть Единый Лист Назначений и Планировщик →'}
                {module.code === '6.1.3' && 'Открыть Графическую Визуализацию (Результаты) →'}
                {module.code !== '6.1.2' && module.code !== '6.1.3' && 'Открыть в интерактивном прототипе →'}
              </span>
            </button>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold cursor-pointer"
          >
            Закрыть
          </button>
        </div>

      </div>
    </div>
  );
};
