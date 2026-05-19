import React from 'react';
import { ChevronRight, Package } from 'lucide-react';
import { Button } from '../core/button';
import { Chip } from '../core/chip';

export interface OrderCardProps {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'shipping' | 'delivered' | 'cancelled' | 'new';
  itemsCount: number;
  total: number;
  image?: string;
  onClick?: () => void;
  onRepeat?: () => void;
}

const statusLabels = {
  new: 'Принят',
  pending: 'Принят',
  confirmed: 'Подтвержден',
  preparing: 'Готовится',
  shipping: 'В доставке',
  delivered: 'Доставлен',
  cancelled: 'Отменён',
};

const statusVariants = {
  new: 'info' as const,
  pending: 'info' as const,
  confirmed: 'info' as const,
  preparing: 'warning' as const,
  shipping: 'warning' as const,
  delivered: 'success' as const,
  cancelled: 'error' as const,
};

export const OrderCard: React.FC<OrderCardProps> = ({
  id,
  orderNumber,
  date,
  status,
  itemsCount,
  total,
  image,
  onClick,
  onRepeat,
}) => {
  return (
    <div className="bg-white rounded-[16px] p-4 lg:p-6 border border-[var(--color-neutral-200)] hover:border-[var(--color-primary-300)] transition-colors">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3">
          {image ? (
            <div className="w-12 h-12 rounded-[8px] overflow-hidden bg-[var(--color-neutral-100)] shrink-0">
              <img src={image} alt="Order" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="w-12 h-12 rounded-[8px] bg-[var(--color-primary-100)] flex items-center justify-center shrink-0">
              <Package className="w-6 h-6 text-[var(--color-primary-600)]" />
            </div>
          )}
          <div>
            <h3 className="font-semibold text-[var(--color-neutral-900)] mb-1">
              Заказ #{orderNumber}
            </h3>
            <p className="text-sm text-[var(--color-neutral-600)]">{date}</p>
          </div>
        </div>

        <Chip 
          label={statusLabels[status]} 
          variant={statusVariants[status]}
          size="sm"
        />
      </div>

      <div className="flex items-center justify-between gap-4 py-3 border-t border-[var(--color-neutral-200)] mb-4">
        <span className="text-sm text-[var(--color-neutral-600)]">
          {itemsCount} {itemsCount === 1 ? 'товар' : 'товара'}
        </span>
        <span className="text-lg font-bold text-[var(--color-neutral-900)]">
          {total} ₽
        </span>
      </div>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClick}
          className="flex-1 justify-between"
        >
          Подробнее
          <ChevronRight className="w-4 h-4" />
        </Button>
        {status === 'delivered' && onRepeat && (
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onRepeat();
            }}
            className="shrink-0"
          >
            Повторить
          </Button>
        )}
      </div>
    </div>
  );
};
