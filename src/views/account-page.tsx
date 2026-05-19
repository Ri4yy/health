"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { AddressCard } from '../components/cards/address-card';
import { OrderCard } from '../components/cards/order-card';
import { Input } from '../components/core/input';
import { Button } from '../components/core/button';
import { Tabs } from '../components/core/tabs';
import { ToastContainer } from '../components/shared/toast';
import { User, MapPin, Package, LogOut, MessageCircle } from 'lucide-react';
import { createClient } from '../lib/supabase/client';
import { useStore } from '../store/useStore';
import { formatPhoneNumber } from '../lib/utils/formatters';

export const AccountPage: React.FC<any> = ({ initialUser, initialProfile, initialAddresses = [], initialOrders = [] }) => {
  const router = useRouter();
  const supabase = createClient();
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success' | 'error' | 'info'; message: string }>>([]);

  // Profile edit states
  const [profileData, setProfileData] = useState({
    name: initialProfile?.full_name || '',
    email: initialUser?.email || '',
    phone: initialProfile?.phone || '',
  });

  // Password change states
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Address states
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({ title: '', city: 'Чебоксары', street: '', house: '', apartment: '' });

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const addToCart = useStore((state) => state.addToCart);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const handleRepeatOrder = (order: any) => {
    if (!order.order_items) return;
    order.order_items.forEach((item: any) => {
      addToCart(item.product_variants.products.id, item.quantity, item.variant_id);
    });
    addToast('success', 'Товары из заказа добавлены в корзину');
    // Optional: redirect to cart
    // router.push('/cart');
  };

  const handleSaveProfile = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: profileData.name, phone: profileData.phone })
      .eq('id', initialUser.id);
    
    if (error) addToast('error', 'Ошибка сохранения профиля');
    else addToast('success', 'Профиль успешно обновлён');
  };

  const handleChangePassword = async () => {
    if (!newPassword) {
      addToast('error', 'Введите новый пароль');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      addToast('error', 'Пароли не совпадают');
      return;
    }
    if (newPassword.length < 6) {
      addToast('error', 'Минимальная длина пароля - 6 символов');
      return;
    }

    setIsChangingPassword(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    
    if (error) {
      addToast('error', error.message);
    } else {
      addToast('success', 'Пароль успешно изменен');
      setNewPassword('');
      setConfirmNewPassword('');
    }
    setIsChangingPassword(false);
  };

  const handleSaveAddress = async () => {
    const { error } = await supabase.from('addresses').insert([
      {
        user_id: initialUser.id,
        title: newAddress.title,
        city: newAddress.city,
        street: newAddress.street,
        house: newAddress.house,
        apartment: newAddress.apartment
      }
    ]);

    if (error) addToast('error', 'Ошибка добавления адреса');
    else {
      addToast('success', 'Адрес добавлен');
      setIsAddingAddress(false);
      setNewAddress({ title: '', city: 'Чебоксары', street: '', house: '', apartment: '' });
      router.refresh();
    }
  };

  const handleDeleteAddress = async (id: string) => {
    const { error } = await supabase.from('addresses').delete().eq('id', id);
    if (!error) {
      addToast('success', 'Адрес удалён');
      router.refresh();
    }
  };

  const hasSevenDaySetOrder = initialOrders.some((order: any) => 
    order.order_items?.some((item: any) => 
      item.product_variants?.products?.product_type === 'set' && 
      item.product_variants?.days_count === 7
    )
  );

  // Format orders for the existing UI prop structure
  const formattedOrders = initialOrders.map((o: any) => ({
    id: o.id,
    orderNumber: o.order_number,
    date: new Date(o.created_at).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
    status: o.status === 'new' ? 'pending' : o.status, 
    itemsCount: o.order_items?.reduce((acc: number, item: any) => acc + item.quantity, 0) || 0,
    total: o.total_price,
    image: o.order_items?.[0]?.product_variants?.products?.images?.[0], // Optional preview
    rawItems: o // Keep raw data for repeat logic
  }));

  const formattedAddresses = initialAddresses.map((a: any) => ({
    id: a.id,
    title: a.title,
    address: `г. ${a.city}, ул. ${a.street}, д. ${a.house}${a.apartment ? `, кв. ${a.apartment}` : ''}`,
    isDefault: a.is_default
  }));

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-milk)]">
      <Header
        cartItemsCount={0}
        favoritesCount={0}
        isLoggedIn={true}
        userName={profileData.name.split(' ')[0]}
      />

      <main className="flex-1">
        <div className="container py-8 lg:py-12">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-[var(--color-neutral-900)]">
              Личный кабинет
            </h1>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Выйти
            </Button>
          </div>

          <Tabs
            tabs={[
              {
                id: 'profile',
                label: 'Профиль',
                icon: <User className="w-4 h-4" />,
                content: (
                  <div className="max-w-2xl">
                    <div className="bg-white rounded-[16px] p-6 lg:p-8 border border-[var(--color-neutral-200)]">
                      <h2 className="text-xl font-semibold text-[var(--color-neutral-900)] mb-6">
                        Личные данные
                      </h2>

                      <div className="space-y-4 mb-6">
                        <Input
                          label="Имя и фамилия"
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                        <Input
                          label="Email"
                          type="email"
                          value={profileData.email}
                          disabled // Email is hard to change since it requires Auth checks
                        />
                        <Input
                          label="Телефон"
                          type="tel"
                          placeholder="+7 9__ ___-__-__"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: formatPhoneNumber(e.target.value) })}
                        />
                      </div>

                      <div className="flex gap-3 pb-8">
                        <Button variant="primary" onClick={handleSaveProfile}>Сохранить изменения</Button>
                      </div>

                      <div className="border-t border-[var(--color-neutral-200)] pt-8">
                        <h3 className="text-lg font-semibold text-[var(--color-neutral-900)] mb-6">
                          Изменение пароля
                        </h3>
                        <div className="space-y-4 mb-6">
                          <Input
                            label="Новый пароль"
                            type="password"
                            placeholder="Минимум 6 символов"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                          <Input
                            label="Подтвердите новый пароль"
                            type="password"
                            placeholder="Повторите пароль"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                          />
                        </div>
                        <Button
                          variant="secondary"
                          onClick={handleChangePassword}
                          disabled={isChangingPassword}
                        >
                          {isChangingPassword ? 'Сохранение...' : 'Обновить пароль'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                id: 'addresses',
                label: 'Адреса',
                icon: <MapPin className="w-4 h-4" />,
                content: (
                  <div className="max-w-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-[var(--color-neutral-900)]">
                        Адреса доставки
                      </h2>
                      <Button variant="primary" size="sm" onClick={() => setIsAddingAddress(!isAddingAddress)}>
                        {isAddingAddress ? 'Отменить' : 'Добавить адрес'}
                      </Button>
                    </div>
                    
                    {isAddingAddress && (
                      <div className="bg-white p-6 rounded-[16px] border border-[var(--color-neutral-200)] mb-6 space-y-4">
                        <Input label="Название (например: Дом)" value={newAddress.title} onChange={e => setNewAddress({...newAddress, title: e.target.value})} />
                        <Input label="Улица" value={newAddress.street} onChange={e => setNewAddress({...newAddress, street: e.target.value})} />
                        <div className="grid grid-cols-2 gap-4">
                          <Input label="Дом" value={newAddress.house} onChange={e => setNewAddress({...newAddress, house: e.target.value})} />
                          <Input label="Квартира" value={newAddress.apartment} onChange={e => setNewAddress({...newAddress, apartment: e.target.value})} />
                        </div>
                        <Button variant="primary" onClick={handleSaveAddress}>Сохранить</Button>
                      </div>
                    )}

                    <div className="space-y-4">
                      {formattedAddresses.map((address: any) => (
                        <AddressCard
                          key={address.id}
                          {...address}
                          onEdit={(id) => addToast('info', 'Редактирование пока в разработке')}
                          onDelete={handleDeleteAddress}
                        />
                      ))}
                      {formattedAddresses.length === 0 && !isAddingAddress && (
                        <p className="text-sm text-[var(--color-neutral-500)] text-center py-4">У вас пока нет сохраненных адресов.</p>
                      )}
                    </div>
                  </div>
                ),
              },
              {
                id: 'orders',
                label: 'Заказы',
                icon: <Package className="w-4 h-4" />,
                content: (
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--color-neutral-900)] mb-6">
                      История заказов
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {formattedOrders.length === 0 ? (
                        <p className="text-[var(--color-neutral-500)]">Вы еще не сделали ни одного заказа.</p>
                      ) : (
                        formattedOrders.map((order: any) => (
                          <OrderCard
                            key={order.id}
                            {...order}
                            onClick={() => router.push(`/account/orders/${order.id}`)}
                            onRepeat={
                              order.status === 'delivered'
                                ? () => handleRepeatOrder(order.rawItems)
                                : undefined
                            }
                          />
                        ))
                      )}
                    </div>
                  </div>
                ),
              },
              {
                id: 'nutritionist',
                label: 'Связь с нутрициологом',
                icon: <MessageCircle className="w-4 h-4" />,
                content: (
                  <div>
                    <h2 className="text-xl font-semibold text-[var(--color-neutral-900)] mb-6">
                      Связь с нутрициологом
                    </h2>
                    <div className="bg-white rounded-[16px] p-6 lg:p-8 border border-[var(--color-neutral-200)] max-w-2xl">
                      {hasSevenDaySetOrder ? (
                        <div className="text-center">
                          <div className="w-16 h-16 bg-[var(--color-success-50)] text-[var(--color-success-600)] rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="w-8 h-8" />
                          </div>
                          <h3 className="text-lg font-semibold text-[var(--color-neutral-900)] mb-2">Доступ активирован</h3>
                          <p className="text-[var(--color-neutral-600)] mb-6">
                            У вас активирован доступ к чату с нутрициологом на постоянной основе, так как вы оформляли заказ набора на 7 дней.
                          </p>
                          <Button variant="primary" onClick={() => window.open('https://t.me/example_bot', '_blank')} className="w-full sm:w-auto">
                            Перейти в Telegram-чат
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="w-16 h-16 bg-[var(--color-primary-50)] text-[var(--color-primary-600)] rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="w-8 h-8" />
                          </div>
                          <h3 className="text-lg font-semibold text-[var(--color-neutral-900)] mb-2">Пробный день общения</h3>
                          <p className="text-[var(--color-neutral-600)] mb-6">
                            Вы можете получить 1 пробный день общения с нутрициологом, перейдя в Telegram-бота. Чтобы получить доступ к чату с личным нутрициологом на постоянной основе, оформите заказ любого набора на 7 дней.
                          </p>
                          <Button variant="secondary" onClick={() => window.open('https://t.me/example_bot', '_blank')} className="w-full sm:w-auto">
                            Получить пробный доступ
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </main>

      <Footer />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};
