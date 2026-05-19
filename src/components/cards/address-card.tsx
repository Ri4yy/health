import React from 'react';
import { MapPin, Edit2, Trash2 } from 'lucide-react';
import { Chip } from '../core/chip';

export interface AddressCardProps {
  id: string;
  title: string;
  address: string;
  isDefault?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
}

export const AddressCard: React.FC<AddressCardProps> = ({
  id,
  title,
  address,
  isDefault,
  onEdit,
  onDelete,
  onSelect,
  isSelected,
}) => {
  return (
    <button
      onClick={() => onSelect?.(id)}
      className={`w-full text-left bg-white rounded-[12px] p-4 border-2 transition-all ${
        isSelected
          ? 'border-[var(--color-primary-500)] bg-[var(--color-primary-50)]'
          : 'border-[var(--color-neutral-200)] hover:border-[var(--color-neutral-300)]'
      }`}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-[var(--color-primary-100)] rounded-full flex items-center justify-center shrink-0">
          <MapPin className="w-5 h-5 text-[var(--color-primary-600)]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-[var(--color-neutral-900)]">{title}</h3>
            {isDefault && (
              <Chip label="По умолчанию" variant="primary" size="sm" />
            )}
          </div>
          <p className="text-sm text-[var(--color-neutral-600)] leading-relaxed">
            {address}
          </p>
        </div>
      </div>

      {(onEdit || onDelete) && (
        <div className="flex gap-2 pt-3 border-t border-[var(--color-neutral-200)]">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(id);
              }}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-100)] rounded-[8px] transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Изменить
            </button>
          )}
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(id);
              }}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-[var(--color-error-600)] hover:bg-[var(--color-error-50)] rounded-[8px] transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Удалить
            </button>
          )}
        </div>
      )}
    </button>
  );
};
