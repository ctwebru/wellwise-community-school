export type CourseLevel = 'Entry' | 'Growth' | 'Flagship';
export type CourseImage = 'nutrition' | 'breathing' | 'movement';

export type CourseBlock =
  | { id: string; type: 'text'; title: string; body: string; callout?: string; spoiler?: string }
  | { id: string; type: 'image'; title: string; caption: string; image: CourseImage }
  | { id: string; type: 'video'; title: string; duration: string; image: CourseImage }
  | { id: string; type: 'quiz'; title: string; options: string[]; answer: string; explanation: string }
  | { id: string; type: 'survey'; title: string; options: string[] }
  | { id: string; type: 'checklist'; title: string; items: { id: string; label: string; optional?: boolean }[] }
  | { id: string; type: 'task'; title: string; prompt: string; placeholder: string }
  | { id: string; type: 'materials'; title: string; items: { id: string; label: string; description: string }[] };

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  summary: string;
  blocks: CourseBlock[];
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  benefit: string;
  level: CourseLevel;
  duration: string;
  price: number | null;
  image: CourseImage;
  available: boolean;
  access: string;
  lessons: CourseLesson[];
  benefits: string[];
}

const text = (id: string, title: string, body: string, callout?: string): CourseBlock => ({
  id,
  type: 'text',
  title,
  body,
  callout,
  spoiler: 'Если тема вызывает напряжение, сократите задание и вернитесь к нему в более спокойном состоянии.',
});

export const courses: Course[] = [
  {
    id: 'evening-eating',
    title: 'Как перестать переедать вечером',
    subtitle: 'Пять спокойных дней, чтобы заметить свои триггеры и собрать посильный план без запретов.',
    benefit: 'Поймёте, что запускает вечерний аппетит, и что делать вместо борьбы с собой.',
    level: 'Entry',
    duration: '5 дней',
    price: 690,
    image: 'nutrition',
    available: true,
    access: 'Доступ остаётся навсегда · можно пересматривать уроки',
    benefits: ['Короткая оценка текущих привычек', 'Понятная схема голода и эмоционального аппетита', 'Личный план действий на следующую неделю'],
    lessons: [
      {
        id: 'intro', title: 'Введение: оценка привычек', duration: '4 минуты', summary: 'Настраиваемся на наблюдение без самокритики.',
        blocks: [
          text('intro-text', 'Сначала — без оценок и запретов', 'Вечернее переедание не говорит о слабой воле. На него влияют ритм дня, голод, усталость, стресс и привычная обстановка. В этом курсе мы ищем не виноватого, а работающую точку опоры.', 'На ближайшие пять дней ваша задача — замечать, а не контролировать каждый кусочек.'),
          { id: 'intro-survey', type: 'survey', title: 'Что чаще всего происходит с вами вечером?', options: ['Ем от голода после скудного дня', 'Хочется есть от усталости или напряжения', 'Ем по привычке, даже без голода', 'Сложно пока определить'] },
        ],
      },
      {
        id: 'lesson-1', title: 'Почему возникает переедание', duration: '8 минут', summary: 'Разбираем физиологию и контекст без диагнозов.',
        blocks: [
          text('l1-text', 'Аппетит складывается из нескольких сигналов', 'Физический голод, ожидание удовольствия и желание снять напряжение могут ощущаться похоже. Различить их помогает пауза и внимание к событию, которое произошло до еды.', 'Чем дольше вы игнорируете голод днём, тем сложнее вечером выбирать осознанно.'),
          { id: 'l1-video', type: 'video', title: 'Три части вечернего аппетита', duration: '3:20', image: 'nutrition' },
          { id: 'l1-image', type: 'image', title: 'Схема наблюдения', caption: 'Событие → ощущение → привычное действие → новый маленький шаг.', image: 'nutrition' },
          { id: 'l1-quiz', type: 'quiz', title: 'Какой сигнал ближе к физическому голоду?', options: ['Хочется конкретного десерта после спора', 'Голод нарастает постепенно, подходит обычная еда', 'Рука тянется к еде во время сериала'], answer: 'Голод нарастает постепенно, подходит обычная еда', explanation: 'Физический голод обычно развивается постепенно и не привязан только к одному продукту.' },
        ],
      },
      {
        id: 'lesson-2', title: 'Голод или привычка', duration: '7 минут', summary: 'Учимся делать короткую паузу перед действием.',
        blocks: [
          { id: 'l2-video', type: 'video', title: 'Пауза на 90 секунд', duration: '2:40', image: 'breathing' },
          { id: 'l2-quiz', type: 'quiz', title: 'Что помогает распознать привычку?', options: ['Запретить еду после 18:00', 'Назвать событие и ощущение перед едой', 'Заменить все продукты дома'], answer: 'Назвать событие и ощущение перед едой', explanation: 'Наблюдение возвращает выбор. Жёсткий запрет сам по себе не объясняет причину повторяющегося сценария.' },
          { id: 'l2-task', type: 'task', title: 'Один вечерний эпизод', prompt: 'Опишите один недавний эпизод: что произошло до того, как вы захотели есть?', placeholder: 'Например: закончила сложный созвон, устала и сразу открыла холодильник…' },
        ],
      },
      {
        id: 'lesson-3', title: 'Организация питания', duration: '6 минут', summary: 'Убираем сильный голод как лишнее испытание.',
        blocks: [
          text('l3-text', 'Вечер начинается не вечером', 'Регулярная еда в течение дня снижает вероятность того, что к ночи останется только сильный голод и усталость. Не нужно идеальное меню — начните с одного предсказуемого приёма пищи.', 'Опора на день работает бережнее, чем попытка компенсировать вечер ограничениями утром.'),
          { id: 'l3-image', type: 'image', title: 'Опорный приём пищи', caption: 'Белок + сложные углеводы + клетчатка + жиры. Состав можно менять под свои предпочтения.', image: 'nutrition' },
          { id: 'l3-checklist', type: 'checklist', title: 'Что можно поддержать завтра?', items: [{ id: 'breakfast', label: 'Запланировать завтрак' }, { id: 'lunch', label: 'Не пропустить основной приём пищи днём' }, { id: 'snack', label: 'Подготовить доступный перекус' }, { id: 'water', label: 'Поставить воду на видное место', optional: true }] },
        ],
      },
      {
        id: 'lesson-4', title: 'Работа с привычками', duration: '8 минут', summary: 'Меняем среду и добавляем альтернативу.',
        blocks: [
          { id: 'l4-video', type: 'video', title: 'Как изменить привычный сценарий', duration: '3:10', image: 'movement' },
          text('l4-text', 'Не убирайте — заменяйте', 'Если еда была способом переключиться после работы, одного запрета недостаточно. Оставьте себе ритуал перехода: душ, короткая прогулка, чай, разговор с близким или несколько минут тишины.', 'Новое действие должно быть почти таким же простым, как старое.'),
          { id: 'l4-task', type: 'task', title: 'Ваш альтернативный ритуал', prompt: 'Какое короткое действие вы готовы попробовать перед вечерней едой?', placeholder: 'Например: десять минут прогулки после работы…' },
        ],
      },
      {
        id: 'lesson-5', title: 'План действий', duration: '6 минут', summary: 'Собираем реалистичный план на следующую неделю.',
        blocks: [
          text('l5-text', 'Достаточно одного устойчивого шага', 'Выберите действие, которое можно повторить даже в загруженный день. План не обязан быть идеальным — он должен помогать вам возвращаться к себе без наказания.', 'Если день пошёл не по плану, следующий приём пищи — новая точка начала.'),
          { id: 'l5-checklist', type: 'checklist', title: 'Мой план на неделю', items: [{ id: 'regular-food', label: 'Поддерживать регулярное питание днём' }, { id: 'pause', label: 'Делать короткую паузу и называть ощущение' }, { id: 'ritual', label: 'Использовать выбранный вечерний ритуал' }, { id: 'notes', label: 'Раз в день записывать наблюдение', optional: true }] },
          { id: 'l5-survey', type: 'survey', title: 'Какой главный шаг вы выбираете?', options: ['Регулярно есть в течение дня', 'Различать голод и напряжение', 'Менять вечерний ритуал', 'Начать с наблюдения без изменений'] },
        ],
      },
    ],
  },
  {
    id: 'calm-sleep', title: 'Спокойный сон за 21 день', subtitle: 'Вечерний ритм, дневные опоры и мягкая работа с напряжением.', benefit: 'Соберите собственный ритуал подготовки ко сну без жёстких правил.', level: 'Growth', duration: '21 день', price: 2490, image: 'breathing', available: false, access: 'Доступ на 6 месяцев · старт следующего потока скоро', benefits: ['21 короткий урок', 'Практики восстановления', 'Материалы для повторения'],
    lessons: [
      { id: 'sleep-1', title: 'Ваш текущий ритм сна', duration: '6 минут', summary: 'Исходная точка.', blocks: [text('sleep-text', 'Наблюдаем за ритмом', 'Сон зависит не только от вечерних действий. Начните с спокойного наблюдения за распорядком.')] },
      { id: 'sleep-2', title: 'Свет и дневная активность', duration: '8 минут', summary: 'Дневные опоры сна.', blocks: [text('sleep-text-2', 'День влияет на ночь', 'Дневной свет и регулярное движение поддерживают естественные ритмы.')] },
      { id: 'sleep-3', title: 'Вечерний ритуал', duration: '7 минут', summary: 'Повторяемые сигналы завершения дня.', blocks: [text('sleep-text-3', 'Переход ко сну', 'Небольшой повторяемый ритуал помогает снизить темп вечера.')] },
    ],
  },
  {
    id: 'health-system', title: 'Личная система здоровья', subtitle: 'Большая программа о питании, движении, сне и устойчивых привычках.', benefit: 'Свяжите разные области здоровья в одну реалистичную систему.', level: 'Flagship', duration: '12 недель', price: 12900, image: 'movement', available: false, access: 'Бессрочный доступ · набор в следующий поток', benefits: ['4 последовательных модуля', 'Библиотека практик', 'Итоговый личный план'],
    lessons: [
      { id: 'system-1', title: 'Модуль 1 · Исходная точка', duration: '2 недели', summary: 'Цели и текущий ритм.', blocks: [text('system-text', 'Система начинается с контекста', 'Сначала оценим ресурсы и выберем посильные направления.')] },
      { id: 'system-2', title: 'Модуль 2 · Ежедневные опоры', duration: '4 недели', summary: 'Питание и движение.', blocks: [text('system-text-2', 'Опоры вместо рывков', 'Небольшие повторяемые действия складываются в устойчивый ритм.')] },
    ],
  },
];

export const pilotCourse = courses[0];

export const getCourse = (id: string) => courses.find(course => course.id === id) ?? pilotCourse;
