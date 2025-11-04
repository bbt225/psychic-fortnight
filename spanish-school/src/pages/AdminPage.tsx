import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Card } from '../components/ui/Card';
import { Users, BookOpen, TrendingUp, DollarSign } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { user } = useStore();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Панель администратора</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Users, label: 'Пользователи', value: '1,234' },
          { icon: BookOpen, label: 'Уроков', value: '300' },
          { icon: TrendingUp, label: 'Активность', value: '+15%' },
          { icon: DollarSign, label: 'Доход', value: '₽125,000' },
        ].map((stat, i) => (
          <Card key={i} className="text-center">
            <stat.icon className="w-12 h-12 text-secondary mx-auto mb-3" />
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </Card>
        ))}
      </div>

      <Card>
        <h2 className="text-2xl font-bold mb-4">Управление контентом</h2>
        <p className="text-gray-600">
          Здесь можно добавлять и редактировать уроки, управлять пользователями и просматривать статистику.
        </p>
      </Card>
    </div>
  );
};
