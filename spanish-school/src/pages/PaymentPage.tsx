import React, { useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { getSubscriptionPlan, formatPrice } from '../data/constants';
import { CheckCircle, XCircle } from 'lucide-react';

export const PaymentPage: React.FC = () => {
  const { plan } = useParams<{ plan: 'basic' | 'premium' }>();
  const { user, updateSubscription } = useStore();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState<'success' | 'failed' | null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  if (!user) return <Navigate to="/login" />;
  if (!plan || (plan !== 'basic' && plan !== 'premium')) return <Navigate to="/pricing" />;

  const subscriptionPlan = getSubscriptionPlan(plan);
  if (!subscriptionPlan) return <Navigate to="/pricing" />;

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Имитация обработки платежа
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // 70% успешных, 30% отклоненных
    const success = Math.random() > 0.3;

    if (success) {
      await updateSubscription(plan);
      setResult('success');
      setTimeout(() => navigate('/profile'), 2000);
    } else {
      setResult('failed');
    }

    setProcessing(false);
  };

  if (result === 'success') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Card className="max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Оплата успешна!</h2>
          <p className="text-gray-600">Ваша подписка активирована</p>
        </Card>
      </div>
    );
  }

  if (result === 'failed') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Card className="max-w-md text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Оплата отклонена</h2>
          <p className="text-gray-600 mb-4">Попробуйте другую карту</p>
          <Button onClick={() => setResult(null)}>Попробовать снова</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card>
        <h1 className="text-3xl font-bold mb-6">Оплата подписки</h1>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-lg">{subscriptionPlan.name}</h3>
              <p className="text-sm text-gray-600">{subscriptionPlan.description}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{formatPrice(subscriptionPlan.price)}</p>
              <p className="text-sm text-gray-600">в месяц</p>
            </div>
          </div>
        </div>

        <form onSubmit={handlePayment} className="space-y-4">
          <Input
            label="Номер карты"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength={19}
            required
          />

          <Input
            label="Имя на карте"
            type="text"
            placeholder="IVAN IVANOV"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Срок действия"
              type="text"
              placeholder="MM/YY"
              value={cardExpiry}
              onChange={(e) => setCardExpiry(e.target.value)}
              maxLength={5}
              required
            />

            <Input
              label="CVV"
              type="text"
              placeholder="123"
              value={cardCvv}
              onChange={(e) => setCardCvv(e.target.value)}
              maxLength={3}
              required
            />
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg text-sm text-gray-700">
            <p className="font-semibold mb-1">⚠️ Это демо-версия</p>
            <p>Платеж будет обработан фиктивно. Используйте любые данные.</p>
          </div>

          <Button type="submit" className="w-full" loading={processing}>
            {processing ? 'Обработка...' : `Оплатить ${formatPrice(subscriptionPlan.price)}`}
          </Button>
        </form>
      </Card>
    </div>
  );
};
