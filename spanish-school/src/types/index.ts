// Уровни CEFR
export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

// Типы упражнений
export type ExerciseType =
  | 'multiple-choice'
  | 'fill-blank'
  | 'translation'
  | 'matching'
  | 'ordering';

// Упражнение
export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string;
  options?: string[];
  correctAnswer: number | string;
  explanation?: string;
}

// Тест
export interface Test {
  id: string;
  questions: Exercise[];
  passingScore: number; // от 0 до 100
  timeLimit?: number; // в секундах
}

// Теория урока
export interface LessonTheory {
  content: string;
  examples: string[];
  vocabulary?: {
    spanish: string;
    russian: string;
    example?: string;
  }[];
  grammar?: {
    rule: string;
    examples: string[];
  }[];
}

// Урок
export interface Lesson {
  id: string;
  level: CEFRLevel;
  number: number;
  title: string;
  description: string;
  theory: LessonTheory;
  exercises: Exercise[];
  test: Test;
  isFree: boolean; // бесплатный или нет
  estimatedTime: number; // минуты
  createdAt?: string;
  updatedAt?: string;
}

// Прогресс урока
export interface LessonProgress {
  lessonId: string;
  userId: string;
  completed: boolean;
  score?: number;
  attempts: number;
  lastAttemptAt?: string;
  completedAt?: string;
}

// Типы подписок
export type SubscriptionType = 'free' | 'basic' | 'premium';

export interface SubscriptionPlan {
  type: SubscriptionType;
  name: string;
  price: number;
  currency: string;
  features: string[];
  accessLevels: CEFRLevel[];
  description: string;
}

// Пользователь
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: 'user' | 'admin';
  subscription: SubscriptionType;
  subscriptionExpiresAt?: string;
  createdAt: string;
  lastLoginAt?: string;
}

// Профиль пользователя с прогрессом
export interface UserProfile extends User {
  progress: LessonProgress[];
  totalLessonsCompleted: number;
  currentLevel?: CEFRLevel;
  streak?: number; // дней подряд
}

// Статистика для админ-панели
export interface AdminStats {
  totalUsers: number;
  activeSubscriptions: {
    free: number;
    basic: number;
    premium: number;
  };
  totalLessons: number;
  popularLessons: {
    lessonId: string;
    title: string;
    completions: number;
  }[];
  recentUsers: User[];
  revenue: {
    total: number;
    thisMonth: number;
  };
}

// Результат теста
export interface TestResult {
  lessonId: string;
  userId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  answers: {
    questionId: string;
    userAnswer: number | string;
    correct: boolean;
  }[];
  completedAt: string;
}

// Транзакция (фиктивная)
export interface Transaction {
  id: string;
  userId: string;
  subscriptionType: SubscriptionType;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  createdAt: string;
  completedAt?: string;
}

// Уведомление
export interface Notification {
  id: string;
  userId: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// Store состояние
export interface AppState {
  user: User | null;
  lessons: Lesson[];
  progress: LessonProgress[];
  loading: boolean;
  error: string | null;
}

// Фильтры для уроков
export interface LessonFilter {
  level?: CEFRLevel;
  completed?: boolean;
  search?: string;
}

// Уровень информация
export interface LevelInfo {
  level: CEFRLevel;
  name: string;
  description: string;
  totalLessons: number;
  requiredForNext?: CEFRLevel;
  color: string;
}
