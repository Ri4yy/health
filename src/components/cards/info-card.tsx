import React from 'react';

export interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  link?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({ icon, title, value, link }) => {
  const content = (
    <>
      <div className="w-12 h-12 bg-[var(--color-primary-100)] rounded-full flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="text-sm text-[var(--color-neutral-600)] mb-2">{title}</h3>
      <p className="text-base font-semibold text-[var(--color-neutral-900)]">{value}</p>
    </>
  );

  if (link) {
    return (
      <a
        href={link}
        className="block bg-white rounded-[12px] p-6 border border-[var(--color-neutral-200)] hover:border-[var(--color-primary-500)] hover:shadow-[var(--shadow-md)] transition-all"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="bg-white rounded-[12px] p-6 border border-[var(--color-neutral-200)]">
      {content}
    </div>
  );
};
