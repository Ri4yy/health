import React from 'react';
import { Search, AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'text' | 'search';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, variant = 'text', className = '', ...props }, ref) => {
    const inputId = React.useId();
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block mb-2 text-sm font-medium text-[var(--color-neutral-800)]">
            {label}
          </label>
        )}
        <div className="relative">
          {variant === 'search' && (
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-neutral-400)]" />
          )}
          <input
            id={inputId}
            ref={ref}
            className={`w-full px-4 py-2.5 rounded-[12px] border transition-all duration-200 
              ${variant === 'search' ? 'pl-10' : ''} 
              ${error 
                ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-2 focus:ring-[var(--color-error-light)]' 
                : 'border-[var(--color-neutral-200)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-100)]'
              }
              placeholder:text-[var(--color-neutral-400)] 
              disabled:bg-[var(--color-neutral-50)] disabled:cursor-not-allowed
              outline-none bg-white
              ${className}`}
            {...props}
          />
          {error && (
            <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-error)]" />
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-[var(--color-error)] flex items-center gap-1">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-[var(--color-neutral-600)]">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    const textareaId = React.useId();
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block mb-2 text-sm font-medium text-[var(--color-neutral-800)]">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={`w-full px-4 py-2.5 rounded-[12px] border transition-all duration-200 min-h-[100px]
            ${error 
              ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-2 focus:ring-[var(--color-error-light)]' 
              : 'border-[var(--color-neutral-200)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-100)]'
            }
            placeholder:text-[var(--color-neutral-400)] 
            disabled:bg-[var(--color-neutral-50)] disabled:cursor-not-allowed
            outline-none bg-white resize-y
            ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-sm text-[var(--color-error)]">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-[var(--color-neutral-600)]">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, className = '', ...props }, ref) => {
    const selectId = React.useId();
    
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block mb-2 text-sm font-medium text-[var(--color-neutral-800)]">
            {label}
          </label>
        )}
        <select
          id={selectId}
          ref={ref}
          className={`w-full px-4 py-2.5 rounded-[12px] border transition-all duration-200 
            ${error 
              ? 'border-[var(--color-error)] focus:border-[var(--color-error)] focus:ring-2 focus:ring-[var(--color-error-light)]' 
              : 'border-[var(--color-neutral-200)] focus:border-[var(--color-primary-500)] focus:ring-2 focus:ring-[var(--color-primary-100)]'
            }
            disabled:bg-[var(--color-neutral-50)] disabled:cursor-not-allowed
            outline-none bg-white cursor-pointer
            ${className}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="mt-1.5 text-sm text-[var(--color-error)]">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1.5 text-sm text-[var(--color-neutral-600)]">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
