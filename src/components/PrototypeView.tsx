import React, { useState } from 'react';
import { 
  Pill, 
  TrendingUp, 
  Bell, 
  Bot, 
  AlertTriangle, 
  Activity, 
  ShieldCheck, 
  MessageSquare, 
  Sparkles
} from 'lucide-react';
import { UnifiedPrescriptionPlanner } from './UnifiedPrescriptionPlanner';
import { DynamicResultsVisualizer } from './DynamicResultsVisualizer';

interface PrototypeViewProps {
  initialTab?: 'prescriptions' | 'trends' | 'assistant' | 'ai' | 'access';
}

export const PrototypeView: React.FC<PrototypeViewProps> = ({ initialTab = 'prescriptions' }) => {
  const [activeTab, setActiveTab] = useState<'prescriptions' | 'trends' | 'assistant' | 'ai' | 'access'>(initialTab);
  const [selectedMed, setSelectedMed] = useState<string>('Аторвастатин 20мг');
  const [sosTriggered, setSosTriggered] = useState<boolean>(false);
  const [userSideEffect, setUserSideEffect] = useState<string>('');
  const [submittedSideEffect, setSubmittedSideEffect] = useState<boolean>(false);

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      
      {/* Intro Banner */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono mb-1">
            Живая Эмуляция МИС Пациента
          </div>
          <h2 className="text-xl font-bold text-white">Интерактивный Прототип Интерфейса Пациента</h2>
          <p className="text-xs text-slate-300">
            Демонстрация сквозной работы 8 модулей в едином человекоцентричном приложении
          </p>
        </div>

        {/* SOS Button (6.1.7) */}
        <button
          onClick={() => setSosTriggered(!sosTriggered)}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
            sosTriggered 
              ? 'bg-rose-600 text-white animate-pulse ring-4 ring-rose-500/50' 
              : 'bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800/80'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>6.1.7 Экстренный вызов (SOS)</span>
        </button>
      </div>

      {sosTriggered && (
        <div className="p-4 rounded-xl bg-rose-950/90 border border-rose-500 text-rose-200 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <span className="font-bold">АКТИВИРОВАН КРИТИЧЕСКИЙ СИГНАЛ ТРЕВОГИ</span>
              <p className="text-[11px] text-rose-300">
                Передана геолокация и профиль (6.1.1, 6.1.2) в скорую помощь (112) и лечащему кардиологу. Доступ 6.3 временно разблокирован для СМП.
              </p>
            </div>
          </div>
          <button 
            onClick={() => setSosTriggered(false)}
            className="px-3 py-1 bg-rose-900 hover:bg-rose-800 rounded text-[11px] font-semibold cursor-pointer"
          >
            Сброс
          </button>
        </div>
      )}

      {/* Main Prototype Layout: Left Navigation + Main Phone Frame Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Module Switcher Tabs (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold uppercase text-slate-400 px-1">Модули в действии</div>
          
          {[
            { id: 'prescriptions', title: '6.1.2 Единый лист назначений', desc: 'Терапия (из XLS), измерения, манипуляции и события', icon: <Pill className="w-4 h-4 text-amber-400" /> },
            { id: 'trends', title: '6.1.3 Визуализация (результаты)', desc: 'Динамика АД, глюкозы, веса, шагов с "коридором нормы"', icon: <TrendingUp className="w-4 h-4 text-emerald-400" /> },
            { id: 'assistant', title: '6.1.4 Персональный ассистент', desc: 'Уведомления, график приёма, приверженность', icon: <Bell className="w-4 h-4 text-blue-400" /> },
            { id: 'ai', title: '6.1.5 ИИ-Консультант', desc: 'Разъяснение назначений понятным языком', icon: <Bot className="w-4 h-4 text-indigo-400" /> },
            { id: 'access', title: '6.3 Контроль доступа', desc: 'Гранулярная матрица разрешений для врачей', icon: <ShieldCheck className="w-4 h-4 text-teal-400" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3 cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600/20 border-blue-500 text-white font-semibold shadow-md'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 shrink-0 mt-0.5">
                {tab.icon}
              </div>
              <div>
                <div className="text-xs font-bold">{tab.title}</div>
                <div className="text-[11px] text-slate-400 font-normal">{tab.desc}</div>
              </div>
            </button>
          ))}

          {/* IoT Status Widget (6.1.8) */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 mt-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-violet-400" />
                <span>6.1.8 Интеграция IoT Устройств</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">В сети</span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-400 font-mono">
              <div className="flex justify-between p-1 bg-slate-950 rounded">
                <span>Тонометр Omron BLE:</span>
                <span className="text-slate-200">128/82 мм рт.ст.</span>
              </div>
              <div className="flex justify-between p-1 bg-slate-950 rounded">
                <span>Смарт-весы Withings:</span>
                <span className="text-slate-200">74.2 кг (-0.4 кг)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Prototype Main View Area (8 cols) */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-2xl p-5 md:p-6 min-h-[480px]">
          
          {/* TAB 1: Unified Prescriptions (6.1.2) */}
          {activeTab === 'prescriptions' && (
            <UnifiedPrescriptionPlanner />
          )}

          {/* TAB 2: Dynamic Trends Visualizer (6.1.3) */}
          {activeTab === 'trends' && (
            <DynamicResultsVisualizer />
          )}

          {/* TAB 3: Personal Assistant (6.1.4) */}
          {activeTab === 'assistant' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  Персональный Ассистент и Напоминания (6.1.4)
                </h3>
                <p className="text-xs text-slate-400">График приёма лекарств и подготовка к визитам</p>
              </div>

              <div className="space-y-2.5">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-blue-500/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-600 text-white font-mono font-bold text-xs">20:00</div>
                    <div>
                      <div className="font-bold text-xs text-white">Аторвастатин 20мг</div>
                      <div className="text-[11px] text-slate-400">1 таблетка после ужина</div>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold cursor-pointer">
                    Принято ✓
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between opacity-80">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-800 text-slate-300 font-mono font-bold text-xs">Завтра 08:00</div>
                    <div>
                      <div className="font-bold text-xs text-white">Периндоприл 5мг</div>
                      <div className="text-[11px] text-slate-400">1 таблетка натощак</div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">Ожидает</span>
                </div>
              </div>

              {/* Side Effect Reporting (6.1.6) */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <span className="font-bold text-xs text-slate-200 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-teal-400" />
                  6.1.6 Живая обратная связь (Сообщить о побочном эффекте)
                </span>
                
                {submittedSideEffect ? (
                  <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-200">
                    Сообщение отправлено лечащему врачу. Статус записан в лист безопасности.
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Например: легкое головокружение после приема..."
                      value={userSideEffect}
                      onChange={(e) => setUserSideEffect(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-blue-500"
                    />
                    <button 
                      onClick={() => setSubmittedSideEffect(true)}
                      className="px-3 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      Отправить
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: Gemini AI Consultant (6.1.5) */}
          {activeTab === 'ai' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  6.1.5 ИИ-Консультант для Пациента
                  <span className="text-xs font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">
                    Просвещение без постановки диагноза
                  </span>
                </h3>
              </div>

              <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 space-y-3">
                <div className="flex items-center gap-2 text-xs text-indigo-300 font-bold">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Пояснение назначения: {selectedMed}</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 leading-relaxed space-y-2">
                  <p>
                    <strong>Зачем назначен:</strong> Аторвастатин снижает уровень «плохого» холестерина в крови, укрепляет сосудистую стенку и снижает риск инфаркта и инсульта.
                  </p>
                  <p>
                    <strong>Почему важен регулярный прием:</strong> Действие препарата накопительное. Если бросить прием, холестерин вернется к исходному высокому уровню за 2-3 недели.
                  </p>
                  <p className="text-[11px] text-slate-400 italic">
                    * Пояснение сформировано на основе официальной инструкции. Не является отменой или заменой консультации лечащего врача.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Granular Access Control (6.3) */}
          {activeTab === 'access' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  6.3 Управление Правами и Согласием
                  <span className="text-xs font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                    Пациент = Единственный владелец
                  </span>
                </h3>
              </div>

              <div className="space-y-2">
                {[
                  { title: 'Кардиологический центр', role: 'Профильный врач', access: 'Полный доступ ко всей истории', active: true },
                  { title: 'Поликлиника №4 (Терапевт)', role: 'Лечащий врач', access: 'Полный доступ ко всем исследованиям', active: true },
                  { title: 'Работодатель (ООО «Вектор»)', role: 'Кадровый орган', access: 'Только факт больничного (без диагноза)', active: false },
                  { title: 'Страховая компания', role: 'ДМС инспектор', access: 'Акт оказанных услуг без анамнеза', active: false },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{item.title} ({item.role})</div>
                      <div className="text-slate-400">{item.access}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        item.active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {item.active ? 'Разрешено' : 'Ограничено'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
