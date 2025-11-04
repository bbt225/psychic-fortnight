import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Card } from '../components/ui/Card';
import { Lock, CheckCircle } from 'lucide-react';
import { LEVELS, hasAccessToLesson } from '../data/constants';
import { mockLessons } from '../data/mockLessons';

export const LessonsPage: React.FC = () => {
  const { user, progress } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Все уроки</h1>

      {LEVELS.map((level) => {
        const levelLessons = mockLessons.filter((l) => l.level === level.level);

        return (
          <div key={level.level} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: level.color }} />
              <h2 className="text-2xl font-bold">{level.level} - {level.name}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {levelLessons.map((lesson) => {
                const hasAccess = hasAccessToLesson(lesson, user?.subscription || 'free');
                const isCompleted = progress.some((p) => p.lessonId === lesson.id && p.completed);

                return (
                  <Link
                    key={lesson.id}
                    to={hasAccess ? `/lessons/${lesson.id}` : '/pricing'}
                    className="block"
                  >
                    <Card className="relative">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold">{lesson.title}</h3>
                        {!hasAccess && <Lock className="w-4 h-4 text-gray-400" />}
                        {isCompleted && <CheckCircle className="w-4 h-4 text-green-500" />}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{lesson.description}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Урок {lesson.number}</span>
                        <span>{lesson.estimatedTime} мин</span>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
