"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { Breadcrumbs } from '../components/shared/breadcrumbs';
import { 
  CreditCard, 
  Smartphone, 
  Wallet, 
  ShieldCheck,
  Lock,
  Check,
  AlertCircle,
  ChevronDown
} from 'lucide-react';

export const PaymentPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const paymentMethods = [
    {
      icon: CreditCard,
      title: 'Банковская карта онлайн',
      description: 'Visa, MasterCard, МИР',
      features: [
        'Мгновенное подтверждение оплаты',
        'Безопасная оплата через банк',
        'Автоматическое бронирование заказа',
      ],
      badge: 'Рекомендуем',
      color: 'primary',
    },
    {
      icon: Smartphone,
      title: 'Система быстрых платежей (СБП)',
      description: 'Через приложение банка',
      features: [
        'Оплата по номеру телефона',
        'Без комиссии',
        'Быстрое подтверждение',
      ],
      badge: null,
      color: 'secondary',
    },
    {
      icon: Wallet,
      title: 'Наличные при получении',
      description: 'Оплата курьеру',
      features: [
        'Без предоплаты',
        'Оплата при доставке',
        'Возможность проверить заказ',
      ],
      badge: null,
      color: 'accent',
    },
    {
      icon: CreditCard,
      title: 'Карта при получении',
      description: 'Оплата терминалом курьера',
      features: [
        'Безналичная оплата на месте',
        'Все типы карт',
        'Чек на email',
      ],
      badge: null,
      color: 'neutral',
    },
  ];

  const securityFeatures = [
    {
      icon: Lock,
      title: 'SSL-шифрование',
      description: 'Все данные передаются по защищённому протоколу',
    },
    {
      icon: ShieldCheck,
      title: 'PCI DSS',
      description: 'Соответствие международным стандартам безопасности',
    },
    {
      icon: Check,
      title: '3D Secure',
      description: 'Дополнительная верификация платежей',
    },
  ];

  const faqItems = [
    {
      question: 'Безопасно ли платить картой онлайн?',
      answer: 'Да, абсолютно безопасно. Мы используем защищённое соединение SSL и не храним данные вашей карты. Оплата проходит на стороне банка с использованием технологии 3D Secure.',
    },
    {
      question: 'Когда списываются деньги при оплате онлайн?',
      answer: 'Деньги списываются сразу после подтверждения заказа. Вы получите уведомление об успешной оплате на email и в SMS.',
    },
    {
      question: 'Можно ли оплатить часть заказа бонусами?',
      answer: 'Да, вы можете использовать бонусы для оплаты до 30% стоимости заказа. Остаток оплачивается любым удобным способом.',
    },
    {
      question: 'Что делать, если оплата не прошла?',
      answer: 'Проверьте баланс карты и лимиты. Если проблема сохраняется, свяжитесь со службой поддержки вашего банка или попробуйте другой способ оплаты.',
    },
    {
      question: 'Можно ли получить чек об оплате?',
      answer: 'Да, электронный чек автоматически отправляется на указанный email. При оплате курьеру вы также получите кассовый чек.',
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-[var(--color-primary-100)]',
          text: 'text-[var(--color-primary-600)]',
          border: 'border-[var(--color-primary-500)]',
          hover: 'hover:border-[var(--color-primary-500)]',
        };
      case 'secondary':
        return {
          bg: 'bg-[var(--color-secondary-100)]',
          text: 'text-[var(--color-secondary-600)]',
          border: 'border-[var(--color-secondary-500)]',
          hover: 'hover:border-[var(--color-secondary-500)]',
        };
      case 'accent':
        return {
          bg: 'bg-[var(--color-accent-100)]',
          text: 'text-[var(--color-accent-600)]',
          border: 'border-[var(--color-accent-500)]',
          hover: 'hover:border-[var(--color-accent-500)]',
        };
      default:
        return {
          bg: 'bg-[var(--color-neutral-100)]',
          text: 'text-[var(--color-neutral-600)]',
          border: 'border-[var(--color-neutral-500)]',
          hover: 'hover:border-[var(--color-neutral-500)]',
        };
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
                { label: 'Способы оплаты', href: '#' },
              ]}
            />
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-secondary-50)] text-white py-16 md:py-20">
          <div className="container">
            <div className="max-w-[800px] mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary-300)] rounded-full mb-6">
                <CreditCard className="w-4 h-4" />
                <span className="text-sm font-medium">Способы оплаты</span>
              </div>
              
              <h1 className="text-white mb-6">
                Удобные и безопасные<br />способы оплаты
              </h1>
              
              <p className="text-lg text-white/90 max-w-[600px] mx-auto">
                Выберите любой удобный способ оплаты заказа. Все платежи защищены и безопасны.
              </p>
            </div>
          </div>
        </section>

        {/* Payment Methods */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="mb-4">Доступные способы оплаты</h2>
                <p className="text-lg text-[var(--color-neutral-600)] max-w-[600px] mx-auto">
                  Мы принимаем все популярные способы оплаты для вашего удобства
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {paymentMethods.map((method, index) => {
                  const colors = getColorClasses(method.color);
                  return (
                    <div
                      key={index}
                      className={`relative bg-white rounded-[16px] border-2 border-[var(--color-neutral-200)] ${colors.hover} transition-all p-6 md:p-8`}
                    >
                      {method.badge && (
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-[var(--color-primary-500)] text-white text-xs font-semibold rounded-full">
                            {method.badge}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-start gap-4 mb-6">
                        <div className={`w-14 h-14 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                          <method.icon className={`w-7 h-7 ${colors.text}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="mb-1">{method.title}</h3>
                          <p className="text-sm text-[var(--color-neutral-600)]">
                            {method.description}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {method.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[var(--color-primary-600)] flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-[var(--color-neutral-700)]">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="mb-4">Как происходит оплата</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                    <span className="text-xl font-bold text-[var(--color-primary-600)]">1</span>
                  </div>
                  <h4 className="mb-3">Оформите заказ</h4>
                  <p className="text-[var(--color-neutral-600)]">
                    Добавьте товары в корзину и перейдите к оформлению заказа
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                    <span className="text-xl font-bold text-[var(--color-primary-600)]">2</span>
                  </div>
                  <h4 className="mb-3">Выберите способ оплаты</h4>
                  <p className="text-[var(--color-neutral-600)]">
                    Укажите удобный вам способ оплаты при оформлении
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                    <span className="text-xl font-bold text-[var(--color-primary-600)]">3</span>
                  </div>
                  <h4 className="mb-3">Получите подтверждение</h4>
                  <p className="text-[var(--color-neutral-600)]">
                    После оплаты вы получите уведомление и чек на email
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container">
            <div className="max-w-[800px] mx-auto">
              <div className="bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-700)] rounded-[20px] p-8 md:p-12 text-center text-white">
                <h3 className="!text-white mb-4">Готовы оформить заказ?</h3>
                <p className="!text-white/90 mb-8 max-w-[500px] mx-auto">
                  Выберите блюда и оплатите заказ любым удобным способом
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/catalog" className="border-2 border-white text-white hover:bg-white/10 font-medium text-lg rounded-[6px] px-4 py-2">
                    Перейти в каталог
                  </Link>
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
