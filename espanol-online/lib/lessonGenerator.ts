import type { CEFRLevel, Lesson, Test } from './types'

const LEVELS_CONFIG: Array<{ name: CEFRLevel; count: number; topics: string[] }> = [
  {
    name: 'Базовый',
    count: 50,
    topics: [
      'Приветствия', 'Числа', 'Цвета', 'Семья', 'Еда', 'Дом', 'Одежда', 'Животные',
      'Погода', 'Время', 'Дни недели', 'Месяцы', 'Транспорт', 'Школа', 'Работа'
    ]
  },
  {
    name: 'A1',
    count: 80,
    topics: [
      'Знакомство', 'Профессии', 'Хобби', 'Покупки', 'Ресторан', 'Путешествия',
      'Здоровье', 'Спорт', 'Музыка', 'Кино', 'Город', 'Природа', 'Праздники'
    ]
  },
  {
    name: 'A2',
    count: 80,
    topics: [
      'Отношения', 'Образование', 'Технологии', 'Культура', 'История', 'География',
      'Экология', 'Мода', 'Искусство', 'Литература', 'Наука', 'Политика'
    ]
  },
  {
    name: 'B1',
    count: 80,
    topics: [
      'Карьера', 'Бизнес', 'Финансы', 'Недвижимость', 'Юриспруденция', 'Медицина',
      'Психология', 'Философия', 'Социология', 'Экономика', 'Журналистика'
    ]
  },
  {
    name: 'B2',
    count: 80,
    topics: [
      'Дипломатия', 'Международные отношения', 'Глобализация', 'Инновации',
      'Устойчивое развитие', 'Права человека', 'Демография', 'Урбанизация'
    ]
  },
  {
    name: 'C1',
    count: 80,
    topics: [
      'Академическое письмо', 'Научные исследования', 'Критическое мышление',
      'Аргументация', 'Анализ текстов', 'Риторика', 'Лингвистика', 'Семиотика'
    ]
  }
]

function generateTests(level: CEFRLevel, lessonNum: number): Test[] {
  return [
    {
      id: `test-mc-${level}-${lessonNum}`,
      type: 'multiple-choice',
      question: `Выберите правильный вариант для ${level} ${lessonNum}`,
      options: ['Опция A', 'Опция B', 'Опция C', 'Опция D'],
      correctAnswer: 'Опция A'
    },
    {
      id: `test-fb-${level}-${lessonNum}`,
      type: 'fill-blank',
      question: `Заполните пропуск: Yo ___ español (${level} ${lessonNum})`,
      correctAnswer: 'hablo'
    },
    {
      id: `test-match-${level}-${lessonNum}`,
      type: 'matching',
      question: `Сопоставьте слова (${level} ${lessonNum})`,
      options: ['Hola', 'Adiós', 'Gracias', 'Por favor'],
      correctAnswer: ['Привет', 'Пока', 'Спасибо', 'Пожалуйста']
    },
    {
      id: `test-audio-${level}-${lessonNum}`,
      type: 'audio',
      question: `Прослушайте и напишите (${level} ${lessonNum})`,
      audioUrl: '/audio/sample.mp3',
      correctAnswer: 'Buenos días'
    },
    {
      id: `test-trans-${level}-${lessonNum}`,
      type: 'translation',
      question: `Переведите: "Я изучаю испанский язык" (${level} ${lessonNum})`,
      correctAnswer: 'Estudio español'
    },
    {
      id: `test-order-${level}-${lessonNum}`,
      type: 'sentence-order',
      question: `Составьте предложение (${level} ${lessonNum})`,
      options: ['español', 'Yo', 'hablo'],
      correctAnswer: ['Yo', 'hablo', 'español']
    }
  ]
}

function generateLesson(level: CEFRLevel, number: number, topic: string): Lesson {
  return {
    id: `${level.toLowerCase()}-${number}`,
    level,
    number,
    title: `Урок ${number}: ${topic}`,
    vocabulary: [
      {
        spanish: 'Hola',
        russian: 'Привет',
        example: 'Hola, ¿cómo estás?'
      },
      {
        spanish: 'Adiós',
        russian: 'Пока',
        example: 'Adiós, hasta luego'
      },
      {
        spanish: 'Gracias',
        russian: 'Спасибо',
        example: 'Muchas gracias por todo'
      }
    ],
    grammar: {
      title: `Грамматика урока ${number}`,
      explanation: `Объяснение грамматики для уровня ${level}, урок ${number}: ${topic}`,
      examples: [
        'Yo hablo español',
        'Tú hablas inglés',
        'Él/Ella habla francés'
      ]
    },
    reading: {
      title: `Текст для чтения: ${topic}`,
      text: `Este es un texto de lectura para el nivel ${level}, lección ${number}. El tema es "${topic}". En este texto, aprenderemos vocabulario y gramática relacionados con este tema.`,
      translation: `Это текст для чтения для уровня ${level}, урок ${number}. Тема: "${topic}". В этом тексте мы изучим лексику и грамматику, связанные с этой темой.`
    },
    tests: generateTests(level, number)
  }
}

export function generateAllLessons(): Lesson[] {
  const allLessons: Lesson[] = []

  for (const levelConfig of LEVELS_CONFIG) {
    const { name, count, topics } = levelConfig

    for (let i = 1; i <= count; i++) {
      const topicIndex = (i - 1) % topics.length
      const topic = topics[topicIndex]
      allLessons.push(generateLesson(name, i, topic))
    }
  }

  return allLessons
}

export const LESSONS_DATA = generateAllLessons()
