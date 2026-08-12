export type TimeframePeriod = 'day' | 'week' | 'month' | 'quarter' | 'year';

export interface DataPoint {
  timeLabel: string;
  value: number;
  secondaryValue?: number; // E.g. Diastolic BP
  isOutOfCorridor?: boolean;
  eventMarker?: string; // E.g. "Коррекция Диувера 4/03"
}

export interface ParameterTrendConfig {
  id: 'bp' | 'glucose' | 'weight' | 'steps';
  title: string;
  shortTitle: string;
  unit: string;
  color: string;
  secondaryColor?: string;
  corridorMin: number;
  corridorMax: number;
  secondaryCorridorMin?: number;
  secondaryCorridorMax?: number;
  corridorLabel: string;
  description: string;
  dataByTimeframe: Record<TimeframePeriod, DataPoint[]>;
}

export const TREND_PARAMETERS: ParameterTrendConfig[] = [
  {
    id: 'bp',
    title: 'Артериальное Давление (АД)',
    shortTitle: 'АД (Систолическое / Диастолическое)',
    unit: 'мм рт.ст.',
    color: '#f43f5e', // rose-500
    secondaryColor: '#38bdf8', // sky-400
    corridorMin: 110,
    corridorMax: 130,
    secondaryCorridorMin: 70,
    secondaryCorridorMax: 80,
    corridorLabel: 'Коридор нормы: 110–130 / 70–80 мм рт.ст.',
    description: 'Систолическое и диастолическое давление с контролем порога 140/90 мм рт.ст. для подключения доп. дозы Атаканда',
    dataByTimeframe: {
      day: [
        { timeLabel: '08:00', value: 124, secondaryValue: 78 },
        { timeLabel: '12:00', value: 128, secondaryValue: 80 },
        { timeLabel: '16:00', value: 135, secondaryValue: 84 },
        { timeLabel: '20:00', value: 132, secondaryValue: 82 },
        { timeLabel: '22:00', value: 126, secondaryValue: 79 }
      ],
      week: [
        { timeLabel: 'Пн (3 мар)', value: 142, secondaryValue: 88, isOutOfCorridor: true, eventMarker: 'АД > 140 (прием 1/2т Атаканд)' },
        { timeLabel: 'Вт (4 мар)', value: 138, secondaryValue: 85, isOutOfCorridor: true, eventMarker: 'Замена Атаканд Плюс → Атаканд 16мг' },
        { timeLabel: 'Ср (5 мар)', value: 132, secondaryValue: 82 },
        { timeLabel: 'Чт (6 мар)', value: 128, secondaryValue: 80 },
        { timeLabel: 'Пт (7 мар)', value: 125, secondaryValue: 78 },
        { timeLabel: 'Сб (8 мар)', value: 122, secondaryValue: 76 },
        { timeLabel: 'Вс (9 мар)', value: 124, secondaryValue: 78 }
      ],
      month: [
        { timeLabel: '1 фев', value: 148, secondaryValue: 92, isOutOfCorridor: true },
        { timeLabel: '8 фев', value: 142, secondaryValue: 88, isOutOfCorridor: true },
        { timeLabel: '15 фев', value: 136, secondaryValue: 84 },
        { timeLabel: '22 фев', value: 134, secondaryValue: 82 },
        { timeLabel: '1 мар', value: 138, secondaryValue: 86, eventMarker: 'Контроль ЧСС и АД' },
        { timeLabel: '8 мар', value: 124, secondaryValue: 78 }
      ],
      quarter: [
        { timeLabel: 'Декабрь', value: 154, secondaryValue: 96, isOutOfCorridor: true },
        { timeLabel: 'Январь', value: 145, secondaryValue: 90, isOutOfCorridor: true, eventMarker: 'Старт коррекции' },
        { timeLabel: 'Февраль', value: 138, secondaryValue: 85 },
        { timeLabel: 'Март', value: 125, secondaryValue: 79 }
      ],
      year: [
        { timeLabel: '2025 Q2', value: 160, secondaryValue: 100, isOutOfCorridor: true },
        { timeLabel: '2025 Q3', value: 152, secondaryValue: 95, isOutOfCorridor: true },
        { timeLabel: '2025 Q4', value: 144, secondaryValue: 90, isOutOfCorridor: true },
        { timeLabel: '2026 Q1', value: 126, secondaryValue: 79 }
      ]
    }
  },
  {
    id: 'glucose',
    title: 'Глюкоза Крови',
    shortTitle: 'Глюкоза (ммоль/л)',
    unit: 'ммоль/л',
    color: '#10b981', // emerald-500
    corridorMin: 4.1,
    corridorMax: 6.1,
    corridorLabel: 'Коридор нормы (натощак): 4.1 – 6.1 ммоль/л',
    description: 'Утренние замеры натощак и через 2 часа после еды с контролем баз-болюсной инсулинотерапии (Янумет + Инсулин Протафан)',
    dataByTimeframe: {
      day: [
        { timeLabel: '08:00 (Натощак)', value: 5.4 },
        { timeLabel: '10:00 (+2ч Завтрак)', value: 6.9, isOutOfCorridor: true },
        { timeLabel: '14:00 (Обед)', value: 5.8 },
        { timeLabel: '19:00 (Ужин)', value: 5.6 },
        { timeLabel: '21:00 (+2ч Ужин)', value: 6.8, isOutOfCorridor: true }
      ],
      week: [
        { timeLabel: 'Пн', value: 6.8, isOutOfCorridor: true },
        { timeLabel: 'Вт', value: 6.2, isOutOfCorridor: true },
        { timeLabel: 'Ср', value: 5.8 },
        { timeLabel: 'Чт', value: 5.5 },
        { timeLabel: 'Пт', value: 5.4 },
        { timeLabel: 'Сб', value: 5.3 },
        { timeLabel: 'Вс', value: 5.5 }
      ],
      month: [
        { timeLabel: '1 фев', value: 7.4, isOutOfCorridor: true },
        { timeLabel: '8 фев', value: 6.8, isOutOfCorridor: true },
        { timeLabel: '15 фев', value: 6.1 },
        { timeLabel: '22 фев', value: 5.7 },
        { timeLabel: '1 мар', value: 5.6 },
        { timeLabel: '8 мар', value: 5.4 }
      ],
      quarter: [
        { timeLabel: 'Декабрь', value: 8.2, isOutOfCorridor: true },
        { timeLabel: 'Январь', value: 7.1, isOutOfCorridor: true, eventMarker: 'Коррекция Янумет 50/1000' },
        { timeLabel: 'Февраль', value: 6.0 },
        { timeLabel: 'Март', value: 5.4 }
      ],
      year: [
        { timeLabel: '2025 Q2', value: 9.1, isOutOfCorridor: true },
        { timeLabel: '2025 Q3', value: 8.4, isOutOfCorridor: true },
        { timeLabel: '2025 Q4', value: 7.2, isOutOfCorridor: true },
        { timeLabel: '2026 Q1', value: 5.5 }
      ]
    }
  },
  {
    id: 'weight',
    title: 'Масса Тела (Вес)',
    shortTitle: 'Вес (кг)',
    unit: 'кг',
    color: '#8b5cf6', // violet-500
    corridorMin: 70.0,
    corridorMax: 74.0,
    corridorLabel: 'Коридор нормы (целевой целевой вес): 70.0 – 74.0 кг',
    description: 'Ежедневное взвешивание на smart-весах Withings для контроля задержки жидкости (профилактика отеков и ХСН на фоне Диувера)',
    dataByTimeframe: {
      day: [
        { timeLabel: 'Утро (08:00)', value: 74.2, isOutOfCorridor: true },
        { timeLabel: 'Вечер (20:00)', value: 74.8, isOutOfCorridor: true }
      ],
      week: [
        { timeLabel: 'Пн', value: 75.8, isOutOfCorridor: true, eventMarker: 'Задержка жидкости (+1.6 кг)' },
        { timeLabel: 'Вт', value: 75.2, isOutOfCorridor: true, eventMarker: 'Коррекция Диувер 10мг → 5мг' },
        { timeLabel: 'Ср', value: 74.8, isOutOfCorridor: true },
        { timeLabel: 'Чт', value: 74.5, isOutOfCorridor: true },
        { timeLabel: 'Пт', value: 74.2, isOutOfCorridor: true },
        { timeLabel: 'Сб', value: 73.8 },
        { timeLabel: 'Вс', value: 73.6 }
      ],
      month: [
        { timeLabel: '1 фев', value: 77.2, isOutOfCorridor: true },
        { timeLabel: '8 фев', value: 76.5, isOutOfCorridor: true },
        { timeLabel: '15 фев', value: 75.6, isOutOfCorridor: true },
        { timeLabel: '22 фев', value: 74.8, isOutOfCorridor: true },
        { timeLabel: '1 мар', value: 74.2, isOutOfCorridor: true },
        { timeLabel: '8 мар', value: 73.6 }
      ],
      quarter: [
        { timeLabel: 'Декабрь', value: 79.5, isOutOfCorridor: true },
        { timeLabel: 'Январь', value: 77.8, isOutOfCorridor: true },
        { timeLabel: 'Февраль', value: 75.4, isOutOfCorridor: true },
        { timeLabel: 'Март', value: 73.8 }
      ],
      year: [
        { timeLabel: '2025 Q2', value: 83.0, isOutOfCorridor: true },
        { timeLabel: '2025 Q3', value: 81.2, isOutOfCorridor: true },
        { timeLabel: '2025 Q4', value: 78.5, isOutOfCorridor: true },
        { timeLabel: '2026 Q1', value: 73.8 }
      ]
    }
  },
  {
    id: 'steps',
    title: 'Пройденные Шаги за День',
    shortTitle: 'Дневная активность (шагов)',
    unit: 'шагов',
    color: '#06b6d4', // cyan-500
    corridorMin: 7000,
    corridorMax: 10000,
    corridorLabel: 'Коридор нормы (целевая активность): 7 000 – 10 000 шагов/день',
    description: 'Данные смарт-браслета / фитнес-трекера для контроля дозированной физической нагрузки без перевишения ЧСС > 110 уд/мин',
    dataByTimeframe: {
      day: [
        { timeLabel: '10:00', value: 1800, isOutOfCorridor: true },
        { timeLabel: '14:00', value: 4200, isOutOfCorridor: true },
        { timeLabel: '18:00', value: 6800, isOutOfCorridor: true },
        { timeLabel: '21:00', value: 7850 }
      ],
      week: [
        { timeLabel: 'Пн', value: 6200, isOutOfCorridor: true },
        { timeLabel: 'Вт', value: 7400 },
        { timeLabel: 'Ср', value: 8100 },
        { timeLabel: 'Чт', value: 7850 },
        { timeLabel: 'Пт', value: 8400 },
        { timeLabel: 'Сб', value: 9200 },
        { timeLabel: 'Вс', value: 7600 }
      ],
      month: [
        { timeLabel: '1 фев', value: 4500, isOutOfCorridor: true },
        { timeLabel: '8 фев', value: 5800, isOutOfCorridor: true },
        { timeLabel: '15 фев', value: 6900, isOutOfCorridor: true },
        { timeLabel: '22 фев', value: 7600 },
        { timeLabel: '1 мар', value: 7850 },
        { timeLabel: '8 мар', value: 8300 }
      ],
      quarter: [
        { timeLabel: 'Декабрь', value: 3800, isOutOfCorridor: true },
        { timeLabel: 'Январь', value: 5100, isOutOfCorridor: true },
        { timeLabel: 'Февраль', value: 6800, isOutOfCorridor: true },
        { timeLabel: 'Март', value: 8100 }
      ],
      year: [
        { timeLabel: '2025 Q2', value: 3200, isOutOfCorridor: true },
        { timeLabel: '2025 Q3', value: 4100, isOutOfCorridor: true },
        { timeLabel: '2025 Q4', value: 5600, isOutOfCorridor: true },
        { timeLabel: '2026 Q1', value: 8100 }
      ]
    }
  }
];
