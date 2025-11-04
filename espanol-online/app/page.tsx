'use client'

import { useEffect, useState } from 'react'
import { useStore } from '@/lib/store'
import type { Lesson } from '@/lib/types'

export default function Home() {
  const { user, lessons, progress, signIn, signUp, signOut, checkUser, loading } = useStore()
  const [view, setView] = useState<'home' | 'login' | 'register' | 'lessons' | 'lesson'>('home')
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  useEffect(() => {
    checkUser()
  }, [])

  const handleSignIn = async () => {
    try {
      await signIn(email, password)
      setView('lessons')
    } catch (error) {
      alert('Ошибка входа')
    }
  }

  const handleSignUp = async () => {
    try {
      await signUp(email, password, name)
      setView('lessons')
    } catch (error) {
      alert('Ошибка регистрации')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-lg text-foreground">Загрузка...</div>
      </div>
    )
  }

  if (!user && view === 'home') {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-2xl font-semibold text-primary">EspañolOnline</h1>
              <div className="flex gap-3">
                <button
                  onClick={() => setView('login')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  Вход
                </button>
                <button
                  onClick={() => setView('register')}
                  className="px-4 py-2 text-sm font-medium bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
                >
                  Регистрация
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-5xl font-bold text-primary mb-6">
              Изучайте испанский язык онлайн
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              450 уроков от базового до C1 уровня. 6 типов тестов. Персональная статистика.
            </p>
            <button
              onClick={() => setView('register')}
              className="px-8 py-3 text-lg font-medium bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
            >
              Начать бесплатно
            </button>
          </div>

          <div className="mt-24 grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-primary mb-3">450 уроков</h3>
              <p className="text-gray-600">От базового уровня до C1, структурированная программа обучения</p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-primary mb-3">6 типов тестов</h3>
              <p className="text-gray-600">Множественный выбор, перевод, аудирование и другие форматы</p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-primary mb-3">Отслеживание прогресса</h3>
              <p className="text-gray-600">Личная статистика и достижения для мотивации</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!user && view === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-secondary">
        <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-primary mb-6">Вход</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="••••••••"
              />
            </div>
            <button
              onClick={handleSignIn}
              className="w-full px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors font-medium"
            >
              Войти
            </button>
            <button
              onClick={() => setView('home')}
              className="w-full px-4 py-2 text-gray-700 hover:text-primary transition-colors"
            >
              Назад
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!user && view === 'register') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-secondary">
        <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-primary mb-6">Регистрация</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="Ваше имя"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="tu@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                placeholder="••••••••"
              />
            </div>
            <button
              onClick={handleSignUp}
              className="w-full px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors font-medium"
            >
              Зарегистрироваться
            </button>
            <button
              onClick={() => setView('home')}
              className="w-full px-4 py-2 text-gray-700 hover:text-primary transition-colors"
            >
              Назад
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (user && (view === 'lessons' || view === 'home')) {
    const levelGroups = lessons.reduce((acc, lesson) => {
      if (!acc[lesson.level]) acc[lesson.level] = []
      acc[lesson.level].push(lesson)
      return acc
    }, {} as Record<string, Lesson[]>)

    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-2xl font-semibold text-primary">EspañolOnline</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  {user.name} ({user.subscription})
                </span>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                >
                  Выход
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-3xl font-bold text-primary mb-8">Уроки</h2>

          {Object.entries(levelGroups).map(([level, levelLessons]) => (
            <div key={level} className="mb-8">
              <h3 className="text-2xl font-semibold text-primary mb-4">{level}</h3>
              <div className="grid md:grid-cols-4 gap-4">
                {levelLessons.slice(0, 8).map((lesson) => {
                  const completed = progress.find(p => p.lessonId === lesson.id)
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => {
                        setSelectedLesson(lesson)
                        setView('lesson')
                      }}
                      className="p-4 bg-white rounded-lg border border-gray-200 hover:border-accent transition-colors text-left"
                    >
                      <div className="font-medium text-primary">{lesson.title}</div>
                      {completed && (
                        <div className="text-xs text-green-600 mt-1">
                          Пройдено: {completed.score}%
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </main>
      </div>
    )
  }

  if (user && view === 'lesson' && selectedLesson) {
    return (
      <div className="min-h-screen bg-background">
        <nav className="border-b border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-2xl font-semibold text-primary">EspañolOnline</h1>
              <button
                onClick={() => {
                  setView('lessons')
                  setSelectedLesson(null)
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                ← Назад к урокам
              </button>
            </div>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-3xl font-bold text-primary mb-8">{selectedLesson.title}</h2>

          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-primary mb-4">Словарь</h3>
            <div className="space-y-3">
              {selectedLesson.vocabulary.map((word, i) => (
                <div key={i} className="border-b border-gray-100 pb-2">
                  <div className="font-medium text-primary">{word.spanish} - {word.russian}</div>
                  <div className="text-sm text-gray-600 italic">{word.example}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-primary mb-4">{selectedLesson.grammar.title}</h3>
            <p className="text-gray-700 mb-4">{selectedLesson.grammar.explanation}</p>
            <div className="space-y-2">
              {selectedLesson.grammar.examples.map((example, i) => (
                <div key={i} className="text-sm text-gray-600 italic">• {example}</div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-xl font-semibold text-primary mb-4">{selectedLesson.reading.title}</h3>
            <p className="text-gray-700 mb-4">{selectedLesson.reading.text}</p>
            <p className="text-sm text-gray-600">{selectedLesson.reading.translation}</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-primary mb-4">Тесты ({selectedLesson.tests.length})</h3>
            <div className="space-y-4">
              {selectedLesson.tests.map((test, i) => (
                <div key={test.id} className="border-b border-gray-100 pb-4">
                  <div className="font-medium text-primary mb-2">{i + 1}. {test.question}</div>
                  <div className="text-sm text-gray-600">Тип: {test.type}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return null
}
