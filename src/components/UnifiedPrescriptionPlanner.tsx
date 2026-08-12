import React, { useState } from 'react';
import { 
  Pill, 
  Activity, 
  Scissors, 
  Calendar, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Video, 
  FileText, 
  Search, 
  Sparkles,
  Info,
  ShieldAlert,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  REGULAR_MEDICATIONS, 
  EMERGENCY_MEDICATIONS, 
  DAILY_MEASUREMENTS, 
  SCHEDULED_MANIPULATIONS, 
  SCHEDULED_EVENTS,
  MedicationItem
} from '../data/plannerData';

export const UnifiedPrescriptionPlanner: React.FC = () => {
  const [plannerTab, setPlannerTab] = useState<'therapy' | 'measurements' | 'manipulations' | 'events'>('therapy');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [medList, setMedList] = useState<MedicationItem[]>(REGULAR_MEDICATIONS);
  const [showEmergency, setShowEmergency] = useState<boolean>(true);
  const [filterTime, setFilterTime] = useState<'all' | 'morning' | 'day' | 'evening'>('all');

  const toggleMedTaken = (id: string, timeSlot: 'morning' | 'day' | 'evening') => {
    setMedList((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const currentSlotState = m.takenToday?.[timeSlot] || false;
          return {
            ...m,
            takenToday: {
              ...m.takenToday,
              [timeSlot]: !currentSlotState
            }
          };
        }
        return m;
      })
    );
  };

  const filteredRegularMeds = medList.filter((m) => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.note.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterTime === 'morning') return matchesSearch && m.morning !== '—';
    if (filterTime === 'day') return matchesSearch && m.day !== '—';
    if (filterTime === 'evening') return matchesSearch && m.evening !== '—';
    return matchesSearch;
  });

  const filteredEmergencyMeds = EMERGENCY_MEDICATIONS.filter((m) => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.comment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono mb-1">
            Модуль 6.1.2 — Обязательное Ядро МИС
          </div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            Единый Лист Назначений и Планировщик Пациента
          </h3>
          <p className="text-xs text-slate-400">
            Сводный стек терапии от всех специалистов, журнал измерений, график процедур и календарь ВКС
          </p>
        </div>

        {/* 4 Core Sub-Tabs Navigation */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800 w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'therapy', label: 'Терапия', icon: <Pill className="w-3.5 h-3.5" />, count: REGULAR_MEDICATIONS.length },
            { id: 'measurements', label: 'Измерения', icon: <Activity className="w-3.5 h-3.5" />, count: DAILY_MEASUREMENTS.length },
            { id: 'manipulations', label: 'Манипуляции', icon: <Scissors className="w-3.5 h-3.5" />, count: SCHEDULED_MANIPULATIONS.length },
            { id: 'events', label: 'События', icon: <Calendar className="w-3.5 h-3.5" />, count: SCHEDULED_EVENTS.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setPlannerTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                plannerTab === tab.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                plannerTab === tab.id ? 'bg-blue-800 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* SUB-TAB 1: THERAPY (ЛЕКАРСТВА ИЗ EXCEL ФАЙЛА) */}
      {plannerTab === 'therapy' && (
        <div className="space-y-4">
          
          {/* Controls & Search */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/90 p-3 rounded-xl border border-slate-800">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Поиск лекарства (например: Атаканд, Дигоксин, Янумет)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Фильтр приёма:</span>
              <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                {[
                  { id: 'all', label: 'Все' },
                  { id: 'morning', label: 'Утро' },
                  { id: 'day', label: 'День' },
                  { id: 'evening', label: 'Вечер' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilterTime(f.id as any)}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all cursor-pointer ${
                      filterTime === f.id ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Section A: Regular Medications Table / Cards */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300 uppercase tracking-wider px-1">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Постоянный приём с коррекцией ({filteredRegularMeds.length} преп.)</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal font-mono">Данные домашней карты приёма</span>
            </div>

            <div className="space-y-2.5">
              {filteredRegularMeds.map((med) => (
                <div 
                  key={med.id} 
                  className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {med.num}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-white">{med.name}</h4>
                          <span className="text-xs font-mono bg-blue-500/20 text-blue-300 px-2 py-0.2 rounded border border-blue-500/30">
                            {med.dose}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                          {med.comment}
                        </p>
                      </div>
                    </div>

                    {med.note && (
                      <div className="text-[11px] font-mono text-amber-300 bg-amber-950/40 border border-amber-500/30 px-2.5 py-1 rounded-lg shrink-0">
                        ⚠️ {med.note}
                      </div>
                    )}
                  </div>

                  {/* Daily Time Slot Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {/* Morning */}
                    <div className={`p-2.5 rounded-lg border flex items-center justify-between text-xs font-mono transition-all ${
                      med.morning === '—' 
                        ? 'bg-slate-950/40 border-slate-800/60 opacity-40' 
                        : med.takenToday?.morning 
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' 
                        : 'bg-slate-950 border-slate-800 text-slate-200'
                    }`}>
                      <div>
                        <div className="text-[10px] text-slate-400 font-sans">Утро</div>
                        <div className="font-bold text-white">{med.morning}</div>
                      </div>
                      {med.morning !== '—' && (
                        <button
                          onClick={() => toggleMedTaken(med.id, 'morning')}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                            med.takenToday?.morning
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                          }`}
                        >
                          {med.takenToday?.morning ? 'Принято ✓' : 'Отметить'}
                        </button>
                      )}
                    </div>

                    {/* Day */}
                    <div className={`p-2.5 rounded-lg border flex items-center justify-between text-xs font-mono transition-all ${
                      med.day === '—' 
                        ? 'bg-slate-950/40 border-slate-800/60 opacity-40' 
                        : med.takenToday?.day 
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' 
                        : 'bg-slate-950 border-slate-800 text-slate-200'
                    }`}>
                      <div>
                        <div className="text-[10px] text-slate-400 font-sans">День</div>
                        <div className="font-bold text-white">{med.day}</div>
                      </div>
                      {med.day !== '—' && (
                        <button
                          onClick={() => toggleMedTaken(med.id, 'day')}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                            med.takenToday?.day
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                          }`}
                        >
                          {med.takenToday?.day ? 'Принято ✓' : 'Отметить'}
                        </button>
                      )}
                    </div>

                    {/* Evening */}
                    <div className={`p-2.5 rounded-lg border flex items-center justify-between text-xs font-mono transition-all ${
                      med.evening === '—' 
                        ? 'bg-slate-950/40 border-slate-800/60 opacity-40' 
                        : med.takenToday?.evening 
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200' 
                        : 'bg-slate-950 border-slate-800 text-slate-200'
                    }`}>
                      <div>
                        <div className="text-[10px] text-slate-400 font-sans">Вечер</div>
                        <div className="font-bold text-white">{med.evening}</div>
                      </div>
                      {med.evening !== '—' && (
                        <button
                          onClick={() => toggleMedTaken(med.id, 'evening')}
                          className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                            med.takenToday?.evening
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                          }`}
                        >
                          {med.takenToday?.evening ? 'Принято ✓' : 'Отметить'}
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* Section B: Emergency Medications (Аварийные) */}
          <div className="pt-3 border-t border-slate-800 space-y-2">
            <button
              onClick={() => setShowEmergency(!showEmergency)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-rose-950/30 border border-rose-500/40 text-rose-200 hover:bg-rose-950/50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Аварийные Препараты — Приём по Потребности ({filteredEmergencyMeds.length})</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-mono">
                <span>{showEmergency ? 'Свернуть' : 'Развернуть'}</span>
                {showEmergency ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            {showEmergency && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-fadeIn">
                {filteredEmergencyMeds.map((med) => (
                  <div key={med.id} className="p-3.5 rounded-xl bg-slate-900 border border-rose-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-sm text-white flex items-center gap-2">
                        <span>{med.name}</span>
                        <span className="text-xs font-mono text-rose-300 bg-rose-950 px-2 py-0.2 rounded border border-rose-800">
                          {med.dose}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-rose-400 uppercase font-bold bg-rose-950/60 px-2 py-0.5 rounded">
                        Экстренно
                      </span>
                    </div>

                    <p className="text-xs text-rose-200/90 leading-relaxed font-mono bg-rose-950/30 p-2 rounded border border-rose-900/50">
                      🚨 {med.comment}
                    </p>

                    <div className="text-[11px] text-slate-400 flex justify-between items-center">
                      <span>Назначение: {med.note}</span>
                      <button className="px-2.5 py-1 bg-rose-900/80 hover:bg-rose-800 text-white rounded text-[11px] font-semibold cursor-pointer">
                        Зафиксировать прием
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* SUB-TAB 2: MEASUREMENTS (ИЗМЕРЕНИЯ) */}
      {plannerTab === 'measurements' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span>Ежедневные Дневниковые Записи и Измерения</span>
              </h4>
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                Синхронизировано с IoT (Omron BLE / Withings)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DAILY_MEASUREMENTS.map((rec) => (
                <div key={rec.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                    <span>{rec.parameter}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{rec.time}</span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-bold font-mono text-white">{rec.value}</span>
                      <span className="text-xs text-slate-400 font-mono">{rec.unit}</span>
                    </div>

                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      В норме ✓
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 border-t border-slate-900 pt-1.5 flex justify-between">
                    <span>Целевой коридор: {rec.targetRange}</span>
                  </div>

                  {rec.note && (
                    <div className="text-[11px] text-slate-300 bg-slate-900 p-2 rounded font-sans">
                      💡 {rec.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: MANIPULATIONS (МАНИПУЛЯЦИИ) */}
      {plannerTab === 'manipulations' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Scissors className="w-4 h-4 text-amber-400" />
                <span>График Медицинских Процедур и Манипуляций</span>
              </h4>
              <span className="text-xs font-mono text-slate-400">
                Контроль выполнения сестринских назначений
              </span>
            </div>

            <div className="space-y-3">
              {SCHEDULED_MANIPULATIONS.map((man) => (
                <div key={man.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="font-bold text-sm text-white flex items-center gap-2">
                      <span>{man.title}</span>
                      <span className="text-xs font-mono bg-amber-500/20 text-amber-300 px-2 py-0.2 rounded border border-amber-500/30">
                        {man.time}
                      </span>
                    </div>

                    <span className="text-xs font-mono text-slate-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 self-start sm:self-auto">
                      Частота: {man.frequency}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans bg-slate-900/60 p-2.5 rounded border border-slate-800">
                    {man.description}
                  </p>

                  <div className="flex items-center justify-between text-xs font-mono pt-1 text-slate-400">
                    <span>Следующее выполнение: {man.nextDate}</span>
                    <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-sans font-semibold cursor-pointer">
                      Отметить выполнение ✓
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: EVENTS (СОБЫТИЯ И ВКС) */}
      {plannerTab === 'events' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>Запланированные Визиты, ВКС и Заборы Лабораторных Анализов</span>
              </h4>
              <span className="text-xs font-mono text-indigo-300 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                Календарная синхронизация
              </span>
            </div>

            <div className="space-y-3">
              {SCHEDULED_EVENTS.map((evt) => (
                <div key={evt.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="font-bold text-sm text-white flex items-center gap-2">
                      {evt.type === 'vks' && <Video className="w-4 h-4 text-indigo-400 shrink-0" />}
                      {evt.type === 'lab' && <Activity className="w-4 h-4 text-emerald-400 shrink-0" />}
                      {evt.type === 'doctor' && <FileText className="w-4 h-4 text-blue-400 shrink-0" />}
                      <span>{evt.title}</span>
                    </div>

                    <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/60 shrink-0">
                      {evt.dateTime}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 space-y-1 font-mono bg-slate-900/60 p-2.5 rounded border border-slate-800">
                    <div>📍 Место: {evt.location}</div>
                    <div>👨‍⚕️ Врач / Организация: {evt.doctor}</div>
                    {evt.note && <div className="text-slate-400 font-sans mt-1">💡 {evt.note}</div>}
                  </div>

                  {evt.attachments && evt.attachments.length > 0 && (
                    <div className="flex items-center gap-2 text-xs font-mono text-blue-300 pt-1">
                      <span className="text-slate-400">Прикрепленные файлы:</span>
                      {evt.attachments.map((file, idx) => (
                        <span key={idx} className="bg-blue-950 px-2 py-0.5 rounded border border-blue-800 hover:underline cursor-pointer">
                          📎 {file}
                        </span>
                      ))}
                    </div>
                  )}

                  {evt.type === 'vks' && (
                    <div className="pt-2 flex justify-end">
                      <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-md">
                        <Video className="w-4 h-4" />
                        <span>Подключиться к ВКС-Консультации</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
