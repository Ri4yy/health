"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../components/layout/header';
import { Footer } from '../components/layout/footer';
import { Button } from '../components/core/button';
import { CheckCircle } from 'lucide-react';

interface OrderSuccessPageProps {
  orderNumber: string;
  orderId?: string;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({ orderNumber, orderId }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--color-bg-milk)]">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-[16px] border border-[var(--color-neutral-200)] p-8 lg:p-12 max-w-lg w-full text-center shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[var(--color-success-50)] text-[var(--color-success-600)] rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-[var(--color-neutral-900)] mb-4">
            Заказ успешно оформлен!
          </h1>
          
          <p className="text-[var(--color-neutral-600)] mb-2">
            Ваш заказ <span className="font-semibold text-[var(--color-primary-600)]">{orderNumber}</span> принят в обработку.
          </p>
          
          <p className="text-sm text-[var(--color-neutral-500)] mb-8">
            Мы пришлем уведомление о статусе заказа на вашу почту.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              onClick={() => router.push('/catalog')}
              className="w-full sm:w-auto"
            >
              Вернуться в каталог
            </Button>
            <Button
              variant="primary"
              onClick={() => router.push(orderId ? `/account/orders/${orderId}` : '/account')}
              className="w-full sm:w-auto"
            >
              Перейти к заказу
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
