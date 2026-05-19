import React from 'react';
import { Button } from '../core/button';

export interface OrderSummaryProps {
  subtotal: number;
  delivery: number;
  discount?: number;
  total: number;
  onCheckout?: () => void;
  className?: string;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  delivery,
  discount = 0,
  total,
  onCheckout,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-[16px] p-6 border border-[var(--color-neutral-200)] ${className}`}>
      <h3 className="text-lg font-semibold text-[var(--color-neutral-900)] mb-4">Итого по заказу</h3>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-neutral-600)]">Стоимость товаров</span>
          <span className="font-medium text-[var(--color-neutral-900)]">{subtotal} ₽</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-neutral-600)]">Доставка</span>
          <span className="font-medium text-[var(--color-neutral-900)]">
            {delivery === 0 ? 'Бесплатно' : `${delivery} ₽`}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-[var(--color-neutral-600)]">Скидка</span>
            <span className="font-medium text-[var(--color-accent-500)]">−{discount} ₽</span>
          </div>
        )}
      </div>

      <div className="border-t border-[var(--color-neutral-200)] pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold text-[var(--color-neutral-900)]">К оплате</span>
          <span className="text-2xl font-bold text-[var(--color-primary-600)]">{total} ₽</span>
        </div>
      </div>

      <Button variant="primary" size="lg" onClick={onCheckout} className="w-full">
        Перейти к оформлению
      </Button>

      <div className="mt-4 p-3 bg-[var(--color-primary-50)] rounded-[8px]">
        <p className="text-xs text-[var(--color-primary-700)]">
          Бесплатная доставка при заказе от 2000 ₽
        </p>
      </div>
    </div>
  );
};
