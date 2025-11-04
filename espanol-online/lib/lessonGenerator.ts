import type { CEFRLevel, Lesson, Test } from './types'
import { VOCABULARY_BY_LEVEL, GRAMMAR_TOPICS_BY_LEVEL, READING_TOPICS_BY_LEVEL } from './lessonsData'

const LEVELS_CONFIG: Array<{ name: CEFRLevel; count: number }> = [
  { name: 'Базовый', count: 50 },
  { name: 'A1', count: 80 },
  { name: 'A2', count: 80 },
  { name: 'B1', count: 80 },
  { name: 'B2', count: 80 },
  { name: 'C1', count: 80 }
]

// Детальные тексты для чтения по уровням
const READING_TEXTS: Record<CEFRLevel, string[]> = {
  'Базовый': [
    'Hola. Me llamo María. Soy de España. Tengo una familia. Mi padre se llama Juan. Mi madre se llama Ana. Tengo un hermano. Mi casa es grande. Tengo un perro y un gato. Me gusta mi familia.',
    'Uno, dos, tres, cuatro, cinco. Los números son importantes. Yo cuento: seis, siete, ocho, nueve, diez. En mi clase hay veinte estudiantes.',
    'Los colores son bonitos. El rojo es mi color favorito. También me gusta el azul y el verde. El amarillo es el color del sol. El cielo es azul.',
  ],
  'A1': [
    'Me llamo Carlos y vivo en Madrid. Tengo 25 años y trabajo en una oficina. Por la mañana me levanto a las 7, desayuno café con tostadas y salgo de casa a las 8. Trabajo de 9 a 6 de la tarde. Por la noche, ceno con mi familia y veo la televisión. Los fines de semana me gusta salir con mis amigos.',
    'Mi familia es muy grande. Tengo dos hermanos y una hermana. Mis padres se llaman Antonio y Carmen. También tengo cuatro abuelos: dos abuelos y dos abuelas. En las reuniones familiares somos más de 20 personas. Me encanta estar con mi familia.',
    'En mi casa hay cinco habitaciones. La cocina es muy moderna y tiene todos los electrodomésticos. El salón es grande y cómodo. Tengo mi propio dormitorio con una cama, un armario y un escritorio. El baño es pequeño pero funcional. Me gusta mucho mi casa.',
  ],
  'A2': [
    'El verano pasado fui de vacaciones a Barcelona. Visité la Sagrada Familia y el Parque Güell. La arquitectura de Gaudí es impresionante. También paseé por Las Ramblas y comí paella en un restaurante cerca de la playa. Fue un viaje inolvidable. El año que viene quiero volver.',
    'Ayer hablé con mi jefe sobre mi futuro en la empresa. Me dijo que mi trabajo es excelente y que pronto tendré una promoción. Estoy muy contento porque he trabajado mucho este año. La semana pasada terminé un proyecto importante y todos mis compañeros me felicitaron.',
    'Hoy hace un día perfecto. El sol brilla, la temperatura es agradable y no hace viento. Es el mejor momento para salir a pasear. Mañana dicen que va a llover, así que hoy aprovecharé para ir al parque. En invierno hace mucho frío aquí, pero en primavera el clima es ideal.',
  ],
  'B1': [
    'Cuando era niño, vivía en un pueblo pequeño. Todos los días iba a la escuela a pie y por las tardes jugaba con mis amigos en la plaza. Los fines de semana, mi familia y yo íbamos al campo. Esos años fueron los más felices de mi vida. Ahora vivo en la ciudad y a veces echo de menos aquellos tiempos.',
    'El próximo año viajaré a América Latina. Visitaré México, Argentina y Chile. Aprenderé sobre sus culturas y probaré su comida típica. Será una experiencia increíble. Espero que el viaje salga bien y que no haya problemas. Es importante que planifique todo con antelación.',
    'Es necesario que todos cuidemos el medio ambiente. Es fundamental que reciclemos y que reduzcamos el consumo de plástico. Espero que los gobiernos tomen medidas urgentes contra el cambio climático. Dudo que podamos resolver todos los problemas rápidamente, pero es importante que empecemos ahora.',
  ],
  'B2': [
    'Si tuviera más tiempo libre, aprendería a tocar un instrumento musical. Siempre me ha fascinado el piano. Si hubiera estudiado música cuando era joven, ahora sería pianista. Aunque es tarde para ser profesional, nunca es tarde para aprender. A pesar de que trabajo muchas horas, podría dedicar los fines de semana a esta afición.',
    'La globalización ha traído tanto ventajas como desventajas. Por un lado, ha facilitado el comercio internacional y la comunicación. Por otro lado, ha aumentado las desigualdades económicas. Es necesario que encontremos un equilibrio. Con tal de que respetemos la diversidad cultural, la globalización puede ser positiva.',
    'El cambio climático es uno de los mayores desafíos de nuestro tiempo. Aunque algunos lo nieguen, la evidencia científica es clara. Los glaciares se derriten, el nivel del mar sube y los eventos climáticos extremos son más frecuentes. A menos que actuemos ahora, las consecuencias serán devastadoras para las futuras generaciones.',
  ],
  'C1': [
    'El análisis del discurso político requiere una comprensión profunda de la retórica y la semiótica. Los políticos utilizan estrategias lingüísticas específicas para persuadir a su audiencia. Habían estudiado minuciosamente las técnicas de oratoria antes de presentar sus propuestas. Para cuando termine el análisis, habremos identificado todos los recursos retóricos empleados.',
    'La epistemología contemporánea ha revolucionado nuestra comprensión del conocimiento. Los filósofos habían cuestionado durante siglos la naturaleza de la verdad. Habría sido imposible predecir estos avances sin la contribución de pensadores como Kant y Heidegger. Para el próximo siglo, habremos reformulado completamente nuestras teorías sobre la cognición humana.',
    'La investigación científica moderna se caracteriza por su interdisciplinariedad. Los científicos habían trabajado en campos separados hasta que comprendieron la importancia de la colaboración. Si hubieran adoptado este enfoque antes, habrían logrado avances más significativos. Es crucial que sigamos fomentando esta sinergia entre disciplinas.',
  ]
}

// Расширенные грамматические объяснения
const GRAMMAR_EXPLANATIONS: Record<CEFRLevel, string[]> = {
  'Базовый': [
    'Алфавит испанского языка состоит из 27 букв. Буква Ñ (эньe) уникальна для испанского языка. Важно правильно произносить все буквы с самого начала.',
    'В испанском языке существуют определённые артикли: EL (мужской род, ед.ч.), LA (женский род, ед.ч.), LOS (мужской род, мн.ч.), LAS (женский род, мн.ч.). Артикль ставится перед существительным.',
    'Существительные в испанском имеют род: мужской (-o: el libro) и женский (-a: la mesa). Есть исключения: el día, la mano.',
  ],
  'A1': [
    'Глаголы на -AR спрягаются так: yo hablo, tú hablas, él/ella habla, nosotros hablamos, vosotros habláis, ellos hablan. Это самая большая группа глаголов.',
    'SER используется для постоянных характеристик (Soy médico), национальности (Soy español), времени (Son las tres). ESTAR - для местоположения (Estoy en casa) и временных состояний (Estoy cansado).',
    'HAY означает "есть, имеется" и используется для указания на существование чего-либо: Hay un libro (есть книга), Hay libros (есть книги). Форма HAY не изменяется.',
  ],
  'A2': [
    'Pretérito Perfecto образуется: haber в presente + participio (-ado/-ido). Используется для недавних действий или действий, связанных с настоящим: He comido (Я поел).',
    'Pretérito Indefinido - простое прошедшее время для завершённых действий: Ayer comí paella (Вчера я ел паэлью). Hablar: hablé, hablaste, habló, hablamos, hablasteis, hablaron.',
    'Сравнительная степень: MÁS + прилагательное + QUE (más alto que - выше чем), MENOS + прилагательное + QUE (menos rápido que - менее быстрый чем), TAN + прилагательное + COMO (tan bueno como - такой же хороший как).',
  ],
  'B1': [
    'Pretérito Imperfecto описывает привычные действия в прошлом или фон: Cuando era niño, jugaba (Когда я был ребёнком, я играл). Окончания -ar: -aba, -abas, -aba, -ábamos, -abais, -aban.',
    'Futuro Simple образуется от инфинитива + окончания: hablaré, hablarás, hablará, hablaremos, hablaréis, hablarán. Используется для предсказаний и обещаний.',
    'Subjuntivo Presente используется после глаголов желания, сомнения, эмоций и безличных конструкций: Quiero que vengas (Я хочу, чтобы ты пришёл). Образование: основа yo presente + противоположные окончания.',
  ],
  'B2': [
    'Condicional Simple выражает гипотетические ситуации: Yo hablaría (Я бы говорил). Образуется от инфинитива + -ía, -ías, -ía, -íamos, -íais, -ían. Используется в условных предложениях типа II.',
    'Subjuntivo Imperfecto имеет две формы: hablara/hablase. Используется в условных предложениях: Si tuviera dinero, viajaría (Если бы у меня были деньги, я бы путешествовал).',
    'Aunque + Subjuntivo выражает гипотетическую уступку: Aunque llueva, saldré (Хотя будет дождь, я выйду). Aunque + Indicativo - для реальных фактов: Aunque llueve, salgo (Хотя идёт дождь, я выхожу).',
  ],
  'C1': [
    'Pluscuamperfecto (había hablado) описывает действие, произошедшее до другого действия в прошлом: Cuando llegué, ya había salido (Когда я пришёл, он уже ушёл).',
    'Futuro Perfecto (habré hablado) выражает действие, которое завершится к определённому моменту в будущем: Para mañana habré terminado (К завтрашнему дню я закончу).',
    'Subjuntivo Perfecto (haya hablado) используется для выражения сомнения о завершённом действии: Dudo que haya llegado (Сомневаюсь, что он пришёл).',
  ]
}

function getVocabularyForLesson(level: CEFRLevel, lessonNum: number): Array<{ spanish: string; russian: string; example: string }> {
  const vocab = VOCABULARY_BY_LEVEL[level]
  const start = ((lessonNum - 1) * 12) % vocab.length
  const selected = []

  for (let i = 0; i < 12; i++) {
    const item = vocab[(start + i) % vocab.length]
    selected.push({
      spanish: item.spanish,
      russian: item.russian,
      example: `${item.spanish} es importante. / ${item.russian} - это важно.`
    })
  }

  return selected
}

function getGrammarForLesson(level: CEFRLevel, lessonNum: number): { title: string; explanation: string; examples: string[] } {
  const grammarTopics = GRAMMAR_TOPICS_BY_LEVEL[level]
  const explanations = GRAMMAR_EXPLANATIONS[level]
  const topicIndex = (lessonNum - 1) % grammarTopics.length

  return {
    title: grammarTopics[topicIndex],
    explanation: explanations[topicIndex % explanations.length],
    examples: [
      'Ejemplo 1: ' + (level === 'Базовый' ? 'El perro es grande' : level === 'A1' ? 'Yo hablo español' : level === 'A2' ? 'He comido paella' : level === 'B1' ? 'Comía cuando llegaste' : level === 'B2' ? 'Si tuviera tiempo, estudiaría' : 'Había estudiado antes de venir'),
      'Ejemplo 2: ' + (level === 'Базовый' ? 'La casa es bonita' : level === 'A1' ? 'Nosotros vivimos en Madrid' : level === 'A2' ? 'Ayer fui al cine' : level === 'B1' ? 'Mañana hablaré contigo' : level === 'B2' ? 'Aunque llueva, saldré' : 'Para mañana habré terminado'),
      'Ejemplo 3: ' + (level === 'Базовый' ? 'Los gatos son pequeños' : level === 'A1' ? 'Ellos estudian mucho' : level === 'A2' ? 'Hemos visitado Barcelona' : level === 'B1' ? 'Espero que vengas' : level === 'B2' ? 'Me gustaría que hablaras' : 'Dudo que haya llegado')
    ]
  }
}

function getReadingForLesson(level: CEFRLevel, lessonNum: number): { title: string; text: string; translation: string } {
  const texts = READING_TEXTS[level]
  const topics = READING_TOPICS_BY_LEVEL[level]
  const textIndex = (lessonNum - 1) % texts.length
  const topicIndex = (lessonNum - 1) % topics.length

  return {
    title: topics[topicIndex],
    text: texts[textIndex],
    translation: 'Перевод: ' + (level === 'Базовый' ? 'Привет. Меня зовут Мария. Я из Испании...' : level === 'A1' ? 'Меня зовут Карлос и я живу в Мадриде...' : level === 'A2' ? 'Прошлым летом я ездил в отпуск в Барселону...' : level === 'B1' ? 'Когда я был ребёнком, я жил в маленькой деревне...' : level === 'B2' ? 'Если бы у меня было больше свободного времени, я бы научился играть на музыкальном инструменте...' : 'Анализ политического дискурса требует глубокого понимания риторики и семиотики...')
  }
}

function generateTests(level: CEFRLevel, lessonNum: number): Test[] {
  const vocab = getVocabularyForLesson(level, lessonNum)

  return [
    {
      id: `test-mc-${level}-${lessonNum}`,
      type: 'multiple-choice',
      question: `¿Cómo se dice "${vocab[0].russian}" en español?`,
      options: [vocab[0].spanish, vocab[1].spanish, vocab[2].spanish, vocab[3].spanish],
      correctAnswer: vocab[0].spanish
    },
    {
      id: `test-fb-${level}-${lessonNum}`,
      type: 'fill-blank',
      question: `Completa: Yo ___ (${level === 'A1' ? 'hablar' : level === 'A2' ? 'comer - Perfecto' : level === 'B1' ? 'vivir - Imperfecto' : level === 'B2' ? 'estudiar - Condicional' : 'terminar - Futuro Perfecto'})`,
      correctAnswer: level === 'A1' ? 'hablo' : level === 'A2' ? 'he comido' : level === 'B1' ? 'vivía' : level === 'B2' ? 'estudiaría' : 'habré terminado'
    },
    {
      id: `test-match-${level}-${lessonNum}`,
      type: 'matching',
      question: `Relaciona las palabras españolas con su traducción al ruso`,
      options: [vocab[0].spanish, vocab[1].spanish, vocab[2].spanish, vocab[3].spanish],
      correctAnswer: [vocab[0].russian, vocab[1].russian, vocab[2].russian, vocab[3].russian]
    },
    {
      id: `test-audio-${level}-${lessonNum}`,
      type: 'audio',
      question: `Escucha y escribe lo que oyes`,
      audioUrl: `/audio/${level.toLowerCase()}-${lessonNum}.mp3`,
      correctAnswer: vocab[0].spanish
    },
    {
      id: `test-trans-${level}-${lessonNum}`,
      type: 'translation',
      question: `Traduce al español: "${vocab[4].russian}"`,
      correctAnswer: vocab[4].spanish
    },
    {
      id: `test-order-${level}-${lessonNum}`,
      type: 'sentence-order',
      question: `Ordena las palabras para formar una oración correcta`,
      options: level === 'A1' ? ['español', 'Yo', 'hablo'] : level === 'A2' ? ['comido', 'He', 'paella'] : level === 'B1' ? ['cuando', 'Vivía', 'Madrid', 'en', 'niño', 'era'] : level === 'B2' ? ['tiempo', 'Si', 'tuviera', 'viajaría'] : ['había', 'Cuando', 'llegué', 'ya', 'salido'],
      correctAnswer: level === 'A1' ? ['Yo', 'hablo', 'español'] : level === 'A2' ? ['He', 'comido', 'paella'] : level === 'B1' ? ['Vivía', 'en', 'Madrid', 'cuando', 'era', 'niño'] : level === 'B2' ? ['Si', 'tuviera', 'tiempo', 'viajaría'] : ['Cuando', 'llegué', 'ya', 'había', 'salido']
    },
    {
      id: `test-mc2-${level}-${lessonNum}`,
      type: 'multiple-choice',
      question: `Selecciona la forma correcta del verbo`,
      options: level === 'A1' ? ['hablo', 'hablas', 'habla', 'hablamos'] : level === 'A2' ? ['he comido', 'has comido', 'ha comido', 'hemos comido'] : level === 'B1' ? ['comía', 'comías', 'comía', 'comíamos'] : level === 'B2' ? ['hablaría', 'hablarías', 'hablaría', 'hablaríamos'] : ['había hablado', 'habías hablado', 'había hablado', 'habíamos hablado'],
      correctAnswer: level === 'A1' ? 'hablo' : level === 'A2' ? 'he comido' : level === 'B1' ? 'comía' : level === 'B2' ? 'hablaría' : 'había hablado'
    },
    {
      id: `test-fb2-${level}-${lessonNum}`,
      type: 'fill-blank',
      question: `Completa con la palabra correcta: ${vocab[5].spanish} significa ___`,
      correctAnswer: vocab[5].russian
    }
  ]
}

function generateLesson(level: CEFRLevel, number: number): Lesson {
  return {
    id: `${level.toLowerCase().replace('ый', 'yj')}-${number}`,
    level,
    number,
    title: `Урок ${number}: ${GRAMMAR_TOPICS_BY_LEVEL[level][(number - 1) % GRAMMAR_TOPICS_BY_LEVEL[level].length]}`,
    vocabulary: getVocabularyForLesson(level, number),
    grammar: getGrammarForLesson(level, number),
    reading: getReadingForLesson(level, number),
    tests: generateTests(level, number)
  }
}

export function generateAllLessons(): Lesson[] {
  const allLessons: Lesson[] = []

  for (const levelConfig of LEVELS_CONFIG) {
    const { name, count } = levelConfig

    for (let i = 1; i <= count; i++) {
      allLessons.push(generateLesson(name, i))
    }
  }

  console.log(`✅ Generated ${allLessons.length} lessons total`)
  return allLessons
}

export const LESSONS_DATA = generateAllLessons()
