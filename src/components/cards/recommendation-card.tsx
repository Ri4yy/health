import React from 'react';
import { Check, Plus } from 'lucide-react';
import { Button } from '../core/button';
import { Chip } from '../core/chip';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export interface RecommendationCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  oldPrice?: number;
  calories: number;
  protein: number;
  badges?: Array<{ type: string; label: string }>;
  whyFits: string[];
  onAddToCart: (id: string) => void;
  isInCart?: boolean;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  id,
  name,
  image,
  description,
  price,
  oldPrice,
  calories,
  protein,
  badges = [],
  whyFits,
  onAddToCart,
  isInCart,
}) => {
  return (
    <div className="bg-white rounded-[16px] p-6 border-2 border-[var(--color-primary-200)] hover:border-[var(--color-primary-400)] hover:shadow-[var(--shadow-lg)] transition-all">
      {/* Image */}
      <div className="relative aspect-[4/3] rounded-[12px] overflow-hidden bg-[var(--color-neutral-100)] mb-4">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
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
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-[var(--color-neutral-900)] mb-2">
        {name}
      </h3>
      <p className="text-sm text-[var(--color-neutral-600)] mb-4 line-clamp-2">
        {description}
      </p>

      {/* КБЖУ */}
      <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[var(--color-neutral-200)]">
        <div className="text-center">
          <div className="text-xs text-[var(--color-neutral-500)] mb-1">Калории</div>
          <div className="text-sm font-semibold text-[var(--color-neutral-900)]">
            {calories}
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-[var(--color-neutral-500)] mb-1">Белок</div>
          <div className="text-sm font-semibold text-[var(--color-neutral-900)]">
            {protein}г
          </div>
        </div>
      </div>

      {/* Why fits */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-[var(--color-neutral-900)] mb-2">
          Почему подходит:
        </h4>
        <ul className="space-y-1.5">
          {whyFits.map((reason, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-[var(--color-neutral-700)]">
              <Check className="w-4 h-4 text-[var(--color-success)] shrink-0 mt-0.5" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Price & Action */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-[var(--color-neutral-200)]">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[var(--color-neutral-900)]">
              {price} ₽
            </span>
            {oldPrice && (
              <span className="text-sm text-[var(--color-neutral-500)] line-through">
                {oldPrice} ₽
              </span>
            )}
          </div>
        </div>
        <Button
          variant={isInCart ? 'ghost' : 'primary'}
          size="sm"
          onClick={() => onAddToCart(id)}
          disabled={isInCart}
        >
          {isInCart ? (
            <>
              <Check className="w-4 h-4" />
              В корзине
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              В корзину
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
