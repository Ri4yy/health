"use client";
import React, { useState } from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { Checkbox } from '../core/checkbox';
import { RadioGroup } from '../core/radio';
import { Button } from '../core/button';

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

export interface FiltersProps {
  categories?: FilterOption[];
  dietTypes?: FilterOption[];
  priceRange?: { min: number; max: number };
  onApplyFilters?: (filters: any) => void;
  onResetFilters?: () => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Filters: React.FC<FiltersProps> = ({
  categories = [],
  dietTypes = [],
  priceRange = { min: 0, max: 5000 },
  onApplyFilters,
  onResetFilters,
  isMobile = false,
  isOpen = true,
  onClose,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(priceRange.min);
  const [maxPrice, setMaxPrice] = useState(priceRange.max);
  const [sortBy, setSortBy] = useState('popular');

  const handleCategoryToggle = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleDietToggle = (id: string) => {
    setSelectedDiets((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    onApplyFilters?.({
      categories: selectedCategories,
      diets: selectedDiets,
      priceRange: { min: minPrice, max: maxPrice },
      sortBy,
    });
    if (isMobile) {
      onClose?.();
    }
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedDiets([]);
    setMinPrice(priceRange.min);
    setMaxPrice(priceRange.max);
    setSortBy('popular');
    onResetFilters?.();
  };

  const content = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[var(--color-neutral-700)]" />
          <h3 className="font-semibold text-[var(--color-neutral-900)]">Фильтры</h3>
        </div>
        {isMobile && (
          <button onClick={onClose} className="p-2 hover:bg-[var(--color-neutral-100)] rounded-[8px] transition-colors">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Sort */}
      <div>
        <h4 className="text-sm font-semibold text-[var(--color-neutral-900)] mb-3">Сортировка</h4>
        <RadioGroup
          name="sort"
          value={sortBy}
          onChange={setSortBy}
          options={[
            { value: 'popular', label: 'Популярные' },
            { value: 'price-asc', label: 'Сначала дешевле' },
            { value: 'price-desc', label: 'Сначала дороже' },
            { value: 'rating', label: 'По рейтингу' },
          ]}
        />
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-semibold text-[var(--color-neutral-900)] mb-3">Цена</h4>
        <div className="flex gap-3">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            placeholder="От"
            className="w-full px-3 py-2 rounded-[8px] border border-[var(--color-neutral-200)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-100)] outline-none"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            placeholder="До"
            className="w-full px-3 py-2 rounded-[8px] border border-[var(--color-neutral-200)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-100)] outline-none"
          />
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-[var(--color-neutral-900)] mb-3">Категории</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <Checkbox
                key={category.id}
                label={`${category.label}${category.count ? ` (${category.count})` : ''}`}
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryToggle(category.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Diet Types */}
      {dietTypes.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-[var(--color-neutral-900)] mb-3">Тип питания</h4>
          <div className="space-y-2">
            {dietTypes.map((diet) => (
              <Checkbox
                key={diet.id}
                label={diet.label}
                checked={selectedDiets.includes(diet.id)}
                onChange={() => handleDietToggle(diet.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-4 border-t border-[var(--color-neutral-200)]">
        <Button variant="ghost" onClick={handleReset} className="flex-1">
          Сбросить
        </Button>
        <Button variant="primary" onClick={handleApply} className="flex-1">
          Применить
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    if (!isOpen) return null;
    
    return (
      <>
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
        
        {/* Drawer */}
        <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 overflow-y-auto p-6">
          {content}
        </div>
      </>
    );
  }

  return (
    <div className="bg-white rounded-[16px] p-6 border border-[var(--color-neutral-200)] sticky top-24">
      {content}
    </div>
  );
};
