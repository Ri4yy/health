"use client";
import React, { useState } from 'react';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { CategoryTile } from '../components/cards/category-tile';
import { Input } from '../components/core/input';
import { ToastContainer } from '../components/shared/toast';
import { Search, Package, Target, Dumbbell, Coffee, Utensils, Moon, Cookie } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success' | 'error' | 'info'; message: string }>>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const categories = [
    // Наборы
    {
      id: 'sets-week',
      title: 'Наборы на неделю',
      subtitle: 'Наборы',
      description: 'Полноценный рацион на всю неделю с доставкой',
      image: 'https://images.unsplash.com/photo-1667499745120-f9bcef8f584e?w=800',
      itemsCount: 24,
      icon: <Package className="w-6 h-6 text-white" />,
    },
    {
      id: 'sets-weight-loss',
      title: 'Для похудения',
      subtitle: 'Наборы',
      description: 'Рационы с дефицитом калорий для комфортного снижения веса',
      image: 'https://images.unsplash.com/photo-1752095809269-ac13b5c9db8f?w=800',
      itemsCount: 18,
      icon: <Target className="w-6 h-6 text-white" />,
    },
    {
      id: 'sets-sport',
      title: 'Для спортсменов',
      subtitle: 'Наборы',
      description: 'Высокобелковое питание для набора мышечной массы',
      image: 'https://images.unsplash.com/photo-1622485831546-0b42abdf8bd4?w=800',
      itemsCount: 15,
      icon: <Dumbbell className="w-6 h-6 text-white" />,
    },
    // Готовая еда
    {
      id: 'ready-breakfast',
      title: 'Завтраки',
      subtitle: 'Готовая еда',
      description: 'Питательные завтраки для энергичного начала дня',
      image: 'https://images.unsplash.com/photo-1665394055917-de22650a17b4?w=800',
      itemsCount: 28,
      icon: <Coffee className="w-6 h-6 text-white" />,
    },
    {
      id: 'ready-lunch',
      title: 'Обеды',
      subtitle: 'Готовая еда',
      description: 'Сбалансиров��нные обеды для продуктивного дня',
      image: 'https://images.unsplash.com/photo-1569420067112-b57b4f024595?w=800',
      itemsCount: 42,
      icon: <Utensils className="w-6 h-6 text-white" />,
    },
    {
      id: 'ready-dinner',
      title: 'Ужины',
      subtitle: 'Готовая еда',
      description: 'Лёгкие и полезные ужины для восстановления',
      image: 'https://images.unsplash.com/photo-1760462721301-5e02faf16e94?w=800',
      itemsCount: 38,
      icon: <Moon className="w-6 h-6 text-white" />,
    },
    {
      id: 'ready-snacks',
      title: 'Перекусы',
      subtitle: 'Готовая еда',
      description: 'Полезные перекусы между основными приёмами пищи',
      image: 'https://images.unsplash.com/photo-1642339800099-921df1a0a958?w=800',
      itemsCount: 22,
      icon: <Cookie className="w-6 h-6 text-white" />,
    },
  ];

  const filteredCategories = categories.filter(
    (category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-milk)]">
      <Header
        cartItemsCount={3}
        favoritesCount={5}
        isLoggedIn={true}
        userName="Анна"
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-secondary-50)]">
          <div className="container py-12 lg:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-[var(--color-neutral-900)] mb-4">
                Каталог
              </h1>
              <p className="text-lg text-[var(--color-neutral-700)] mb-8">
                Выберите категорию товаров или воспользуйтесь поиском
              </p>

              {/* Search */}
              <div className="max-w-2xl mx-auto">
                <Input
                  type="search"
                  placeholder="Поиск по категориям..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  icon={<Search className="w-5 h-5" />}
                  size="lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="container py-12 lg:py-16">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-[var(--color-neutral-100)] rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-[var(--color-neutral-400)]" />
              </div>
              <h3 className="text-2xl font-semibold text-[var(--color-neutral-900)] mb-3">
                Ничего не найдено
              </h3>
              <p className="text-[var(--color-neutral-600)]">
                Попробуйте изменить поисковый запрос
              </p>
            </div>
          ) : (
            <>
              {/* Наборы */}
              <div className="mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-neutral-900)] mb-6">
                  Наборы
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCategories
                    .filter((cat) => cat.subtitle === 'Наборы')
                    .map((category) => (
                      <CategoryTile
                        key={category.id}
                        {...category}
                        onClick={() => {
                          addToast('info', `Переход в раздел "${category.title}"`);
                        }}
                      />
                    ))}
                </div>
              </div>

              {/* Готовая еда */}
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-neutral-900)] mb-6">
                  Готовая еда
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredCategories
                    .filter((cat) => cat.subtitle === 'Готовая еда')
                    .map((category) => (
                      <CategoryTile
                        key={category.id}
                        {...category}
                        onClick={() => {
                          addToast('info', `Переход в раздел "${category.title}"`);
                        }}
                      />
                    ))}
                </div>
              </div>
            </>
          )}
        </section>
      </main>

      <Footer />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};
