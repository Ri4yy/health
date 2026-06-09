"use client";
import React, { useState } from 'react';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { FeatureCard } from '../components/cards/feature-card';
import { TeamMember } from '../components/shared/team-member';
import { ToastContainer } from '../components/shared/toast';
import { Heart, Award, Users, Leaf, CheckCircle, Shield } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export const AboutPage: React.FC = () => {
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success' | 'error' | 'info'; message: string }>>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const values = [
    {
      icon: <Heart className="w-6 h-6 text-[var(--color-primary-600)]" />,
      title: 'Забота о здоровье',
      description:
        'Мы создаём продукты, которые помогают людям жить здоровой и активной жизнью. Каждое блюдо разработано с учётом принципов правильного питания.',
    },
    {
      icon: <Leaf className="w-6 h-6 text-[var(--color-primary-600)]" />,
      title: 'Экологичность',
      description:
        'Используем только натуральные ингредиенты от проверенных поставщиков. Наша упаковка полностью перерабатывается.',
    },
    {
      icon: <Users className="w-6 h-6 text-[var(--color-primary-600)]" />,
      title: 'Индивидуальный подход',
      description:
        'Понимаем, что каждый человек уникален. Предлагаем персонализированные решения для достижения ваших целей.',
    },
  ];

  const production = [
    {
      icon: <CheckCircle className="w-6 h-6 text-[var(--color-primary-600)]" />,
      title: 'Контроль качества',
      description:
        'Многоступенчатая система контроля на всех этапах производства. Проверяем качество сырья, соблюдение технологии и готовый продукт.',
    },
    {
      icon: <Award className="w-6 h-6 text-[var(--color-primary-600)]" />,
      title: 'Профессиональная команда',
      description:
        'Наши повара имеют опыт работы в лучших ресторанах. Диетологи следят за сбалансированностью рационов.',
    },
    {
      icon: <Shield className="w-6 h-6 text-[var(--color-primary-600)]" />,
      title: 'Безопасность',
      description:
        'Производство оснащено современным оборудованием. Соблюдаем все санитарные нормы и стандарты безопасности.',
    },
  ];

  const team = [
    {
      name: 'Анна Сергеева',
      position: 'Главный технолог',
      description: 'Опыт работы более 10 лет в ресторанной индустрии',
    },
    {
      name: 'Дмитрий Волков',
      position: 'Шеф-повар',
      description: 'Специалист по здоровой кухне',
    },
    {
      name: 'Елена Никитина',
      position: 'Диетолог',
      description: 'Нутрициолог с международной сертификацией',
    },
    {
      name: 'Михаил Крылов',
      position: 'Менеджер по качеству',
      description: 'Эксперт по безопасности пищевых производств',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-milk)]">
      <Header
        cartItemsCount={3}
        favoritesCount={5}
        isLoggedIn={false}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-secondary-50)]">
          <div className="container py-12 lg:py-20">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-[var(--color-neutral-900)] mb-6">
                О компании Точка Баланса
              </h1>
              <p className="text-lg lg:text-xl text-[var(--color-neutral-700)] leading-relaxed">
                Мы помогаем людям питаться правильно, вкусно и без лишних усилий. Наша миссия —
                сделать здоровое питание доступным каждому.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="container py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-secondary-50)] rounded-[24px] p-8 lg:p-12 text-white">
              <h2 className="text-3xl font-bold mb-4">Наша миссия</h2>
              <p className="text-lg leading-relaxed mb-6 text-white/90">
                Мы верим, что здоровое питание — это основа качественной жизни. Наша цель —
                помочь каждому человеку питаться правильно без стресса и временных затрат.
              </p>
              <p className="text-lg leading-relaxed text-white/90">
                За 1 год работы мы помогли более 1 000 клиентам улучшить качество жизни через
                правильное питание. Каждый день готовим тысячи блюд, которые приносят пользу и
                удовольствие.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-[var(--color-bg-light)] py-12 lg:py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-[var(--color-neutral-900)] text-center mb-10">
              Наши ценности
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <FeatureCard key={index} {...value} />
              ))}
            </div>
          </div>
        </section>

        {/* Production */}
        <section className="container py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[var(--color-neutral-900)] mb-6">
                Качество и производство
              </h2>
              <p className="text-lg text-[var(--color-neutral-700)] mb-6 leading-relaxed">
                Наше производство оснащено современным оборудованием и соответствует всем
                международным стандартам качества. Мы тщательно отбираем поставщиков и
                контролируем каждый этап приготовления блюд.
              </p>
              <p className="text-lg text-[var(--color-neutral-700)] leading-relaxed">
                Команда профессиональных поваров и диетологов работает над созданием вкусных и
                сбалансированных рационов. Все блюда готовятся в день доставки, чтобы вы получали
                максимально свежий продукт.
              </p>
            </div>
            <div className="rounded-[24px] overflow-hidden shadow-[var(--shadow-xl)]">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1722152667178-be659e54bffc?w=800"
                alt="Производство"
                className="w-full h-full object-cover aspect-[4/3]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {production.map((item, index) => (
              <FeatureCard key={index} {...item} />
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="container py-12 lg:py-16">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-[var(--color-neutral-900)] mb-4">
              Наша команда
            </h2>
            <p className="text-lg text-[var(--color-neutral-700)]">
              Профессионалы своего дела, которые создают для вас здоровое питание
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)] py-12 lg:py-16">
          <div className="container">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                { value: '1 000+', label: 'Довольных клиентов' },
                { value: '1 год', label: 'На рынке' },
                { value: '10+', label: 'Блюд в меню' },
                { value: '100%', label: 'Натуральные продукты' },
              ].map((stat, index) => (
                <div key={index} className="text-center text-white">
                  <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm lg:text-base text-white/90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};
