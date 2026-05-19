"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { Breadcrumbs } from '../components/shared/breadcrumbs';
import { Chip } from '../components/core/chip';
import { Button } from '../components/core/button';
import { ToastContainer } from '../components/shared/toast';
import { useStore } from '../store/useStore';
import { 
  Package, 
  MapPin, 
  Clock, 
  CreditCard, 
  Phone, 
  CheckCircle, 
  Download,
  MessageCircle,
  XCircle,
  Star,
  Receipt,
  User,
  Calendar,
  Truck,
  AlertCircle,
  Gift,
  RefreshCw,
  FileText
} from 'lucide-react';

type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'shipping' | 'delivered' | 'cancelled' | 'new';

interface OrderDetailsPageProps {
  initialOrder: any;
  initialUser?: any;
}

export const OrderDetailsPage: React.FC<OrderDetailsPageProps> = ({ initialOrder, initialUser }) => {
  const router = useRouter();
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success' | 'error' | 'info'; message: string }>>([]);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const addToCart = useStore((state) => state.addToCart);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  };

  if (!initialOrder) {
    return <div>Заказ не найден</div>;
  }

  // Статусы заказа
  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'new':
      case 'pending':
        return {
          label: 'Принят',
          variant: 'info' as const,
          icon: Clock,
          message: 'Ваш заказ принят и ожидает подтверждения',
          description: 'Обычно обработка занимает до 15 минут',
        };
      case 'confirmed':
        return {
          label: 'Подтверждён',
          variant: 'info' as const,
          icon: CheckCircle,
          message: 'Заказ подтверждён и передан на кухню',
          description: 'Наши повара уже начали готовить ваши блюда',
        };
      case 'preparing':
        return {
          label: 'Готовится',
          variant: 'warning' as const,
          icon: Package,
          message: 'Ваш заказ готовится',
          description: 'Блюда готовятся с соблюдением всех стандартов качества',
        };
      case 'shipping':
        return {
          label: 'Передан в доставку',
          variant: 'warning' as const,
          icon: Truck,
          message: 'Заказ передан курьеру',
          description: 'Курьер свяжется с вами за 30 минут до доставки',
        };
      case 'delivered':
        return {
          label: 'Доставлен',
          variant: 'success' as const,
          icon: CheckCircle,
          message: 'Заказ успешно доставлен',
          description: 'Спасибо за покупку! Будем рады видеть вас снова',
        };
      case 'cancelled':
        return {
          label: 'Отменён',
          variant: 'error' as const,
          icon: XCircle,
          message: 'Заказ отменён',
          description: 'По вашей просьбе или техническим причинам',
        };
      default:
        return {
          label: 'В обработке',
          variant: 'info' as const,
          icon: Clock,
          message: 'Заказ обрабатывается',
          description: 'Мы уточняем детали заказа',
        };
    }
  };

  const statusConfig = getStatusConfig(initialOrder.status);

  // Прогресс заказа
  const getOrderSteps = (status: OrderStatus) => {
    const steps = [
      { id: 'new', label: 'Оформлен', icon: Receipt },
      { id: 'confirmed', label: 'Подтверждён', icon: CheckCircle },
      { id: 'preparing', label: 'Готовится', icon: Package },
      { id: 'shipping', label: 'В доставке', icon: Truck },
      { id: 'delivered', label: 'Доставлен', icon: CheckCircle },
    ];

    const statusOrder = ['new', 'confirmed', 'preparing', 'shipping', 'delivered'];
    const normalizedStatus = status === 'pending' ? 'new' : status;
    const currentIndex = statusOrder.indexOf(normalizedStatus);

    return steps.map((step, index) => ({
      ...step,
      completed: status === 'cancelled' ? false : index <= currentIndex,
      active: status === 'cancelled' ? false : index === currentIndex,
    }));
  };

  const orderSteps = getOrderSteps(initialOrder.status);

  const handleRepeatOrder = () => {
    initialOrder.order_items.forEach((item: any) => {
      addToCart(item.product_variants.products.id, item.quantity, item.variant_id);
    });
    addToast('success', 'Все товары из заказа добавлены в корзину');
    setTimeout(() => router.push('/cart'), 1500);
  };

  const handleContactSupport = () => {
    addToast('info', 'Открываем чат с поддержкой...');
  };

  const canCancelOrder = initialOrder.status === 'new' || initialOrder.status === 'pending' || initialOrder.status === 'confirmed';
  const canReview = initialOrder.status === 'delivered';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-milk)]">
      <Header />

      <main className="flex-1">
        <div className="container py-6 lg:py-8">
          <Breadcrumbs
            items={[
              { label: 'Главная', href: '/' },
              { label: 'Личный кабинет', href: '/account' },
              { label: 'Заказы', href: '/account?tab=orders' },
              { label: `Заказ #${initialOrder.order_number}` },
            ]}
            className="mb-6"
          />

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Заказ #{initialOrder.order_number}
              </h1>
              <p className="text-[var(--color-neutral-600)]">
                {new Date(initialOrder.created_at).toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <Chip label={statusConfig.label} variant={statusConfig.variant} size="lg" />
          </div>

          <div className="bg-white rounded-[16px] p-6 md:p-8 border border-[var(--color-neutral-200)] mb-6">
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                initialOrder.status === 'delivered' ? 'bg-[var(--color-success)]' :
                initialOrder.status === 'cancelled' ? 'bg-[var(--color-error)]' :
                'bg-[var(--color-primary-500)]'
              }`}>
                <statusConfig.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{statusConfig.message}</h2>
                <p className="text-[var(--color-neutral-600)]">{statusConfig.description}</p>
              </div>
            </div>

            {initialOrder.status !== 'cancelled' && (
              <div className="mt-8 border-t border-[var(--color-neutral-100)] pt-8">
                <h4 className="mb-6 font-medium text-[var(--color-neutral-700)]">Прогресс заказа</h4>
                <div className="hidden md:flex items-center justify-between">
                  {orderSteps.map((step, index) => (
                    <React.Fragment key={step.id}>
                      <div className="flex flex-col items-center flex-1">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all ${
                          step.completed 
                            ? 'bg-[var(--color-success)] text-white' 
                            : step.active
                            ? 'bg-[var(--color-primary-500)] text-white'
                            : 'bg-[var(--color-neutral-200)] text-[var(--color-neutral-500)]'
                        }`}>
                          <step.icon className="w-6 h-6" />
                        </div>
                        <span className={`text-sm text-center ${
                          step.completed || step.active 
                            ? 'text-[var(--color-neutral-900)] font-medium' 
                            : 'text-[var(--color-neutral-600)]'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                      {index < orderSteps.length - 1 && (
                        <div className={`flex-1 h-1 transition-all -mt-8 ${
                          step.completed 
                            ? 'bg-[var(--color-success)]' 
                            : 'bg-[var(--color-neutral-200)]'
                        }`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="md:hidden space-y-4">
                  {orderSteps.map((step) => (
                    <div key={step.id} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        step.completed 
                          ? 'bg-[var(--color-success)] text-white' 
                          : step.active
                          ? 'bg-[var(--color-primary-500)] text-white'
                          : 'bg-[var(--color-neutral-200)] text-[var(--color-neutral-500)]'
                      }`}>
                        <step.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className={`text-sm ${
                          step.completed || step.active 
                            ? 'text-[var(--color-neutral-900)] font-medium' 
                            : 'text-[var(--color-neutral-600)]'
                        }`}>
                          {step.label}
                        </div>
                      </div>
                      {step.completed && (
                        <CheckCircle className="w-5 h-5 text-[var(--color-success)]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-[16px] p-6 border border-[var(--color-neutral-200)]">
                <h2 className="text-xl font-bold mb-6">Состав заказа</h2>
                <div className="space-y-6">
                  {initialOrder.order_items.map((item: any) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-[var(--color-neutral-200)] last:border-0 last:pb-0">
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-[12px] overflow-hidden bg-[var(--color-neutral-100)] flex-shrink-0">
                        <img
                          src={item.product_variants?.products?.images?.[0] || 'https://images.unsplash.com/photo-1666819691716-827f78d892f3?w=800'}
                          alt={item.product_variants?.products?.name || 'Товар'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold mb-1">{item.product_variants?.products?.name || 'Товар'}</h4>
                        <p className="text-sm text-[var(--color-neutral-600)] mb-1">
                          {item.product_variants?.products?.product_type === 'set' && item.product_variants?.days_count 
                            ? `На ${item.product_variants.days_count} ${item.product_variants.days_count === 1 ? 'день' : (item.product_variants.days_count > 1 && item.product_variants.days_count < 5 ? 'дня' : 'дней')}`
                            : (item.product_variants?.label || '')
                          }
                        </p>
                        <div className="flex items-center justify-between mt-4">
                          <span className="text-sm text-[var(--color-neutral-600)]">
                            {item.quantity} шт. × {item.price_at_purchase} ₽
                          </span>
                          <div className="font-semibold text-[var(--color-neutral-900)]">
                            {item.price_at_purchase * item.quantity} ₽
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[16px] p-6 border border-[var(--color-neutral-200)]">
                <h2 className="text-xl font-bold mb-6">Информация о заказе</h2>
                <div className="grid md:grid-cols-2 gap-8 text-sm">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-[var(--color-neutral-600)] mb-1">
                        <User className="w-4 h-4" /> Получатель
                      </div>
                      <div className="font-medium">{initialOrder.contact_name}</div>
                      <div className="text-[var(--color-neutral-600)]">{initialOrder.contact_phone}</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-[var(--color-neutral-600)] mb-1">
                        <Truck className="w-4 h-4" /> Способ получения
                      </div>
                      <div className="font-medium">
                        {initialOrder.delivery_method === 'pickup' ? 'Самовывоз' : 'Доставка курьером'}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-[var(--color-neutral-600)] mb-1">
                        <MapPin className="w-4 h-4" /> Адрес
                      </div>
                      <div className="font-medium">{initialOrder.delivery_address}</div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-[var(--color-neutral-600)] mb-1">
                        <Calendar className="w-4 h-4" /> Дата и время
                      </div>
                      <div className="font-medium">
                        {initialOrder.delivery_date ? (
                          <>
                            {new Date(initialOrder.delivery_date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                            {initialOrder.delivery_time && `, ${initialOrder.delivery_time}`}
                          </>
                        ) : 'Не указано'}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-[var(--color-neutral-600)] mb-1">
                        <CreditCard className="w-4 h-4" /> Способ оплаты
                      </div>
                      <div className="font-medium">
                        {initialOrder.payment_method === 'card' ? 'Картой онлайн' : 
                         initialOrder.payment_method === 'cash' ? 'Наличными при получении' :
                         initialOrder.payment_method === 'card-delivery' ? 'Картой при получении' : 'Безналичный расчет'}
                      </div>
                    </div>

                    {initialOrder.comment && (
                      <div>
                        <div className="flex items-center gap-2 text-[var(--color-neutral-600)] mb-1">
                          <MessageCircle className="w-4 h-4" /> Комментарий
                        </div>
                        <div className="font-medium italic text-[var(--color-neutral-700)]">
                          «{initialOrder.comment}»
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[16px] p-6 border border-[var(--color-neutral-200)]">
                <h2 className="text-xl font-bold mb-6">Действия с заказом</h2>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" onClick={handleRepeatOrder} className="min-w-[200px]">
                    <RefreshCw className="w-4 h-4 mr-2" /> Повторить заказ
                  </Button>
                  <Button variant="ghost" onClick={handleContactSupport}>
                    <MessageCircle className="w-4 h-4 mr-2" /> Чат с поддержкой
                  </Button>
                  <Button variant="ghost" onClick={() => addToast('info', 'Загрузка чека...')}>
                    <FileText className="w-4 h-4 mr-2" /> Скачать чек
                  </Button>
                  {canCancelOrder && (
                    <Button variant="ghost" className="text-red-600 ml-auto" onClick={() => setShowCancelModal(true)}>
                      <XCircle className="w-4 h-4 mr-2" /> Отменить заказ
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-[16px] p-6 border border-[var(--color-neutral-200)] sticky top-24">
                <h3 className="font-bold text-lg mb-6">Резюме оплаты</h3>
                
                <div className="flex items-center gap-3 mb-6 p-4 rounded-[12px] bg-[var(--color-neutral-50)]">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    initialOrder.payment_method === 'card' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                  }`}>
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--color-neutral-500)]">Статус оплаты</div>
                    <div className="text-sm font-semibold">
                      {initialOrder.status === 'cancelled' ? 'Возврат' : 
                       initialOrder.payment_method === 'card' ? 'Оплачено' : 'Ожидает оплаты'}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--color-neutral-500)]">Товары</span>
                    <span>{initialOrder.total_price + (initialOrder.discount_amount || 0)} ₽</span>
                  </div>
                  {initialOrder.discount_amount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Скидка</span>
                      <span className="text-green-600">−{initialOrder.discount_amount} ₽</span>
                    </div>
                  )}
                  <div className="pt-3 border-t border-[var(--color-neutral-100)] flex justify-between items-baseline">
                    <span className="font-bold">Итого</span>
                    <span className="text-2xl font-bold">{initialOrder.total_price} ₽</span>
                  </div>
                </div>

                <div className="bg-[var(--color-primary-50)] rounded-[12px] p-4 flex gap-3">
                  <Gift className="w-5 h-5 text-[var(--color-primary-600)] shrink-0" />
                  <div>
                    <div className="text-xs font-semibold text-[var(--color-primary-900)]">Начислено бонусов</div>
                    <div className="text-sm text-[var(--color-primary-700)]">+{Math.floor(initialOrder.total_price * 0.05)} бонусов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {showCancelModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-[24px] p-8 max-w-md w-full animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center text-red-600">
                <AlertCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Отменить заказ?</h3>
                <p className="text-sm text-[var(--color-neutral-500)]">Это действие нельзя будет отменить.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setShowCancelModal(false)}>Оставить</Button>
              <Button variant="primary" className="flex-1 bg-red-600 hover:bg-red-700" onClick={() => { setShowCancelModal(false); addToast('success', 'Заказ отменен'); }}>Отменить заказ</Button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};
