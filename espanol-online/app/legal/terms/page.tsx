export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg border border-gray-200 p-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Пользовательское соглашение</h1>

        <div className="prose max-w-none space-y-4 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-primary mt-6 mb-3">1. Общие положения</h2>
            <p>Настоящее Пользовательское соглашение регулирует отношения между владельцем платформы EspañolOnline и пользователями сервиса.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mt-6 mb-3">2. Права и обязанности пользователя</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Пользователь обязуется предоставлять достоверную информацию при регистрации</li>
              <li>Пользователь не имеет права передавать свой аккаунт третьим лицам</li>
              <li>Пользователь обязуется не распространять материалы платформы</li>
              <li>Пользователь имеет право на доступ к контенту согласно выбранному тарифу</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mt-6 mb-3">3. Права владельца платформы</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Владелец имеет право изменять условия соглашения</li>
              <li>Владелец имеет право блокировать аккаунты при нарушении правил</li>
              <li>Владелец имеет право изменять стоимость подписок</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mt-6 mb-3">4. Ограничение ответственности</h2>
            <p>Владелец не несет ответственности за результаты обучения. Платформа предоставляет образовательные материалы, но не гарантирует достижение определённого уровня владения языком.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mt-6 mb-3">5. Интеллектуальная собственность</h2>
            <p>Все материалы платформы защищены авторским правом. Запрещается копирование, распространение или коммерческое использование контента без письменного разрешения.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-primary mt-6 mb-3">6. Прекращение доступа</h2>
            <p>Пользователь может в любой момент удалить свой аккаунт. При отмене подписки доступ к премиум-контенту прекращается по окончании оплаченного периода.</p>
          </section>

          <p className="text-sm text-gray-500 mt-8">Дата последнего обновления: 04.11.2025</p>
        </div>
      </div>
    </div>
  )
}
