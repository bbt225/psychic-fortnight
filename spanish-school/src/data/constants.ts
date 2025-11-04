import type { LevelInfo, SubscriptionPlan, CEFRLevel } from '../types';

// Информация об уровнях
export const LEVELS: LevelInfo[] = [
  {
    level: 'A1',
    name: 'Начальный (Beginner)',
    description: 'Базовые фразы, приветствия, простые вопросы и ответы',
    totalLessons: 50,
    requiredForNext: 'A2',
    color: '#10b981', // green
  },
  {
    level: 'A2',
    name: 'Элементарный (Elementary)',
    description: 'Повседневные ситуации, описание окружения, базовая грамматика',
    totalLessons: 50,
    requiredForNext: 'B1',
    color: '#3b82f6', // blue
  },
  {
    level: 'B1',
    name: 'Средний (Intermediate)',
    description: 'Путешествия, работа, хобби, выражение мнений',
    totalLessons: 50,
    requiredForNext: 'B2',
    color: '#8b5cf6', // purple
  },
  {
    level: 'B2',
    name: 'Продвинутый средний (Upper Intermediate)',
    description: 'Сложные тексты, технические дискуссии, аргументация',
    totalLessons: 50,
    requiredForNext: 'C1',
    color: '#f59e0b', // amber
  },
  {
    level: 'C1',
    name: 'Продвинутый (Advanced)',
    description: 'Беглая речь, профессиональное общение, сложные тексты',
    totalLessons: 50,
    requiredForNext: 'C2',
    color: '#ef4444', // red
  },
  {
    level: 'C2',
    name: 'Владение в совершенстве (Proficiency)',
    description: 'Свободное владение языком на уровне носителя',
    totalLessons: 50,
    color: '#6366f1', // indigo
  },
];

// Планы подписки
export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    type: 'free',
    name: 'Бесплатный',
    price: 0,
    currency: 'RUB',
    description: 'Попробуйте первые уроки бесплатно',
    features: [
      'Первые 5 уроков каждого уровня',
      'Базовые упражнения',
      'Словарь и грамматика',
      'Отслеживание прогресса',
    ],
    accessLevels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
  },
  {
    type: 'basic',
    name: 'Базовый',
    price: 1990,
    currency: 'RUB',
    description: 'Идеально для начинающих',
    features: [
      'Полный доступ к уровням A1 и A2',
      'Все упражнения и тесты',
      'Сертификат о прохождении',
      'Поддержка по email',
      'Отслеживание прогресса',
      'Персональная статистика',
    ],
    accessLevels: ['A1', 'A2'],
  },
  {
    type: 'premium',
    name: 'Премиум',
    price: 3990,
    currency: 'RUB',
    description: 'Неограниченный доступ ко всем материалам',
    features: [
      'Доступ ко всем уровням (A1-C2)',
      '300 уроков с упражнениями',
      'Все тесты и экзамены',
      'Сертификаты о прохождении',
      'Приоритетная поддержка',
      'Персональные рекомендации',
      'Офлайн-доступ к материалам',
      'Эксклюзивные вебинары',
    ],
    accessLevels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
  },
];

// Количество бесплатных уроков в каждом уровне
export const FREE_LESSONS_PER_LEVEL = 5;

// Проходной балл для тестов
export const PASSING_SCORE = 70;

// Время на тест (в секундах)
export const DEFAULT_TEST_TIME = 600; // 10 минут

// Цвета для UI
export const COLORS = {
  primary: '#1a1a1a',
  secondary: '#3b82f6',
  accent: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  success: '#10b981',
  info: '#3b82f6',
};

// Проверка доступа к уроку
export function hasAccessToLesson(
  lesson: { level: CEFRLevel; number: number; isFree: boolean },
  subscriptionType: 'free' | 'basic' | 'premium'
): boolean {
  // Админы имеют доступ ко всему
  if (subscriptionType === 'premium') {
    return true;
  }

  // Бесплатные уроки доступны всем
  if (lesson.isFree) {
    return true;
  }

  // Базовая подписка - доступ к A1 и A2
  if (subscriptionType === 'basic') {
    return lesson.level === 'A1' || lesson.level === 'A2';
  }

  // Бесплатная подписка - только бесплатные уроки
  return false;
}

// Получить информацию об уровне
export function getLevelInfo(level: CEFRLevel): LevelInfo | undefined {
  return LEVELS.find((l) => l.level === level);
}

// Получить план подписки
export function getSubscriptionPlan(type: 'free' | 'basic' | 'premium'): SubscriptionPlan | undefined {
  return SUBSCRIPTION_PLANS.find((p) => p.type === type);
}

// Форматирование цены
export function formatPrice(price: number, currency: string = 'RUB'): string {
  if (price === 0) return 'Бесплатно';
  return `${price.toLocaleString('ru-RU')} ${currency === 'RUB' ? '₽' : currency}`;
}

// Форматирование времени
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} мин`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours} ч ${mins} мин` : `${hours} ч`;
}
