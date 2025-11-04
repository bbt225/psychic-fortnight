'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { SUBSCRIPTION_TIERS } from '@/lib/subscriptions'
import Link from 'next/link'

export default function SubscriptionPage() {
  const router = useRouter()
  const { user, updateSubscription, checkUser } = useStore()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    checkUser()
  }, [])

  if (!user) {
    router.push('/')
    return null
  }

  const handlePurchase = async (plan: string) => {
    setSelectedPlan(plan)
    setProcessing(true)

    // Имитация обработки платежа (2 секунды)
    await new Promise(resolve => setTimeout(resolve, 2000))

    // 80% успех, 20% отклонение
    const success = Math.random() > 0.2

    if (success) {
      await updateSubscription(plan as any)
      alert(`✅ Оплата успешна! Подписка "${plan}" активирована.`)
      router.push('/dashboard')
    } else {
      alert('❌ Оплата отклонена. Попробуйте другой способ оплаты.')
    }

    setProcessing(false)
    setSelectedPlan(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-semibold text-primary">EspañolOnline</Link>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium text-gray-700 hover:text-primary">Dashboard</Link>
              <Link href="/subscription" className="text-sm font-medium text-accent">Подписка</Link>
              <span className="text-sm text-gray-600">{user.name}</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Выберите подписку</h1>
          <p className="text-xl text-gray-600">Текущая подписка: <span className="font-semibold capitalize">{user.subscription}</span></p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {SUBSCRIPTION_TIERS.map((tier) => (
            <div
              key={tier.plan}
              className={`bg-white rounded-lg border-2 p-6 transition-all ${
                user.subscription === tier.plan
                  ? 'border-accent shadow-lg'
                  : 'border-gray-200 hover:border-accent/50'
              }`}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-primary mb-2">{tier.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-primary">{tier.price}₽</span>
                  {tier.plan !== 'free' && (
                    <div className="text-sm text-gray-500 mt-1">
                      {tier.priceMonthly}₽/месяц
                    </div>
                  )}
                </div>
                {tier.discount > 0 && (
                  <div className="inline-block px-3 py-1 bg-accent text-white text-sm font-semibold rounded-full">
                    Скидка {tier.discount}%
                  </div>
                )}
              </div>

              <ul className="space-y-3 mb-6">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className="text-accent mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {user.subscription === tier.plan ? (
                <button disabled className="w-full px-4 py-3 bg-gray-300 text-gray-600 rounded-md cursor-not-allowed">
                  Текущий план
                </button>
              ) : (
                <button
                  onClick={() => handlePurchase(tier.plan)}
                  disabled={processing && selectedPlan === tier.plan}
                  className="w-full px-4 py-3 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing && selectedPlan === tier.plan ? 'Обработка...' : tier.price === 0 ? 'Выбрать' : 'Купить'}
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">Часто задаваемые вопросы</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Как происходит оплата?</h3>
              <p className="text-gray-600 text-sm">Оплата имитируется для демонстрации. В реальном проекте будет интеграция с платёжными системами.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Можно ли вернуть деньги?</h3>
              <p className="text-gray-600 text-sm">Да, смотрите нашу <Link href="/legal/refund" className="text-accent hover:underline">политику возврата</Link>.</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Автоматическое продление?</h3>
              <p className="text-gray-600 text-sm">Подписка автоматически продлевается. Вы можете отменить в любой момент.</p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <Link href="/legal/terms" className="hover:text-primary">Пользовательское соглашение</Link>
          {' · '}
          <Link href="/legal/privacy" className="hover:text-primary">Политика конфиденциальности</Link>
          {' · '}
          <Link href="/legal/refund" className="hover:text-primary">Возврат средств</Link>
        </div>
      </main>
    </div>
  )
}
