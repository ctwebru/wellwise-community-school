export type AccessState = 'free' | 'trial' | 'pro' | 'expired';
export type MainTab = 'home' | 'akme' | 'inside' | 'me';
export type Screen = MainTab | 'onboarding' | 'goals' | 'health-profile' | 'questionnaire' | 'result' | 'recommendation' | 'practice' | 'configure' | 'calendar' | 'profile' | 'content' | 'paywall' | 'search';

export const goals = ['Здоровое пищеварение', 'Больше энергии', 'Спокойный сон', 'Регулярное движение'];

export const questions = [
  {
    title: 'Как вы чувствуете себя после еды?',
    hint: 'Выберите наиболее частый вариант за последние две недели.',
    options: ['Легко и комфортно', 'Иногда чувствую тяжесть', 'Часто есть дискомфорт', 'Сложно оценить'],
  },
  {
    title: 'Как часто вы замечаете напряжение?',
    hint: 'Это помогает подобрать интенсивность первых практик.',
    options: ['Редко', 'Несколько раз в неделю', 'Почти каждый день', 'Постоянно'],
  },
  {
    title: 'Сколько времени вы готовы уделять себе?',
    hint: 'Мы предложим реалистичный ритм, который проще сохранить.',
    options: ['5 минут в день', '10–15 минут', '20–30 минут', 'По-разному'],
  },
];

export const calendarDays = [
  { day: 15, state: 'done' }, { day: 16, state: 'done' }, { day: 17, state: 'skip' },
  { day: 18, state: 'done' }, { day: 19, state: 'done' }, { day: 20, state: 'today' },
  { day: 21, state: 'planned' }, { day: 22, state: 'planned' }, { day: 23, state: 'planned' },
];
