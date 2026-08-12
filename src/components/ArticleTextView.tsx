import React, { useState } from 'react';
import { REFERENCES } from '../data/architectureData';
import { Copy, Check, FileText, Download } from 'lucide-react';

export const ArticleTextView: React.FC = () => {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const fullArticleText = `Разворот ИТ-архитектуры: МИС пациента и партисипативность

Проблема. Текущая информатизация в медицине построена вокруг организации, а не пациента:
• МИС медорганизации акцентирована на управлении ресурсами и задачами учреждения: медицинские услуги, назначения, заключения, логистика, финансово-хозяйственные блоки, статистика и аналитика. Срез помощи — «сколько мы оказали услуг».
• МИС регионального уровня акцентирована на управлении ресурсами и задачами региона: оперирование организационными срезами по населению — сколько пролечили, сколько вылечили, выявление проблем ресурсного обеспечения, статистика заболеваемости. Срез — «управление медпомощью на территории».
• МИС на уровне потребителя — практически отсутствует. Акцент на конкретном человеке, с учётом его потребностей и ресурсов (которые часто противоречат друг другу). Пока это развивающийся срез, ограниченный, как правило, дистанционным мониторингом по одному показателю, без реального учёта всей картины.

Новый подход. Значимое изменение ИТ-архитектуры: в центре — не организация и не регион, а человек. МИС пациента как «персональный помощник», вокруг которого выстраиваются сервисы организаций и региона, а не наоборот. Партисипативность медицины.

6.1. Архитектура МИС пациента (предполагаемая концепция):
6.1.1. Единый персональный health-профиль — Вся медицинская история пациента за жизнь в структурированном виде, доступная самому пациенту и (по согласию) любому специалисту.
6.1.2. Единый лист назначений — Сводный, прозрачный для пациента и специалистов перечень всех назначений: терапия, исследования, манипуляции, рекомендации по образу жизни. Единый источник правды, прозрачный и для пациента, и для всех специалистов, участвующих в ведении, исключающий дублирование и противоречия и «потерю» назначений при передаче между специалистами.
6.1.3. Наглядная визуализация — Удобное отображение динамики показателей, эффекта терапии, результатов исследований. Графики, тренды, цветовое кодирование нормы/отклонения. Связь «приём препарата → изменение показателя». Врач видит траекторию за 6–12 месяцев.
6.1.4. Персональный ассистент — Напоминания о приёме препаратов, подготовка к визитам, навигация по назначениям, обратная связь.
6.1.5. ИИ-консультант для пациента — Объяснение назначений, ответы на вопросы, навигация в данных. Только просвещение и поддержка (без диагноза).
6.1.6. Живая обратная связь — Пациент как участник процесса. Возможность сообщить о побочном эффекте, задать вопрос.
6.1.7. Экстренный вызов — Сигнал тревоги для вызова неотложной помощи или сообщения уполномоченным контактам.
6.1.8. Интеграция с «немедицинскими» сервисами — Тонометры, весы, шаги, качество сна, умные колонки.

Позиция: Без реализации элементов 6.1.2, 6.1.3, 6.1.4 любая МИС пациента остаётся «чёрным ящиком» для самого пациента — а значит, не обеспечивает ни приверженности, ни партисипативности.

6.2. Федеративный подход к обучению моделей:
• Уровень организации: накопление и обработка данных, обучение моделей с учётом специфики, отправка в центральный узел.
• Региональный уровень: сбор «навыков» с особенностями регионов в сводные базы знаний, дообучение, рассылка.
• Уровень пациента: использование дообученных моделей на персональных устройствах.
• Данные не покидают контур организации — перемещаются только «веса» модели.

6.3. Право пациента на данные. 
Пациент — собственник данных. Получение в машиночитаемом формате (FHIR). Гранулярные настройки доступа («кардиолог видит всё, работодатель — только факт нетрудоспособности»).`;

  const copyToClipboard = (text: string, formatName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(formatName);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 md:p-6 space-y-6">
      
      {/* Header Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-blue-600/20 text-blue-300 border border-blue-500/30 text-xs font-mono mb-1">
            Текстовый Материал Статьи
          </div>
          <h2 className="text-xl font-bold text-white">Текст концепции и Список Литературы</h2>
          <p className="text-xs text-slate-300">
            Готовый научный текст для вставки в статьи (ВАК / RSCI), доклады и аннотации
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => copyToClipboard(fullArticleText, 'plain')}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
          >
            {copiedFormat === 'plain' ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            <span>Скопировать Текст</span>
          </button>
        </div>
      </div>

      {/* Main Text Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Full Concept Text (8 cols) */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-sm uppercase text-slate-400 font-mono border-b border-slate-800 pb-2">
            Разворот ИТ-архитектуры: МИС Пациента и Партисипативность
          </h3>

          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
            {fullArticleText}
          </div>
        </div>

        {/* Right Column: Numbered Bibliography (4 cols) */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="font-bold text-sm uppercase text-slate-400 font-mono">
              Список Литературы
            </h3>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {REFERENCES.map((ref) => (
              <div key={ref.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-blue-400 font-bold">
                  <span>{ref.citation}</span>
                  <span className="text-[10px] text-slate-500">{ref.year}</span>
                </div>
                <div className="text-slate-200 font-semibold">{ref.authors}</div>
                <div className="text-slate-400 text-[11px] leading-snug">{ref.title}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
