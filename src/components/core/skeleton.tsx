import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-[var(--color-neutral-200)] rounded ${className}`} />
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-[16px] overflow-hidden shadow-[var(--shadow-sm)] p-0">
      {/* Image Skeleton */}
      <Skeleton className="w-full aspect-[4/3]" />

      {/* Content */}
      <div className="p-4">
        {/* Rating */}
        <Skeleton className="h-4 w-20 mb-2" />

        {/* Title */}
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-3/4 mb-3" />

        {/* Description */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />

        {/* КБЖУ */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          <Skeleton className="h-12 rounded-[8px]" />
          <Skeleton className="h-12 rounded-[8px]" />
          <Skeleton className="h-12 rounded-[8px]" />
          <Skeleton className="h-12 rounded-[8px]" />
        </div>

        {/* Price and Button */}
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-32 rounded-[12px]" />
        </div>
      </div>
    </div>
  );
};

export const CartItemSkeleton: React.FC = () => {
  return (
    <div className="flex gap-4 p-4 bg-white rounded-[12px] border border-[var(--color-neutral-200)]">
      <Skeleton className="w-24 h-24 rounded-[8px]" />
      <div className="flex-1">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/2 mb-3" />
        <div className="flex items-center justify-between mt-auto">
          <Skeleton className="h-9 w-24 rounded-[8px]" />
          <Skeleton className="h-6 w-20" />
        </div>
      </div>
    </div>
  );
};

export const ListingSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};
