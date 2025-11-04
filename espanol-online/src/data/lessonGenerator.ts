import type { Lesson, CEFRLevel, Test } from '../types';

const LEVELS_CONFIG = [
  { name: 'Базовый' as CEFRLevel, count: 50, topics: ['Алфавит', 'Произношение', 'Числа', 'Цвета', 'Приветствия'] },
  { name: 'A1' as CEFRLevel, count: 80, topics: ['Семья', 'Дом', 'Еда', 'Одежда', 'Транспорт', 'Город', 'Работа'] },
  { name: 'A2' as CEFRLevel, count: 80, topics: ['Путешествия', 'Погода', 'Здоровье', 'Покупки', 'Спорт'] },
  { name: 'B1' as CEFRLevel, count: 80, topics: ['Subjuntivo', 'Культура', 'История', 'Технологии'] },
  { name: 'B2' as CEFRLevel, count: 80, topics: ['Subjuntivo прошедшее', 'Литература', 'Политика', 'Экономика'] },
  { name: 'C1' as CEFRLevel, count: 80, topics: ['Академический язык', 'Бизнес', 'Наука', 'Философия'] },
];

export function generateAllLessons(): Lesson[] {
  const lessons: Lesson[] = [];
  let globalId = 1;

  LEVELS_CONFIG.forEach((level) => {
    const topicsExpanded = Array(level.count).fill(null).map((_, i) =>
      `${level.topics[i % level.topics.length]} ${Math.floor(i / level.topics.length) + 1}`
    );

    for (let i = 0; i < level.count; i++) {
      lessons.push({
        id: `lesson-${globalId++}`,
        levelId: level.name,
        title: topicsExpanded[i],
        description: `Урок ${i + 1} уровня ${level.name}`,
        order: i + 1,
        duration: 30,
        isFree: i < (level.name === 'Базовый' ? 5 : Math.floor(level.count * 0.1)),
        content: {
          introduction: `Добро пожаловать на урок "${topicsExpanded[i]}". В этом уроке вы изучите ключевые аспекты темы.`,
          vocabulary: generateVocabulary(5),
          grammar: {
            rule: `Грамматическое правило для уровня ${level.name}`,
            examples: ['Ejemplo 1', 'Ejemplo 2', 'Ejemplo 3'],
          },
          reading: `Текст для чтения по теме "${topicsExpanded[i]}". Este es un texto adaptado al nivel ${level.name}.`,
          phrases: ['Фраза 1', 'Фраза 2', 'Фраза 3'],
        },
        tests: generateTests(5),
        homework: generateTests(3),
      });
    }
  });

  return lessons;
}

function generateVocabulary(count: number) {
  return Array(count).fill(null).map((_, i) => ({
    id: `vocab-${i}`,
    word: `palabra${i + 1}`,
    translation: `слово${i + 1}`,
    example: `Ejemplo con palabra${i + 1}`,
  }));
}

function generateTests(count: number): Test[] {
  const types: Array<Test['type']> = ['multiple-choice', 'fill-blank', 'matching', 'audio', 'translation', 'sentence-order'];
  return Array(count).fill(null).map((_, i) => ({
    id: `test-${i}`,
    type: types[i % types.length],
    question: `Вопрос ${i + 1}`,
    options: types[i % types.length] === 'multiple-choice' ? ['A', 'B', 'C', 'D'] : undefined,
    correctAnswer: types[i % types.length] === 'multiple-choice' ? 0 : 'answer',
    explanation: 'Объяснение правильного ответа',
  }));
}

export const LESSONS_DATA = generateAllLessons();
export const LEVELS_DATA = LEVELS_CONFIG.map((l, i) => ({
  id: l.name,
  name: l.name,
  description: `Уровень ${l.name}`,
  order: i,
  lessonCount: l.count,
  color: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#6366f1'][i],
}));
