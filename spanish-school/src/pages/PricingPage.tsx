import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Check } from 'lucide-react';
import { SUBSCRIPTION_PLANS, formatPrice } from '../data/constants';
import { useStore } from '../lib/store';

export const PricingPage: React.FC = () => {
  const { user } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Выберите свой тариф</h1>
        <p className="text-xl text-gray-600">Начните изучать испанский уже сегодня</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <Card
            key={plan.type}
            className={`relative ${
              plan.type === 'premium' ? 'border-2 border-secondary shadow-xl' : ''
            }`}
          >
            {plan.type === 'premium' && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-4 py-1 rounded-full text-sm font-semibold">
                Популярный
              </div>
            )}

            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-4xl font-bold">{formatPrice(plan.price)}</span>
              {plan.price > 0 && <span className="text-gray-600">/месяц</span>}
            </div>
            <p className="text-gray-600 mb-6">{plan.description}</p>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>

            {user && user.subscription === plan.type ? (
              <Button variant="secondary" className="w-full" disabled>
                Текущий тариф
              </Button>
            ) : (
              <Link to={plan.type === 'free' ? '/register' : `/payment/${plan.type}`}>
                <Button
                  variant={plan.type === 'premium' ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {plan.type === 'free' ? 'Начать бесплатно' : 'Выбрать тариф'}
                </Button>
              </Link>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
