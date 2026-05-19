"use client";
import React from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps {
  id?: string;
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  className = '',
}) => {
  const checkboxId = id || React.useId();
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;
  
  const handleChange = (newChecked: boolean) => {
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  };
  
  return (
    <div className={`flex items-center ${className}`}>
      <div className="relative flex items-center">
        <input
          type="checkbox"
          id={checkboxId}
          checked={isChecked}
          onChange={(e) => handleChange(e.target.checked)}
          disabled={disabled}
          className="peer sr-only"
        />
        <label
          htmlFor={checkboxId}
          className={`
            w-5 h-5 rounded-[6px] border-2 transition-all duration-200 cursor-pointer
            flex items-center justify-center
            ${isChecked 
              ? 'bg-[var(--color-primary-500)] border-[var(--color-primary-500)]' 
              : 'bg-white border-[var(--color-neutral-300)] hover:border-[var(--color-primary-500)]'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            peer-focus:ring-2 peer-focus:ring-[var(--color-primary-100)]
          `}
        >
          {isChecked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
        </label>
      </div>
      {label && (
        <label
          htmlFor={checkboxId}
          className={`ml-2 text-sm text-[var(--color-neutral-800)] cursor-pointer select-none ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};