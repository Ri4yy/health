import React from 'react';
import { X } from 'lucide-react';

export interface ChipProps {
  label: string;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  onRemove?: () => void;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'default',
  size = 'md',
  onRemove,
  onClick,
  selected = false,
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-200';
  
  const variants = {
    default: selected 
      ? 'bg-[var(--color-neutral-200)] text-[var(--color-neutral-900)]' 
      : 'bg-[var(--color-neutral-100)] text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-200)]',
    primary: selected
      ? 'bg-[var(--color-primary-500)] text-white'
      : 'bg-[var(--color-primary-100)] text-[var(--color-primary-700)] hover:bg-[var(--color-primary-200)]',
    secondary: selected
      ? 'bg-[var(--color-secondary-500)] text-white'
      : 'bg-[var(--color-secondary-100)] text-[var(--color-secondary-700)] hover:bg-[var(--color-secondary-200)]',
    accent: selected
      ? 'bg-[var(--color-accent-500)] text-white'
      : 'bg-[var(--color-accent-100)] text-[var(--color-accent-700)] hover:bg-[var(--color-accent-200)]',
    success: 'bg-[var(--color-success-light)] text-[var(--color-success)]',
    error: 'bg-[var(--color-error-light)] text-[var(--color-error)]',
    warning: 'bg-[var(--color-warning-light)] text-[var(--color-warning)]',
    info: 'bg-[var(--color-info-light)] text-[var(--color-info)]',
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  };
  
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <span>{label}</span>
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="hover:opacity-70 transition-opacity"
          aria-label="Remove"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </Component>
  );
};
