import React from 'react';
import { Minus, Plus, X } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Chip } from '../core/chip';

export interface CartItemProps {
  id: string;
  variant_id?: string;
  product_type?: 'single' | 'set';
  variant_label?: string;
  image: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  badges?: Array<{ type: string; label: string }>;
  onQuantityChange: (id: string, quantity: number, variant_id?: string) => void;
  onRemove: (id: string, variant_id?: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  id,
  variant_id,
  product_type,
  variant_label,
  image,
  name,
  description,
  price,
  quantity,
  badges = [],
  onQuantityChange,
  onRemove,
}) => {
  const total = price * quantity;

  return (
    <div className="bg-white rounded-[12px] p-4 border border-[var(--color-neutral-200)]">
      <div className="flex gap-4">
        {/* Image */}
        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-[8px] overflow-hidden bg-[var(--color-neutral-100)] shrink-0">
          <ImageWithFallback
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[var(--color-neutral-900)] mb-1 truncate">
                {name}
              </h3>
              {product_type === 'set' && variant_label && (
                <div className="text-xs font-semibold text-[var(--color-primary-600)] mb-1 bg-[var(--color-primary-50)] inline-block px-2 py-0.5 rounded-full">
                  Набор ({variant_label})
                </div>
              )}
              {description && (
                <p className="text-sm text-[var(--color-neutral-600)] line-clamp-1">
                  {description}
                </p>
              )}
            </div>
            <button
              onClick={() => onRemove(id, variant_id)}
              className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full hover:bg-[var(--color-neutral-100)] transition-colors"
              aria-label="Удалить"
            >
              <X className="w-4 h-4 text-[var(--color-neutral-600)]" />
            </button>
          </div>

          {/* Badges */}
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {badges.map((badge, index) => (
                <Chip
                  key={index}
                  label={badge.label}
                  variant={badge.type as any}
                  size="sm"
                />
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between gap-4">
            {/* Quantity */}
            <div className="flex items-center gap-1 bg-[var(--color-neutral-100)] rounded-[8px] p-1">
              <button
                onClick={() => onQuantityChange(id, Math.max(1, quantity - 1), variant_id)}
                className="w-7 h-7 flex items-center justify-center rounded-[6px] bg-white hover:bg-[var(--color-neutral-200)] transition-colors"
                aria-label="Уменьшить количество"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-sm font-semibold text-[var(--color-neutral-900)] w-8 text-center">
                {quantity}
              </span>
              <button
                onClick={() => onQuantityChange(id, quantity + 1, variant_id)}
                className="w-7 h-7 flex items-center justify-center rounded-[6px] bg-white hover:bg-[var(--color-neutral-200)] transition-colors"
                aria-label="Увеличить количество"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Price */}
            <div className="text-right">
              <div className="text-lg font-bold text-[var(--color-neutral-900)]">
                {total} ₽
              </div>
              {quantity > 1 && (
                <div className="text-xs text-[var(--color-neutral-500)]">
                  {price} ₽ × {quantity}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
