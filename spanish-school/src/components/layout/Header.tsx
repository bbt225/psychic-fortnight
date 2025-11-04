import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useStore } from '../../lib/store';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
  const { user, signOut } = useStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-secondary" />
            <span className="text-xl font-bold text-gray-900">Испанский Онлайн</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/lessons" className="text-gray-700 hover:text-secondary transition">
              Уроки
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-secondary transition">
              Тарифы
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="text-gray-700 hover:text-secondary transition">
                <LayoutDashboard className="w-5 h-5" />
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link to="/profile">
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    {user.displayName || 'Профиль'}
                  </Button>
                </Link>
                <Button variant="secondary" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Войти
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Регистрация</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
