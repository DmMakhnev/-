export interface MedicationItem {
  id: string;
  num: number;
  name: string;
  dose: string;
  comment: string;
  morning: string;
  day: string;
  evening: string;
  note: string;
  isEmergency?: boolean;
  takenToday?: {
    morning?: boolean;
    day?: boolean;
    evening?: boolean;
  };
}

export interface MeasurementRecord {
  id: string;
  parameter: string;
  value: string;
  unit: string;
  time: string;
  status: 'normal' | 'warning' | 'critical';
  targetRange: string;
  note?: string;
}

export interface ManipulationItem {
  id: string;
  title: string;
  frequency: string;
  time: string;
  description: string;
  status: 'pending' | 'completed';
  nextDate: string;
}

export interface EventItem {
  id: string;
  title: string;
  type: 'vks' | 'lab' | 'doctor';
  dateTime: string;
  location: string;
  doctor: string;
  attachments?: string[];
  note: string;
}

// Data extracted directly from the attached XLS file: "Постоянный прием с коррекцией"
export const REGULAR_MEDICATIONS: MedicationItem[] = [
  {
    id: 'med-1',
    num: 1,
    name: 'Атаканд',
    dose: '16 мг',
    comment: 'по 1т утром. Вечером - после контроля АД, Только !!!!! если АД вечером больше, чем 140 мм рт.ст., то дополнительно - 1/2т',
    morning: '1 таб.',
    day: '—',
    evening: '1/2 таб. (если АД > 140)',
    note: 'С 4/03 - замена, был Атаканд плюс 16/12,5 мг',
    takenToday: { morning: true, day: false, evening: false }
  },
  {
    id: 'med-2',
    num: 2,
    name: 'Дилатренд',
    dose: '12,5 мг',
    comment: 'по 1т утром и 1/2т вечером под контролем ЧСС (60-80 в покое, не более 110 при умеренной физической нагрузке);',
    morning: '1 таб.',
    day: '—',
    evening: '1/2 таб.',
    note: 'Отмена вечернего приема 4/03, 5/03 - решение индивидуально',
    takenToday: { morning: true, day: false, evening: false }
  },
  {
    id: 'med-3',
    num: 3,
    name: 'Дигоксин',
    dose: '0,25 мг',
    comment: 'по 1т утром под контролем ЧСС; измерение концентрации дигоксина в крови 1 раз в 2 нед с решением вопроса о необходимости коррекции дозы;',
    morning: '1 таб.',
    day: '—',
    evening: '—',
    note: 'Контроль ЧСС ежедневно и концентрации в крови раз в 14 дней',
    takenToday: { morning: true, day: false, evening: false }
  },
  {
    id: 'med-4',
    num: 4,
    name: 'Альбарел',
    dose: '1 мг',
    comment: 'по 1т днём после обеда;',
    morning: '—',
    day: '1 таб.',
    evening: '—',
    note: 'Отмена 4/03, 5/03 - под контролем лечащего врача',
    takenToday: { morning: false, day: false, evening: false }
  },
  {
    id: 'med-5',
    num: 5,
    name: 'Диувер',
    dose: '5 мг',
    comment: 'по 1т утром с возможным увеличением дозы до 15 мг/сут;',
    morning: '1 таб.',
    day: '—',
    evening: '—',
    note: 'С 4/03 - меняем дозу с 10 мг на 5 мг/сут',
    takenToday: { morning: true, day: false, evening: false }
  },
  {
    id: 'med-6',
    num: 6,
    name: 'Верошпирон',
    dose: '25 мг',
    comment: 'по 1т утром;',
    morning: '1 таб.',
    day: '—',
    evening: '—',
    note: 'Кардиопротективная суточная доза',
    takenToday: { morning: true, day: false, evening: false }
  },
  {
    id: 'med-7',
    num: 7,
    name: 'Ксарелто',
    dose: '20 мг',
    comment: 'по 1т утром после завтрака;',
    morning: '1 таб.',
    day: '—',
    evening: '—',
    note: 'Принимать строго после еды во избежание гастропатии',
    takenToday: { morning: true, day: false, evening: false }
  },
  {
    id: 'med-8',
    num: 8,
    name: 'Крестор',
    dose: '20 мг',
    comment: 'по 1т вечером под контролем уровня холестерина ЛНП (цель - менее 1,8 ммоль/л) и не-ЛВП (цель - менее 2,6 ммоль/л);',
    morning: '—',
    day: '—',
    evening: '1 таб.',
    note: 'Липидоснижающая терапия первого ряда',
    takenToday: { morning: false, day: false, evening: false }
  },
  {
    id: 'med-9',
    num: 9,
    name: 'Янумет',
    dose: '50/1000 мг',
    comment: 'по 1т х 2р/д перед завтраком и перед ужином;',
    morning: '1 таб.',
    day: '—',
    evening: '1 таб.',
    note: 'Сахароснижающий комбинированный препарат',
    takenToday: { morning: true, day: false, evening: false }
  },
  {
    id: 'med-10',
    num: 10,
    name: 'Инсулин протафан',
    dose: 'Инъекционный',
    comment: 'подкожно 16 Ед перед завтраком и 18 ед перед ужином;',
    morning: '16 Ед',
    day: '—',
    evening: '18 Ед',
    note: 'Базальный инсулин средней продолжительности',
    takenToday: { morning: true, day: false, evening: false }
  },
  {
    id: 'med-11',
    num: 11,
    name: 'Симбикорт',
    dose: '160/4,5 мкг',
    comment: 'вдыхать по 1 дозе 2 раза в день утром и вечером;',
    morning: '1 доза',
    day: '—',
    evening: '1 доза',
    note: 'С 4/03 - меняем дозу с 2-х доз на по 1 дозе 2 р/д',
    takenToday: { morning: true, day: false, evening: false }
  },
  {
    id: 'med-12',
    num: 12,
    name: 'Лирика',
    dose: '150 мг',
    comment: 'по 1т вечером в течение 1 месяца с решением о необходимости продления курса лечения препаратом;',
    morning: '—',
    day: '—',
    evening: '1 таб.',
    note: 'Контроль невролога; возможна коррекция дозы до 75 мг',
    takenToday: { morning: false, day: false, evening: false }
  },
  {
    id: 'med-13',
    num: 13,
    name: 'Нексиум',
    dose: '20 мг',
    comment: 'по 1т за 30 минут до ужина длительно с гастропротективной целью;',
    morning: '—',
    day: '—',
    evening: '1 таб.',
    note: 'Защита слизистой желудка при комбинированной терапии',
    takenToday: { morning: false, day: false, evening: false }
  },
  {
    id: 'med-14',
    num: 14,
    name: 'Таваник',
    dose: '500 мг',
    comment: 'по 1т утром в течение 7 дней; на 3 и 7 день принять микосист 150 мг 1 капсулу;',
    morning: '1 таб.',
    day: '—',
    evening: '—',
    note: 'Короткий антибактериальный курс',
    takenToday: { morning: true, day: false, evening: false }
  },
  {
    id: 'med-15',
    num: 15,
    name: 'АЦЦ-лонг',
    dose: '600 мг',
    comment: 'по 1т утром в течение 2-х недель;',
    morning: '1 таб.',
    day: '—',
    evening: '—',
    note: 'Муколитическое средство в шипучей форме',
    takenToday: { morning: true, day: false, evening: false }
  }
];

// Data extracted directly from the attached XLS file: "Аварийные"
export const EMERGENCY_MEDICATIONS: MedicationItem[] = [
  {
    id: 'emg-1',
    num: 1,
    name: 'Беродуал',
    dose: 'Аэрозоль',
    comment: '1-2 вдоха по потребности (при затруднённом дыхании, приступе удушья).',
    morning: 'По ситуации',
    day: 'По ситуации',
    evening: 'По ситуации',
    note: 'Скорая помощь при бронхоспазме',
    isEmergency: true
  },
  {
    id: 'emg-2',
    num: 2,
    name: 'Капотен',
    dose: '25 мг',
    comment: 'при резких подъемах АД (под язык)',
    morning: 'По ситуации',
    day: 'По ситуации',
    evening: 'По ситуации',
    note: 'Экстренное купирование гипертонического криза',
    isEmergency: true
  },
  {
    id: 'emg-3',
    num: 3,
    name: 'Изокет (спрей)',
    dose: 'Дозированный',
    comment: 'При болях в сердце, приступах сердечной астмы',
    morning: 'По ситуации',
    day: 'По ситуации',
    evening: 'По ситуации',
    note: 'Быстродействующий нитрат',
    isEmergency: true
  },
  {
    id: 'emg-4',
    num: 4,
    name: 'Лазикс',
    dose: '40 мг',
    comment: 'При приступах сердечной астмы, при высоких цифрах АД',
    morning: 'По ситуации',
    day: 'По ситуации',
    evening: 'По ситуации',
    note: 'Экстренный диуретик',
    isEmergency: true
  },
  {
    id: 'emg-5',
    num: 5,
    name: 'Клофелин',
    dose: '0,075 мг',
    comment: 'при резких подъемах АД',
    morning: 'По ситуации',
    day: 'По ситуации',
    evening: 'По ситуации',
    note: 'Резервное средство при гипертоническом кризе',
    isEmergency: true
  },
  {
    id: 'emg-6',
    num: 6,
    name: 'Кофе, крепкий чай с сахаром',
    dose: 'Питьевой раствор',
    comment: 'при значительных снижениях АД (гипотонии)',
    morning: 'По ситуации',
    day: 'По ситуации',
    evening: 'По ситуации',
    note: 'Первая помощь при слабой симптоматической гипотонии',
    isEmergency: true
  }
];

// Sample Daily Measurements
export const DAILY_MEASUREMENTS: MeasurementRecord[] = [
  {
    id: 'm-1',
    parameter: 'Артериальное давление (Утро)',
    value: '124 / 78',
    unit: 'мм рт.ст.',
    time: '08:15',
    status: 'normal',
    targetRange: '110-130 / 70-80',
    note: 'ЧСС: 64 уд/мин. Перед приемом Дилатренда'
  },
  {
    id: 'm-2',
    parameter: 'Артериальное давление (Вечер)',
    value: '132 / 84',
    unit: 'мм рт.ст.',
    time: '19:45',
    status: 'normal',
    targetRange: '110-130 / 70-80',
    note: 'ЧСС: 68 уд/мин. Ниже порога 140/90 — доп. Атаканд не требуется'
  },
  {
    id: 'm-3',
    parameter: 'Глюкоза крови (Натощак)',
    value: '5.4',
    unit: 'ммоль/л',
    time: '07:50',
    status: 'normal',
    targetRange: '4.1 - 6.1 ммоль/л',
    note: 'Доза Инсулина Протафан 16 Ед введена'
  },
  {
    id: 'm-4',
    parameter: 'Глюкоза крови (Через 2ч после ужина)',
    value: '6.8',
    unit: 'ммоль/л',
    time: '21:15',
    status: 'normal',
    targetRange: '< 7.8 ммоль/л',
    note: 'После приема Янумет 50/1000'
  },
  {
    id: 'm-5',
    parameter: 'Масса тела (Вес)',
    value: '74.2',
    unit: 'кг',
    time: '08:00',
    status: 'normal',
    targetRange: '70.0 - 75.0 кг',
    note: 'Смарт-весы Withings (Динамика -0.4 кг за неделю)'
  },
  {
    id: 'm-6',
    parameter: 'Концентрация дигоксина в крови',
    value: '1.1',
    unit: 'нг/мл',
    time: '28 фев',
    status: 'normal',
    targetRange: '0.8 - 2.0 нг/мл',
    note: 'Лабораторный контроль раз в 2 недели. Побочных реакций нет'
  }
];

// Sample Manipulations
export const SCHEDULED_MANIPULATIONS: ManipulationItem[] = [
  {
    id: 'man-1',
    title: 'Ингаляция препарата Симбикорт (160/4,5 мкг)',
    frequency: '2 раза в день (утро и вечер)',
    time: '08:00 / 20:00',
    description: 'Вдыхать 1 дозу с последующим полосканием рта теплой водой.',
    status: 'completed',
    nextDate: 'Сегодня, 20:00'
  },
  {
    id: 'man-2',
    title: 'Обработка трофической язвы голени',
    frequency: 'Через день (четные дни)',
    time: '11:00',
    description: 'Промывание антисептическим раствором (Хлоргексидин 0,05%), наложение гидрогелевой салфетки и стерильной повязки.',
    status: 'pending',
    nextDate: 'Завтра, 11:00'
  },
  {
    id: 'man-3',
    title: 'Перевязка и гигиенический уход за раневой поверхностью',
    frequency: 'Ежедневно',
    time: '14:00',
    description: 'Осмотр кожных покровов, фиксация компрессионного трикотажа.',
    status: 'pending',
    nextDate: 'Сегодня, 14:00'
  }
];

// Sample Events
export const SCHEDULED_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Телемедицинская ВКС-консультация с лечащим врачом-кардиологом',
    type: 'vks',
    dateTime: 'Четверг, 13:00',
    location: 'Онлайн-кабинет МИС Пациента (ВКС)',
    doctor: 'Д.м.н. Карпов Ю.А. (Кардиоцентр)',
    attachments: ['Дневник_АД_за_неделю.pdf', 'Результаты_ЭКГ_февраль.pdf'],
    note: 'Обсуждение корректировки вечернего приема Дилатренда и Атаканда по результатам дневника АД.'
  },
  {
    id: 'evt-2',
    title: 'Забор крови на концентрацию дигоксина и липидный профиль (ЛНП/не-ЛВП)',
    type: 'lab',
    dateTime: 'Пятница, 08:30',
    location: 'Процедурный кабинет №108, Поликлиника №4',
    doctor: 'Процедурная медсестра',
    attachments: ['Направление_лаб_дигоксин.pdf'],
    note: 'Сдавать строго натощак. До приема утренней таблетки Дигоксина.'
  },
  {
    id: 'evt-3',
    title: 'Плановый очный осмотр участкового терапевта',
    type: 'doctor',
    dateTime: '15 марта, 10:00',
    location: 'Кабинет №204, Поликлиника №4',
    doctor: 'Терапевт Игнатьева Е.С.',
    note: 'Контроль динамики заживления трофической язвы и коррекция сахароснижающей терапии.'
  }
];
