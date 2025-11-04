export default function RefundPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Политика возврата средств</h1>

        <div className="prose max-w-none space-y-4 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-primary mt-6 mb-3">1. Условия возврата</h2>
            <p>Мы предоставляем возврат средств в следующих случаях:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Технические проблемы, препятствующие доступу к платформе</li>
              <li>Двойное списание средств</li>
              <li>Несоответствие функционала заявленному</li>
              <li>Отказ от подписки в течение 7 дней с момента покупки (при использовании менее 10% контента)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mt-6 mb-3">2. Невозвратные случаи</h2>
            <p>Возврат средств НЕ производится в следующих случаях:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Использовано более 10% контента</li>
              <li>Прошло более 7 дней с момента покупки</li>
              <li>Нарушение пользовательского соглашения</li>
              <li>Изменение личных обстоятельств пользователя</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mt-6 mb-3">3. Сроки возврата</h2>
            <p>Возврат средств осуществляется в течение:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>5-10 рабочих дней на банковскую карту</li>
              <li>3-5 рабочих дней на электронный кошелёк</li>
            </ul>
            <p>Сроки могут варьироваться в зависимости от платёжной системы.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mt-6 mb-3">4. Процедура возврата</h2>
            <p>Для возврата средств необходимо:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Отправить запрос на email: support@espanol-online.ru</li>
              <li>Указать причину возврата и номер транзакции</li>
              <li>Дождаться рассмотрения запроса (до 3 рабочих дней)</li>
              <li>Получить подтверждение и возврат средств</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mt-6 mb-3">5. Частичный возврат</h2>
            <p>При отмене годовой или квартальной подписки возможен частичный возврат за неиспользованные месяцы, за вычетом комиссии платёжной системы (до 5%).</p>
          </section>

          <p className="text-sm text-gray-500 mt-8">Дата последнего обновления: 04.11.2025</p>
        </div>
      </div>
    </div>
  )
}
