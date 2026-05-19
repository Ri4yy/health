"use client";
import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  type?: 'success' | 'error' | 'info';
  message: string;
  duration?: number;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  message,
  duration = 3000,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-[var(--color-success)]" />,
    error: <AlertCircle className="w-5 h-5 text-[var(--color-error)]" />,
    info: <Info className="w-5 h-5 text-[var(--color-info)]" />,
  };

  const backgrounds = {
    success: 'bg-[var(--color-success-light)] border-[var(--color-success)]',
    error: 'bg-[var(--color-error-light)] border-[var(--color-error)]',
    info: 'bg-[var(--color-info-light)] border-[var(--color-info)]',
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-[12px] border shadow-[var(--shadow-lg)] min-w-[300px] max-w-md ${backgrounds[type]} animate-slide-in-right`}
    >
      {icons[type]}
      <p className="flex-1 text-sm font-medium text-[var(--color-neutral-900)]">{message}</p>
      <button
        onClick={onClose}
        className="text-[var(--color-neutral-600)] hover:text-[var(--color-neutral-900)] transition-colors"
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export interface ToastContainerProps {
  toasts: Array<{ id: string; type: 'success' | 'error' | 'info'; message: string }>;
  onRemove: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          type={toast.type}
          message={toast.message}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
};
