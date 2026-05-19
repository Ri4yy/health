"use client";
import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { Breadcrumbs } from '../components/shared/breadcrumbs';
import { ProductCard } from '../components/cards/product-card';
import { Button } from '../components/core/button';
import { ToastContainer } from '../components/shared/toast';
import { Heart, ShoppingCart, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { createClient } from '../lib/supabase/client';
import Link from 'next/link';

export const FavoritesPage: React.FC = () => {
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success' | 'error' | 'info'; message: string }>>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  const favoriteIds = useStore(state => state.favorites);
  const toggleFavorite = useStore(state => state.toggleFavorite);
  const addToCart = useStore(state => state.addToCart);
  
  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchFavoriteProducts = async () => {
      if (favoriteIds.length === 0) {
        setProducts([]);
        setIsLoading(false);
        return;
      }

      // Show loader only on initial load, not when removing items
      if (products.length === 0) {
        setIsLoading(true);
      }

      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('products')
        .select('*, product_variants(*)')
        .in('id', favoriteIds);

      if (error) {
        addToast('error', 'Ошибка при загрузке избранных товаров');
        console.error(error);
      } else {
        const formatted = data?.map((p: any) => {
          let defaultVariant = p.product_variants?.[0];
          if (p.product_type === 'set' && p.product_variants) {
            defaultVariant = p.product_variants.find((v: any) => v.days_count === 1 || String(v.label).includes('1')) || p.product_variants[0];
          }
          return {
            id: p.id,
            slug_id: p.slug_id,
            product_type: p.product_type || 'single',
            variants: p.product_variants || [],
            image: p.images?.[0] || '',
            name: p.name,
            description: p.description,
            calories: p.calories,
            protein: p.protein,
            fats: p.fats,
            carbs: p.carbs,
            badges: p.badges?.map((b: string) => ({ 
              type: b, 
              label: b === 'hit' ? 'Хит' : b === 'vegan' ? 'Веган' : b === 'no-sugar' ? 'Без сахара' : b === 'keto' ? 'Кето' : b === 'gluten-free' ? 'Без глютена' : 'Скидка' 
            })) || [],
            rating: p.rating,
            reviewCount: p.review_count,
            price: defaultVariant?.price || 0,
            oldPrice: defaultVariant?.old_price,
          };
        });
        setProducts(formatted || []);
      }
      setIsLoading(false);
    };

    fetchFavoriteProducts();
  }, [favoriteIds, mounted]); // Notice we still listen to favoriteIds for cross-tab sync

  const handleRemoveFromFavorites = (productId: string) => {
    // Внимание: Здесь мы больше НЕ ВОЗЫВАЕМ toggleFavorite, 
    // потому что ProductCard уже это делает при клике на сердечко!
    const product = products.find(p => p.id === productId);
    
    // Мгновенное удаление из локального списка для плавности UI
    setProducts(prev => prev.filter(p => p.id !== productId));
    addToast('info', `Товар «${product?.name || ''}» удалён из избранного`);
  };

  const handleAddAllToCart = () => {
    if (products.length > 0) {
      products.forEach(p => addToCart(p.id, 1));
      addToast('success', `Все товары (${products.length}) добавлены в корзину`);
    }
  };

  const handleClearFavorites = async () => {
    const supabase = createClient();
    const idsToClear = [...favoriteIds];
    for (const id of idsToClear) {
      await toggleFavorite(id, supabase);
    }
    setProducts([]);
    addToast('info', 'Список избранного очищен');
  };

  if (!mounted) return null;

  // Empty state
  if (!isLoading && products.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--color-bg-milk)]">
        <Header />

        <main className="flex-1">
          <div className="container py-6 lg:py-8">
            <Breadcrumbs
              items={[
                { label: 'Главная', href: '/' },
                { label: 'Избранное' },
              ]}
              className="mb-6"
            />

            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="mb-2">Избранное</h1>
                <p className="text-[var(--color-neutral-600)]">
                  Сохраняйте понравившиеся блюда и наборы
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center py-16 lg:py-24 bg-white rounded-[24px] border border-[var(--color-neutral-200)]">
              <div className="w-24 h-24 rounded-full bg-[var(--color-primary-50)] flex items-center justify-center mb-6">
                <Heart className="w-12 h-12 text-[var(--color-primary-500)]" />
              </div>
              <h2 className="mb-3 text-center text-2xl font-bold">
                В избранном пока ничего нет
              </h2>
              <p className="text-[var(--color-neutral-600)] text-center max-w-md mb-8">
                Добавляйте товары в избранное, нажимая на иконку ♥ в карточке товара. Так вы всегда сможете быстро найти понравившиеся блюда.
              </p>
              <Link href="/catalog">
                <Button variant="primary" size="lg">
                  Перейти в каталог
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </main>

        <Footer />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-milk)]">
      <Header />

      <main className="flex-1">
        <div className="container py-6 lg:py-8">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Избранное' },
            ]}
            className="mb-6"
          />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="mb-2">Избранное</h1>
              <p className="text-[var(--color-neutral-600)]">
                {products.length} {products.length === 1 ? 'товар' : products.length < 5 ? 'товара' : 'товаров'}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="ghost"
                onClick={handleClearFavorites}
                className="text-[var(--color-error)] hover:bg-[var(--color-error-light)]"
              >
                Очистить список
              </Button>
              <Button
                variant="primary"
                onClick={handleAddAllToCart}
              >
                <ShoppingCart className="w-4 h-4" />
                Добавить всё в корзину
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[var(--color-primary-50)] to-[var(--color-secondary-50)] rounded-[16px] p-6 md:p-8 mb-8 border border-[var(--color-primary-100)] shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <Sparkles className="w-6 h-6 text-[var(--color-primary-600)]" />
              </div>
              <div className="flex-1">
                <h3 className="mb-2 text-lg font-bold text-[var(--color-neutral-900)]">
                  Составьте свой идеальный набор
                </h3>
                <p className="text-sm text-[var(--color-neutral-700)] mb-4 leading-relaxed">
                  Добавьте избранные блюда в корзину и получите скидку 10% при заказе от 5 позиций. Здоровое питание еще никогда не было таким выгодным!
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-[var(--color-neutral-700)] border border-white/50">
                    ✓ Бесплатная доставка от 2000 ₽
                  </div>
                  <div className="px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-[var(--color-neutral-700)] border border-white/50">
                    ✓ Кешбэк 5% бонусами
                  </div>
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-10 h-10 animate-spin text-[var(--color-primary-500)]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  isFavorite={true}
                  onFavoriteToggle={() => handleRemoveFromFavorites(product.id)}
                />
              ))}
            </div>
          )}

          <div className="mt-12 bg-white rounded-[16px] p-6 md:p-8 border border-[var(--color-neutral-200)] text-center shadow-sm">
            <h3 className="mb-3 text-xl font-bold">Не нашли нужное блюдо?</h3>
            <p className="text-[var(--color-neutral-600)] mb-6 max-w-2xl mx-auto">
              Просмотрите наш полный каталог здоровых блюд и наборов. У нас более 10 вариантов на любой вкус и диету.
            </p>
            <Link href="/catalog">
              <Button
                variant="primary"
                size="lg"
              >
                Открыть каталог
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};
