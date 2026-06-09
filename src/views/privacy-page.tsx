"use client";
import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { Breadcrumbs } from '../components/shared/breadcrumbs';
import { Shield, ChevronRight } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  const sections = [
    { id: 'general', title: '1. Общие положения' },
    { id: 'data-collection', title: '2. Какие данные мы собираем' },
    { id: 'data-purpose', title: '3. Цели обработки данных' },
    { id: 'data-storage', title: '4. Хранение и защита данных' },
    { id: 'data-transfer', title: '5. Передача третьим лицам' },
    { id: 'cookies', title: '6. Использование cookies' },
    { id: 'user-rights', title: '7. Права пользователя' },
    { id: 'contacts', title: '8. Контактная информация' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i].id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-milk)]">
      <Header />
      
      <main className="flex-grow">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-[var(--color-neutral-200)]">
          <div className="container py-4">
            <Breadcrumbs
              items={[
                { label: 'Главная', href: '#' },
                { label: 'Политика конфиденциальности', href: '#' },
              ]}
            />
          </div>
        </div>

        {/* Header */}
        <section className="bg-white border-b border-[var(--color-neutral-200)] py-12 md:py-16">
          <div className="container">
            <div className="max-w-[900px] mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary-50)] rounded-full mb-6">
                <Shield className="w-4 h-4 text-[var(--color-primary-600)]" />
                <span className="text-sm font-medium text-[var(--color-primary-700)]">
                  Юридический документ
                </span>
              </div>
              
              <h1 className="mb-4">Политика конфиденциальности</h1>
              
              <p className="text-lg text-[var(--color-neutral-600)] mb-6">
                Настоящая Политика конфиденциальности регулирует порядок обработки и защиты 
                персональных данных пользователей сервиса Точка Баланса.
              </p>

              <p className="text-sm text-[var(--color-neutral-600)]">
                Дата последнего обновления: <strong>15 апреля 2026 г.</strong>
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-[1400px] mx-auto">
              <div className="grid lg:grid-cols-4 gap-8">
                
                {/* Sidebar Navigation */}
                <aside className="lg:col-span-1">
                  <div className="lg:sticky lg:top-24">
                    <div className="bg-white rounded-[16px] border border-[var(--color-neutral-200)] p-6">
                      <h4 className="mb-4">Содержание</h4>
                      <nav className="space-y-2">
                        {sections.map((section) => (
                          <button
                            key={section.id}
                            onClick={() => scrollToSection(section.id)}
                            className={`w-full text-left px-3 py-2 rounded-[8px] text-sm transition-all flex items-center justify-between group ${
                              activeSection === section.id
                                ? 'bg-[var(--color-primary-50)] text-[var(--color-primary-700)] font-medium'
                                : 'text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-50)]'
                            }`}
                          >
                            <span>{section.title}</span>
                            <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                              activeSection === section.id ? 'opacity-100' : ''
                            }`} />
                          </button>
                        ))}
                      </nav>
                    </div>
                  </div>
                </aside>

                {/* Main Content */}
                <div className="lg:col-span-3">
                  <div className="bg-white rounded-[16px] border border-[var(--color-neutral-200)] p-6 md:p-10 space-y-12">
                    
                    {/* Section 1 */}
                    <section id="general">
                      <h2 className="mb-6">1. Общие положения</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          1.1. Настоящая Политика конфиденциальности (далее — Политика) действует в отношении 
                          всей информации, которую ООО «Точка Баланса» (далее — Оператор) может получить о Пользователе 
                          во время использования сайта ecoeda.ru и его сервисов.
                        </p>
                        
                        <p>
                          1.2. Использование сервисов Оператора означает безоговорочное согласие Пользователя 
                          с настоящей Политикой и указанными в ней условиями обработки его персональной информации.
                        </p>
                        
                        <p>
                          1.3. В случае несогласия с условиями Политики Пользователь должен прекратить 
                          использование сервисов Оператора.
                        </p>

                        <p>
                          1.4. Настоящая Политика применяется только к сайту ecoeda.ru. Оператор не контролирует 
                          и не несет ответственность за сайты третьих лиц, на которые Пользователь может перейти 
                          по ссылкам, доступным на сайте.
                        </p>

                        <p>
                          1.5. Оператор не проверяет достоверность персональной информации, предоставляемой 
                          Пользователем, и не имеет возможности оценивать его дееспособность.
                        </p>
                      </div>
                    </section>

                    {/* Section 2 */}
                    <section id="data-collection">
                      <h2 className="mb-6">2. Какие данные мы собираем</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          2.1. Оператор собирает и хранит только те персональные данные, которые необходимы 
                          для предоставления сервисов и выполнения соглашений и договоров с Пользователем.
                        </p>
                        
                        <div className="p-5 bg-[var(--color-neutral-50)] rounded-[12px]">
                          <h4 className="mb-3 text-[var(--color-neutral-900)]">Персональные данные включают:</h4>
                          <ul className="space-y-2">
                            <li>• Фамилия, имя, отчество</li>
                            <li>• Номер телефона</li>
                            <li>• Адрес электронной почты</li>
                            <li>• Адрес доставки</li>
                            <li>• Дата рождения (опционально)</li>
                            <li>• История заказов и предпочтения</li>
                          </ul>
                        </div>

                        <p>
                          2.2. Также автоматически собираются технические данные:
                        </p>

                        <div className="p-5 bg-[var(--color-neutral-50)] rounded-[12px]">
                          <ul className="space-y-2">
                            <li>• IP-адрес</li>
                            <li>• Информация из cookies</li>
                            <li>• Информация о браузере и устройстве</li>
                            <li>• Время доступа к сайту</li>
                            <li>• Адрес запрашиваемой страницы</li>
                          </ul>
                        </div>

                        <p>
                          2.3. Оператор не собирает и не обрабатывает данные банковских карт. Оплата производится 
                          через защищённые сервисы платёжных систем.
                        </p>
                      </div>
                    </section>

                    {/* Section 3 */}
                    <section id="data-purpose">
                      <h2 className="mb-6">3. Цели обработки данных</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          3.1. Персональные данные Пользователя используются в следующих целях:
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 border border-[var(--color-neutral-200)] rounded-[12px]">
                            <h5 className="mb-2 text-[var(--color-neutral-900)]">Обработка заказов</h5>
                            <p className="text-sm">
                              Оформление, обработка и доставка заказов, связь с клиентом
                            </p>
                          </div>

                          <div className="p-4 border border-[var(--color-neutral-200)] rounded-[12px]">
                            <h5 className="mb-2 text-[var(--color-neutral-900)]">Персонализация</h5>
                            <p className="text-sm">
                              Предоставление персональных рекомендаций и предложений
                            </p>
                          </div>

                          <div className="p-4 border border-[var(--color-neutral-200)] rounded-[12px]">
                            <h5 className="mb-2 text-[var(--color-neutral-900)]">Обратная связь</h5>
                            <p className="text-sm">
                              Ответы на вопросы и обращения пользователей
                            </p>
                          </div>

                          <div className="p-4 border border-[var(--color-neutral-200)] rounded-[12px]">
                            <h5 className="mb-2 text-[var(--color-neutral-900)]">Информирование</h5>
                            <p className="text-sm">
                              Уведомления о статусе заказа, новинках и акциях
                            </p>
                          </div>
                        </div>

                        <p>
                          3.2. Оператор не использует персональные данные в целях, не указанных в настоящей Политике.
                        </p>
                      </div>
                    </section>

                    {/* Section 4 */}
                    <section id="data-storage">
                      <h2 className="mb-6">4. Хранение и защита данных</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          4.1. Оператор принимает все необходимые меры для защиты персональных данных Пользователя 
                          от несанкционированного доступа, изменения, раскрытия или уничтожения.
                        </p>
                        
                        <div className="p-5 bg-[var(--color-primary-50)] rounded-[12px] border border-[var(--color-primary-200)]">
                          <h4 className="mb-3 text-[var(--color-primary-900)]">Меры защиты включают:</h4>
                          <ul className="space-y-2 text-[var(--color-primary-700)]">
                            <li>• Шифрование данных при передаче (SSL/TLS)</li>
                            <li>• Ограничение доступа к персональным данным</li>
                            <li>• Регулярное резервное копирование</li>
                            <li>• Антивирусная защита</li>
                            <li>• Мониторинг безопасности систем</li>
                          </ul>
                        </div>

                        <p>
                          4.2. Персональные данные хранятся в течение срока, необходимого для целей их обработки, 
                          но не менее 3 лет с момента последнего взаимодействия с Пользователем.
                        </p>

                        <p>
                          4.3. После истечения срока хранения персональные данные удаляются или обезличиваются.
                        </p>
                      </div>
                    </section>

                    {/* Section 5 */}
                    <section id="data-transfer">
                      <h2 className="mb-6">5. Передача третьим лицам</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          5.1. Оператор может передавать персональные данные третьим лицам в следующих случаях:
                        </p>
                        
                        <div className="space-y-3">
                          <div className="flex items-start gap-3 p-4 bg-[var(--color-neutral-50)] rounded-[12px]">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary-500)] text-white flex items-center justify-center text-sm font-semibold">
                              1
                            </span>
                            <div>
                              <p className="font-medium text-[var(--color-neutral-900)] mb-1">
                                Службы доставки
                              </p>
                              <p className="text-sm">
                                Для организации доставки заказов (имя, телефон, адрес)
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-4 bg-[var(--color-neutral-50)] rounded-[12px]">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary-500)] text-white flex items-center justify-center text-sm font-semibold">
                              2
                            </span>
                            <div>
                              <p className="font-medium text-[var(--color-neutral-900)] mb-1">
                                Платёжные системы
                              </p>
                              <p className="text-sm">
                                Для обработки платежей (без передачи данных карт)
                              </p>
                            </div>
                          </div>

                          <div className="flex items-start gap-3 p-4 bg-[var(--color-neutral-50)] rounded-[12px]">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary-500)] text-white flex items-center justify-center text-sm font-semibold">
                              3
                            </span>
                            <div>
                              <p className="font-medium text-[var(--color-neutral-900)] mb-1">
                                Государственные органы
                              </p>
                              <p className="text-sm">
                                По требованию закона или судебного решения
                              </p>
                            </div>
                          </div>
                        </div>

                        <p>
                          5.2. Все партнёры Оператора обязуются соблюдать конфиденциальность персональных данных 
                          и обеспечивать их безопасность.
                        </p>

                        <p>
                          5.3. Оператор не продаёт и не передаёт персональные данные третьим лицам для 
                          маркетинговых целей без явного согласия Пользователя.
                        </p>
                      </div>
                    </section>

                    {/* Section 6 */}
                    <section id="cookies">
                      <h2 className="mb-6">6. Использование cookies</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          6.1. Сайт использует cookies — небольшие файлы, сохраняемые на устройстве Пользователя.
                        </p>
                        
                        <p>
                          6.2. Cookies используются для:
                        </p>

                        <ul className="space-y-2 pl-6">
                          <li>• Сохранения настроек и предпочтений</li>
                          <li>• Аутентификации пользователя</li>
                          <li>• Анализа посещаемости сайта</li>
                          <li>• Улучшения работы сайта</li>
                        </ul>

                        <p>
                          6.3. Пользователь может настроить свой браузер для отклонения cookies, однако это 
                          может ограничить функциональность сайта.
                        </p>

                        <p>
                          6.4. Сайт использует сервисы аналитики (например, Яндекс.Метрика, Google Analytics) 
                          для сбора обезличенной статистики посещений.
                        </p>
                      </div>
                    </section>

                    {/* Section 7 */}
                    <section id="user-rights">
                      <h2 className="mb-6">7. Права пользователя</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          7.1. Пользователь имеет право:
                        </p>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 border-l-4 border-[var(--color-primary-500)] bg-[var(--color-primary-50)]">
                            <h5 className="mb-2 text-[var(--color-neutral-900)]">Доступ к данным</h5>
                            <p className="text-sm">
                              Получить информацию о хранящихся персональных данных
                            </p>
                          </div>

                          <div className="p-4 border-l-4 border-[var(--color-primary-500)] bg-[var(--color-primary-50)]">
                            <h5 className="mb-2 text-[var(--color-neutral-900)]">Изменение данных</h5>
                            <p className="text-sm">
                              Исправить неточные или устаревшие данные
                            </p>
                          </div>

                          <div className="p-4 border-l-4 border-[var(--color-primary-500)] bg-[var(--color-primary-50)]">
                            <h5 className="mb-2 text-[var(--color-neutral-900)]">Удаление данных</h5>
                            <p className="text-sm">
                              Потребовать удаления персональных данных
                            </p>
                          </div>

                          <div className="p-4 border-l-4 border-[var(--color-primary-500)] bg-[var(--color-primary-50)]">
                            <h5 className="mb-2 text-[var(--color-neutral-900)]">Отзыв согласия</h5>
                            <p className="text-sm">
                              Отозвать согласие на обработку данных
                            </p>
                          </div>
                        </div>

                        <p>
                          7.2. Для реализации своих прав Пользователь может направить запрос на email: 
                          privacy@ecoeda.ru
                        </p>

                        <p>
                          7.3. Оператор обязуется рассмотреть запрос в течение 30 дней с момента получения.
                        </p>
                      </div>
                    </section>

                    {/* Section 8 */}
                    <section id="contacts">
                      <h2 className="mb-6">8. Контактная информация</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          8.1. По вопросам, связанным с обработкой персональных данных, Вы можете обратиться 
                          к Оператору:
                        </p>
                        
                        <div className="p-6 bg-[var(--color-neutral-50)] rounded-[12px]">
                          <h4 className="mb-4 text-[var(--color-neutral-900)]">ООО «Точка Баланса»</h4>
                          <div className="space-y-2 text-sm">
                            <p><strong>Адрес:</strong> 123456, г. Чебоксары, ул. Зелёная, д. 7, офис 42</p>
                            <p><strong>ИНН:</strong> 1234567890</p>
                            <p><strong>ОГРН:</strong> 1234567890123</p>
                            <p><strong>Email:</strong> privacy@ecoeda.ru</p>
                            <p><strong>Телефон:</strong> +7 (495) 123-45-67</p>
                          </div>
                        </div>

                        <p>
                          8.2. Оператор оставляет за собой право вносить изменения в настоящую Политику. 
                          Новая редакция вступает в силу с момента размещения на сайте.
                        </p>

                        <p className="pt-4 border-t border-[var(--color-neutral-200)] text-sm text-[var(--color-neutral-600)]">
                          Дата последнего обновления: 15 апреля 2026 г.
                        </p>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
