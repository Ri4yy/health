"use client";
import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { Breadcrumbs } from '../components/shared/breadcrumbs';
import { FileText, ChevronRight } from 'lucide-react';

export const TermsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  const sections = [
    { id: 'general', title: '1. Общие положения' },
    { id: 'subject', title: '2. Предмет соглашения' },
    { id: 'registration', title: '3. Регистрация пользователя' },
    { id: 'rights-obligations', title: '4. Права и обязанности сторон' },
    { id: 'orders', title: '5. Оформление заказов' },
    { id: 'liability', title: '6. Ответственность сторон' },
    { id: 'intellectual', title: '7. Интеллектуальная собственность' },
    { id: 'disputes', title: '8. Разрешение споров' },
    { id: 'final', title: '9. Заключительные положения' },
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
                { label: 'Пользовательское соглашение', href: '#' },
              ]}
            />
          </div>
        </div>

        {/* Header */}
        <section className="bg-white border-b border-[var(--color-neutral-200)] py-12 md:py-16">
          <div className="container">
            <div className="max-w-[900px] mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary-50)] rounded-full mb-6">
                <FileText className="w-4 h-4 text-[var(--color-primary-600)]" />
                <span className="text-sm font-medium text-[var(--color-primary-700)]">
                  Юридический документ
                </span>
              </div>
              
              <h1 className="mb-4">Пользовательское соглашение</h1>
              
              <p className="text-lg text-[var(--color-neutral-600)] mb-6">
                Настоящее Пользовательское соглашение определяет условия использования сервиса ЭкоЕда 
                и регулирует отношения между Администрацией и Пользователями.
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
                          1.1. Настоящее Пользовательское соглашение (далее — Соглашение) регулирует отношения 
                          между ООО «ЭкоЕда» (далее — Администрация) и физическими лицами (далее — Пользователь), 
                          использующими сайт ecoeda.ru и его сервисы.
                        </p>
                        
                        <p>
                          1.2. Использование сервиса означает безоговорочное принятие Пользователем настоящего 
                          Соглашения и указанных в нём условий.
                        </p>
                        
                        <p>
                          1.3. Если Пользователь не согласен с условиями Соглашения, он обязан немедленно 
                          прекратить использование сервиса.
                        </p>

                        <p>
                          1.4. Администрация оставляет за собой право в любое время изменять условия настоящего 
                          Соглашения без предварительного уведомления Пользователя. Новая редакция Соглашения 
                          вступает в силу с момента её размещения на сайте.
                        </p>
                      </div>
                    </section>

                    {/* Section 2 */}
                    <section id="subject">
                      <h2 className="mb-6">2. Предмет соглашения</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          2.1. Администрация предоставляет Пользователю доступ к сервису интернет-магазина 
                          здорового питания, включающему:
                        </p>
                        
                        <div className="p-5 bg-[var(--color-neutral-50)] rounded-[12px]">
                          <ul className="space-y-2">
                            <li>• Просмотр каталога готовой еды и продуктовых наборов</li>
                            <li>• Оформление и оплату заказов</li>
                            <li>• Получение информации о продукции</li>
                            <li>• Участие в программе лояльности</li>
                            <li>• Использование личного кабинета</li>
                            <li>• Получение персональных рекомендаций</li>
                          </ul>
                        </div>

                        <p>
                          2.2. Все существующие на данный момент сервисы, а также любое развитие их и/или 
                          добавление новых является предметом настоящего Соглашения.
                        </p>

                        <p>
                          2.3. Доступ к сервису предоставляется на безвозмездной основе. Плата взимается 
                          только за приобретаемую продукцию.
                        </p>
                      </div>
                    </section>

                    {/* Section 3 */}
                    <section id="registration">
                      <h2 className="mb-6">3. Регистрация пользователя</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          3.1. Для использования всех функций сервиса Пользователю необходимо пройти процедуру 
                          регистрации, в результате которой для Пользователя будет создана учётная запись.
                        </p>
                        
                        <p>
                          3.2. Для регистрации Пользователь обязуется предоставить достоверную и полную информацию 
                          о себе и поддерживать эту информацию в актуальном состоянии.
                        </p>

                        <p>
                          3.3. При регистрации Пользователь самостоятельно выбирает себе пароль для доступа 
                          к учётной записи. Пользователь обязуется не сообщать третьим лицам логин и пароль.
                        </p>

                        <p>
                          3.4. Пользователь несёт ответственность за безопасность своего пароля и за все действия, 
                          совершённые под его учётной записью.
                        </p>

                        <p>
                          3.5. В случае несанкционированного доступа к учётной записи Пользователь обязан 
                          немедленно сообщить об этом Администрации.
                        </p>

                        <p>
                          3.6. Администрация имеет право заблокировать или удалить учётную запись Пользователя 
                          при нарушении им условий настоящего Соглашения.
                        </p>
                      </div>
                    </section>

                    {/* Section 4 */}
                    <section id="rights-obligations">
                      <h2 className="mb-6">4. Права и обязанности сторон</h2>
                      
                      <div className="space-y-6 text-[var(--color-neutral-700)]">
                        <div>
                          <h4 className="mb-3 text-[var(--color-neutral-900)]">4.1. Пользователь обязуется:</h4>
                          <div className="space-y-2 pl-4">
                            <p>• Предоставлять достоверную информацию при регистрации и оформлении заказов</p>
                            <p>• Соблюдать условия настоящего Соглашения и действующего законодательства</p>
                            <p>• Не использовать сервис в незаконных целях</p>
                            <p>• Не нарушать работу сервиса</p>
                            <p>• Своевременно оплачивать заказанную продукцию</p>
                            <p>• Уважительно относиться к сотрудникам и другим пользователям</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="mb-3 text-[var(--color-neutral-900)]">4.2. Администрация обязуется:</h4>
                          <div className="space-y-2 pl-4">
                            <p>• Обеспечивать работоспособность сервиса</p>
                            <p>• Предоставлять актуальную информацию о продукции</p>
                            <p>• Обрабатывать заказы в соответствии с условиями</p>
                            <p>• Защищать персональные данные Пользователей</p>
                            <p>• Рассматривать обращения и жалобы</p>
                          </div>
                        </div>

                        <div className="p-5 bg-[var(--color-primary-50)] rounded-[12px] border border-[var(--color-primary-200)]">
                          <h4 className="mb-3 text-[var(--color-primary-900)]">4.3. Администрация имеет право:</h4>
                          <div className="space-y-2 text-[var(--color-primary-700)]">
                            <p>• Изменять содержание сервиса и его функционал</p>
                            <p>• Приостанавливать работу сервиса для технического обслуживания</p>
                            <p>• Удалять контент, нарушающий законодательство или настоящее Соглашение</p>
                            <p>• Отказать в обслуживании без объяснения причин</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Section 5 */}
                    <section id="orders">
                      <h2 className="mb-6">5. Оформление заказов</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          5.1. Заказ считается оформленным после его подтверждения Администрацией и получения 
                          Пользователем уведомления на email или телефон.
                        </p>
                        
                        <p>
                          5.2. Пользователь может отменить заказ не позднее чем за 3 часа до начала интервала доставки.
                        </p>

                        <p>
                          5.3. Администрация имеет право отменить заказ в случае отсутствия товара на складе, 
                          технической ошибки в цене или других обстоятельств, препятствующих выполнению заказа.
                        </p>

                        <p>
                          5.4. В случае отмены заказа Администрацией, Пользователю возвращается полная стоимость 
                          заказа в течение 3-5 рабочих дней.
                        </p>

                        <p>
                          5.5. Цены на продукцию указаны на сайте и могут быть изменены Администрацией в 
                          одностороннем порядке. При этом цена на заказанный Пользователем товар изменению не подлежит.
                        </p>
                      </div>
                    </section>

                    {/* Section 6 */}
                    <section id="liability">
                      <h2 className="mb-6">6. Ответственность сторон</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          6.1. Пользователь несёт ответственность за достоверность предоставленной при регистрации 
                          и оформлении заказов информации.
                        </p>
                        
                        <p>
                          6.2. Администрация не несёт ответственности за:
                        </p>

                        <div className="p-5 bg-[var(--color-neutral-50)] rounded-[12px]">
                          <ul className="space-y-2">
                            <li>• Невозможность использования сервиса по причинам, не зависящим от Администрации</li>
                            <li>• Содержание и достоверность информации, предоставляемой Пользователем</li>
                            <li>• Несанкционированный доступ третьих лиц к учётной записи Пользователя</li>
                            <li>• Задержки в доставке по вине службы доставки</li>
                            <li>• Любые косвенные убытки Пользователя</li>
                          </ul>
                        </div>

                        <p>
                          6.3. В случае нарушения Пользователем условий настоящего Соглашения, Администрация 
                          имеет право ограничить доступ к сервису без предварительного уведомления.
                        </p>

                        <p>
                          6.4. Максимальная ответственность Администрации ограничивается стоимостью 
                          конкретного заказа, в отношении которого возникли претензии.
                        </p>
                      </div>
                    </section>

                    {/* Section 7 */}
                    <section id="intellectual">
                      <h2 className="mb-6">7. Интеллектуальная собственность</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          7.1. Все объекты, размещённые на сайте, в том числе элементы дизайна, текст, графические 
                          изображения, иллюстрации, видео, программы, музыка, звуки и другие объекты (далее — Контент), 
                          являются объектами исключительных прав Администрации.
                        </p>
                        
                        <p>
                          7.2. Использование Контента, а также каких-либо иных элементов сайта возможно только 
                          с письменного разрешения Администрации.
                        </p>

                        <p>
                          7.3. Товарные знаки, логотипы и марки, размещённые на сайте, принадлежат Администрации 
                          или третьим лицам. Запрещается использовать такие обозначения без письменного согласия 
                          правообладателя.
                        </p>

                        <p>
                          7.4. Пользователь не приобретает никаких прав на Контент и элементы сервиса.
                        </p>
                      </div>
                    </section>

                    {/* Section 8 */}
                    <section id="disputes">
                      <h2 className="mb-6">8. Разрешение споров</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          8.1. Все споры и разногласия, возникающие в связи с исполнением настоящего Соглашения, 
                          разрешаются путём переговоров.
                        </p>
                        
                        <p>
                          8.2. В случае недостижения согласия путём переговоров, споры разрешаются в судебном 
                          порядке в соответствии с законодательством Российской Федерации.
                        </p>

                        <p>
                          8.3. Претензии Пользователя по предоставляемым услугам принимаются Администрацией 
                          к рассмотрению по электронной почте в течение 30 дней с момента возникновения спорной ситуации.
                        </p>

                        <p>
                          8.4. До обращения в суд Пользователь обязан соблюсти обязательный досудебный порядок 
                          урегулирования спора и направить Администрации письменную претензию.
                        </p>
                      </div>
                    </section>

                    {/* Section 9 */}
                    <section id="final">
                      <h2 className="mb-6">9. Заключительные положения</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          9.1. Настоящее Соглашение вступает в силу с момента начала использования сервиса 
                          Пользователем и действует бессрочно.
                        </p>
                        
                        <p>
                          9.2. Соглашение может быть расторгнуто по инициативе Пользователя путём удаления 
                          учётной записи и прекращения использования сервиса.
                        </p>

                        <p>
                          9.3. Администрация имеет право расторгнуть Соглашение в одностороннем порядке при 
                          нарушении Пользователем его условий.
                        </p>

                        <p>
                          9.4. К настоящему Соглашению и отношениям между Пользователем и Администрацией 
                          применяется законодательство Российской Федерации.
                        </p>

                        <div className="p-6 bg-[var(--color-neutral-50)] rounded-[12px] mt-8">
                          <h4 className="mb-4 text-[var(--color-neutral-900)]">Реквизиты</h4>
                          <div className="space-y-2 text-sm">
                            <p><strong>ООО «ЭкоЕда»</strong></p>
                            <p>ИНН: 1234567890</p>
                            <p>ОГРН: 1234567890123</p>
                            <p>Адрес: 123456, г. Чебоксары, ул. Зелёная, д. 7, офис 42</p>
                            <p>Email: info@ecoeda.ru</p>
                            <p>Телефон: +7 (495) 123-45-67</p>
                          </div>
                        </div>

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
