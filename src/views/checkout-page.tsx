"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../lib/supabase/client';
import { useStore } from '../store/useStore';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { Button } from '../components/core/button';
import { Input, Textarea, Select } from '../components/core/input';
import { RadioGroup } from '../components/core/radio';
import { Checkbox } from '../components/core/checkbox';
import { Breadcrumbs } from '../components/shared/breadcrumbs';
import { ToastContainer } from '../components/shared/toast';
import { 
  ShoppingBag, 
  MapPin, 
  Calendar, 
  CreditCard, 
  Tag,
  Gift,
  Truck,
  Store,
  Check,
  AlertCircle
} from 'lucide-react';
import { formatPhoneNumber } from '../lib/utils/formatters';

export const CheckoutPage: React.FC<any> = ({ initialUser, initialProfile, initialAddresses }) => {
  const router = useRouter();
  const supabase = createClient();
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success' | 'error' | 'info'; message: string }>>([]);
  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
  };
  const removeToast = (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const [isLoading, setIsLoading] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [useBonuses, setUseBonuses] = useState(false);
  
  const defAddressMatch = initialAddresses?.find((a:any) => a.is_default) || initialAddresses?.[0];
  const defaultAddressStr = defAddressMatch ? `г. ${defAddressMatch.city || ''}, ул. ${defAddressMatch.street || ''}, д. ${defAddressMatch.house || ''}` : '';

  const [formData, setFormData] = useState({
    name: initialProfile?.full_name || '',
    phone: initialProfile?.phone || '',
    email: initialUser?.email || '',
    address: defaultAddressStr,
    apartment: defAddressMatch?.apartment || '',
    entrance: '',
    floor: '',
    intercom: '',
    deliveryDate: '',
    deliveryTime: '',
    comment: '',
    pickupPoint: '',
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, phone: formatPhoneNumber(e.target.value) }));
  };

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auth block for unauthenticated users
  const [authFormData, setAuthFormData] = useState({ name: '', email: '', password: '' });
  const [authLoading, setAuthLoading] = useState(false);
  const [authErrors, setAuthErrors] = useState<Record<string, string>>({});

  const [cartItems, setCartItems] = useState<any[]>([]);
  const clearCartStore = useStore(state => state.clearCart);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const storedCart = useStore.getState().cart;
        if (storedCart.length === 0) {
          setCartItems([]);
          return;
        }
        const ids = storedCart.map((c: any) => c.id);
        const { data: products } = await supabase.from('products').select('*, product_variants(*)').in('id', ids);
        if (products) {
          const fullItems = storedCart.map((cartItem: any) => {
            const product = products.find((p) => p.id === cartItem.id);
            if (!product) return null;
            const variant = cartItem.variant_id ? product.product_variants.find((v: any) => v.id === cartItem.variant_id) : product.product_variants?.[0]; 
            return {
              id: product.id,
              variant_id: cartItem.variant_id,
              product_type: product.product_type || 'single',
              variant_label: variant?.label || (variant?.days_count ? `${variant.days_count} дней` : ''),
              name: product.name,
              price: variant?.price || 0,
              quantity: cartItem.quantity,
              image: product.images?.[0] || '',
            };
          }).filter(Boolean);
          setCartItems(fullItems);
        }
      } catch (err) {}
    };
    fetchCart();
  }, [supabase]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoApplied ? 390 : 0;
  const availableBonuses = initialProfile?.bonus_balance || 0;
  const maxBonusDiscount = Math.floor(subtotal * 0.3);
  const bonusDiscount = useBonuses ? Math.min(availableBonuses, maxBonusDiscount) : 0;
  
  const deliveryFee = deliveryMethod === 'delivery' ? (subtotal >= 2000 ? 0 : 250) : 0;
  const total = Math.max(0, subtotal - discount - bonusDiscount + deliveryFee);

  const handlePromoApply = () => {
    if (promoCode.toLowerCase() === 'здоровье') {
      setPromoApplied(true);
      setErrors({ ...errors, promo: '' });
    } else {
      setErrors({ ...errors, promo: 'Неверный промокод' });
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!authFormData.name) newErrors.name = 'Введите ваше имя';
    if (!authFormData.email) newErrors.email = 'Введите email';
    if (!authFormData.password) newErrors.password = 'Введите пароль';
    setAuthErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setAuthLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: authFormData.email, 
        password: authFormData.password,
        options: { data: { full_name: authFormData.name } }
      });
      if (error) {
        addToast('error', error.message);
      } else if (data.session === null) {
        addToast('success', 'Проверьте почту для активации!');
      } else {
        addToast('success', 'Регистрация успешна! Завершите оформление.');
        window.location.reload(); 
      }
      setAuthLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Введите имя';
    if (!formData.phone) newErrors.phone = 'Введите телефон';
    if (!formData.email) newErrors.email = 'Введите email';
    
    if (deliveryMethod === 'delivery') {
      if (!formData.address) newErrors.address = 'Введите адрес';
      if (!formData.deliveryDate) newErrors.deliveryDate = 'Выберите дату';
      if (!formData.deliveryTime) newErrors.deliveryTime = 'Выберите время';
    } else {
      if (!formData.pickupPoint) newErrors.pickupPoint = 'Выберите пункт выдачи';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      if (!initialUser) {
        addToast('error', 'Пожалуйста, зарегистрируйтесь для оформления заказа');
        return;
      }
      if (cartItems.length === 0) {
        addToast('error', 'Корзина пуста');
        return;
      }

      setIsLoading(true);
      try {
        const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
        
        const addressBase = deliveryMethod === 'pickup' 
          ? `Пункт выдачи: ${formData.pickupPoint}` 
          : `${formData.address}${formData.apartment ? `, кв. ${formData.apartment}` : ''}${formData.entrance ? `, под. ${formData.entrance}` : ''}${formData.floor ? `, эт. ${formData.floor}` : ''}${formData.intercom ? `, домофон ${formData.intercom}` : ''}`;
        
        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: initialUser.id,
            order_number: orderNumber,
            status: 'new',
            delivery_address: addressBase,
            delivery_date: deliveryMethod === 'delivery' ? formData.deliveryDate : null,
            delivery_time: deliveryMethod === 'delivery' ? formData.deliveryTime : null,
            delivery_method: deliveryMethod,
            payment_method: paymentMethod,
            comment: formData.comment || null,
            total_price: total,
            discount_amount: discount + bonusDiscount,
            promocode: promoApplied ? promoCode : null,
            contact_name: formData.name,
            contact_phone: formData.phone
          })
          .select()
          .single();

        if (orderError || !order) throw orderError;

        const orderItems = cartItems.map(item => ({
          order_id: order.id,
          variant_id: item.variant_id, 
          price_at_purchase: item.price,
          quantity: item.quantity
        }));

        const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
        if (itemsError) throw itemsError;

        // Обновляем баланс бонусов в профиле, если они были использованы
        if (bonusDiscount > 0) {
          const { error: profileError } = await supabase
            .from('profiles')
            .update({ bonus_balance: availableBonuses - bonusDiscount })
            .eq('id', initialUser.id);
          
          if (profileError) console.error('Error updating bonus balance:', profileError);

          // Добавляем запись в историю
          await supabase.from('bonus_history').insert({
            user_id: initialUser.id,
            amount: -bonusDiscount,
            type: 'spend',
            description: `Оплата заказа №${orderNumber}`
          });
        }

        clearCartStore();
        addToast('success', `Заказ ${orderNumber} успешно оформлен!`);
        setTimeout(() => {
          router.push(`/order-success/${orderNumber}`);
        }, 1500);

      } catch (err: any) {
        addToast('error', err.message || 'Ошибка оформления');
        setIsLoading(false);
      }
    }
  };

  if (!initialUser) {
    return (
      <div className="min-h-screen flex flex-col bg-[var(--color-bg-milk)]">
        <Header />
        <main className="flex-grow py-8 md:py-12 flex items-center justify-center">
          <div className="bg-white p-8 rounded-[16px] border border-[var(--color-neutral-200)] max-w-md w-full">
            <h2 className="text-2xl font-bold text-center mb-6">Оформление заказа</h2>
            <p className="text-sm text-center text-[var(--color-neutral-600)] mb-6">Создайте аккаунт для завершения покупки. Ваша корзина сохранена.</p>
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <Input
                label="Имя"
                value={authFormData.name}
                onChange={(e) => setAuthFormData({ ...authFormData, name: e.target.value })}
                error={authErrors.name}
                disabled={authLoading}
              />
              <Input
                label="Email"
                type="email"
                value={authFormData.email}
                onChange={(e) => setAuthFormData({ ...authFormData, email: e.target.value })}
                error={authErrors.email}
                disabled={authLoading}
              />
              <Input
                label="Пароль"
                type="password"
                value={authFormData.password}
                onChange={(e) => setAuthFormData({ ...authFormData, password: e.target.value })}
                error={authErrors.password}
                disabled={authLoading}
              />
              <Button type="submit" variant="primary" className="w-full" isLoading={authLoading}>
                Зарегистрироваться
              </Button>
            </form>
            <div className="mt-6 text-center">
              <button 
                onClick={() => router.push('/auth')}
                className="text-sm text-[var(--color-primary-600)] hover:underline"
              >
                Уже есть аккаунт? Войти
              </button>
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
      
      <main className="flex-grow py-8 md:py-12">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '#' },
              { label: 'Корзина', href: '#' },
              { label: 'Оформление заказа', href: '#' },
            ]}
            className="mb-6"
          />

          <h1 className="mb-8 md:mb-12">Оформление заказа</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Contact Information */}
                <section className="bg-white rounded-[16px] border border-[var(--color-neutral-200)] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                      <span className="text-lg font-semibold text-[var(--color-primary-600)]">1</span>
                    </div>
                    <h3>Контактные данные</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Имя"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      error={errors.name}
                      disabled={isLoading}
                    />
                    <Input
                      label="Телефон"
                      type="tel"
                      placeholder="+7 9__ ___-__-__"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      error={errors.phone}
                      disabled={isLoading}
                    />
                    <div className="md:col-span-2">
                      <Input
                        label="Email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        error={errors.email}
                        helperText="Для отправки подтверждения заказа"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </section>

                {/* Delivery Method */}
                <section className="bg-white rounded-[16px] border border-[var(--color-neutral-200)] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                      <span className="text-lg font-semibold text-[var(--color-primary-600)]">2</span>
                    </div>
                    <h3>Способ получения</h3>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('delivery')}
                      disabled={isLoading}
                      className={`p-4 rounded-[12px] border-2 transition-all text-left ${
                        deliveryMethod === 'delivery'
                          ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                          : 'border-[var(--color-neutral-200)] hover:border-[var(--color-neutral-300)]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-[8px] flex items-center justify-center ${
                          deliveryMethod === 'delivery' 
                            ? 'bg-[var(--color-primary-500)]' 
                            : 'bg-[var(--color-neutral-100)]'
                        }`}>
                          <Truck className={`w-5 h-5 ${
                            deliveryMethod === 'delivery' ? 'text-white' : 'text-[var(--color-neutral-600)]'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-[var(--color-neutral-900)] mb-1">Доставка</div>
                          <div className="text-sm text-[var(--color-neutral-600)]">
                            {subtotal >= 2000 ? 'Бесплатно' : '250 ₽'}
                          </div>
                        </div>
                        {deliveryMethod === 'delivery' && (
                          <Check className="w-5 h-5 text-[var(--color-primary-600)]" />
                        )}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('pickup')}
                      disabled={isLoading}
                      className={`p-4 rounded-[12px] border-2 transition-all text-left ${
                        deliveryMethod === 'pickup'
                          ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
                          : 'border-[var(--color-neutral-200)] hover:border-[var(--color-neutral-300)]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-[8px] flex items-center justify-center ${
                          deliveryMethod === 'pickup' 
                            ? 'bg-[var(--color-primary-500)]' 
                            : 'bg-[var(--color-neutral-100)]'
                        }`}>
                          <Store className={`w-5 h-5 ${
                            deliveryMethod === 'pickup' ? 'text-white' : 'text-[var(--color-neutral-600)]'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-[var(--color-neutral-900)] mb-1">Самовывоз</div>
                          <div className="text-sm text-[var(--color-neutral-600)]">Бесплатно</div>
                        </div>
                        {deliveryMethod === 'pickup' && (
                          <Check className="w-5 h-5 text-[var(--color-primary-600)]" />
                        )}
                      </div>
                    </button>
                  </div>

                  {/* Delivery Address */}
                  {deliveryMethod === 'delivery' && (
                    <div className="space-y-4 pt-6 border-t border-[var(--color-neutral-200)]">
                      <div className="flex items-center gap-2 text-[var(--color-neutral-700)] mb-4">
                        <MapPin className="w-5 h-5" />
                        <span className="font-medium">Адрес доставки</span>
                      </div>
                      
                      <Input
                        label="Улица и дом"
                        placeholder="ул. Примерная, д. 1"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        error={errors.address}
                        disabled={isLoading}
                      />
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Input
                          label="Квартира"
                          placeholder="12"
                          value={formData.apartment}
                          onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                          disabled={isLoading}
                        />
                        <Input
                          label="Подъезд"
                          placeholder="2"
                          value={formData.entrance}
                          onChange={(e) => setFormData({ ...formData, entrance: e.target.value })}
                          disabled={isLoading}
                        />
                        <Input
                          label="Этаж"
                          placeholder="5"
                          value={formData.floor}
                          onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                          disabled={isLoading}
                        />
                        <Input
                          label="Домофон"
                          placeholder="12К"
                          value={formData.intercom}
                          onChange={(e) => setFormData({ ...formData, intercom: e.target.value })}
                          disabled={isLoading}
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 pt-4">
                        <Input
                          label="Дата доставки"
                          type="date"
                          value={formData.deliveryDate}
                          onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                          error={errors.deliveryDate}
                          disabled={isLoading}
                        />
                        <Select
                          label="Время доставки"
                          value={formData.deliveryTime}
                          onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                          error={errors.deliveryTime}
                          disabled={isLoading}
                          options={[
                            { value: '', label: 'Выберите интервал' },
                            { value: '9-12', label: '09:00 - 12:00' },
                            { value: '12-15', label: '12:00 - 15:00' },
                            { value: '15-18', label: '15:00 - 18:00' },
                            { value: '18-21', label: '18:00 - 21:00' },
                          ]}
                        />
                      </div>
                    </div>
                  )}

                  {/* Pickup Point */}
                  {deliveryMethod === 'pickup' && (
                    <div className="pt-6 border-t border-[var(--color-neutral-200)]">
                      <Select
                        label="Пункт выдачи"
                        value={formData.pickupPoint}
                        onChange={(e) => setFormData({ ...formData, pickupPoint: e.target.value })}
                        error={errors.pickupPoint}
                        disabled={isLoading}
                        options={[
                          { value: '', label: 'Выберите пункт выдачи' },
                          { value: 'point1', label: 'Офис Точка Баланса - ул. Зелёная, 7' },
                        ]}
                      />
                    </div>
                  )}
                </section>

                {/* Payment Method */}
                <section className="bg-white rounded-[16px] border border-[var(--color-neutral-200)] p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center">
                      <span className="text-lg font-semibold text-[var(--color-primary-600)]">3</span>
                    </div>
                    <h3>Способ оплаты</h3>
                  </div>

                  <RadioGroup
                    name="payment"
                    value={paymentMethod}
                    onChange={setPaymentMethod}
                    disabled={isLoading}
                    options={[
                      { value: 'card', label: 'Картой онлайн (Visa, MasterCard, МИР)' },
                      { value: 'cash', label: 'Наличными при получении' },
                      { value: 'card-delivery', label: 'Картой при получении' },
                    ]}
                  />

                  {paymentMethod === 'card' && (
                    <div className="mt-4 p-4 bg-[var(--color-primary-50)] rounded-[12px] flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-[var(--color-primary-600)] flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-[var(--color-primary-700)]">
                        После подтверждения заказа вы будете перенаправлены на безопасную страницу оплаты
                      </p>
                    </div>
                  )}
                </section>

                {/* Comment */}
                <section className="bg-white rounded-[16px] border border-[var(--color-neutral-200)] p-6 md:p-8">
                  <Textarea
                    label="Комментарий к заказу"
                    placeholder="Укажите дополнительные пожелания или уточнения..."
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    disabled={isLoading}
                  />
                </section>
              </div>

              {/* Order Summary - Sticky on Desktop */}
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <div className="bg-white rounded-[16px] border border-[var(--color-neutral-200)] p-6">
                    <h3 className="mb-6">Ваш заказ</h3>

                    {/* Cart Items */}
                    <div className="space-y-4 mb-6 pb-6 border-b border-[var(--color-neutral-200)]">
                      {cartItems.map((item, idx) => (
                        <div key={`${item.id}-${item.variant_id || idx}`} className="flex gap-3">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-16 h-16 rounded-[8px] object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-[var(--color-neutral-900)] mb-1 line-clamp-2">
                              {item.name} {item.product_type === 'set' && item.variant_label ? `(Набор: ${item.variant_label})` : ''}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-[var(--color-neutral-600)]">
                                {item.quantity} шт.
                              </span>
                              <span className="text-sm font-semibold text-[var(--color-neutral-900)]">
                                {item.price * item.quantity} ₽
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Promo Code */}
                    <div className="mb-6">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Промокод"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          error={errors.promo}
                          disabled={isLoading || promoApplied}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={handlePromoApply}
                          disabled={isLoading || promoApplied || !promoCode}
                          className="border border-[var(--color-neutral-200)] flex-shrink-0"
                        >
                          {promoApplied ? <Check className="w-5 h-5" /> : 'Применить'}
                        </Button>
                      </div>
                      {promoApplied && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-[var(--color-success)]">
                          <Check className="w-4 h-4" />
                          <span>Промокод применён</span>
                        </div>
                      )}
                    </div>

                    {/* Bonuses */}
                    <div className="mb-6 p-4 bg-[var(--color-secondary-50)] rounded-[12px]">
                      <Checkbox
                        checked={useBonuses}
                        onChange={setUseBonuses}
                        disabled={isLoading || availableBonuses === 0}
                        label={
                          <div className="flex items-center gap-2">
                            <Gift className="w-4 h-4 text-[var(--color-secondary-600)]" />
                            <span className="text-sm">
                              Списать бонусы (доступно {availableBonuses} ₽) {bonusDiscount > 0 ? `−${bonusDiscount} ₽` : ''}
                            </span>
                          </div>
                        }
                      />
                      {availableBonuses > 0 && (
                        <p className="text-[10px] text-[var(--color-neutral-500)] mt-1 ml-6">
                          Можно оплатить до 30% стоимости (макс. {maxBonusDiscount} ₽)
                        </p>
                      )}
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--color-neutral-600)]">Товары</span>
                        <span className="font-medium text-[var(--color-neutral-900)]">{subtotal} ₽</span>
                      </div>
                      {discount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--color-neutral-600)]">Скидка по промокоду</span>
                          <span className="font-medium text-[var(--color-accent-500)]">−{discount} ₽</span>
                        </div>
                      )}
                      {bonusDiscount > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--color-neutral-600)]">Списание бонусов</span>
                          <span className="font-medium text-[var(--color-accent-500)]">−{bonusDiscount} ₽</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm">
                        <span className="text-[var(--color-neutral-600)]">Доставка</span>
                        <span className="font-medium text-[var(--color-neutral-900)]">
                          {deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₽`}
                        </span>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="border-t border-[var(--color-neutral-200)] pt-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-[var(--color-neutral-900)]">Итого</span>
                        <span className="text-2xl font-bold text-[var(--color-primary-600)]">{total} ₽</span>
                      </div>
                      <p className="text-xs text-[var(--color-neutral-600)]">
                        Вы получите {Math.floor(total * (initialProfile?.loyalty_level === 'gold' ? 0.07 : (initialProfile?.loyalty_level === 'silver' ? 0.05 : 0.03)))} бонусов за этот заказ
                      </p>
                    </div>

                    {/* Submit Button - Desktop */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full hidden lg:flex"
                      isLoading={isLoading}
                    >
                      Подтвердить заказ
                    </Button>

                    {/* Free Delivery Info */}
                    {deliveryMethod === 'delivery' && subtotal < 2000 && (
                      <div className="mt-4 p-3 bg-[var(--color-primary-50)] rounded-[8px]">
                        <p className="text-xs text-[var(--color-primary-700)]">
                          Добавьте товаров ещё на {2000 - subtotal} ₽ для бесплатной доставки
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Sticky Bottom */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--color-neutral-200)] p-4 z-40">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-[var(--color-neutral-600)]">Итого:</span>
                <span className="text-xl font-bold text-[var(--color-primary-600)]">{total} ₽</span>
              </div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Подтвердить заказ
              </Button>
            </div>

            {/* Mobile Bottom Spacing */}
            <div className="h-32 lg:hidden" />
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};
