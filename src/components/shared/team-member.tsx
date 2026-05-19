import React from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export interface TeamMemberProps {
  name: string;
  position: string;
  image?: string;
  description?: string;
}

export const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  position,
  image,
  description,
}) => {
  return (
    <div className="bg-white rounded-[16px] p-6 border border-[var(--color-neutral-200)] hover:shadow-[var(--shadow-md)] transition-all">
      <div className="flex flex-col items-center text-center">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full overflow-hidden bg-[var(--color-primary-100)] mb-4">
          {image ? (
            <ImageWithFallback
              src={image}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-[var(--color-primary-600)]">
              {name.charAt(0)}
            </div>
          )}
        </div>

        {/* Info */}
        <h3 className="text-lg font-semibold text-[var(--color-neutral-900)] mb-1">
          {name}
        </h3>
        <p className="text-sm text-[var(--color-primary-600)] font-medium mb-3">
          {position}
        </p>
        {description && (
          <p className="text-sm text-[var(--color-neutral-600)] leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};
