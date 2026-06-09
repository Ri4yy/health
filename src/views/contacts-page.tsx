"use client";
import React, { useState } from 'react';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { InfoCard } from '../components/cards/info-card';
import { Input, Textarea } from '../components/core/input';
import { Button } from '../components/core/button';
import { ToastContainer } from '../components/shared/toast';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { formatPhoneNumber } from '../lib/utils/formatters';

export const ContactsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success' | 'error' | 'info'; message: string }>>([]);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Введите ваше имя';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Введите номер телефона';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Введите сообщение';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      addToast('success', 'Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
      setFormData({ name: '', email: '', phone: '', message: '' });
      setErrors({});
    }
  };

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
          <div className="container py-12 lg:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-[var(--color-neutral-900)] mb-4">
                Контакты
              </h1>
              <p className="text-lg text-[var(--color-neutral-700)]">
                Свяжитесь с нами любым удобным способом
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="container py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <InfoCard
              icon={<MapPin className="w-6 h-6 text-[var(--color-primary-600)]" />}
              title="Адрес"
              value="г. Чебоксары, Московский просп., 15"
            />
            <InfoCard
              icon={<Phone className="w-6 h-6 text-[var(--color-primary-600)]" />}
              title="Телефон"
              value="+7 (999) 999-99-99"
              link="tel:+79999999999"
            />
            <InfoCard
              icon={<Mail className="w-6 h-6 text-[var(--color-primary-600)]" />}
              title="Email"
              value="info@tochkabalansa.ru"
              link="mailto:info@tochkabalansa.ru"
            />
            <InfoCard
              icon={<Clock className="w-6 h-6 text-[var(--color-primary-600)]" />}
              title="Режим работы"
              value="Пн-Вс: 8:00 - 22:00"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-[16px] p-6 lg:p-8 border border-[var(--color-neutral-200)]">
              <h2 className="text-2xl font-bold text-[var(--color-neutral-900)] mb-2">
                Напишите нам
              </h2>
              <p className="text-[var(--color-neutral-600)] mb-6">
                Заполните форму, и мы свяжемся с вами в течение часа
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Ваше имя"
                  placeholder="Иван Иванов"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  error={errors.name}
                />

                <Input
                  label="Email"
                  type="email"
                  placeholder="test@mail.ru"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  error={errors.email}
                />

                <Input
                  label="Телефон"
                  type="tel"
                  placeholder="+7 9__ ___-__-__"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: formatPhoneNumber(e.target.value) });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  error={errors.phone}
                />

                <Textarea
                  label="Сообщение"
                  placeholder="Опишите ваш вопрос или предложение..."
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  error={errors.message}
                  rows={5}
                />

                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Отправить сообщение
                </Button>

                <p className="text-xs text-[var(--color-neutral-500)] text-center">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-[16px] p-6 lg:p-8 border border-[var(--color-neutral-200)]">
              <h2 className="text-2xl font-bold text-[var(--color-neutral-900)] mb-6">
                Как нас найти
              </h2>

              {/* Map Placeholder */}
              <div className="aspect-[4/3] rounded-[12px] bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)] flex items-center justify-center mb-6 overflow-hidden">
                <div className="w-full h-full">
                  <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Af3e60e21365670e34ff5f42c3f01d46aaafb9aa2b088f395cb135c44499672f2&amp;source=constructor" width="100%" height="100%"></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
};
