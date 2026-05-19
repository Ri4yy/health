"use client";
import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { Breadcrumbs } from '../components/shared/breadcrumbs';
import { ProductGallery } from '../components/ecommerce/product-gallery';
import { Button } from '../components/core/button';
import { Chip } from '../components/core/chip';
import { ReviewCard } from '../components/cards/review-card';
import { ProductCard } from '../components/cards/product-card';
import { Tabs } from '../components/core/tabs';
import { ToastContainer } from '../components/shared/toast';
import { Star, Truck, Shield, Heart, Plus, Minus, Share2 } from 'lucide-react';
import { useStore } from '../store/useStore';

export const ProductPage: React.FC<any> = ({ initialProduct, initialRelated = [], initialUser }) => {
  const [mounted, setMounted] = useState(false);
  
  const badgeMap: Record<string, string> = {
    'hit': 'Хит',
    'new': 'Новинка',
    'eco': 'Эко',
    'organic': 'Органик',
    'low_cal': 'Низкокалорийно',
    'vegan': 'Веган',
    'set': 'Набор',
    'discount': 'Скидка'
  };

  // Сортируем варианты по дням
  const sortedVariants = [...(initialProduct.product_variants || [])].sort((a, b) => 
    (a.days_count || 0) - (b.days_count || 0)
  );

  // Находим вариант "1 день" для наборов
  const defaultVariantId = initialProduct.product_type === 'set' 
    ? (sortedVariants?.find((v: any) => v.days_count === 1 || String(v.label).includes('1'))?.id || sortedVariants?.[0]?.id || '')
    : (sortedVariants?.[0]?.id || '');

  const [selectedVariant, setSelectedVariant] = useState(defaultVariantId);
  const [quantity, setQuantity] = useState(1);
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success' | 'error' | 'info'; message: string }>>([]);

  const addToCart = useStore((state) => state.addToCart);
  const toggleFavorite = useStore((state) => state.toggleFavorite);
  const isFav = useStore((state) => state.favorites.includes(initialProduct.id));

  useEffect(() => {
    setMounted(true);
  }, []);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const selectedVariantData = sortedVariants?.find((v: any) => v.id === selectedVariant) || sortedVariants?.[0];
  const totalPrice = selectedVariantData ? selectedVariantData.price * quantity : 0;

  const handleAddToCart = () => {
    addToCart(initialProduct.id, quantity, selectedVariant);
    addToast('success', `${quantity} шт. добавлено в корзину`);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(initialProduct.id);
    addToast('info', (mounted && isFav) ? 'Удалено из избранного' : 'Добавлено в избранное');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-milk)]">
      <Header isLoggedIn={!!initialUser} userName={initialUser?.user_metadata?.full_name?.split(' ')[0]} />

      <main className="flex-1">
        <div className="container py-6 lg:py-8 pb-24 lg:pb-8">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Каталог', href: '/catalog' },
              { label: initialProduct.name },
            ]}
            className="mb-6"
          />

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
            <div>
              <ProductGallery images={initialProduct.images || ['https://images.unsplash.com/photo-1666819691716-827f78d892f3?w=1200']} />
            </div>

            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {initialProduct.badges?.map((badge: string, index: number) => (
                  <Chip 
                    key={index} 
                    label={badgeMap[badge.toLowerCase()] || badge} 
                    variant="primary" 
                    size="sm" 
                  />
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl lg:text-4xl font-bold text-[var(--color-neutral-900)] mb-4">
                {initialProduct.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 fill-[var(--color-accent-400)] text-[var(--color-accent-400)]" />
                  <span className="font-semibold text-[var(--color-neutral-900)]">
                    {initialProduct.rating || 0}
                  </span>
                </div>
                <span className="text-sm text-[var(--color-neutral-600)]">
                  {initialProduct.review_count || 0} отзывов
                </span>
              </div>

              {/* Description */}
              <p className="text-[var(--color-neutral-700)] mb-6 leading-relaxed">
                {initialProduct.description}
              </p>

              {/* Variant Selection */}
              {initialProduct.product_type === 'set' && sortedVariants && sortedVariants.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-[var(--color-neutral-900)] mb-3">
                    Выберите вариант:
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {sortedVariants.map((variant: any) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant.id)}
                        className={`relative p-4 rounded-[12px] border-2 transition-all text-left flex flex-col justify-between min-h-[90px] ${
                          selectedVariant === variant.id
                            ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                            : 'border-[var(--color-neutral-200)] hover:border-[var(--color-neutral-300)]'
                        }`}
                      >
                        <div className="text-sm font-semibold text-[var(--color-neutral-900)] mb-2">
                          {variant.label || `${variant.days_count || 1} дней`}
                        </div>
                        <div>
                          <div className="text-lg font-bold text-[var(--color-primary-600)]">
                            {variant.price} ₽
                          </div>
                          {variant.old_price && variant.old_price > variant.price && (
                            <div className="text-xs text-[var(--color-neutral-500)] line-through">
                              {variant.old_price} ₽
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-semibold text-[var(--color-neutral-900)]">
                  Количество:
                </span>
                <div className="flex items-center gap-2 bg-[var(--color-neutral-100)] rounded-[8px] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center rounded-[6px] bg-white hover:bg-[var(--color-neutral-200)] transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-base font-semibold text-[var(--color-neutral-900)] w-10 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center rounded-[6px] bg-white hover:bg-[var(--color-neutral-200)] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="bg-[var(--color-bg-light)] rounded-[12px] p-4 mb-6">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm text-[var(--color-neutral-600)]">Стоимость:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[var(--color-neutral-900)]">
                      {totalPrice} ₽
                    </span>
                  </div>
                </div>
                {quantity > 1 && (
                  <div className="text-xs text-[var(--color-neutral-600)] text-right">
                    {selectedVariantData?.price} ₽ × {quantity} шт.
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 mb-6">
                <Button variant="primary" size="lg" onClick={handleAddToCart} className="flex-1">
                  Добавить в корзину
                </Button>
                <button
                  onClick={handleToggleFavorite}
                  className="w-12 h-12 shrink-0 flex items-center justify-center rounded-[12px] border-2 border-[var(--color-neutral-200)] hover:border-[var(--color-primary-500)] transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      (mounted && isFav)
                        ? 'fill-[var(--color-accent-500)] text-[var(--color-accent-500)]'
                        : 'text-[var(--color-neutral-600)]'
                    }`}
                  />
                </button>
                <button onClick={() => {
                     navigator.clipboard.writeText(window.location.href);
                     addToast('info', 'Ссылка скопирована!');
                }} className="w-12 h-12 shrink-0 flex items-center justify-center rounded-[12px] border-2 border-[var(--color-neutral-200)] hover:border-[var(--color-neutral-300)] transition-colors">
                  <Share2 className="w-5 h-5 text-[var(--color-neutral-600)]" />
                </button>
              </div>

              {/* Delivery Info */}
              <div className="space-y-3 border-t border-[var(--color-neutral-200)] pt-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[var(--color-primary-100)] rounded-full flex items-center justify-center shrink-0">
                    <Truck className="w-5 h-5 text-[var(--color-primary-600)]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--color-neutral-900)] mb-1">
                      Бесплатная доставка
                    </h4>
                    <p className="text-sm text-[var(--color-neutral-600)]">
                      При заказе от 2000 ₽. Бережная доставка термосумкой.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Tabs
            tabs={[
              {
                id: 'nutrition',
                label: 'КБЖУ и состав',
                content: (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--color-neutral-900)] mb-4">
                        Пищевая ценность (на порцию)
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[var(--color-bg-light)] rounded-[12px] p-4">
                          <div className="text-sm text-[var(--color-neutral-600)] mb-1">Калории</div>
                          <div className="text-2xl font-bold text-[var(--color-neutral-900)]">
                            {initialProduct.calories || 0} ккал
                          </div>
                        </div>
                        <div className="bg-[var(--color-bg-light)] rounded-[12px] p-4">
                          <div className="text-sm text-[var(--color-neutral-600)] mb-1">Белки</div>
                          <div className="text-2xl font-bold text-[var(--color-neutral-900)]">
                            {initialProduct.protein || 0} г
                          </div>
                        </div>
                        <div className="bg-[var(--color-bg-light)] rounded-[12px] p-4">
                          <div className="text-sm text-[var(--color-neutral-600)] mb-1">Жиры</div>
                          <div className="text-2xl font-bold text-[var(--color-neutral-900)]">
                            {initialProduct.fats || 0} г
                          </div>
                        </div>
                        <div className="bg-[var(--color-bg-light)] rounded-[12px] p-4">
                          <div className="text-sm text-[var(--color-neutral-600)] mb-1">Углеводы</div>
                          <div className="text-2xl font-bold text-[var(--color-neutral-900)]">
                            {initialProduct.carbs || 0} г
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[var(--color-neutral-900)] mb-4">
                        Состав
                      </h3>
                      <p className="text-[var(--color-neutral-700)] mb-6 whitespace-pre-wrap">
                        {initialProduct.ingredients || 'Состав не указан'}
                      </p>

                      {initialProduct.allergens && initialProduct.allergens.length > 0 && (
                        <>
                          <h4 className="text-lg font-semibold text-[var(--color-neutral-900)] mb-3">
                            Аллергены
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {initialProduct.allergens.map((allergen: string, i: number) => (
                              <Chip key={i} label={allergen} variant="default" size="sm" />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ),
              },
              {
                id: 'reviews',
                label: `Отзывы (${initialProduct.reviews?.length || 0})`,
                content: (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold text-[var(--color-neutral-900)]">
                        Отзывы покупателей
                      </h3>
                    </div>
                    {initialProduct.reviews?.length === 0 ? (
                      <p className="text-[var(--color-neutral-500)]">Пока нет отзывов.</p>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-6">
                        {initialProduct.reviews?.map((review: any) => (
                          <ReviewCard 
                            key={review.id} 
                            author={review.author_name} 
                            text={review.content} 
                            rating={review.rating} 
                            date={new Date(review.created_at).toLocaleDateString('ru-RU')} 
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ),
              },
            ]}
            className="mb-12"
          />

          {initialRelated.length > 0 && (
            <section>
              <h2 className="text-2xl lg:text-3xl font-bold text-[var(--color-neutral-900)] mb-6">
                Похожие блюда
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {initialRelated.map((relatedProd: any) => (
                  <ProductCard
                    key={relatedProd.id}
                    {...relatedProd}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Sticky Add to Cart - Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-neutral-200)] p-4 shadow-[var(--shadow-lg)] z-40">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-[var(--color-neutral-600)] mb-1">Стоимость</div>
            <div className="text-xl font-bold text-[var(--color-neutral-900)]">{totalPrice} ₽</div>
          </div>
          <Button variant="primary" size="lg" onClick={handleAddToCart} className="flex-1">
            В корзину
          </Button>
        </div>
      </div>

      <Footer />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};