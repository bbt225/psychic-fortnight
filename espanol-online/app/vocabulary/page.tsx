'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { VOCABULARY_BY_LEVEL } from '@/lib/lessonsData'
import Link from 'next/link'

export default function VocabularyPage() {
  const router = useRouter()
  const { user, progress, checkUser } = useStore()

  useEffect(() => {
    checkUser()
  }, [])

  if (!user) {
    router.push('/')
    return null
  }

  const completedLessons = progress.filter(p => p.completed)
  const studiedWords = completedLessons.length * 12 // 12 слов на урок

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-semibold text-primary">EspañolOnline</Link>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-primary">Dashboard</Link>
              <Link href="/vocabulary" className="text-sm font-medium text-accent">Словарь</Link>
              <span className="text-sm text-gray-600">{user.name}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Мой словарь</h1>
          <p className="text-gray-600">Изучено слов: <span className="font-semibold text-primary">{studiedWords}</span></p>
        </div>

        <div className="space-y-8">
          {Object.entries(VOCABULARY_BY_LEVEL).map(([level, words]) => (
            <div key={level} className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-primary mb-4">{level}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {words.slice(0, 20).map((word, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-lg font-medium text-primary">{word.spanish}</span>
                      <button className="text-gray-400 hover:text-accent">🔊</button>
                    </div>
                    <div className="text-gray-600 text-sm">{word.russian}</div>
                    <div className="text-gray-500 text-xs mt-1 italic">{word.topic}</div>
                  </div>
                ))}
              </div>
              {words.length > 20 && (
                <p className="text-center text-gray-500 text-sm mt-4">
                  ...и ещё {words.length - 20} слов
                </p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
