import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-gray-900 mb-4">О школе</h3>
            <p className="text-sm text-gray-600">
              Онлайн-школа испанского языка с современной методикой обучения
            </p>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Обучение</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/lessons" className="hover:text-secondary">Все уроки</Link></li>
              <li><Link to="/pricing" className="hover:text-secondary">Тарифы</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Поддержка</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/faq" className="hover:text-secondary">FAQ</Link></li>
              <li><a href="mailto:support@spanish-online.ru" className="hover:text-secondary">Контакты</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-4">Документы</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/legal/privacy" className="hover:text-secondary">Конфиденциальность</Link></li>
              <li><Link to="/legal/terms" className="hover:text-secondary">Условия использования</Link></li>
              <li><Link to="/legal/refund" className="hover:text-secondary">Возврат средств</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          © 2025 Испанский Онлайн. Все права защищены.
        </div>
      </div>
    </footer>
  );
};
