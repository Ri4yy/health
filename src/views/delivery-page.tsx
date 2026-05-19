"use client";
import React from 'react';
import Link from 'next/link';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { Breadcrumbs } from '../components/shared/breadcrumbs';
import { 
  Truck, 
  Clock, 
  MapPin, 
  Package, 
  CheckCircle2,
  AlertCircle,
  Gift,
  Phone,
  Calendar,
  DollarSign,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';

export const DeliveryPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const deliveryZones = [
    { name: 'Центр города', time: 'В день заказа', fee: 'Бесплатно от 2000 ₽' },
    { name: 'Ближние районы', time: '1-2 дня', fee: 'Бесплатно от 2500 ₽' },
    { name: 'Пригород', time: '2-3 дня', fee: 'Бесплатно от 3000 ₽' },
    { name: 'За городом', time: '3-5 дней', fee: 'По договорённости' },
  ];

  const deliverySteps = [
    {
      icon: Package,
      title: 'Упаковка заказа',
      description: 'Мы тщательно упаковываем каждое блюдо в экологичные материалы с соблюдением температурного режима',
    },
    {
      icon: Truck,
      title: 'Курьер в пути',
      description: 'За 30 минут до доставки курьер свяжется с вами для подтверждения времени',
    },
    {
      icon: CheckCircle2,
      title: 'Получение заказа',
      description: 'Проверьте комплектность и целостность упаковки при получении',
    },
  ];

  const faqItems = [
    {
      question: 'Можно ли изменить адрес доставки после оформления заказа?',
      answer: 'Да, вы можете изменить адрес доставки, позвонив нам по телефону +7 (495) 123-45-67 или написав в чат поддержки. Если заказ ещё не передан курьеру, мы обязательно учтём ваши пожелания.',
    },
    {
      question: 'Как отследить заказ?',
      answer: 'После отправки заказа вы получите SMS с номером заказа и ссылкой для отслеживания. Также статус заказа можно посмотреть в личном кабинете в разделе "Мои заказы".',
    },
    {
      question: 'Что делать, если меня не будет дома?',
      answer: 'Вы можете указать в комментарии к заказу удобное место для оставления заказа (у двери, консьержу) или договориться с курьером о переносе времени доставки.',
    },
    {
      question: 'Доставляете ли вы в выходные дни?',
      answer: 'Да, мы осуществляем доставку 7 дней в неделю, включая выходные и праздничные дни. Интервалы доставки: с 9:00 до 21:00.',
    },
    {
      question: 'Какая минимальная сумма заказа?',
      answer: 'Минимальная сумма заказа составляет 1000 ₽. При заказе от 2000 ₽ доставка по городу бесплатная.',
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
                { label: 'Доставка', href: '#' },
              ]}
            />
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-secondary-50)] text-white py-16 md:py-20">
          <div className="container">
            <div className="max-w-[800px] mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-primary-300)] rounded-full mb-6">
                <Truck className="w-4 h-4" />
                <span className="text-sm font-medium">Информация о доставке</span>
              </div>
              
              <h1 className="text-white mb-6">
                Доставка свежей еды<br />к вашему столу
              </h1>
              
              <p className="text-lg text-white/90 max-w-[600px] mx-auto">
                Доставляем ежедневно приготовленную здоровую еду по городу и области. 
                Бесплатная доставка при заказе от 2000 ₽.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Info Cards */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-[1200px] mx-auto">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-[16px] border border-[var(--color-neutral-200)] p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                    <Clock className="w-7 h-7 text-[var(--color-primary-600)]" />
                  </div>
                  <h4 className="mb-2">Быстрая доставка</h4>
                  <p className="text-[var(--color-neutral-600)]">
                    Доставка в день заказа в центре города
                  </p>
                </div>

                <div className="bg-white rounded-[16px] border border-[var(--color-neutral-200)] p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                    <Gift className="w-7 h-7 text-[var(--color-primary-600)]" />
                  </div>
                  <h4 className="mb-2">Бесплатно от 2000 ₽</h4>
                  <p className="text-[var(--color-neutral-600)]">
                    Доставка по городу без дополнительной оплаты
                  </p>
                </div>

                <div className="bg-white rounded-[16px] border border-[var(--color-neutral-200)] p-6 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                    <Package className="w-7 h-7 text-[var(--color-primary-600)]" />
                  </div>
                  <h4 className="mb-2">Экологичная упаковка</h4>
                  <p className="text-[var(--color-neutral-600)]">
                    Термосумки и биоразлагаемые материалы
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery Schedule */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-[1200px] mx-auto">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="mb-6">Интервалы доставки</h2>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-[12px] border border-[var(--color-neutral-200)]">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-secondary-100)] flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-[var(--color-secondary-600)]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--color-neutral-900)] mb-1">
                          Ежедневно, 7 дней в неделю
                        </div>
                        <div className="text-sm text-[var(--color-neutral-600)]">
                          Включая выходные и праздничные дни
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white rounded-[12px] border border-[var(--color-neutral-200)]">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-secondary-100)] flex items-center justify-center">
                        <Clock className="w-6 h-6 text-[var(--color-secondary-600)]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--color-neutral-900)] mb-1">
                          4 интервала на выбор
                        </div>
                        <div className="text-sm text-[var(--color-neutral-600)]">
                          09:00-12:00 • 12:00-15:00 • 15:00-18:00 • 18:00-21:00
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white rounded-[12px] border border-[var(--color-neutral-200)]">
                      <div className="w-12 h-12 rounded-full bg-[var(--color-secondary-100)] flex items-center justify-center">
                        <Phone className="w-6 h-6 text-[var(--color-secondary-600)]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--color-neutral-900)] mb-1">
                          Звонок за 30 минут
                        </div>
                        <div className="text-sm text-[var(--color-neutral-600)]">
                          Курьер предупредит о приближении к вашему адресу
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[16px] overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1764285337736-905b512c9d97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHRydWNrJTIwc2VydmljZXxlbnwxfHx8fDE3NzYyMTQzNzJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Доставка"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Delivery Process */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container">
            <div className="max-w-[1200px] mx-auto">
              <div className="text-center mb-12">
                <h2 className="mb-4">Как происходит доставка</h2>
                <p className="text-lg text-[var(--color-neutral-600)] max-w-[600px] mx-auto">
                  Простой и понятный процесс от упаковки до получения
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {deliverySteps.map((step, index) => (
                  <div key={index} className="relative">
                    {index < deliverySteps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] right-[-40px] h-0.5 bg-[var(--color-neutral-200)]" />
                    )}
                    <div className="relative text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-primary-500)] flex items-center justify-center relative z-10">
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="mb-2 text-sm font-semibold text-[var(--color-primary-600)] uppercase tracking-wider">
                        Шаг {index + 1}
                      </div>
                      <h4 className="mb-3">{step.title}</h4>
                      <p className="text-[var(--color-neutral-600)]">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16">
          <div className="container">
            <div className="max-w-[800px] mx-auto">
              <div className="bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-700)] rounded-[20px] p-8 md:p-12 text-center text-white">
                <h3 className="!text-white mb-4">Готовы сделать заказ?</h3>
                <p className="!text-white/90 mb-8 max-w-[500px] mx-auto">
                  Выберите блюда из нашего меню и мы доставим их свежими прямо к вашему столу
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
