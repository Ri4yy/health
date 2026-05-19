import React from 'react';

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-[16px] p-6 border border-[var(--color-neutral-200)] hover:border-[var(--color-primary-300)] transition-all duration-300 hover:shadow-[var(--shadow-md)]">
      <div className="w-14 h-14 bg-[var(--color-primary-100)] rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[var(--color-neutral-900)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--color-neutral-600)] leading-relaxed">{description}</p>
    </div>
  );
};
