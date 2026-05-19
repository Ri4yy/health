"use client";
import React, { useState } from 'react';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { Button } from '../components/core/button';
import { Breadcrumbs } from '../components/shared/breadcrumbs';
import { 
  RotateCcw, 
  Clock, 
  Phone, 
  Mail,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ChevronDown,
  MessageCircle
} from 'lucide-react';

export const ReturnsPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const returnReasons = [
    {
      icon: AlertTriangle,
      title: 'Нарушение упаковки',
      description: 'Повреждённая упаковка при доставке',
    },
    {
      icon: AlertTriangle,
      title: 'Неполная комплектация',
      description: 'Отсутствие заказанных позиций',
    },
    {
      icon: AlertTriangle,
      title: 'Несоответствие описанию',
      description: 'Товар не соответствует описанию на сайте',
    },
    {
      icon: Clock,
      title: 'Истёкший срок годности',
      description: 'При получении срок годности менее 50%',
    },
  ];

  const returnSteps = [
    {
      step: 1,
      title: 'Свяжитесь с нами',
      description: 'Позвоните по телефону или напишите в чат в течение 2 часов после получения заказа',
    },
    {
      step: 2,
      title: 'Опишите проблему',
      description: 'Расскажите, что не так с заказом, и при необходимости отправьте фотографии',
    },
    {
      step: 3,
      title: 'Дождитесь решения',
      description: 'Мы рассмотрим вашу заявку в течение 15 минут и предложим решение',
    },
    {
      step: 4,
      title: 'Получите возврат',
      description: 'Возврат средств на карту в течение 3-5 рабочих дней или замена товара',
    },
  ];

  const faqItems = [
    {
      question: 'В течение какого времени можно вернуть заказ?',
      answer: 'Заявку на возврат необходимо подать в течение 2 часов после получения заказа. Это связано со спецификой скоропортящейся продукции. При серьёзных нарушениях качества срок может быть продлён.',
    },
    {
      question: 'Что делать, если обнаружил проблему после начала употребления?',
      answer: 'Свяжитесь с нами незамедлительно. Сообщите номер заказа и опишите проблему. Мы постараемся найти решение, даже если часть продукта уже употреблена.',
    },
    {
      question: 'Нужно ли возвращать товар для получения возврата?',
      answer: 'В большинстве случаев возвращать скоропортящуюся продукцию не требуется по санитарным нормам. Достаточно предоставить фотографии товара и упаковки.',
    },
    {
      question: 'Как быстро вернут деньги?',
      answer: 'При оплате картой онлайн возврат происходит на карту в течение 3-5 рабочих дней. При оплате наличными — возврат на карту или на бонусный счёт.',
    },
    {
      question: 'Можно ли обменять заказ вместо возврата?',
      answer: 'Да, мы можем бесплатно заменить товар на аналогичный или другой из нашего меню. Обсудите детали с менеджером при обращении.',
    },
    {
      question: 'Что не подлежит возврату?',
      answer: 'Возврат невозможен, если упаковка была нарушена покупателем, товар был в употреблении без обоснованной причины, или прошло более 2 часов с момента получения.',
    },
  ];

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
                { label: 'Возврат и обмен', href: '#' },
              ]}
            />
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-700)] text-white py-16 md:py-20">
          <div className="container">
            <div className="max-w-[800px] mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
                <RotateCcw className="w-4 h-4" />
                <span className="text-sm font-medium">Возврат и обмен</span>
              </div>
              
              <h1 className="text-white mb-6">
                Ваша уверенность —<br />наша забота
              </h1>
              
              <p className="text-lg text-white/90 max-w-[600px] mx-auto mb-8">
                Мы гарантируем качество каждого заказа. Если что-то пошло не так — 
                мы быстро решим проблему.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-[var(--color-primary-600)] hover:bg-white/90"
                >
                  <Phone className="w-5 h-5" />
                  Связаться с нами
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* When Return is Possible */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="mb-4">В каких случаях возможен возврат</h2>
                <p className="text-lg text-[var(--color-neutral-600)] max-w-[600px] mx-auto">
                  Мы принимаем заявки на возврат при следующих обстоятельствах
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {returnReasons.map((reason, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-[16px] border border-[var(--color-neutral-200)] p-6 hover:border-[var(--color-primary-500)] hover:bg-[var(--color-primary-50)] transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-accent-100)] flex items-center justify-center flex-shrink-0">
                        <reason.icon className="w-6 h-6 text-[var(--color-accent-600)]" />
                      </div>
                      <div>
                        <h4 className="mb-2">{reason.title}</h4>
                        <p className="text-sm text-[var(--color-neutral-600)]">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-[var(--color-primary-50)] rounded-[16px] border border-[var(--color-primary-200)]">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[var(--color-primary-600)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="mb-2 text-[var(--color-primary-900)]">Срок обращения</h5>
                    <p className="text-sm text-[var(--color-primary-700)]">
                      Заявку на возврат необходимо подать в течение <strong>2 часов</strong> после 
                      получения заказа. Это обязательное условие для возврата скоропортящейся продукции. 
                      Свяжитесь с нами по телефону, в чате или через email.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Return Process */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="mb-4">Порядок возврата</h2>
                <p className="text-lg text-[var(--color-neutral-600)] max-w-[600px] mx-auto">
                  Простой процесс возврата в 4 шага
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {returnSteps.map((item, index) => (
                  <div key={index} className="relative">
                    {index < returnSteps.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-[calc(50%+30px)] right-[-30px] h-0.5 bg-[var(--color-neutral-200)]" />
                    )}
                    <div className="relative text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-primary-500)] flex items-center justify-center relative z-10">
                        <span className="text-2xl font-bold text-white">{item.step}</span>
                      </div>
                      <h4 className="mb-3">{item.title}</h4>
                      <p className="text-sm text-[var(--color-neutral-600)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What You Need */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-[900px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="mb-4">Что нужно от вас</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-[16px] border border-[var(--color-neutral-200)] p-6">
                  <div className="w-12 h-12 mb-4 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[var(--color-primary-600)]" />
                  </div>
                  <h4 className="mb-3">Информация о заказе</h4>
                  <ul className="space-y-2 text-sm text-[var(--color-neutral-700)]">
                    <li>• Номер заказа</li>
                    <li>• Дата и время получения</li>
                    <li>• Список проблемных позиций</li>
                  </ul>
                </div>

                <div className="bg-white rounded-[16px] border border-[var(--color-neutral-200)] p-6">
                  <div className="w-12 h-12 mb-4 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-[var(--color-primary-600)]" />
                  </div>
                  <h4 className="mb-3">Подтверждение проблемы</h4>
                  <ul className="space-y-2 text-sm text-[var(--color-neutral-700)]">
                    <li>• Фотографии товара</li>
                    <li>• Фотографии упаковки</li>
                    <li>• Описание проблемы</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 bg-[var(--color-neutral-50)] rounded-[16px] p-6">
                <h4 className="mb-4">Способы возврата средств</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-[var(--color-neutral-900)] mb-1">
                        Возврат на карту
                      </div>
                      <p className="text-sm text-[var(--color-neutral-600)]">
                        Полный возврат средств на карту, с которой была произведена оплата (3-5 рабочих дней)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-[var(--color-neutral-900)] mb-1">
                        Замена товара
                      </div>
                      <p className="text-sm text-[var(--color-neutral-600)]">
                        Бесплатная замена на аналогичный товар или другую позицию из меню
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-success)] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-[var(--color-neutral-900)] mb-1">
                        Бонусы на счёт
                      </div>
                      <p className="text-sm text-[var(--color-neutral-600)]">
                        Зачисление суммы заказа бонусами с повышенным коэффициентом (х1.5)
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Exceptions */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container">
            <div className="max-w-[900px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="mb-4">Что не подлежит возврату</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 rounded-[12px] border border-[var(--color-neutral-200)]">
                  <AlertTriangle className="w-5 h-5 text-[var(--color-accent-600)] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[var(--color-neutral-900)] mb-1">
                      Истечение срока обращения
                    </div>
                    <p className="text-sm text-[var(--color-neutral-600)]">
                      Прошло более 2 часов с момента получения заказа (за исключением серьёзных нарушений качества)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-[12px] border border-[var(--color-neutral-200)]">
                  <AlertTriangle className="w-5 h-5 text-[var(--color-accent-600)] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[var(--color-neutral-900)] mb-1">
                      Нарушение условий хранения
                    </div>
                    <p className="text-sm text-[var(--color-neutral-600)]">
                      Товар хранился с нарушением температурного режима после получения
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-[12px] border border-[var(--color-neutral-200)]">
                  <AlertTriangle className="w-5 h-5 text-[var(--color-accent-600)] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[var(--color-neutral-900)] mb-1">
                      Субъективные причины
                    </div>
                    <p className="text-sm text-[var(--color-neutral-600)]">
                      "Не понравился вкус", "передумал" и другие субъективные причины без объективных недостатков товара
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-[12px] border border-[var(--color-neutral-200)]">
                  <AlertTriangle className="w-5 h-5 text-[var(--color-accent-600)] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[var(--color-neutral-900)] mb-1">
                      Отсутствие подтверждения
                    </div>
                    <p className="text-sm text-[var(--color-neutral-600)]">
                      Невозможность предоставить фото товара, упаковки или другие доказательства проблемы
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-[900px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="mb-4">Как с нами связаться</h2>
                <p className="text-lg text-[var(--color-neutral-600)]">
                  Выберите удобный способ связи для подачи заявки на возврат
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-[16px] border border-[var(--color-neutral-200)] p-6 text-center hover:border-[var(--color-primary-500)] transition-all">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                    <Phone className="w-7 h-7 text-[var(--color-primary-600)]" />
                  </div>
                  <h4 className="mb-2">Телефон</h4>
                  <p className="text-[var(--color-neutral-600)] mb-4">
                    Ежедневно 9:00 - 21:00
                  </p>
                  <a href="tel:+74951234567" className="text-[var(--color-primary-600)] font-semibold hover:underline">
                    +7 (495) 123-45-67
                  </a>
                </div>

                <div className="bg-white rounded-[16px] border border-[var(--color-neutral-200)] p-6 text-center hover:border-[var(--color-primary-500)] transition-all">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                    <MessageCircle className="w-7 h-7 text-[var(--color-primary-600)]" />
                  </div>
                  <h4 className="mb-2">Онлайн-чат</h4>
                  <p className="text-[var(--color-neutral-600)] mb-4">
                    Быстрые ответы 24/7
                  </p>
                  <Button variant="ghost" size="sm">
                    Открыть чат
                  </Button>
                </div>

                <div className="bg-white rounded-[16px] border border-[var(--color-neutral-200)] p-6 text-center hover:border-[var(--color-primary-500)] transition-all">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                    <Mail className="w-7 h-7 text-[var(--color-primary-600)]" />
                  </div>
                  <h4 className="mb-2">Email</h4>
                  <p className="text-[var(--color-neutral-600)] mb-4">
                    Ответ в течение часа
                  </p>
                  <a href="mailto:support@ecoeda.ru" className="text-[var(--color-primary-600)] font-semibold hover:underline">
                    support@ecoeda.ru
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container">
            <div className="max-w-[900px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="mb-4">Часто задаваемые вопросы</h2>
              </div>

              <div className="space-y-3">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-[12px] border border-[var(--color-neutral-200)] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[var(--color-neutral-50)] transition-colors"
                    >
                      <span className="font-semibold text-[var(--color-neutral-900)] pr-4">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-[var(--color-neutral-600)] flex-shrink-0 transition-transform ${
                          openFaq === index ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === index && (
                      <div className="px-6 pb-4 text-[var(--color-neutral-700)]">
                        {item.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-[800px] mx-auto">
              <div className="bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-700)] rounded-[20px] p-8 md:p-12 text-center text-white">
                <h3 className="text-white mb-4">Остались вопросы?</h3>
                <p className="text-white/90 mb-8 max-w-[500px] mx-auto">
                  Свяжитесь с нашей службой поддержки — мы всегда готовы помочь
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-[var(--color-primary-600)] hover:bg-white/90"
                  >
                    <Phone className="w-5 h-5" />
                    Позвонить нам
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="border-2 border-white text-white hover:bg-white/10"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Написать в чат
                  </Button>
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
