import React from 'react';

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          checked={value === option.value}
          onChange={() => onChange?.(option.value)}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export interface RadioProps {
  name: string;
  value: string;
  label: string;
  checked?: boolean;
  onChange?: () => void;
  disabled?: boolean;
}

export const Radio: React.FC<RadioProps> = ({
  name,
  value,
  label,
  checked = false,
  onChange,
  disabled = false,
}) => {
  const radioId = React.useId();
  
  return (
    <div className="flex items-center">
      <div className="relative flex items-center">
        <input
          type="radio"
          id={radioId}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer sr-only"
        />
        <label
          htmlFor={radioId}
          className={`
            w-5 h-5 rounded-full border-2 transition-all duration-200 cursor-pointer
            flex items-center justify-center
            ${checked 
              ? 'border-[var(--color-primary-500)]' 
              : 'border-[var(--color-neutral-300)] hover:border-[var(--color-primary-500)]'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            peer-focus:ring-2 peer-focus:ring-[var(--color-primary-100)]
            bg-white
          `}
        >
          {checked && (
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--color-primary-500)]" />
          )}
        </label>
      </div>
      <label
        htmlFor={radioId}
        className={`ml-2 text-sm text-[var(--color-neutral-800)] cursor-pointer select-none ${
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {label}
      </label>
    </div>
  );
};
