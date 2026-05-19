import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export interface CategoryTileProps {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  itemsCount?: number;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export const CategoryTile: React.FC<CategoryTileProps> = ({
  title,
  subtitle,
  description,
  image,
  itemsCount,
  icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-[16px] aspect-[1.2/1] w-full text-left transition-all duration-300 hover:shadow-[var(--shadow-xl)] hover:scale-[1.02]"
    >
      {/* Image */}
      <ImageWithFallback
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        {icon && (
          <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-3">
            {icon}
          </div>
        )}
        
        {subtitle && (
          <span className="text-xs text-white/80 font-medium mb-1">{subtitle}</span>
        )}
        
        <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
        
        <p className="text-sm text-white/90 mb-3 line-clamp-2">{description}</p>
        
        {itemsCount && (
          <p className="text-xs text-white/70 mb-3">{itemsCount} товаров</p>
        )}
        
        <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all">
          <span>Перейти</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </button>
  );
};
