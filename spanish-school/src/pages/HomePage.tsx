import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react';
import { LEVELS } from '../data/constants';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Изучайте испанский язык онлайн
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            300 уроков от A1 до C2 с интерактивными упражнениями и тестами
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/lessons">
              <Button size="lg">Начать обучение</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg">Посмотреть тарифы</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Почему мы?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: '300 уроков', desc: 'От начального до продвинутого' },
              { icon: Users, title: 'Для всех уровней', desc: 'A1-C2 по стандарту CEFR' },
              { icon: Award, title: 'Сертификаты', desc: 'После прохождения курса' },
              { icon: TrendingUp, title: 'Прогресс', desc: 'Отслеживание достижений' },
            ].map((feature, i) => (
              <Card key={i} className="text-center">
                <feature.icon className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Levels */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Уровни обучения</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {LEVELS.map((level) => (
              <Card key={level.level}>
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: level.color }}
                  />
                  <h3 className="font-bold text-lg">{level.level} - {level.name}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-3">{level.description}</p>
                <p className="text-sm text-gray-500">{level.totalLessons} уроков</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Готовы начать?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Присоединяйтесь к тысячам студентов, изучающих испанский онлайн
          </p>
          <Link to="/register">
            <Button size="lg">Зарегистрироваться бесплатно</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
