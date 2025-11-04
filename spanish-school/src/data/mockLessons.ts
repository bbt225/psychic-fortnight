import type { Lesson, CEFRLevel } from '../types';

// Генератор уроков
function generateLesson(level: CEFRLevel, number: number): Lesson {
  const isFree = number <= 5; // Первые 5 уроков бесплатные

  const topics: Record<CEFRLevel, string[]> = {
    A1: ['Приветствия', 'Алфавит', 'Числа 1-10', 'Цвета', 'Семья', 'Дни недели', 'Месяцы', 'Профессии', 'Еда', 'Животные'],
    A2: ['Прошедшее время', 'Будущее время', 'Направления', 'Погода', 'Покупки', 'В ресторане', 'Транспорт', 'Здоровье', 'Хобби', 'Путешествия'],
    B1: ['Условное наклонение', 'Субхунтиво', 'Косвенная речь', 'Пассивный залог', 'Работа', 'Образование', 'Технологии', 'Культура', 'История', 'Политика'],
    B2: ['Сложные времена', 'Идиомы', 'Формальная речь', 'Деловая переписка', 'Литература', 'Искусство', 'Философия', 'Экономика', 'Наука', 'Экология'],
    C1: ['Продвинутая грамматика', 'Стилистика', 'Дипломатия', 'Академическое письмо', 'Юридический язык', 'Медицинская терминология', 'Журналистика', 'Поэзия', 'Риторика', 'Лингвистика'],
    C2: ['Совершенное владение', 'Региональные диалекты', 'Исторический язык', 'Профессиональный перевод', 'Литературный анализ', 'Лингвистические исследования', 'Культурные нюансы', 'Этимология', 'Семантика', 'Прагматика'],
  };

  const topicIndex = (number - 1) % topics[level].length;
  const topic = topics[level][topicIndex];

  return {
    id: `${level.toLowerCase()}-${number}`,
    level,
    number,
    title: `${topic}`,
    description: `Урок ${number}: изучение темы "${topic}" на уровне ${level}`,
    isFree,
    estimatedTime: 20 + (number % 5) * 10,
    theory: {
      content: `# ${topic}\n\nВ этом уроке мы изучим тему "${topic}".\n\n## Основные понятия\n\nПодробное объяснение темы с примерами и правилами.`,
      examples: [
        'Hola, ¿cómo estás? - Привет, как дела?',
        'Buenos días - Доброе утро',
        'Gracias - Спасибо',
      ],
      vocabulary: [
        { spanish: 'Hola', russian: 'Привет', example: 'Hola, amigo' },
        { spanish: 'Gracias', russian: 'Спасибо', example: 'Muchas gracias' },
        { spanish: 'Por favor', russian: 'Пожалуйста', example: 'Por favor, ayúdame' },
      ],
    },
    exercises: [
      {
        id: `${level}-${number}-ex1`,
        type: 'multiple-choice',
        question: 'Как сказать "привет" по-испански?',
        options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
        correctAnswer: 0,
        explanation: 'Hola - это "привет" на испанском',
      },
      {
        id: `${level}-${number}-ex2`,
        type: 'multiple-choice',
        question: 'Что означает "Gracias"?',
        options: ['Пожалуйста', 'Спасибо', 'Извините', 'До свидания'],
        correctAnswer: 1,
        explanation: 'Gracias означает "спасибо"',
      },
      {
        id: `${level}-${number}-ex3`,
        type: 'fill-blank',
        question: 'Заполните пропуск: "___ días" (Доброе утро)',
        correctAnswer: 'Buenos',
        explanation: 'Buenos días - доброе утро',
      },
    ],
    test: {
      id: `${level}-${number}-test`,
      passingScore: 70,
      timeLimit: 600,
      questions: [
        {
          id: `${level}-${number}-q1`,
          type: 'multiple-choice',
          question: 'Переведите: "Как дела?"',
          options: ['¿Cómo estás?', '¿Qué tal?', '¿Cómo te llamas?', 'A и B верны'],
          correctAnswer: 3,
          explanation: 'И "¿Cómo estás?" и "¿Qué tal?" означают "как дела?"',
        },
        {
          id: `${level}-${number}-q2`,
          type: 'multiple-choice',
          question: 'Что означает "Por favor"?',
          options: ['Спасибо', 'Пожалуйста', 'Извините', 'Пока'],
          correctAnswer: 1,
          explanation: 'Por favor - пожалуйста',
        },
      ],
    },
  };
}

// Генерируем все 300 уроков
export const mockLessons: Lesson[] = [];

const levels: CEFRLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
levels.forEach((level) => {
  for (let i = 1; i <= 50; i++) {
    mockLessons.push(generateLesson(level, i));
  }
});
