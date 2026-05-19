"use client";
import React, { useState } from 'react';
import { Star, Heart, Plus, Minus } from 'lucide-react';
import { Button } from '../core/button';
import { Chip } from '../core/chip';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useStore } from '../../store/useStore';
import { createClient } from '../../lib/supabase/client';
import Link from 'next/link';

export interface ProductBadge {
  type: 'vegan' | 'no-sugar' | 'keto' | 'gluten-free' | 'hit' | 'discount';
  label: string;
}

export interface ProductCardProps {
  id: string;
  slug_id?: number | null;
  product_type?: 'single' | 'set';
  variants?: any[];
  image: string;
  name: string;
  description?: string;
  calories: number;
  protein: number;
  fats: number;
  carbs: number;
  badges?: ProductBadge[];
  rating?: number;
  reviewCount?: number;
  price: number;
  oldPrice?: number;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
  onAddToCart?: (id: string, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  slug_id,
  product_type,
  variants = [],
  image,
  name,
  description,
  calories,
  protein,
  fats,
  carbs,
  badges = [],
  rating,
  reviewCount,
  price,
  oldPrice,
  onFavoriteToggle,
  onAddToCart,
}) => {
  const [mounted, setMounted] = useState(false);
  
  const quantity = useStore(state => {
    // Если это набор, ищем вариант по умолчанию (1 день)
    if (product_type === 'set' && variants && variants.length > 0) {
      const defaultVariantId = variants.find((v: any) => v.days_count === 1 || String(v.label).includes('1'))?.id || variants[0]?.id;
      return state.cart.find(c => c.id === id && c.variant_id === defaultVariantId)?.quantity || 0;
    }
    return state.cart.find(c => c.id === id)?.quantity || 0;
  });
  const isFav = useStore(state => state.favorites.includes(id));
  
  const addToCart = useStore(state => state.addToCart);
  const updateQuantity = useStore(state => state.updateQuantity);
  const removeFromCart = useStore(state => state.removeFromCart);
  const toggleFavorite = useStore(state => state.toggleFavorite);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const supabase = createClient();
    await toggleFavorite(id, supabase);
    onFavoriteToggle?.(id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    let variantId = variants?.[0]?.id;
    if (variants && variants.length > 0 && product_type === 'set') {
      variantId = variants.find((v: any) => v.days_count === 1 || String(v.label).includes('1'))?.id || variants[0]?.id;
    }
    addToCart(id, 1, variantId);
    onAddToCart?.(id, 1);
  };

  const handleIncrement = () => {
    let variantId = variants?.[0]?.id;
    if (variants && variants.length > 0) {
      variantId = variants.find((v: any) => v.days_count === 1 || String(v.label).includes('1'))?.id || variants[0]?.id;
    }
    updateQuantity(id, quantity + 1, variantId);
    onAddToCart?.(id, quantity + 1);
  };

  const handleDecrement = () => {
    let variantId = variants?.[0]?.id;
    if (variants && variants.length > 0) {
      variantId = variants.find((v: any) => v.days_count === 1 || String(v.label).includes('1'))?.id || variants[0]?.id;
    }
    const newQuantity = quantity - 1;
    if (newQuantity <= 0) {
      removeFromCart(id, variantId);
      onAddToCart?.(id, 0);
    } else {
      updateQuantity(id, newQuantity, variantId);
      onAddToCart?.(id, newQuantity);
    }
  };

  const getBadgeVariant = (type: string): 'default' | 'primary' | 'secondary' | 'accent' => {
    if (type === 'hit') return 'primary';
    if (type === 'discount') return 'accent';
    return 'default';
  };

  const discountPercent = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  return (
    <div className="bg-white rounded-[16px] overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-all duration-300 flex flex-col h-full group">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-neutral-100)]">
        <Link href={`/product/${slug_id || id}`} className="block w-full h-full">
          <ImageWithFallback
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Badges */}
          {badges.length > 0 && (
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
              {badges.map((badge, index) => (
                <Chip
                  key={index}
                  label={badge.label}
                  variant={getBadgeVariant(badge.type)}
                  size="sm"
                />
              ))}
            </div>
          )}

          {/* Discount Percent */}
          {discountPercent > 0 && (
            <div className="absolute top-3 right-3 bg-[var(--color-accent-500)] text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
              −{discountPercent}%
            </div>
          )}
        </Link>

        {/* Favorite Button - OUTSIDE Link */}
        <button
          onClick={handleFavoriteClick}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-all duration-200 shadow-md z-20"
          aria-label={(mounted && isFav) ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-200 ${
              (mounted && isFav) ? 'fill-[var(--color-accent-500)] text-[var(--color-accent-500)]' : 'text-[var(--color-neutral-600)]'
            }`}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Rating */}
        {rating !== undefined && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-[var(--color-accent-400)] text-[var(--color-accent-400)]" />
            <span className="text-sm font-medium text-[var(--color-neutral-900)]">{rating.toFixed(1)}</span>
            {reviewCount !== undefined && (
              <span className="text-xs text-[var(--color-neutral-500)]">({reviewCount})</span>
            )}
          </div>
        )}

        {/* Name */}
        <Link href={`/product/${slug_id || id}`} className="text-base font-semibold text-[var(--color-neutral-900)] hover:text-[var(--color-primary-600)] mb-1 line-clamp-2 transition-colors">
          {name}
        </Link>

        {/* Description */}
        {description && (
          <p className="text-sm text-[var(--color-neutral-600)] mb-3 line-clamp-2 flex-1">
            {description}
          </p>
        )}

        {/* КБЖУ */}
        <div className="grid grid-cols-4 gap-2 mb-4 p-3 bg-[var(--color-bg-light)] rounded-[8px]">
          <div className="text-center">
            <div className="text-xs text-[var(--color-neutral-600)] mb-0.5">ккал</div>
            <div className="text-sm font-semibold text-[var(--color-neutral-900)]">{calories}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-[var(--color-neutral-600)] mb-0.5">Б</div>
            <div className="text-sm font-semibold text-[var(--color-neutral-900)]">{protein}г</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-[var(--color-neutral-600)] mb-0.5">Ж</div>
            <div className="text-sm font-semibold text-[var(--color-neutral-900)]">{fats}г</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-[var(--color-neutral-600)] mb-0.5">У</div>
            <div className="text-sm font-semibold text-[var(--color-neutral-900)]">{carbs}г</div>
          </div>
        </div>

        {/* Price and Cart */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-[var(--color-neutral-900)]">{price} ₽</span>
              {oldPrice && (
                <span className="text-sm text-[var(--color-neutral-500)] line-through">{oldPrice} ₽</span>
              )}
            </div>
          </div>

          {(!mounted || quantity === 0) ? (
            <Button variant="primary" size="sm" onClick={handleAddToCart} className="shrink-0">
              <Plus className="w-4 h-4" />
              В корзину
            </Button>
          ) : (
            <div className="flex items-center gap-2 bg-[var(--color-primary-50)] rounded-[8px] p-1">
              <button
                onClick={(e) => { e.stopPropagation(); handleDecrement(); }}
                className="w-7 h-7 flex items-center justify-center rounded-[6px] bg-white hover:bg-[var(--color-primary-100)] text-[var(--color-primary-600)] transition-colors"
                aria-label="Уменьшить количество"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-sm font-semibold text-[var(--color-primary-700)] w-6 text-center">
                {quantity}
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); handleIncrement(); }}
                className="w-7 h-7 flex items-center justify-center rounded-[6px] bg-white hover:bg-[var(--color-primary-100)] text-[var(--color-primary-600)] transition-colors"
                aria-label="Увеличить количество"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
