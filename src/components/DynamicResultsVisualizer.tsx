import React, { useState } from 'react';
import { 
  TrendingUp, 
  Activity, 
  Calendar, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  Maximize2, 
  Filter,
  Sparkles,
  Layers
} from 'lucide-react';
import { 
  TREND_PARAMETERS, 
  TimeframePeriod, 
  ParameterTrendConfig, 
  DataPoint 
} from '../data/trendData';

export const DynamicResultsVisualizer: React.FC = () => {
  const [selectedParamId, setSelectedParamId] = useState<'bp' | 'glucose' | 'weight' | 'steps'>('bp');
  const [timeframe, setTimeframe] = useState<TimeframePeriod>('week');
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);

  const currentParam: ParameterTrendConfig = 
    TREND_PARAMETERS.find((p) => p.id === selectedParamId) || TREND_PARAMETERS[0];

  const currentData: DataPoint[] = currentParam.dataByTimeframe[timeframe] || [];

  // Helper calculation for SVG Y-coordinates
  // Find min and max for scaling SVG
  let allVals: number[] = [];
  currentData.forEach((d) => {
    allVals.push(d.value);
    if (d.secondaryValue !== undefined) allVals.push(d.secondaryValue);
  });
  allVals.push(currentParam.corridorMin, currentParam.corridorMax);
  if (currentParam.secondaryCorridorMin !== undefined) allVals.push(currentParam.secondaryCorridorMin);
  if (currentParam.secondaryCorridorMax !== undefined) allVals.push(currentParam.secondaryCorridorMax);

  const dataMin = Math.min(...allVals);
  const dataMax = Math.max(...allVals);
  const padding = (dataMax - dataMin) * 0.15 || 10;
  const yMin = Math.max(0, dataMin - padding);
  const yMax = dataMax + padding;

  const chartHeight = 220;
  const chartWidth = 720;

  const getYCoord = (val: number) => {
    if (yMax === yMin) return chartHeight / 2;
    return chartHeight - ((val - yMin) / (yMax - yMin)) * chartHeight;
  };

  const getXCoord = (index: number, total: number) => {
    if (total <= 1) return chartWidth / 2;
    const paddingX = 40;
    return paddingX + (index / (total - 1)) * (chartWidth - 2 * paddingX);
  };

  // Generate SVG path strings
  const mainPoints = currentData.map((d, i) => ({
    x: getXCoord(i, currentData.length),
    y: getYCoord(d.value),
    data: d
  }));

  const mainPathD = mainPoints.length > 0
    ? mainPoints.reduce((acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), '')
    : '';

  const secondaryPoints = currentData.map((d, i) => ({
    x: getXCoord(i, currentData.length),
    y: getYCoord(d.secondaryValue ?? 0)
  }));

  const secondaryPathD = currentParam.secondaryColor && secondaryPoints.length > 0
    ? secondaryPoints.reduce((acc, pt, idx) => (idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`), '')
    : '';

  // Corridor Band Y-coordinates
  const corridorTopY = getYCoord(currentParam.corridorMax);
  const corridorBottomY = getYCoord(currentParam.corridorMin);
  const corridorHeight = Math.max(2, corridorBottomY - corridorTopY);

  return (
    <div className="space-y-5 animate-fadeIn">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-mono mb-1">
            Модуль 6.1.3 — Наглядная Визуализация Динамики
          </div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            Графическое Изображение Кривых и "Коридор Нормы"
          </h3>
          <p className="text-xs text-slate-400">
            Наглядная связь между стартом терапии/коррекцией доз и достижением целевых физиологических показателей
          </p>
        </div>

        {/* Timeframe Period Selector */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
          {[
            { id: 'day', label: 'День' },
            { id: 'week', label: 'Неделя' },
            { id: 'month', label: 'Месяц' },
            { id: 'quarter', label: '3 Месяца' },
            { id: 'year', label: 'Год' },
          ].map((tf) => (
            <button
              key={tf.id}
              onClick={() => setTimeframe(tf.id as TimeframePeriod)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                timeframe === tf.id
                  ? 'bg-emerald-600 text-white shadow-xs font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Parameter Selector Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {TREND_PARAMETERS.map((param) => {
          const isSelected = selectedParamId === param.id;
          const paramData = param.dataByTimeframe[timeframe] || [];
          const lastVal = paramData[paramData.length - 1];

          return (
            <button
              key={param.id}
              onClick={() => {
                setSelectedParamId(param.id);
                setHoveredPoint(null);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-emerald-500/80 ring-1 ring-emerald-500/30 text-white shadow-lg'
                  : 'bg-slate-950/80 border-slate-800 hover:bg-slate-900/60 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold">{param.shortTitle}</span>
                <span className={`w-2.5 h-2.5 rounded-full`} style={{ backgroundColor: param.color }} />
              </div>

              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-xl font-bold font-mono text-white">
                  {lastVal ? lastVal.value : '—'}
                  {lastVal?.secondaryValue !== undefined && ` / ${lastVal.secondaryValue}`}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{param.unit}</span>
              </div>

              <div className="mt-1 text-[10px] text-slate-400 font-mono line-clamp-1">
                {param.corridorLabel}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Interactive Chart Container */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        
        {/* Chart Header Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: currentParam.color }} />
              <span>{currentParam.title}</span>
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              {currentParam.description}
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
              {currentParam.corridorLabel}
            </span>
          </div>
        </div>

        {/* SVG Graphic Canvas with Corridor Band */}
        <div className="relative bg-slate-950 rounded-xl border border-slate-800 p-4 pt-6 overflow-hidden">
          
          {/* Corridor Band Legend Banner */}
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2 px-1">
            <span className="flex items-center gap-2">
              <span className="w-4 h-3 rounded bg-emerald-500/20 border border-emerald-500/50 inline-block" />
              <strong className="text-emerald-300">Зелёная зона = "Коридор Нормы"</strong>
            </span>
            <span>Период: {timeframe.toUpperCase()}</span>
          </div>

          {/* SVG Canvas */}
          <div className="w-full overflow-x-auto">
            <svg 
              viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
              className="w-full h-auto min-w-[500px] overflow-visible"
            >
              <defs>
                {/* Normal Corridor Gradient Fill */}
                <linearGradient id="corridorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.10" />
                </linearGradient>

                {/* Main Line Shadow */}
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Horizontal Grid lines */}
              <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="#1e293b" strokeDasharray="3 3" />
              <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="#1e293b" strokeDasharray="3 3" />
              <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="#1e293b" strokeDasharray="3 3" />

              {/* SHADED "КОРИДОР НОРМЫ" (Target Corridor Box) */}
              <rect
                x="0"
                y={corridorTopY}
                width={chartWidth}
                height={corridorHeight}
                fill="url(#corridorGradient)"
                stroke="#10b981"
                strokeOpacity="0.5"
                strokeWidth="1"
                strokeDasharray="4 2"
              />

              {/* Corridor Boundary Labels */}
              <text x="6" y={corridorTopY - 4} fill="#10b981" fontSize="9" fontFamily="monospace" fontWeight="bold">
                Верхняя граница нормы ({currentParam.corridorMax})
              </text>
              <text x="6" y={corridorBottomY + 11} fill="#10b981" fontSize="9" fontFamily="monospace" fontWeight="bold">
                Нижняя граница нормы ({currentParam.corridorMin})
              </text>

              {/* Secondary Line (if present, e.g. Diastolic BP) */}
              {secondaryPathD && (
                <path
                  d={secondaryPathD}
                  fill="none"
                  stroke={currentParam.secondaryColor}
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                />
              )}

              {/* Main Line Curve */}
              {mainPathD && (
                <path
                  d={mainPathD}
                  fill="none"
                  stroke={currentParam.color}
                  strokeWidth="3"
                  filter="url(#glow)"
                />
              )}

              {/* Data Point Circles and Event Markers */}
              {mainPoints.map((pt, idx) => {
                const d = pt.data;
                const isOutOfNorm = d.isOutOfCorridor;

                return (
                  <g key={idx} className="cursor-pointer group" onMouseEnter={() => setHoveredPoint(d)}>
                    {/* Event Marker Flag Pin if present */}
                    {d.eventMarker && (
                      <g transform={`translate(${pt.x}, ${pt.y - 24})`}>
                        <rect x="-40" y="-14" width="80" height="16" rx="4" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
                        <text x="0" y="-3" textAnchor="middle" fill="#fef3c7" fontSize="8" fontFamily="sans-serif" fontWeight="bold">
                          📍 Событие
                        </text>
                      </g>
                    )}

                    {/* Point Outer Ring */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isOutOfNorm ? "6" : "4.5"}
                      fill={isOutOfNorm ? "#f43f5e" : currentParam.color}
                      stroke="#020617"
                      strokeWidth="2"
                    />

                    {/* Secondary Point if present */}
                    {d.secondaryValue !== undefined && (
                      <circle
                        cx={pt.x}
                        cy={getYCoord(d.secondaryValue)}
                        r="4"
                        fill={currentParam.secondaryColor}
                        stroke="#020617"
                        strokeWidth="2"
                      />
                    )}

                    {/* X-Axis Time Label */}
                    <text 
                      x={pt.x} 
                      y={chartHeight - 4} 
                      textAnchor="middle" 
                      fill="#94a3b8" 
                      fontSize="9" 
                      fontFamily="monospace"
                    >
                      {d.timeLabel}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Hover / Point Details Panel */}
          {hoveredPoint && (
            <div className="mt-3 p-3 rounded-lg bg-slate-900 border border-slate-700 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 animate-fadeIn">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-amber-300 bg-slate-950 px-2 py-0.5 rounded">
                  {hoveredPoint.timeLabel}
                </span>
                <span className="font-bold text-white text-sm">
                  Значение: {hoveredPoint.value} {currentParam.unit}
                  {hoveredPoint.secondaryValue !== undefined && ` / ${hoveredPoint.secondaryValue}`}
                </span>
              </div>

              {hoveredPoint.eventMarker ? (
                <span className="text-amber-200 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-600 font-mono text-[11px]">
                  📌 {hoveredPoint.eventMarker}
                </span>
              ) : hoveredPoint.isOutOfCorridor ? (
                <span className="text-rose-300 bg-rose-950/80 px-2.5 py-1 rounded border border-rose-600 font-mono text-[11px]">
                  ⚠️ Отклонение от коридора нормы
                </span>
              ) : (
                <span className="text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-600 font-mono text-[11px]">
                  ✓ В коридоре нормы
                </span>
              )}
            </div>
          )}

        </div>

        {/* Clinical Interpretation Note */}
        <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Архитектурный эффект наглядности (6.1.3):</strong> Когда пациент видит собственную кривую динамики и зелёный коридор нормы, приверженность терапии (compliance) возрастает с 35% до 82%. Пациент понимает результат каждого назначенного препарата.
          </div>
        </div>

      </div>

    </div>
  );
};
