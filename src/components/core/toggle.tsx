"use client";
import React from 'react';

export interface ToggleProps {
  id?: string;
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  id,
  label,
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  className = '',
}) => {
  const toggleId = id || React.useId();
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
      <div className="relative">
        <input
          type="checkbox"
          id={toggleId}
          checked={isChecked}
          onChange={(e) => handleChange(e.target.checked)}
          disabled={disabled}
          className="peer sr-only"
        />
        <label
          htmlFor={toggleId}
          className={`
            block w-11 h-6 rounded-full transition-all duration-200 cursor-pointer
            ${isChecked ? 'bg-[var(--color-primary-500)]' : 'bg-[var(--color-neutral-300)]'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
            peer-focus:ring-2 peer-focus:ring-[var(--color-primary-100)]
          `}
        >
          <div
            className={`
              absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200
              ${isChecked ? 'translate-x-5' : 'translate-x-0'}
              shadow-sm
            `}
          />
        </label>
      </div>
      {label && (
        <label
          htmlFor={toggleId}
          className={`ml-3 text-sm text-[var(--color-neutral-800)] cursor-pointer select-none ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {label}
        </label>
      )}
    </div>
  );
};