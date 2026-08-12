import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import pptxgen from 'pptxgenjs';
import { ARCH_MODULES, FEDERATED_LAYERS, PARADIGM_SHIFT } from '../data/architectureData';

export interface ExportOptions {
  fileName?: string;
  onProgress?: (msg: string) => void;
}

/**
 * Capture an HTML element by ID into a high-res HTML Canvas
 */
export async function captureElementToCanvas(elementId: string): Promise<HTMLCanvasElement> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Элемент с id "${elementId}" не найден на странице.`);
  }

  // Preserve styles during capture
  const canvas = await html2canvas(element, {
    scale: 2, // High resolution for crisp presentations
    useCORS: true,
    logging: false,
    backgroundColor: '#0f172a'
  });

  return canvas;
}

/**
 * Download the current Slide or Diagram as a high-quality 4:3 PDF file
 */
export async function exportToPdf(elementId: string = 'presentation-slide-canvas', options?: ExportOptions): Promise<void> {
  if (options?.onProgress) options.onProgress('Рендеринг снимка в высоком разрешении...');

  const canvas = await captureElementToCanvas(elementId);
  const imgData = canvas.toDataURL('image/png', 1.0);

  if (options?.onProgress) options.onProgress('Формирование PDF слайда...');

  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'px',
    format: [canvas.width / 2, canvas.height / 2]
  });

  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);

  const name = options?.fileName || `mis-patient-slide-${Date.now()}.pdf`;
  pdf.save(name);
}

/**
 * Download as high-res PNG image
 */
export async function exportToPng(elementId: string = 'presentation-slide-canvas', options?: ExportOptions): Promise<void> {
  if (options?.onProgress) options.onProgress('Создание снимка экрана...');

  const canvas = await captureElementToCanvas(elementId);
  const imgData = canvas.toDataURL('image/png', 1.0);

  const a = document.createElement('a');
  a.href = imgData;
  a.download = options?.fileName || `mis-patient-slide-${Date.now()}.png`;
  a.click();
}

/**
 * Generate a high-quality PPTX presentation deck in 4:3 format with native shapes, text, tables,
 * and high-resolution captured visual slide.
 */
export async function exportToPptx(elementId: string = 'presentation-slide-canvas', options?: ExportOptions): Promise<void> {
  if (options?.onProgress) options.onProgress('Захвачен визуальный слайд...');

  let visualImageData: string | null = null;
  try {
    const canvas = await captureElementToCanvas(elementId);
    visualImageData = canvas.toDataURL('image/png', 0.95);
  } catch (err) {
    console.warn('Visual capture skipped or failed, proceeding with native PPTX generation:', err);
  }

  if (options?.onProgress) options.onProgress('Генерация PowerPoint presentation (.pptx) 4:3...');

  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_4x3';
  pptx.author = 'Зарубина, Гусев, Шляхто';
  pptx.company = 'МИС Пациента';
  pptx.title = 'Архитектура МИС Пациента и Партисипативность';

  const shapeRect = pptx.ShapeType.rect;

  // --- Slide 1: Title Slide ---
  const slide1 = pptx.addSlide();
  slide1.background = { color: '0F172A' };

  slide1.addText('АРХИТЕКТУРНЫЙ РАЗВОРОТ (4:3)', {
    x: 0.6,
    y: 0.6,
    w: 8.8,
    h: 0.4,
    fontSize: 12,
    color: '3B82F6',
    bold: true,
    charSpacing: 2
  });

  slide1.addText('Архитектура МИС Пациента и Партисипативность', {
    x: 0.6,
    y: 1.1,
    w: 8.8,
    h: 1.3,
    fontSize: 24,
    bold: true,
    color: 'FFFFFF',
    lineSpacing: 28
  });

  slide1.addText('Человекоцентричная ИТ-архитектура здравоохранения', {
    x: 0.6,
    y: 2.5,
    w: 8.8,
    h: 0.6,
    fontSize: 14,
    color: '94A3B8'
  });

  // Core prerequisites box on Title Slide
  slide1.addShape(shapeRect, {
    x: 0.6,
    y: 3.3,
    w: 8.8,
    h: 3.6,
    fill: { color: '1E293B' },
    line: { color: 'F59E0B', width: 2 }
  });

  slide1.addText('ОБЯЗАТЕЛЬНОЕ ЯДРО (6.1.2 Единый лист назначений + 6.1.3 Визуализация + 6.1.4 Персональный ассистент)', {
    x: 0.8,
    y: 3.5,
    w: 8.4,
    h: 0.6,
    fontSize: 13,
    bold: true,
    color: 'FBBF24'
  });

  slide1.addText('Без реализации данных компонентов МИС остается "черным ящиком". Пациент переводится из "объекта медицинского вмешательства" в активного владельца данных и участника терапии.', {
    x: 0.8,
    y: 4.2,
    w: 8.4,
    h: 2.4,
    fontSize: 12,
    color: 'CBD5E1',
    lineSpacing: 18
  });

  // --- Slide 2: High-Res Visual Slide (Captured Canvas) ---
  if (visualImageData) {
    const slide2 = pptx.addSlide();
    slide2.background = { color: '0F172A' };
    slide2.addImage({
      data: visualImageData,
      x: 0,
      y: 0,
      w: '100%',
      h: '100%'
    });
  }

  // --- Slide 3: Core Prerequisites Deep Dive ---
  const slide3 = pptx.addSlide();
  slide3.background = { color: '0F172A' };

  slide3.addText('КЛЮЧЕВЫЕ МОДУЛИ ОБЯЗАТЕЛЬНОГО ЯДРА (6.1.2 - 6.1.4)', {
    x: 0.6,
    y: 0.5,
    w: 8.8,
    h: 0.5,
    fontSize: 18,
    bold: true,
    color: 'FFFFFF'
  });

  const coreModules = ARCH_MODULES.filter(m => m.isCore);
  coreModules.forEach((m, idx) => {
    const colX = 0.6 + idx * 3.0;

    slide3.addShape(shapeRect, {
      x: colX,
      y: 1.2,
      w: 2.8,
      h: 5.8,
      fill: { color: '1E293B' },
      line: { color: 'F59E0B', width: 2 }
    });

    slide3.addText(`МОДУЛЬ ${m.code}`, {
      x: colX + 0.15,
      y: 1.4,
      w: 2.5,
      h: 0.3,
      fontSize: 11,
      bold: true,
      color: 'FBBF24'
    });

    slide3.addText(m.title, {
      x: colX + 0.15,
      y: 1.7,
      w: 2.5,
      h: 0.7,
      fontSize: 14,
      bold: true,
      color: 'FFFFFF'
    });

    slide3.addText(m.description, {
      x: colX + 0.15,
      y: 2.5,
      w: 2.5,
      h: 2.2,
      fontSize: 10,
      color: 'CBD5E1'
    });

    slide3.addText(`Влияние на пациента:\n${m.patientImpact}`, {
      x: colX + 0.15,
      y: 4.8,
      w: 2.5,
      h: 1.8,
      fontSize: 10,
      color: '34D399'
    });
  });

  // --- Slide 4: Paradigm Shift Comparison Table ---
  const slide4 = pptx.addSlide();
  slide4.background = { color: '0F172A' };

  slide4.addText('СДВИГ ПАРАДИГМЫ: ТРАДИЦИОННАЯ МИС vs МИС ПАЦИЕНТА', {
    x: 0.6,
    y: 0.5,
    w: 8.8,
    h: 0.5,
    fontSize: 16,
    bold: true,
    color: 'FFFFFF'
  });

  const tableRows: pptxgen.TableRow[] = [
    [
      { text: 'Критерий', options: { bold: true, fill: { color: '1E293B' }, color: 'FFFFFF', fontSize: 10 } },
      { text: 'МИС ЛПУ', options: { bold: true, fill: { color: '1E293B' }, color: '94A3B8', fontSize: 10 } },
      { text: 'МИС Региона', options: { bold: true, fill: { color: '1E293B' }, color: '94A3B8', fontSize: 10 } },
      { text: 'МИС Пациента', options: { bold: true, fill: { color: '064E3B' }, color: '34D399', fontSize: 10 } }
    ]
  ];

  PARADIGM_SHIFT.forEach((item) => {
    tableRows.push([
      { text: item.attribute, options: { bold: true, color: 'F8FAFC', fill: { color: '0F172A' }, fontSize: 9 } },
      { text: item.orgMIS, options: { color: '94A3B8', fill: { color: '0F172A' }, fontSize: 9 } },
      { text: item.regionalMIS, options: { color: '94A3B8', fill: { color: '0F172A' }, fontSize: 9 } },
      { text: item.patientMIS, options: { color: '6EE7B7', fill: { color: '022C22' }, fontSize: 9, bold: true } }
    ]);
  });

  slide4.addTable(tableRows, {
    x: 0.6,
    y: 1.2,
    w: 8.8,
    colW: [2.0, 2.2, 2.2, 2.4],
    border: { pt: 1, color: '334155' }
  });

  // --- Slide 5: Federated AI & Privacy Architecture ---
  const slide5 = pptx.addSlide();
  slide5.background = { color: '0F172A' };

  slide5.addText('ФЕДЕРАТИВНЫЙ ИИ И БЕЗОПАСНОСТЬ ДАННЫХ (Federated Learning)', {
    x: 0.6,
    y: 0.5,
    w: 8.8,
    h: 0.5,
    fontSize: 16,
    bold: true,
    color: 'FFFFFF'
  });

  FEDERATED_LAYERS.forEach((layer, idx) => {
    const rowY = 1.2 + idx * 1.8;

    slide5.addShape(shapeRect, {
      x: 0.6,
      y: rowY,
      w: 8.8,
      h: 1.6,
      fill: { color: '1E293B' },
      line: { color: '3B82F6', width: 1 }
    });

    slide5.addText(layer.title, {
      x: 0.8,
      y: rowY + 0.2,
      w: 8.4,
      h: 0.3,
      fontSize: 13,
      bold: true,
      color: '60A5FA'
    });

    slide5.addText(layer.description, {
      x: 0.8,
      y: rowY + 0.55,
      w: 8.4,
      h: 0.9,
      fontSize: 10,
      color: 'CBD5E1'
    });
  });

  const name = options?.fileName || `mis-patient-presentation-${Date.now()}.pptx`;
  await pptx.writeFile({ fileName: name });
}
