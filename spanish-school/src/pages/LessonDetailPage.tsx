import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { mockLessons } from '../data/mockLessons';
import { useStore } from '../lib/store';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { CheckCircle, XCircle } from 'lucide-react';

export const LessonDetailPage: React.FC = () => {
  const { id } = useParams();
  const { user, updateLessonProgress } = useStore();
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);

  const lesson = mockLessons.find((l) => l.id === id);

  if (!lesson) return <Navigate to="/lessons" />;

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    const correct = lesson.exercises.filter(
      (ex) => answers[ex.id] === ex.correctAnswer
    ).length;
    const score = Math.round((correct / lesson.exercises.length) * 100);

    if (user) {
      await updateLessonProgress(lesson.id, score, score >= 70);
    }

    setShowResults(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-2">{lesson.title}</h1>
      <p className="text-gray-600 mb-8">{lesson.description}</p>

      {/* Theory */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Теория</h2>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.theory.content.replace(/\n/g, '<br/>') }} />

        <h3 className="text-xl font-bold mt-6 mb-3">Примеры:</h3>
        <ul className="space-y-2">
          {lesson.theory.examples.map((ex, i) => (
            <li key={i} className="text-gray-700">{ex}</li>
          ))}
        </ul>

        {lesson.theory.vocabulary && (
          <>
            <h3 className="text-xl font-bold mt-6 mb-3">Словарь:</h3>
            <div className="space-y-2">
              {lesson.theory.vocabulary.map((word, i) => (
                <div key={i} className="flex gap-4">
                  <span className="font-semibold">{word.spanish}</span>
                  <span className="text-gray-600">→</span>
                  <span>{word.russian}</span>
                  {word.example && <span className="text-sm text-gray-500 italic">({word.example})</span>}
                </div>
              ))}
            </div>
          </>
        )}
      </Card>

      {/* Exercises */}
      <Card>
        <h2 className="text-2xl font-bold mb-4">Упражнения</h2>
        {lesson.exercises.map((exercise, idx) => (
          <div key={exercise.id} className="mb-6 pb-6 border-b last:border-0">
            <h3 className="font-semibold mb-3">Вопрос {idx + 1}: {exercise.question}</h3>

            {exercise.type === 'multiple-choice' && exercise.options && (
              <div className="space-y-2">
                {exercise.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(exercise.id, i)}
                    className={`block w-full text-left p-3 rounded border-2 transition ${
                      answers[exercise.id] === i
                        ? 'border-secondary bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {exercise.type === 'fill-blank' && (
              <input
                type="text"
                className="input"
                placeholder="Ваш ответ..."
                value={answers[exercise.id] || ''}
                onChange={(e) => handleAnswer(exercise.id, e.target.value)}
              />
            )}

            {showResults && (
              <div className={`mt-3 p-3 rounded ${
                answers[exercise.id] === exercise.correctAnswer
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}>
                {answers[exercise.id] === exercise.correctAnswer ? (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Правильно!</span>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="w-5 h-5" />
                      <span>Неправильно</span>
                    </div>
                    <p className="text-sm">{exercise.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {!showResults && (
          <Button onClick={handleSubmit} className="w-full">
            Проверить ответы
          </Button>
        )}
      </Card>
    </div>
  );
};
