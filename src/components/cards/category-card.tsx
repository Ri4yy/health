import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export interface CategoryCardProps {
  title: string;
  description: string;
  image: string;
  itemsCount?: number;
  onClick?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  description,
  image,
  itemsCount,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-[16px] aspect-[4/3] w-full text-left transition-all duration-300 hover:shadow-[var(--shadow-lg)]"
    >
      {/* Image */}
      <ImageWithFallback
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-2xl font-bold mb-2 !text-white">{title}</h3>
        <p className="text-sm !text-white/90 mb-3">{description}</p>
        <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
          <span>Смотреть</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </button>
  );
};
