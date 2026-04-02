export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  section: 'posts' | 'school';
  status: 'draft' | 'scheduled' | 'published';
  scheduledAt?: string;
  publishedAt: string;
  commentsEnabled: boolean;
  reactions: { emoji: string; count: number }[];
  commentsCount: number;
  isFavorited: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
  isHidden: boolean;
  parentId?: string;
  replies?: Comment[];
}

export const MOCK_POSTS: Post[] = [
  {
    id: '1',
    title: 'Как правильно начать утро: 5 простых привычек',
    excerpt: 'Утренние ритуалы, которые помогут вам чувствовать себя лучше каждый день.',
    content: 'Каждое утро — это возможность задать тон всему дню. Вот 5 привычек, которые я рекомендую своим пациентам:\n\n**1. Стакан воды натощак**\nПосле ночного сна организм обезвожен. Стакан тёплой воды запускает метаболизм.\n\n**2. 5 минут растяжки**\nЛёгкая растяжка пробуждает тело и улучшает кровообращение.\n\n**3. Завтрак с белком**\nБелок на завтрак помогает сохранять энергию и концентрацию до обеда.\n\n**4. Без телефона первые 15 минут**\nДайте мозгу проснуться естественно, без информационного шума.\n\n**5. Короткая прогулка**\nДаже 10 минут на свежем воздухе значительно улучшают настроение.',
    imageUrl: '',
    section: 'posts',
    status: 'published',
    publishedAt: '2024-01-15T08:00:00Z',
    commentsEnabled: true,
    reactions: [{ emoji: '❤️', count: 24 }, { emoji: '👍', count: 12 }, { emoji: '🔥', count: 8 }],
    commentsCount: 7,
    isFavorited: false,
  },
  {
    id: '2',
    title: 'Мифы о витамине D: что действительно важно знать',
    excerpt: 'Разбираем популярные заблуждения и научные факты о главном «солнечном» витамине.',
    content: 'Витамин D — один из самых обсуждаемых нутриентов. Давайте разберёмся, что правда, а что — мифы...',
    section: 'posts',
    status: 'published',
    publishedAt: '2024-01-12T10:00:00Z',
    commentsEnabled: true,
    reactions: [{ emoji: '❤️', count: 45 }, { emoji: '💡', count: 18 }],
    commentsCount: 15,
    isFavorited: true,
  },
  {
    id: '3',
    title: 'Сон и иммунитет: почему нельзя экономить на отдыхе',
    excerpt: 'Научные данные о связи качества сна и работы иммунной системы.',
    content: 'Качественный сон — это не роскошь, а необходимость для здоровой иммунной системы...',
    imageUrl: '',
    section: 'posts',
    status: 'published',
    publishedAt: '2024-01-10T09:00:00Z',
    commentsEnabled: true,
    reactions: [{ emoji: '❤️', count: 32 }, { emoji: '😴', count: 21 }],
    commentsCount: 9,
    isFavorited: false,
  },
  {
    id: '4',
    title: 'Программа детокса: неделя 1',
    excerpt: 'Первая неделя программы мягкого восстановления организма. Подробный план питания и рекомендации.',
    content: 'Добро пожаловать в первую неделю программы! Начнём с мягкой подготовки организма...',
    section: 'school',
    status: 'published',
    publishedAt: '2024-01-14T08:00:00Z',
    commentsEnabled: true,
    reactions: [{ emoji: '❤️', count: 67 }, { emoji: '🔥', count: 34 }, { emoji: '💪', count: 28 }],
    commentsCount: 23,
    isFavorited: false,
  },
  {
    id: '5',
    title: 'Как читать анализы: полный гид',
    excerpt: 'Разбираем основные показатели крови — что в норме, а на что обратить внимание.',
    content: 'Многие пациенты не знают, как интерпретировать свои анализы. Давайте разберёмся...',
    section: 'school',
    status: 'published',
    publishedAt: '2024-01-08T08:00:00Z',
    commentsEnabled: true,
    reactions: [{ emoji: '💡', count: 89 }, { emoji: '❤️', count: 41 }],
    commentsCount: 31,
    isFavorited: true,
  },
  {
    id: '6',
    title: 'Черновик: Стресс и пищеварение',
    excerpt: 'Как стресс влияет на ЖКТ и что с этим делать.',
    content: 'Черновик поста о связи стресса и пищеварительной системы...',
    section: 'posts',
    status: 'draft',
    publishedAt: '',
    commentsEnabled: true,
    reactions: [],
    commentsCount: 0,
    isFavorited: false,
  },
];

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    postId: '1',
    userId: 'u1',
    userName: 'Анна М.',
    text: 'Отличные советы! Уже неделю пью воду натощак, чувствую разницу.',
    createdAt: '2024-01-15T10:30:00Z',
    isHidden: false,
  },
  {
    id: 'c2',
    postId: '1',
    userId: 'u2',
    userName: 'Игорь К.',
    text: 'А если утром нет времени на прогулку, можно ли заменить на зарядку дома?',
    createdAt: '2024-01-15T12:00:00Z',
    isHidden: false,
  },
  {
    id: 'c3',
    postId: '1',
    userId: 'u3',
    userName: 'Мария Т.',
    text: 'Спасибо, доктор! Поделилась с подругой.',
    createdAt: '2024-01-16T08:00:00Z',
    isHidden: false,
  },
];
