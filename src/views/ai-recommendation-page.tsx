"use client";
import React, { useState } from 'react';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { Input, Select, Textarea } from '../components/core/input';
import { Checkbox } from '../components/core/checkbox';
import { Button } from '../components/core/button';
import { RecommendationCard } from '../components/cards/recommendation-card';
import { ToastContainer } from '../components/shared/toast';
import { ListingSkeleton } from '../components/core/skeleton';
import { Sparkles, AlertCircle, ShoppingCart, Save, RefreshCw } from 'lucide-react';
import { createClient } from '../lib/supabase/client';

type FormStep = 'form' | 'loading' | 'needsClarification' | 'results' | 'error';

export const AiRecommendationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<FormStep>('form');
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success' | 'error' | 'info'; message: string }>>([]);
  
  const [formData, setFormData] = useState({
    goal: '',
    allergens: [] as string[],
    diets: [] as string[],
    dislikedProducts: '',
    budget: '',
  });

  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [cartItems, setCartItems] = useState<string[]>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const allergensList = [
    'Орехи',
    'Глютен',
    'Лактоза',
    'Яйца',
    'Рыба',
    'Морепродукты',
    'Соя',
    'Мёд',
  ];

  const dietsList = [
    { id: 'vegan', label: 'Веганское' },
    { id: 'keto', label: 'Кето' },
    { id: 'gluten-free', label: 'Без глютена' },
    { id: 'no-sugar', label: 'Без сахара' },
    { id: 'lactose-free', label: 'Без лактозы' },
  ];

  const handleAllergenToggle = (allergen: string) => {
    setFormData((prev) => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter((a) => a !== allergen)
        : [...prev.allergens, allergen],
    }));
  };

  const handleDietToggle = (diet: string) => {
    setFormData((prev) => ({
      ...prev,
      diets: prev.diets.includes(diet)
        ? prev.diets.filter((d) => d !== diet)
        : [...prev.diets, diet],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.goal) {
      addToast('error', 'Выберите цель питания');
      return;
    }

    setCurrentStep('loading');

    try {
      const supabase = createClient();
      let query = supabase.from('products').select('*, product_variants(*)');
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      let filtered = data || [];
      
      if (formData.allergens.length > 0) {
        filtered = filtered.filter(p => {
          if (!p.allergens || !Array.isArray(p.allergens)) return true;
          const hasAllergen = formData.allergens.some(a => p.allergens.includes(a));
          return !hasAllergen;
        });
      }
      
      if (formData.diets.length > 0) {
        filtered = filtered.filter(p => {
          if (!p.diet_types || !Array.isArray(p.diet_types)) return false; 
          return formData.diets.some(d => p.diet_types.includes(d));
        });
      }

      if (formData.budget) {
        filtered = filtered.filter(p => {
          let price = p.product_variants?.[0]?.price || 0;
          if (p.product_type === 'set' && p.product_variants) {
             const v = p.product_variants.find((v: any) => v.days_count === 1 || String(v.label).includes('1'));
             if (v) price = v.price;
          }
          if (formData.budget === 'economy') return price < 800;
          if (formData.budget === 'standard') return price >= 800 && price <= 1200;
          if (formData.budget === 'premium') return price > 1200;
          return true;
        });
      }

      const formatted = filtered.slice(0, 4).map(p => {
        let defaultVariant = p.product_variants?.[0];
        if (p.product_type === 'set' && p.product_variants) {
          defaultVariant = p.product_variants.find((v: any) => v.days_count === 1 || String(v.label).includes('1')) || p.product_variants[0];
        }
        
        const whyFits = [
          'Подходит под выбранную цель',
          formData.allergens.length > 0 ? 'Без указанных аллергенов' : null,
          formData.diets.length > 0 ? 'Соответствует выбранной диете' : null
        ].filter(Boolean) as string[];

        return {
          id: p.id,
          name: p.name,
          image: p.images?.[0] || 'https://images.unsplash.com/photo-1666819691716-827f78d892f3?w=800',
          description: p.description || 'Идеально подходит для вашего запроса',
          price: defaultVariant?.price || 0,
          oldPrice: defaultVariant?.old_price,
          calories: p.calories || 0,
          protein: p.protein || 0,
          badges: p.badges?.map((b: string) => ({ type: b, label: b === 'hit' ? 'Хит' : 'Скидка' })) || [],
          whyFits: whyFits.length > 0 ? whyFits : ['Отличный выбор для вашего рациона']
        };
      });

      if (formatted.length === 0) {
         setCurrentStep('needsClarification');
      } else {
         setRecommendations(formatted);
         setCurrentStep('results');
      }

    } catch (e) {
      console.error(e);
      setCurrentStep('error');
    }
  };

  const handleAddToCart = (id: string) => {
    if (cartItems.includes(id)) {
      setCartItems((prev) => prev.filter((item) => item !== id));
      addToast('info', 'Товар удалён из корзины');
    } else {
      setCartItems((prev) => [...prev, id]);
      addToast('success', 'Товар добавлен в корзину');
    }
  };

  const handleAddAllToCart = () => {
    const allIds = recommendations.map((r) => r.id);
    setCartItems(allIds);
    addToast('success', `Все ${recommendations.length} товаров добавлены в корзину`);
  };

  const handleReplaceItems = () => {
    addToast('info', 'Генерация новых рекомендаций...');
    setCurrentStep('loading');
    setTimeout(() => {
      handleSubmit(new Event('submit') as any);
    }, 500);
  };

  const handleSaveSelection = () => {
    addToast('success', 'Подборка сохранена в избранное');
  };



  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-milk)]">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-br from-[var(--color-primary-50)] via-[var(--color-secondary-50)] to-[var(--color-primary-100)]">
          <div className="container py-12 lg:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6">
                <Sparkles className="w-5 h-5 text-[var(--color-primary-600)]" />
                <span className="text-sm font-semibold text-[var(--color-primary-700)]">
                  Подбор
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-[var(--color-neutral-900)] mb-4">
                Подберём идеальный рацион
              </h1>
              <p className="text-lg text-[var(--color-neutral-700)]">
                Ответьте на несколько вопросов, и наша система подберёт оптимальный набор блюд
                специально для вас
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="container py-12 lg:py-16">
          {currentStep === 'form' && (
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Goal */}
                <div className="bg-white rounded-[16px] p-6 lg:p-8 border border-[var(--color-neutral-200)]">
                  <h2 className="text-xl font-semibold text-[var(--color-neutral-900)] mb-6">
                    Цель питания
                  </h2>
                  <Select
                    label="Что вы хотите достичь?"
                    value={formData.goal}
                    onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                    options={[
                      { value: '', label: 'Выберите цель' },
                      { value: 'weight-loss', label: 'Снижение веса' },
                      { value: 'muscle-gain', label: 'Набор мышечной массы' },
                      { value: 'balance', label: 'Сбалансированное питание' },
                      { value: 'detox', label: 'Детокс и очищение' },
                      { value: 'energy', label: 'Повышение энергии' },
                    ]}
                    required
                  />
                </div>

                {/* Allergens & Diets */}
                <div className="bg-white rounded-[16px] p-6 lg:p-8 border border-[var(--color-neutral-200)]">
                  <h2 className="text-xl font-semibold text-[var(--color-neutral-900)] mb-6">
                    Ограничения и предпочтения
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-3">
                        Аллергены (исключить)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {allergensList.map((allergen) => (
                          <Checkbox
                            key={allergen}
                            label={allergen}
                            checked={formData.allergens.includes(allergen)}
                            onChange={() => handleAllergenToggle(allergen)}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--color-neutral-700)] mb-3">
                        Тип диеты
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {dietsList.map((diet) => (
                          <Checkbox
                            key={diet.id}
                            label={diet.label}
                            checked={formData.diets.includes(diet.id)}
                            onChange={() => handleDietToggle(diet.id)}
                          />
                        ))}
                      </div>
                    </div>

                    <Input
                      label="Нелюбимые продукты"
                      placeholder="Например: грибы, баклажаны, оливки"
                      value={formData.dislikedProducts}
                      onChange={(e) =>
                        setFormData({ ...formData, dislikedProducts: e.target.value })
                      }
                    />
                  </div>
                </div>

                {/* Budget & Params */}
                <div className="bg-white rounded-[16px] p-6 lg:p-8 border border-[var(--color-neutral-200)]">
                  <h2 className="text-xl font-semibold text-[var(--color-neutral-900)] mb-6">
                    Параметры набора
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Select
                      label="Бюджет на день"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      options={[
                        { value: '', label: 'Любой' },
                        { value: 'economy', label: 'До 800 ₽' },
                        { value: 'standard', label: '800-1200 ₽' },
                        { value: 'premium', label: 'От 1200 ₽' },
                      ]}
                    />
                  </div>
                </div>

                {/* Submit */}
                <div className="flex justify-center">
                  <Button type="submit" variant="primary" size="lg" className="min-w-[240px]">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Подобрать рацион
                  </Button>
                </div>
              </form>
            </div>
          )}

          {currentStep === 'loading' && (
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--color-primary-100)] rounded-full mb-4 animate-pulse">
                  <Sparkles className="w-8 h-8 text-[var(--color-primary-600)]" />
                </div>
                <h2 className="text-2xl font-bold text-[var(--color-neutral-900)] mb-2">
                  Анализируем ваши данные...
                </h2>
                <p className="text-[var(--color-neutral-600)]">
                  Система подбирает оптимальные наборы...
                </p>
              </div>

              <ListingSkeleton count={4} />
            </div>
          )}

          {currentStep === 'needsClarification' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-[16px] p-8 border border-[var(--color-neutral-200)] text-center">
                <div className="w-16 h-16 bg-[var(--color-warning-100)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-[var(--color-warning-600)]" />
                </div>
                <h2 className="text-2xl font-bold text-[var(--color-neutral-900)] mb-4">
                  Нужно уточнение
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-6">
                  Не удалось подобрать рацион с учётом всех ограничений. Можете ли вы убрать
                  некоторые из аллергенов или изменить бюджет?
                </p>
                <div className="flex gap-3 justify-center">
                  <Button variant="primary" onClick={() => setCurrentStep('form')}>
                    Изменить параметры
                  </Button>
                  <Button variant="ghost" onClick={() => setCurrentStep('form')}>
                    Начать заново
                  </Button>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'error' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-[16px] p-8 border border-[var(--color-error-200)] text-center">
                <div className="w-16 h-16 bg-[var(--color-error-100)] rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-[var(--color-error-600)]" />
                </div>
                <h2 className="text-2xl font-bold text-[var(--color-neutral-900)] mb-4">
                  Произошла ошибка
                </h2>
                <p className="text-[var(--color-neutral-700)] mb-6">
                  Не удалось загрузить рекомендации. Пожалуйста, попробуйте ещё раз.
                </p>
                <Button variant="primary" onClick={() => setCurrentStep('form')}>
                  Попробовать снова
                </Button>
              </div>
            </div>
          )}

          {currentStep === 'results' && (
            <div className="max-w-6xl mx-auto">
              {/* Results Header */}
              <div className="bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-primary-600)] rounded-[24px] p-8 lg:p-12 text-white mb-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2 !text-white">Ваш персональный рацион готов!</h2>
                    <p className="text-lg !text-white">
                      Мы подобрали {recommendations.length} блюда, идеально подходящих под ваши
                      цели и предпочтения
                    </p>
                  </div>
                </div>
              </div>

              {/* Recommendations Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {recommendations.map((rec) => (
                  <RecommendationCard
                    key={rec.id}
                    {...rec}
                    onAddToCart={handleAddToCart}
                    isInCart={cartItems.includes(rec.id)}
                  />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};
