export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Политика конфиденциальности</h1>

        <div className="prose max-w-none space-y-4 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-primary mt-6 mb-3">1. Сбор информации</h2>
            <p>Мы собираем следующую информацию:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Email и имя при регистрации</li>
              <li>Данные о прогрессе обучения</li>
              <li>Информацию об использовании платформы</li>
              <li>Технические данные (IP-адрес, браузер, устройство)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mt-6 mb-3">2. Использование информации</h2>
            <p>Собранная информация используется для:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Предоставления доступа к платформе</li>
              <li>Отслеживания прогресса обучения</li>
              <li>Улучшения качества сервиса</li>
              <li>Коммуникации с пользователями</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mt-6 mb-3">3. Cookies</h2>
            <p>Мы используем cookies для сохранения сессии и улучшения пользовательского опыта. Вы можете отключить cookies в настройках браузера, но это может ограничить функциональность платформы.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mt-6 mb-3">4. Защита данных (GDPR)</h2>
            <p>Мы обеспечиваем защиту персональных данных в соответствии с GDPR:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Данные хранятся на защищённых серверах</li>
              <li>Доступ к данным имеют только авторизованные сотрудники</li>
              <li>Пользователь может запросить удаление своих данных</li>
              <li>Данные не передаются третьим лицам без согласия</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mt-6 mb-3">5. Права пользователя</h2>
            <p>Вы имеете право:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Запросить доступ к своим данным</li>
              <li>Исправить неточные данные</li>
              <li>Удалить свой аккаунт и все данные</li>
              <li>Ограничить обработку данных</li>
              <li>Получить копию данных</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mt-6 mb-3">6. Изменения политики</h2>
            <p>Мы можем обновлять данную политику. Об изменениях мы уведомим пользователей по email.</p>
          </section>

          <p className="text-sm text-gray-500 mt-8">Дата последнего обновления: 04.11.2025</p>
        </div>
      </div>
    </div>
  )
}
