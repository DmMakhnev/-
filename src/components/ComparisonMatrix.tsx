import React from 'react';
import { PARADIGM_SHIFT, REFERENCES } from '../data/architectureData';
import { Building2, MapPin, UserCheck, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ComparisonMatrix: React.FC = () => {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      
      {/* Header / Intro */}
      <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-600/20 text-blue-300 border border-blue-500/30 text-xs font-mono font-semibold">
          Сравнительный Анализ ИТ-Архитектур
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
          Разворот ИТ-Архитектуры: Смена Системы Координат
        </h2>
        <p className="text-sm text-slate-300 max-w-4xl leading-relaxed">
          Текущая информатизация в медицине построена вокруг организации или региона, а не человека. Полноценная МИС Пациента как персональный помощник меняет роли и целевые метрики системы.
        </p>
      </div>

      {/* Side-by-Side Architectural Matrix Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/90">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950/80 text-xs text-slate-400 uppercase font-mono">
              <th className="p-4 w-1/5">Критерий Архитектуры</th>
              <th className="p-4 w-1/4">
                <div className="flex items-center gap-2 text-slate-300">
                  <Building2 className="w-4 h-4 text-slate-400" />
                  <span>МИС Медорганизации</span>
                </div>
              </th>
              <th className="p-4 w-1/4">
                <div className="flex items-center gap-2 text-slate-300">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>МИС Регионального Уровня</span>
                </div>
              </th>
              <th className="p-4 w-3/10 bg-emerald-950/40 text-emerald-300 border-l border-emerald-500/30">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold">МИС Пациента (Новый подход)</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs sm:text-sm">
            {PARADIGM_SHIFT.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4 font-semibold text-slate-200 bg-slate-950/40 border-r border-slate-800/80">
                  {row.attribute}
                </td>
                <td className="p-4 text-slate-300 opacity-80">
                  {row.orgMIS}
                </td>
                <td className="p-4 text-slate-300 opacity-80">
                  {row.regionalMIS}
                </td>
                <td className="p-4 bg-emerald-950/20 text-emerald-100 font-medium border-l border-emerald-500/30">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{row.patientMIS}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Core Takeaway Box */}
      <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-amber-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="font-bold text-sm text-amber-300 uppercase tracking-wide">
            Ключевой вывод архитектора
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            Пока МИС Пациента ограничена лишь вызовом врача или просмотром отдельных справок, пациент остается «объектом лечения». Переход к партисипативности возможен только при реализации сквозного Листа Назначений (6.1.2), Наглядной Визуализации Динамики (6.1.3) и Персонального Ассистента (6.1.4).
          </p>
        </div>
      </div>

    </div>
  );
};
