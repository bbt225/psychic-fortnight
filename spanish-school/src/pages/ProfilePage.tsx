import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Card } from '../components/ui/Card';
import { User, Award, TrendingUp } from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, progress } = useStore();

  if (!user) return <Navigate to="/login" />;

  const completedLessons = progress.filter((p) => p.completed).length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Мой профиль</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center">
          <User className="w-12 h-12 text-secondary mx-auto mb-3" />
          <h3 className="font-bold text-lg">{user.displayName || user.email}</h3>
          <p className="text-sm text-gray-600 mt-1">Подписка: {user.subscription}</p>
        </Card>

        <Card className="text-center">
          <Award className="w-12 h-12 text-accent mx-auto mb-3" />
          <h3 className="font-bold text-2xl">{completedLessons}</h3>
          <p className="text-sm text-gray-600">Пройдено уроков</p>
        </Card>

        <Card className="text-center">
          <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-3" />
          <h3 className="font-bold text-2xl">{Math.round((completedLessons / 300) * 100)}%</h3>
          <p className="text-sm text-gray-600">Общий прогресс</p>
        </Card>
      </div>

      <Card>
        <h2 className="text-2xl font-bold mb-4">Последние уроки</h2>
        {progress.length === 0 ? (
          <p className="text-gray-600">Вы еще не начали ни одного урока</p>
        ) : (
          <div className="space-y-3">
            {progress.slice(-5).reverse().map((p) => (
              <div key={p.lessonId} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span>{p.lessonId}</span>
                <span className={p.completed ? 'text-green-600' : 'text-gray-500'}>
                  {p.completed ? `${p.score}%` : 'В процессе'}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
