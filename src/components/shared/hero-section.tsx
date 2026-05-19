import React from 'react';
import { Button } from '../core/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  primaryCta?: {
    label: string;
    onClick: () => void;
  };
  secondaryCta?: {
    label: string;
    onClick: () => void;
  };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  image,
  primaryCta,
  secondaryCta,
}) => {
  return (
    <section className="relative bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-secondary-50)] overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 lg:py-20">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-block px-4 py-1.5 bg-[var(--color-primary-100)] text-[var(--color-primary-700)] rounded-full text-sm font-medium mb-6">
              {subtitle}
            </div>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-[var(--color-neutral-900)] mb-6 leading-tight">
              {title}
            </h1>
            {description && (
              <p className="text-lg lg:text-xl text-[var(--color-neutral-700)] mb-8 max-w-xl">
                {description}
              </p>
            )}
            <div className="flex flex-wrap gap-4">
              {primaryCta && (
                <Button variant="primary" size="lg" onClick={primaryCta.onClick}>
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button variant="ghost" size="lg" onClick={secondaryCta.onClick}>
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-square lg:aspect-[4/3] rounded-[24px] overflow-hidden shadow-[var(--shadow-xl)]">
              <ImageWithFallback
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
