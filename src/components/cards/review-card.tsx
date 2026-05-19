import React from 'react';
import { Star } from 'lucide-react';

export interface ReviewCardProps {
  author: string;
  rating: number;
  date: string;
  text: string;
  avatar?: string;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  author,
  rating,
  date,
  text,
  avatar,
}) => {
  return (
    <div className="bg-white rounded-[16px] p-6 border border-[var(--color-neutral-200)]">
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center shrink-0">
          {avatar ? (
            <img src={avatar} alt={author} className="w-full h-full rounded-full object-cover" />
          ) : (
            <span className="text-lg font-semibold text-[var(--color-primary-700)]">
              {author.charAt(0)}
            </span>
          )}
        </div>

        {/* Header */}
        <div className="flex-1">
          <h4 className="font-semibold text-[var(--color-neutral-900)]">{author}</h4>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`w-4 h-4 ${
                    index < rating
                      ? 'fill-[var(--color-accent-400)] text-[var(--color-accent-400)]'
                      : 'text-[var(--color-neutral-300)]'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-[var(--color-neutral-500)]">{date}</span>
          </div>
        </div>
      </div>

      {/* Review text */}
      <p className="text-sm text-[var(--color-neutral-700)] leading-relaxed">{text}</p>
    </div>
  );
};
