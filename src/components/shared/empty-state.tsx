import React from 'react';
import { SearchX } from 'lucide-react';
import { Button } from '../core/button';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Ничего не найдено',
  description = 'Попробуйте изменить фильтры или поисковый запрос',
  actionLabel = 'Сбросить фильтры',
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 lg:py-24">
      <div className="w-24 h-24 bg-[var(--color-neutral-100)] rounded-full flex items-center justify-center mb-6">
        <SearchX className="w-12 h-12 text-[var(--color-neutral-400)]" />
      </div>
      <h3 className="text-2xl font-semibold text-[var(--color-neutral-900)] mb-3">{title}</h3>
      <p className="text-[var(--color-neutral-600)] mb-8 text-center max-w-md">{description}</p>
      {onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
