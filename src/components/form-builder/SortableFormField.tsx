'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormField as FormFieldType, FormTheme, FormMode } from '@/types/form';
import { FormField } from '@/components/form-fields';
import { cn } from '@/lib/utils';
import { GripVertical, Settings, Trash2, Eye, EyeOff } from 'lucide-react';

interface SortableFormFieldProps {
  field: FormFieldType;
  theme: FormTheme;
  mode: FormMode;
  isSelected?: boolean;
  onSelect?: () => void;
  onUpdate?: (updates: Partial<FormFieldType>) => void;
  onDelete?: () => void;
  value?: any;
  onChange?: (value: any) => void;
  error?: string;
}

export function SortableFormField({
  field,
  theme,
  mode,
  isSelected = false,
  onSelect,
  onUpdate,
  onDelete,
  value,
  onChange,
  error,
}: SortableFormFieldProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: field.id,
    disabled: mode === 'preview',
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleFieldClick = (e: React.MouseEvent) => {
    if (mode === 'edit') {
      e.stopPropagation();
      onSelect?.();
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        'relative group',
        isDragging && 'opacity-50',
        mode === 'edit' && 'cursor-pointer',
        isSelected && mode === 'edit' && 'ring-2 ring-blue-500 ring-opacity-50'
      )}
      onClick={handleFieldClick}
    >
      {/* Edit Mode Controls */}
      {mode === 'edit' && (
        <div
          className={cn(
            'absolute -left-12 top-0 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity z-10',
            isSelected && 'opacity-100'
          )}
        >
          <button
            {...attributes}
            {...listeners}
            className="p-2 rounded bg-white shadow-md border hover:bg-gray-50 cursor-grab active:cursor-grabbing"
            style={{ borderColor: theme.colors.border }}
          >
            <GripVertical size={16} style={{ color: theme.colors.textSecondary }} />
          </button>
        </div>
      )}

      {/* Field Actions */}
      {mode === 'edit' && (
        <div
          className={cn(
            'absolute -right-12 top-0 flex flex-col space-y-1 opacity-0 group-hover:opacity-100 transition-opacity z-10',
            isSelected && 'opacity-100'
          )}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect?.();
            }}
            className="p-2 rounded bg-white shadow-md border hover:bg-gray-50"
            style={{ borderColor: theme.colors.border }}
            title="Edit Field"
          >
            <Settings size={16} style={{ color: theme.colors.textSecondary }} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            className="p-2 rounded bg-white shadow-md border hover:bg-red-50"
            style={{ borderColor: theme.colors.border }}
            title="Delete Field"
          >
            <Trash2 size={16} style={{ color: theme.colors.error }} />
          </button>
        </div>
      )}

      {/* Field Container */}
      <div
        className={cn(
          'relative rounded-lg transition-all',
          mode === 'edit' && 'border-2 border-transparent hover:border-gray-200',
          isSelected && mode === 'edit' && 'border-blue-300 bg-blue-50 bg-opacity-30'
        )}
        style={{
          backgroundColor: mode === 'edit' && isSelected ? `${theme.colors.primary}05` : 'transparent',
        }}
      >
        <div className="p-4">
          <FormField
            field={field}
            value={value}
            onChange={onChange}
            error={error}
            theme={theme}
            disabled={mode === 'edit'}
          />
        </div>

        {/* Field Type Badge (Edit Mode Only) */}
        {mode === 'edit' && (
          <div
            className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium"
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.background,
            }}
          >
            {field.type}
          </div>
        )}
      </div>
    </div>
  );
}
