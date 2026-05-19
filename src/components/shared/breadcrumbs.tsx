import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav className={`flex items-center gap-2 text-sm ${className}`} aria-label="Breadcrumb">
      <a
        href="/"
        className="text-[var(--color-neutral-600)] hover:text-[var(--color-primary-600)] transition-colors"
      >
        <Home className="w-4 h-4" />
      </a>
      
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-4 h-4 text-[var(--color-neutral-400)]" />
            {isLast || !item.href ? (
              <span className="text-[var(--color-neutral-900)] font-medium">{item.label}</span>
            ) : (
              <a
                href={item.href}
                className="text-[var(--color-neutral-600)] hover:text-[var(--color-primary-600)] transition-colors"
              >
                {item.label}
              </a>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
