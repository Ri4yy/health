"use client";
import React, { useState, useEffect } from 'react';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { CartItem } from '../components/ecommerce/cart-item';
import { Input } from '../components/core/input';
import { Button } from '../components/core/button';
import { ToastContainer } from '../components/shared/toast';
import { ShoppingBag, Tag, ArrowRight } from 'lucide-react';
import { createClient } from '../lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useStore } from '../store/useStore';

export const CartPage: React.FC<any> = ({ initialUser, initialAddresses }) => {
  const supabase = createClient();
  const router = useRouter();

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; type: string; value: number } | null>(null);
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success' | 'error' | 'info'; message: string }>>([]);

  const cartStore = useStore(state => state.cart);
  const updateQuantityStore = useStore(state => state.updateQuantity);
  const removeFromCartStore = useStore(state => state.removeFromCart);
  const clearCartStore = useStore(state => state.clearCart);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // 1. Полноценная корзина с загрузкой из Zustand и Supabase
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const storedCart = useStore.getState().cart;
        if (storedCart.length === 0) {
          setCartItems([]);
          setIsLoading(false);
          return;
        }

        const ids = storedCart.map((c: any) => c.id);
        const { data: products } = await supabase
          .from('products')
          .select('*, product_variants(*)')
          .in('id', ids);

        if (products) {
          const fullItems = storedCart.map((cartItem: any) => {
            const product = products.find((p) => p.id === cartItem.id);
            if (!product) return null;
            const variant = cartItem.variant_id ? product.product_variants?.find((v: any) => v.id === cartItem.variant_id) : product.product_variants?.[0]; 
            return {
              id: product.id,
              variant_id: cartItem.variant_id, // Важно транслировать точный id из стейта
              product_type: product.product_type || 'single',
              variant_label: variant?.label || (variant?.days_count ? `${variant.days_count} дней` : ''),
              name: product.name,
              description: product.description,
              image: product.images?.[0] || '',
              price: variant?.price || 0,
              quantity: cartItem.quantity,
            };
          }).filter(Boolean);

          setCartItems(fullItems);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    setCartItems(prev => prev.map(item => {
      const storeItem = cartStore.find(c => c.id === item.id && c.variant_id === item.variant_id);
      return storeItem ? { ...item, quantity: storeItem.quantity } : item;
    }).filter(item => cartStore.some(c => c.id === item.id && c.variant_id === item.variant_id)));
  }, [cartStore]);

  const handleQuantityChange = (id: string, quantity: number, variant_id?: string) => {
    if (quantity < 1) return;
    updateQuantityStore(id, quantity, variant_id);
  };

  const handleRemoveItem = (id: string, variant_id?: string) => {
    removeFromCartStore(id, variant_id);
    addToast('info', 'Товар удалён из корзины');
  };

  // 3. Логика промокодов через Supabase
  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      addToast('error', 'Введите промокод');
      return;
    }

    const { data, error } = await supabase
      .from('promocodes')
      .select('*')
      .eq('code', promoCode.toUpperCase())
      .single();

    if (error || !data || !data.is_active) {
      addToast('error', 'Неверный или неактивный промокод');
      return;
    }

    setAppliedPromo({ code: data.code, type: data.type, value: data.value });
    addToast('success', `Промокод применён! Скидка ${data.value}${data.type === 'percent' ? '%' : ' ₽'}`);
    setPromoCode('');
  };

  // Переход к оформлению
  const handleProceedToCheckout = () => {
    // Save promo if needed, or we can just let Checkout handle it.
    // For now we just push.
    router.push('/checkout');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedPromo 
    ? (appliedPromo.type === 'percent' ? Math.round((subtotal * appliedPromo.value) / 100) : appliedPromo.value) 
    : 0;
  const deliveryFee = subtotal >= 2000 ? 0 : 200;
  const total = Math.max(0, subtotal - discount + deliveryFee);
  const isEmpty = cartItems.length === 0;

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-milk)]">
      {/* Счетчик в Header берет сам Zustand, поэтому заглушаем пропсы */}
      <Header isLoggedIn={!!initialUser} />

      <main className="flex-1">
        <div className="container py-8 lg:py-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-[var(--color-neutral-900)] mb-8">
            Корзина {isLoading && ' (Загрузка...)'}
          </h1>

          {!isLoading && isEmpty ? (
            <div className="bg-white rounded-[16px] p-12 lg:p-16 text-center">
              <div className="w-24 h-24 bg-[var(--color-neutral-100)] rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-12 h-12 text-[var(--color-neutral-400)]" />
              </div>
              <h2 className="text-2xl font-semibold text-[var(--color-neutral-900)] mb-3">Корзина пуста</h2>
              <p className="text-[var(--color-neutral-600)] mb-8 max-w-md mx-auto">Добавьте товары в корзину, чтобы оформить заказ</p>
              <Button variant="primary" size="lg" onClick={() => router.push('/catalog')}>Перейти в каталог</Button>
            </div>
          ) : !isLoading && (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, idx) => (
                  <CartItem
                    key={`${item.id}-${item.variant_id || idx}`}
                    {...item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                  />
                ))}
              </div>

              <div className="lg:col-span-1 border border-[var(--color-neutral-200)] bg-white rounded-[16px] p-6 lg:p-8 flex flex-col gap-6">
                {/* Promo Code */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Промокод</h3>
                  {appliedPromo ? (
                    <div className="flex items-center gap-2 px-4 py-3 bg-[var(--color-success-50)] border border-[var(--color-success-200)] rounded-[8px]">
                      <Tag className="w-4 h-4 text-[var(--color-success-600)]" />
                      <span className="flex-1 text-sm font-medium text-[var(--color-success-700)]">{appliedPromo.code}</span>
                      <button onClick={() => setAppliedPromo(null)} className="text-xs text-[var(--color-success-600)] font-medium">Удалить</button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input placeholder="Введите код" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                      <Button variant="ghost" onClick={handleApplyPromo}>Применить</Button>
                    </div>
                  )}
                </div>



                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-[var(--color-neutral-600)]">Товары</span><span className="font-semibold">{subtotal} ₽</span></div>
                  {discount > 0 && <div className="flex justify-between text-[var(--color-success-600)]"><span>Скидка ({appliedPromo?.code})</span><span>-{discount} ₽</span></div>}
                  <div className="flex justify-between"><span className="text-[var(--color-neutral-600)]">Доставка</span><span className="font-semibold">{deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₽`}</span></div>
                </div>

                <div className="flex justify-between mt-auto pt-6 border-t border-[var(--color-neutral-200)]">
                  <span className="text-lg font-bold">Итого</span>
                  <span className="text-2xl font-bold">{total} ₽</span>
                </div>

                <Button variant="primary" size="lg" className="w-full" onClick={handleProceedToCheckout}>
                  Перейти к оформлению
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};
