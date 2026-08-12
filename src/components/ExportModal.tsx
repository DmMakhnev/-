import React, { useState } from 'react';
import { X, Download, Code, FileCode, Printer, Check, Copy, Presentation, FileDown, Loader2, Image } from 'lucide-react';
import { ARCH_MODULES, FEDERATED_LAYERS, PARADIGM_SHIFT } from '../data/architectureData';
import { exportToPdf, exportToPptx, exportToPng } from '../utils/exportUtils';
import { ViewMode } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeView?: ViewMode;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, activeView = 'slide' }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const targetElementId = activeView === 'diagram' 
    ? 'diagram-view-canvas' 
    : 'presentation-slide-canvas';

  const handlePdfExport = async () => {
    try {
      setIsExporting(true);
      setStatusMessage('Формирование PDF высокого разрешения...');
      await exportToPdf(targetElementId, {
        fileName: `mis-patient-slide-${activeView}-${Date.now()}.pdf`,
        onProgress: (msg) => setStatusMessage(msg)
      });
    } catch (err: unknown) {
      console.error('PDF export error:', err);
      alert('Произошла ошибка при экспорте в PDF. Проверьте видимость элемента на экране.');
    } finally {
      setIsExporting(false);
      setStatusMessage(null);
    }
  };

  const handlePptxExport = async () => {
    try {
      setIsExporting(true);
      setStatusMessage('Создание файла презентации PowerPoint (.pptx)...');
      await exportToPptx(targetElementId, {
        fileName: `mis-patient-presentation-${Date.now()}.pptx`,
        onProgress: (msg) => setStatusMessage(msg)
      });
    } catch (err: unknown) {
      console.error('PPTX export error:', err);
      alert('Произошла ошибка при создании PowerPoint файла.');
    } finally {
      setIsExporting(false);
      setStatusMessage(null);
    }
  };

  const handlePngExport = async () => {
    try {
      setIsExporting(true);
      setStatusMessage('Создание изображения PNG...');
      await exportToPng(targetElementId, {
        fileName: `mis-patient-slide-${Date.now()}.png`,
        onProgress: (msg) => setStatusMessage(msg)
      });
    } catch (err: unknown) {
      console.error('PNG export error:', err);
      alert('Произошла ошибка при генерации изображения.');
    } finally {
      setIsExporting(false);
      setStatusMessage(null);
    }
  };

  const jsonExportData = JSON.stringify(
    {
      title: 'Архитектура МИС Пациента и Партисипативность',
      version: '6.1-6.3',
      corePrerequisites: ['6.1.2', '6.1.3', '6.1.4'],
      modules: ARCH_MODULES,
      federatedAI: FEDERATED_LAYERS,
      paradigmShift: PARADIGM_SHIFT
    },
    null,
    2
  );

  const svgDiagramString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 768" width="1024" height="768">
  <rect width="1024" height="768" fill="#0f172a"/>
  <!-- Slide Header -->
  <text x="32" y="45" font-family="sans-serif" font-size="20" font-weight="bold" fill="#ffffff">Разворот ИТ-архитектуры: МИС Пациента и Партисипативность</text>
  <text x="32" y="68" font-family="sans-serif" font-size="12" fill="#94a3b8">Человекоцентричная система здравоохранения (4:3)</text>
  
  <!-- Paradigm Shift Header Bar -->
  <rect x="32" y="85" width="300" height="38" rx="8" fill="#1e293b" stroke="#334155"/>
  <text x="45" y="108" font-family="sans-serif" font-size="11" fill="#cbd5e1">МИС Медорганизации (ЛПУ)</text>
  
  <rect x="348" y="85" width="300" height="38" rx="8" fill="#1e293b" stroke="#334155"/>
  <text x="360" y="108" font-family="sans-serif" font-size="11" fill="#cbd5e1">МИС Региона (ГИСЗ)</text>
  
  <rect x="664" y="85" width="328" height="38" rx="8" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
  <text x="676" y="108" font-family="sans-serif" font-size="11" font-weight="bold" fill="#6ee7b7">МИС Пациента (В центре)</text>

  <!-- Core Modules Box -->
  <rect x="32" y="135" width="420" height="560" rx="12" fill="#451a03" opacity="0.3" stroke="#f59e0b" stroke-width="2"/>
  <text x="48" y="165" font-family="sans-serif" font-size="13" font-weight="bold" fill="#fbbf24">ОБЯЗАТЕЛЬНОЕ ЯДРО (6.1.2, 6.1.3, 6.1.4)</text>

  <rect x="48" y="185" width="388" height="140" rx="8" fill="#1e293b" stroke="#f59e0b"/>
  <text x="64" y="215" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">6.1.2 Единый лист назначений</text>
  <text x="64" y="240" font-family="sans-serif" font-size="11" fill="#94a3b8">Единый источник правды по всей терапии</text>

  <rect x="48" y="340" width="388" height="140" rx="8" fill="#1e293b" stroke="#f59e0b"/>
  <text x="64" y="370" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">6.1.3 Наглядная визуализация</text>
  <text x="64" y="395" font-family="sans-serif" font-size="11" fill="#94a3b8">Динамика 6-12 месяцев: прием -> результат</text>

  <rect x="48" y="495" width="388" height="180" rx="8" fill="#1e293b" stroke="#f59e0b"/>
  <text x="64" y="525" font-family="sans-serif" font-size="13" font-weight="bold" fill="#ffffff">6.1.4 Персональный ассистент</text>
  <text x="64" y="550" font-family="sans-serif" font-size="11" fill="#94a3b8">Напоминания, навигация, приверженность</text>

  <!-- Footnote -->
  <text x="32" y="720" font-family="sans-serif" font-size="11" fill="#fbbf24">Без реализации 6.1.2, 6.1.3, 6.1.4 МИС остается "черным ящиком".</text>
</svg>`;

  const copyText = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const downloadFile = (content: string, fileName: string, contentType: string) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-base">Экспорт Слайда & Презентации</h3>
          </div>

          <button
            onClick={onClose}
            disabled={isExporting}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status bar if exporting */}
        {isExporting && statusMessage && (
          <div className="bg-blue-950/80 border-b border-blue-800/80 px-4 py-2 text-xs text-blue-200 flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-blue-400 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Body */}
        <div className="p-6 space-y-4 text-xs text-slate-200 overflow-y-auto">
          
          {/* PPTX Presentation Export */}
          <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/30 flex items-center justify-between gap-3 shadow-sm hover:border-amber-500/60 transition-all">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
                <Presentation className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  Презентация PowerPoint (.PPTX)
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">PptxGenJS</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Полная слайд-презентация с векторными блоками, ядром 6.1.2–6.1.4, таблицами сравнения и визуальным слайдом.
                </p>
              </div>
            </div>
            <button
              onClick={handlePptxExport}
              disabled={isExporting}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-xs font-bold text-white flex items-center gap-1.5 shrink-0 shadow-xs disabled:opacity-50 transition-all"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileDown className="w-4 h-4" />}
              <span>.PPTX</span>
            </button>
          </div>

          {/* PDF Slide Export */}
          <div className="p-4 rounded-xl bg-slate-950 border border-blue-500/30 flex items-center justify-between gap-3 shadow-sm hover:border-blue-500/60 transition-all">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 shrink-0">
                <FileDown className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white text-sm flex items-center gap-2">
                  Слайд PDF высокого качества (.PDF)
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">jsPDF</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Прямой экспорт текущего вида ({activeView === 'diagram' ? 'Схема' : 'Слайд 16:9'}) в векторно-пиксельный документ PDF 16:9.
                </p>
              </div>
            </div>
            <button
              onClick={handlePdfExport}
              disabled={isExporting}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white flex items-center gap-1.5 shrink-0 shadow-xs disabled:opacity-50 transition-all"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span>.PDF</span>
            </button>
          </div>

          {/* High-Res PNG Image Export */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Image className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="font-bold text-white">Изображение высокой четкости (.PNG)</div>
                <p className="text-[11px] text-slate-400">Снимок текущего экрана для вставки в статьи и отчёты</p>
              </div>
            </div>
            <button
              onClick={handlePngExport}
              disabled={isExporting}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white disabled:opacity-50"
            >
              .PNG
            </button>
          </div>

          {/* SVG Code / Download */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <FileCode className="w-4 h-4 text-sky-400 shrink-0" />
              <div>
                <div className="font-bold text-white">Векторная SVG-схема</div>
                <p className="text-[11px] text-slate-400">Векторная схема для статей ВАК/Scopus</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={() => copyText(svgDiagramString, 'svg')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1"
              >
                {copiedType === 'svg' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Код</span>
              </button>
              <button
                onClick={() => downloadFile(svgDiagramString, 'mis-patient-architecture.svg', 'image/svg+xml')}
                className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-xs font-semibold text-white"
              >
                .SVG
              </button>
            </div>
          </div>

          {/* JSON Schema */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Code className="w-4 h-4 text-indigo-400 shrink-0" />
              <div>
                <div className="font-bold text-white">JSON Манифест Архитектуры</div>
                <p className="text-[11px] text-slate-400">Машиночитаемый спецификация 8 модулей</p>
              </div>
            </div>
            <div className="flex gap-1.5">
              <button
                onClick={() => copyText(jsonExportData, 'json')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1"
              >
                {copiedType === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Код</span>
              </button>
              <button
                onClick={() => downloadFile(jsonExportData, 'mis-patient-schema.json', 'application/json')}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white"
              >
                .JSON
              </button>
            </div>
          </div>

          {/* Browser Print / PDF */}
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Printer className="w-4 h-4 text-slate-400 shrink-0" />
              <div>
                <div className="font-bold text-white">Печать браузера</div>
                <p className="text-[11px] text-slate-400">Стандартный диалог печати страниц</p>
              </div>
            </div>
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Печать</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

