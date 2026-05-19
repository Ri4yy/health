"use client";
import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { Breadcrumbs } from '../components/shared/breadcrumbs';
import { FileCheck, ChevronRight } from 'lucide-react';

export const OfferPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('');

  const sections = [
    { id: 'general', title: '1. Общие положения' },
    { id: 'terms', title: '2. Термины и определения' },
    { id: 'subject', title: '3. Предмет оферты' },
    { id: 'order-process', title: '4. Порядок оформления заказа' },
    { id: 'price-payment', title: '5. Цена товара и оплата' },
    { id: 'delivery', title: '6. Доставка товара' },
    { id: 'returns', title: '7. Возврат товара' },
    { id: 'liability', title: '8. Ответственность сторон' },
    { id: 'force-majeure', title: '9. Форс-мажор' },
    { id: 'final', title: '10. Заключительные положения' },
    { id: 'details', title: '11. Реквизиты продавца' },
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
                { label: 'Публичная оферта', href: '#' },
              ]}
            />
          </div>
        </div>

        {/* Header */}
        <section className="bg-white border-b border-[var(--color-neutral-200)] py-12 md:py-16">
          <div className="container">
            <div className="max-w-[900px] mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary-50)] rounded-full mb-6">
                <FileCheck className="w-4 h-4 text-[var(--color-primary-600)]" />
                <span className="text-sm font-medium text-[var(--color-primary-700)]">
                  Договор публичной оферты
                </span>
              </div>
              
              <h1 className="mb-4">Публичная оферта</h1>
              
              <p className="text-lg text-[var(--color-neutral-600)] mb-6">
                Настоящий документ является публичной офертой ООО «ЭкоЕда» на заключение 
                договора розничной купли-продажи товаров дистанционным способом.
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
                            <span className="text-left">{section.title}</span>
                            <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ${
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
                          1.1. Настоящая публичная оферта (далее — Оферта) является официальным предложением 
                          ООО «ЭкоЕда» (далее — Продавец) заключить договор купли-продажи товаров дистанционным 
                          способом (далее — Договор) на условиях, изложенных ниже.
                        </p>
                        
                        <p>
                          1.2. В соответствии со ст. 437 Гражданского кодекса РФ данный документ является 
                          публичной офертой, и в случае принятия изложенных ниже условий физическое или 
                          юридическое лицо (далее — Покупатель) осуществляет акцепт Оферты.
                        </p>
                        
                        <p>
                          1.3. Акцептом Оферты является факт оплаты Покупателем заказа на условиях настоящей Оферты, 
                          в том числе путём внесения предоплаты. Акцепт Оферты создаёт Договор купли-продажи.
                        </p>

                        <p>
                          1.4. Совершая акцепт Оферты, Покупатель подтверждает, что ознакомлен и согласен 
                          со всеми условиями настоящей Оферты.
                        </p>

                        <div className="p-5 bg-[var(--color-primary-50)] rounded-[12px] border border-[var(--color-primary-200)]">
                          <p className="text-sm text-[var(--color-primary-700)]">
                            <strong>Обратите внимание:</strong> Оформление заказа на сайте ecoeda.ru означает 
                            ваше полное и безоговорочное согласие с условиями настоящей Оферты.
                          </p>
                        </div>
                      </div>
                    </section>

                    {/* Section 2 */}
                    <section id="terms">
                      <h2 className="mb-6">2. Термины и определения</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          2.1. В целях настоящей Оферты нижеприведённые термины используются в следующем значении:
                        </p>
                        
                        <div className="space-y-3">
                          <div className="p-4 bg-[var(--color-neutral-50)] rounded-[12px]">
                            <p className="font-semibold text-[var(--color-neutral-900)] mb-1">Продавец</p>
                            <p className="text-sm">
                              ООО «ЭкоЕда», реализующее товары через интернет-магазин, расположенный на сайте ecoeda.ru
                            </p>
                          </div>

                          <div className="p-4 bg-[var(--color-neutral-50)] rounded-[12px]">
                            <p className="font-semibold text-[var(--color-neutral-900)] mb-1">Покупатель</p>
                            <p className="text-sm">
                              Физическое или юридическое лицо, разместившее заказ на сайте
                            </p>
                          </div>

                          <div className="p-4 bg-[var(--color-neutral-50)] rounded-[12px]">
                            <p className="font-semibold text-[var(--color-neutral-900)] mb-1">Товар</p>
                            <p className="text-sm">
                              Готовая еда, продуктовые наборы и сопутствующие товары, представленные в каталоге интернет-магазина
                            </p>
                          </div>

                          <div className="p-4 bg-[var(--color-neutral-50)] rounded-[12px]">
                            <p className="font-semibold text-[var(--color-neutral-900)] mb-1">Заказ</p>
                            <p className="text-sm">
                              Оформленный Покупателем через интернет-магазин перечень товаров с указанием цены, количества и адреса доставки
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    {/* Section 3 */}
                    <section id="subject">
                      <h2 className="mb-6">3. Предмет оферты</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          3.1. Продавец обязуется передать в собственность Покупателю товар, а Покупатель 
                          обязуется оплатить и принять товар на условиях настоящей Оферты.
                        </p>
                        
                        <p>
                          3.2. Настоящая Оферта распространяется на все товары, представленные на сайте ecoeda.ru
                        </p>

                        <p>
                          3.3. Описание товара, его характеристики, цена, сроки годности и другая информация 
                          размещаются на сайте в соответствующих разделах каталога.
                        </p>

                        <p>
                          3.4. Продавец оставляет за собой право вносить изменения в описание товара, цены и 
                          условия доставки. При этом условия оформленных и оплаченных заказов изменению не подлежат.
                        </p>
                      </div>
                    </section>

                    {/* Section 4 */}
                    <section id="order-process">
                      <h2 className="mb-6">4. Порядок оформления заказа</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          4.1. Оформление заказа осуществляется Покупателем самостоятельно через интернет-магазин.
                        </p>
                        
                        <p>
                          4.2. При оформлении заказа Покупатель обязан предоставить следующую информацию:
                        </p>

                        <div className="p-5 bg-[var(--color-neutral-50)] rounded-[12px]">
                          <ul className="space-y-2">
                            <li>• ФИО получателя</li>
                            <li>• Контактный телефон</li>
                            <li>• Адрес электронной почты</li>
                            <li>• Адрес доставки</li>
                            <li>• Желаемую дату и время доставки</li>
                          </ul>
                        </div>

                        <p>
                          4.3. Заказ считается оформленным с момента получения Покупателем подтверждения на 
                          указанный адрес электронной почты или номер телефона.
                        </p>

                        <p>
                          4.4. Продавец имеет право отменить заказ в следующих случаях:
                        </p>

                        <div className="space-y-2 pl-4">
                          <p>• Отсутствие товара на складе</p>
                          <p>• Предоставление Покупателем недостоверной информации</p>
                          <p>• Технические ошибки в работе сайта</p>
                          <p>• Невозможность связаться с Покупателем в течение 24 часов</p>
                        </div>

                        <p>
                          4.5. Покупатель может отменить заказ не позднее чем за 3 часа до начала интервала доставки 
                          путём обращения в службу поддержки.
                        </p>
                      </div>
                    </section>

                    {/* Section 5 */}
                    <section id="price-payment">
                      <h2 className="mb-6">5. Цена товара и оплата</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          5.1. Цена товара указывается в рублях Российской Федерации за единицу товара или за набор.
                        </p>
                        
                        <p>
                          5.2. Цена товара на сайте может быть изменена Продавцом в одностороннем порядке. 
                          При этом цена на заказанный Покупателем товар изменению не подлежит.
                        </p>

                        <p>
                          5.3. Оплата заказа может осуществляться следующими способами:
                        </p>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-4 border border-[var(--color-neutral-200)] rounded-[12px]">
                            <h5 className="mb-2 text-[var(--color-neutral-900)]">Онлайн-оплата</h5>
                            <p className="text-sm">
                              Банковской картой (Visa, MasterCard, МИР) или через СБП на сайте
                            </p>
                          </div>

                          <div className="p-4 border border-[var(--color-neutral-200)] rounded-[12px]">
                            <h5 className="mb-2 text-[var(--color-neutral-900)]">При получении</h5>
                            <p className="text-sm">
                              Наличными или картой курьеру в момент получения заказа
                            </p>
                          </div>
                        </div>

                        <p>
                          5.4. Общая стоимость заказа включает:
                        </p>

                        <div className="p-5 bg-[var(--color-neutral-50)] rounded-[12px]">
                          <ul className="space-y-2">
                            <li>• Стоимость выбранных товаров</li>
                            <li>• Стоимость доставки (если применимо)</li>
                            <li>• Скидки и акции (если применимы)</li>
                          </ul>
                        </div>

                        <p>
                          5.5. Покупатель соглашается с тем, что получение электронного чека или кассового чека 
                          подтверждает факт оплаты заказа.
                        </p>
                      </div>
                    </section>

                    {/* Section 6 */}
                    <section id="delivery">
                      <h2 className="mb-6">6. Доставка товара</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          6.1. Продавец осуществляет доставку товара по адресу, указанному Покупателем при оформлении заказа.
                        </p>
                        
                        <p>
                          6.2. Сроки доставки зависят от зоны доставки и указываются при оформлении заказа:
                        </p>

                        <div className="overflow-x-auto">
                          <table className="w-full border border-[var(--color-neutral-200)] rounded-[12px]">
                            <thead className="bg-[var(--color-neutral-50)]">
                              <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Зона</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Срок</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold">Стоимость</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--color-neutral-200)]">
                              <tr>
                                <td className="px-4 py-3 text-sm">Центр города</td>
                                <td className="px-4 py-3 text-sm">В день заказа</td>
                                <td className="px-4 py-3 text-sm">Бесплатно от 2000 ₽</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 text-sm">Ближние районы</td>
                                <td className="px-4 py-3 text-sm">1-2 дня</td>
                                <td className="px-4 py-3 text-sm">Бесплатно от 2500 ₽</td>
                              </tr>
                              <tr>
                                <td className="px-4 py-3 text-sm">Пригород</td>
                                <td className="px-4 py-3 text-sm">2-3 дня</td>
                                <td className="px-4 py-3 text-sm">Бесплатно от 3000 ₽</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <p>
                          6.3. Право собственности на товар переходит к Покупателю с момента передачи товара 
                          и оплаты его стоимости.
                        </p>

                        <p>
                          6.4. При получении товара Покупатель обязан проверить:
                        </p>

                        <div className="space-y-2 pl-4">
                          <p>• Соответствие товара заказу</p>
                          <p>• Комплектность товара</p>
                          <p>• Целостность упаковки</p>
                          <p>• Сроки годности</p>
                        </div>

                        <p>
                          6.5. В случае обнаружения несоответствий Покупатель имеет право отказаться от товара.
                        </p>
                      </div>
                    </section>

                    {/* Section 7 */}
                    <section id="returns">
                      <h2 className="mb-6">7. Возврат товара</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          7.1. Возврат товара надлежащего качества производится в соответствии с Законом 
                          РФ «О защите прав потребителей».
                        </p>
                        
                        <p>
                          7.2. Учитывая специфику товара (скоропортящаяся продукция), возврат возможен 
                          только при наличии производственного брака или несоответствия товара заказу.
                        </p>

                        <p>
                          7.3. Заявка на возврат должна быть подана в течение 2 часов с момента получения заказа.
                        </p>

                        <p>
                          7.4. Возврат денежных средств осуществляется в следующие сроки:
                        </p>

                        <div className="p-5 bg-[var(--color-neutral-50)] rounded-[12px]">
                          <ul className="space-y-2">
                            <li>• При оплате картой онлайн — 3-5 рабочих дней на карту Покупателя</li>
                            <li>• При оплате наличными — 3-5 рабочих дней на карту Покупателя или бонусный счёт</li>
                          </ul>
                        </div>

                        <p>
                          7.5. Подробные условия возврата и обмена изложены на странице «Возврат и обмен» на сайте.
                        </p>
                      </div>
                    </section>

                    {/* Section 8 */}
                    <section id="liability">
                      <h2 className="mb-6">8. Ответственность сторон</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          8.1. Продавец не несёт ответственности за ущерб, причинённый Покупателю вследствие 
                          ненадлежащего использования товара.
                        </p>
                        
                        <p>
                          8.2. Продавец не несёт ответственности за задержку доставки по вине службы доставки 
                          или форс-мажорных обстоятельств.
                        </p>

                        <p>
                          8.3. Покупатель несёт ответственность за достоверность предоставленной при оформлении 
                          заказа информации.
                        </p>

                        <p>
                          8.4. Стороны освобождаются от ответственности за полное или частичное неисполнение 
                          своих обязательств, если это неисполнение явилось следствием форс-мажорных обстоятельств.
                        </p>
                      </div>
                    </section>

                    {/* Section 9 */}
                    <section id="force-majeure">
                      <h2 className="mb-6">9. Форс-мажор</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          9.1. Стороны освобождаются от ответственности за частичное или полное неисполнение 
                          обязательств по Договору, если это неисполнение явилось следствием обстоятельств 
                          непреодолимой силы (форс-мажор).
                        </p>
                        
                        <p>
                          9.2. К обстоятельствам непреодолимой силы относятся:
                        </p>

                        <div className="p-5 bg-[var(--color-neutral-50)] rounded-[12px]">
                          <ul className="space-y-2">
                            <li>• Стихийные бедствия</li>
                            <li>• Пожары, наводнения, землетрясения</li>
                            <li>• Военные действия, теракты</li>
                            <li>• Забастовки, эпидемии</li>
                            <li>• Действия органов государственной власти</li>
                            <li>• Другие обстоятельства, находящиеся вне разумного контроля Сторон</li>
                          </ul>
                        </div>

                        <p>
                          9.3. При наступлении обстоятельств непреодолимой силы срок выполнения обязательств 
                          по Договору отодвигается соразмерно времени действия таких обстоятельств.
                        </p>
                      </div>
                    </section>

                    {/* Section 10 */}
                    <section id="final">
                      <h2 className="mb-6">10. Заключительные положения</h2>
                      
                      <div className="space-y-4 text-[var(--color-neutral-700)]">
                        <p>
                          10.1. Настоящая Оферта вступает в силу с момента акцепта Покупателем и действует 
                          до момента полного исполнения Сторонами своих обязательств.
                        </p>
                        
                        <p>
                          10.2. Продавец имеет право вносить изменения в условия Оферты и/или отзывать Оферту 
                          в любой момент по своему усмотрению. Изменения вступают в силу с момента публикации 
                          на сайте.
                        </p>

                        <p>
                          10.3. Все споры и разногласия разрешаются путём переговоров. В случае недостижения 
                          согласия спор передаётся на рассмотрение в суд по месту нахождения Продавца.
                        </p>

                        <p>
                          10.4. К отношениям между Покупателем и Продавцом применяется право Российской Федерации.
                        </p>

                        <p>
                          10.5. Признание судом недействительности какого-либо положения настоящей Оферты 
                          не влечёт за собой недействительность остальных положений.
                        </p>
                      </div>
                    </section>

                    {/* Section 11 */}
                    <section id="details">
                      <h2 className="mb-6">11. Реквизиты продавца</h2>
                      
                      <div className="p-6 bg-[var(--color-neutral-50)] rounded-[12px]">
                        <div className="space-y-3">
                          <div>
                            <h4 className="mb-2 text-[var(--color-neutral-900)]">ООО «ЭкоЕда»</h4>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-[var(--color-neutral-700)]">
                            <div>
                              <p className="font-semibold mb-1">Юридический адрес:</p>
                              <p>123456, г. Чебоксары, ул. Зелёная, д. 7, офис 42</p>
                            </div>
                            
                            <div>
                              <p className="font-semibold mb-1">Фактический адрес:</p>
                              <p>123456, г. Чебоксары, ул. Зелёная, д. 7, офис 42</p>
                            </div>

                            <div>
                              <p className="font-semibold mb-1">ИНН:</p>
                              <p>1234567890</p>
                            </div>

                            <div>
                              <p className="font-semibold mb-1">КПП:</p>
                              <p>123456789</p>
                            </div>

                            <div>
                              <p className="font-semibold mb-1">ОГРН:</p>
                              <p>1234567890123</p>
                            </div>

                            <div>
                              <p className="font-semibold mb-1">Банк:</p>
                              <p>ПАО «Сбербанк»</p>
                            </div>

                            <div>
                              <p className="font-semibold mb-1">Расчётный счёт:</p>
                              <p>40702810000000000000</p>
                            </div>

                            <div>
                              <p className="font-semibold mb-1">Корр. счёт:</p>
                              <p>30101810000000000000</p>
                            </div>

                            <div>
                              <p className="font-semibold mb-1">БИК:</p>
                              <p>044525225</p>
                            </div>

                            <div>
                              <p className="font-semibold mb-1">Генеральный директор:</p>
                              <p>Иванов Иван Иванович</p>
                            </div>

                            <div className="md:col-span-2">
                              <p className="font-semibold mb-1">Контакты:</p>
                              <p>Email: info@ecoeda.ru</p>
                              <p>Телефон: +7 (495) 123-45-67</p>
                              <p>Сайт: ecoeda.ru</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="mt-8 pt-4 border-t border-[var(--color-neutral-200)] text-sm text-[var(--color-neutral-600)]">
                        Дата последнего обновления: 15 апреля 2026 г.
                      </p>
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
