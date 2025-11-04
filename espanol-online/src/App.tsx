import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useStore } from './lib/store';
import { LEVELS_DATA } from './data/lessonGenerator';

// ULTRA-COMPACT: All pages in one file
const Nav = () => {
  const user = useStore(s => s.user);
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-accent">EspañolOnline</Link>
        <div className="flex gap-6">
          <Link to="/levels" className="hover:text-accent">Уровни</Link>
          <Link to="/pricing" className="hover:text-accent">Тарифы</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-accent">Кабинет</Link>
              {user.role === 'admin' && <Link to="/admin" className="hover:text-accent">Админ</Link>}
            </>
          ) : (
            <Link to="/login" className="btn-primary">Войти</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

const Home = () => (
  <div className="min-h-screen bg-gradient-to-b from-accent/10 to-white">
    <div className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold mb-6">Изучайте испанский язык</h1>
      <p className="text-2xl mb-8">450 уроков от Базового до C1</p>
      <Link to="/levels" className="btn-primary text-xl">Начать обучение</Link>
      <div className="grid md:grid-cols-3 gap-8 mt-20">
        {[
          { title: '450 уроков', desc: '6 уровней CEFR' },
          { title: '6 типов тестов', desc: 'Интерактивное обучение' },
          { title: 'Сертификаты', desc: 'После каждого уровня' },
        ].map(f => (
          <div key={f.title} className="card">
            <h3 className="text-2xl font-bold mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Levels = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Все уровни</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {LEVELS_DATA.map(level => (
          <Link key={level.id} to={`/levels/${level.id}`} className="card hover:shadow-lg transition">
            <div className="w-4 h-4 rounded-full mb-3" style={{ backgroundColor: level.color }} />
            <h2 className="text-2xl font-bold mb-2">{level.name}</h2>
            <p className="text-gray-600 mb-2">{level.description}</p>
            <p className="text-sm text-gray-500">{level.lessonCount} уроков</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

const LevelLessons = () => {
  const lessons = useStore(s => s.lessons);
  const progress = useStore(s => s.progress);
  const levelId = window.location.pathname.split('/').pop();
  const levelLessons = lessons.filter(l => l.levelId === levelId);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Уроки уровня {levelId}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {levelLessons.map(lesson => {
          const completed = progress.find(p => p.lessonId === lesson.id)?.completed;
          return (
            <Link key={lesson.id} to={`/lessons/${lesson.id}`} className="card hover:shadow-lg transition">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold">{lesson.title}</h3>
                {completed && <span className="text-green-500">✓</span>}
                {!lesson.isFree && <span className="text-accent">🔒</span>}
              </div>
              <p className="text-sm text-gray-600">Урок {lesson.order} · {lesson.duration} мин</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const LessonDetail = () => {
  const lessons = useStore(s => s.lessons);
  const completeLesson = useStore(s => s.completeLesson);
  const lessonId = window.location.pathname.split('/').pop();
  const lesson = lessons.find(l => l.id === lessonId);

  if (!lesson) return <div>Урок не найден</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">{lesson.title}</h1>
      <div className="card mb-6">
        <h2 className="text-2xl font-bold mb-3">Введение</h2>
        <p>{lesson.content.introduction}</p>
      </div>
      <div className="card mb-6">
        <h2 className="text-2xl font-bold mb-3">Словарь</h2>
        {lesson.content.vocabulary.map(v => (
          <div key={v.id} className="flex gap-4 mb-2">
            <span className="font-semibold">{v.word}</span>
            <span>→</span>
            <span>{v.translation}</span>
            <span className="text-sm text-gray-500">{v.example}</span>
          </div>
        ))}
      </div>
      <div className="card mb-6">
        <h2 className="text-2xl font-bold mb-3">Грамматика</h2>
        <p className="mb-2">{lesson.content.grammar.rule}</p>
        {lesson.content.grammar.examples.map((ex, i) => <p key={i} className="text-gray-600">{ex}</p>)}
      </div>
      <div className="card mb-6">
        <h2 className="text-2xl font-bold mb-3">Тесты</h2>
        {lesson.tests.map((test, i) => (
          <div key={test.id} className="mb-4 pb-4 border-b last:border-0">
            <p className="font-semibold mb-2">Вопрос {i + 1}: {test.question}</p>
            {test.options?.map((opt, j) => (
              <button key={j} className="block w-full text-left p-2 border rounded mb-2 hover:bg-gray-50">
                {opt}
              </button>
            ))}
          </div>
        ))}
        <button onClick={() => completeLesson(lesson.id, 85)} className="btn-primary w-full mt-4">
          Завершить урок
        </button>
      </div>
    </div>
  );
};

const Pricing = () => {
  const plans = [
    { name: 'Free', price: 0, features: ['10% уроков', 'Базовые функции'] },
    { name: 'Месячный', price: 990, features: ['Все уроки', 'Сертификаты', 'Без рекламы'] },
    { name: 'Квартальный', price: 2490, features: ['Все уроки', '-15%', 'Поддержка'] },
    { name: 'Годовой', price: 7990, features: ['Все уроки', '-33%', 'Консультации'] },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Тарифы</h1>
      <div className="grid md:grid-cols-4 gap-6">
        {plans.map(plan => (
          <div key={plan.name} className="card">
            <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
            <div className="text-4xl font-bold mb-4">{plan.price === 0 ? 'Бесплатно' : `${plan.price}₽`}</div>
            <ul className="mb-6 space-y-2">
              {plan.features.map(f => <li key={f}>✓ {f}</li>)}
            </ul>
            <Link to="/payment" className="btn-primary block text-center">Выбрать</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const Login = () => {
  const setUser = useStore(s => s.setUser);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6">Вход</h1>
        <input type="email" placeholder="Email" className="input mb-4" />
        <input type="password" placeholder="Пароль" className="input mb-6" />
        <button onClick={() => setUser({ id: '1', email: 'test@test.com', role: 'premium', subscription: 'annual', profile: { firstName: 'Test', lastName: 'User', currentLevel: 'A1', totalXP: 0, streak: 0 }, createdAt: '' })} className="btn-primary w-full">
          Войти
        </button>
        <p className="mt-4 text-center text-sm">
          Нет аккаунта? <Link to="/register" className="text-accent">Регистрация</Link>
        </p>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const user = useStore(s => s.user);
  const progress = useStore(s => s.progress);
  if (!user) return <div>Войдите в систему</div>;

  const completed = progress.filter(p => p.completed).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Личный кабинет</h1>
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h3 className="text-lg text-gray-600 mb-2">Пройдено уроков</h3>
          <div className="text-4xl font-bold">{completed}</div>
        </div>
        <div className="card">
          <h3 className="text-lg text-gray-600 mb-2">Текущий уровень</h3>
          <div className="text-4xl font-bold">{user.profile.currentLevel}</div>
        </div>
        <div className="card">
          <h3 className="text-lg text-gray-600 mb-2">Подписка</h3>
          <div className="text-2xl font-bold">{user.subscription}</div>
        </div>
      </div>
    </div>
  );
};

const Admin = () => (
  <div className="max-w-7xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold mb-8">Админ-панель</h1>
    <div className="grid md:grid-cols-3 gap-6">
      <div className="card">
        <h3 className="text-2xl font-bold mb-2">Пользователи</h3>
        <p className="text-4xl font-bold">1,234</p>
      </div>
      <div className="card">
        <h3 className="text-2xl font-bold mb-2">Уроков</h3>
        <p className="text-4xl font-bold">450</p>
      </div>
      <div className="card">
        <h3 className="text-2xl font-bold mb-2">Подписок</h3>
        <p className="text-4xl font-bold">567</p>
      </div>
    </div>
  </div>
);

const Legal = () => {
  const type = window.location.pathname.split('/').pop();
  const docs: Record<string, { title: string; content: string }> = {
    terms: { title: 'Пользовательское соглашение', content: 'Полное пользовательское соглашение...' },
    privacy: { title: 'Политика конфиденциальности', content: 'Политика конфиденциальности...' },
  };
  const doc = type ? docs[type] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="card">
        <h1 className="text-4xl font-bold mb-8">{doc?.title || 'Документ не найден'}</h1>
        <div className="prose max-w-none">{doc?.content}</div>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter basename="/psychic-fortnight">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/levels" element={<Levels />} />
        <Route path="/levels/:levelId" element={<LevelLessons />} />
        <Route path="/lessons/:lessonId" element={<LessonDetail />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/legal/:type" element={<Legal />} />
      </Routes>
    </BrowserRouter>
  );
}
