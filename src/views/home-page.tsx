"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { HeroSection } from '../components/shared/hero-section';
import { CategoryCard } from '../components/cards/category-card';
import { ProductCard } from '../components/cards/product-card';
import { FeatureCard } from '../components/cards/feature-card';
import { ReviewCard } from '../components/cards/review-card';
import { Newsletter } from '../components/shared/newsletter';
import { ToastContainer } from '../components/shared/toast';
import { Package, Award, Truck, CheckCircle, Target, TrendingUp, Activity } from 'lucide-react';

export const HomePage: React.FC<any> = ({
  initialCategories = [],
  initialGoalCollections = [],
  initialWeekHits = [],
  initialReviews = []
}) => {
  const router = useRouter();
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success' | 'error' | 'info'; message: string }>>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const categories = initialCategories.map((c: any) => ({
    id: c.id,
    title: c.name,
    description: c.description,
    image: c.image_url,
    itemsCount: 0 // Пока мок, позже можно высчитать из БД
  }));

  const weekHits = initialWeekHits;

  const getIcon = (icon: string) => {
    if (icon === 'TrendingUp') return <TrendingUp className="w-6 h-6 text-[var(--color-primary-600)]" />;
    if (icon === 'Target') return <Target className="w-6 h-6 text-[var(--color-primary-600)]" />;
    return <Activity className="w-6 h-6 text-[var(--color-primary-600)]" />;
  };

  const goalCollections = initialGoalCollections.map((g: any) => ({
    id: g.id,
    icon: getIcon(g.icon),
    title: g.title,
    description: g.description,
    count: 0
  }));

  const reviews = initialReviews.map((r: any) => ({
    author: r.author_name || 'Аноним',
    rating: r.rating,
    date: 'Недавно', // В будущем можно отформатировать r.created_at
    text: r.text
  }));

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 text-[var(--color-primary-600)]" />,
      title: 'Контроль качества',
      description: 'Каждое блюдо проходит строгий контроль качества. Используем только свежие и проверенные продукты.',
    },
    {
      icon: <Award className="w-6 h-6 text-[var(--color-primary-600)]" />,
      title: 'Точный расчёт КБЖУ',
      description: 'Профессиональные диетологи рассчитывают калорийность и баланс нутриентов каждого блюда.',
    },
    {
      icon: <Truck className="w-6 h-6 text-[var(--color-primary-600)]" />,
      title: 'Удобная доставка',
      description: 'Бесплатная доставка от 2000 ₽. Привезём в удобное для вас время в термосумке.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-milk)]">
      <Header
        cartItemsCount={0}
        favoritesCount={0}
        isLoggedIn={false}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          title="Здоровое питание — это просто"
          subtitle="🌱 Новое меню"
          description="Готовые блюда и наборы продуктов с доставкой. Питайтесь правильно без усилий."
          image="https://images.unsplash.com/photo-1649531794884-b8bb1de72e68?w=1200"
          primaryCta={{
            label: 'Выбрать набор',
            onClick: () => router.push('/catalog'),
          }}
          secondaryCta={{
            label: 'Перейти в каталог',
            onClick: () => router.push('/catalog'),
          }}
        />

        {/* Categories */}
        <section className="container py-12 lg:py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-neutral-900)] mb-4">
              Выберите категорию
            </h2>
            <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
              Готовые блюда или наборы продуктов — выбирайте то, что удобно именно вам
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {categories.map((category: any, index: number) => (
              <CategoryCard key={index} {...category} onClick={() => router.push(`/catalog?category=${category.id}`)} />
            ))}
          </div>
        </section>

        {/* Week Hits */}
        <section className="container py-12 lg:py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-neutral-900)] mb-2">
                Хиты недели
              </h2>
              <p className="text-lg text-[var(--color-neutral-600)]">
                Самые популярные блюда по версии наших клиентов
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {weekHits.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={(id, quantity) => {
                  addToast('success', 'Товар добавлен в корзину');
                }}
                onFavoriteToggle={(id) => {
                  addToast('info', 'Добавлено в избранное');
                }}
              />
            ))}
          </div>
        </section>

        {/* Goal Collections */}
        {/* <section className="bg-[var(--color-bg-light)] py-12 lg:py-16">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-neutral-900)] mb-4">
                Подборки по целям
              </h2>
              <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
                Готовые программы питания для достижения ваших целей
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {goalCollections.map((collection: any, index: number) => (
                <button
                  key={index}
                  onClick={() => router.push(`/catalog?goal=${collection.id}`)}
                  className="bg-white rounded-[16px] p-6 border border-[var(--color-neutral-200)] hover:border-[var(--color-primary-500)] hover:shadow-[var(--shadow-md)] transition-all text-left group"
                >
                  <div className="w-12 h-12 bg-[var(--color-primary-100)] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {collection.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--color-neutral-900)] mb-2">
                    {collection.title}
                  </h3>
                  <p className="text-sm text-[var(--color-neutral-600)] mb-4">
                    {collection.description}
                  </p>
                  <p className="text-sm text-[var(--color-primary-600)] font-medium">
                    {collection.count} блюд →
                  </p>
                </button>
              ))}
            </div>
          </div>
        </section> */}

        {/* Features */}
        <section className="container py-12 lg:py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-neutral-900)] mb-4">
              Наши преимущества
            </h2>
            <p className="text-lg text-[var(--color-neutral-600)] max-w-2xl mx-auto">
              Почему более 10 000 клиентов выбирают Точка Баланса
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="bg-[var(--color-bg-light)] py-12 lg:py-16">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-[var(--color-neutral-900)] mb-4">
                Отзывы клиентов
              </h2>
              <p className="text-lg text-[var(--color-neutral-600)]">
                Более 5000 довольных клиентов
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <Newsletter />
      </main>

      <Footer />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};
