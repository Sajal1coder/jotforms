'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { FormField as FormFieldType, FormTheme, FormMode } from '@/types/form';
import { SortableFormField } from './SortableFormField';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';

interface FormCanvasProps {
  fields: FormFieldType[];
  theme: FormTheme;
  mode: FormMode;
  selectedFieldId?: string;
  onFieldSelect?: (fieldId: string) => void;
  onFieldUpdate?: (fieldId: string, updates: Partial<FormFieldType>) => void;
  onFieldDelete?: (fieldId: string) => void;
  formData?: Record<string, any>;
  onFormDataChange?: (data: Record<string, any>) => void;
  errors?: Record<string, string>;
}

export function FormCanvas({
  fields,
  theme,
  mode,
  selectedFieldId,
  onFieldSelect,
  onFieldUpdate,
  onFieldDelete,
  formData = {},
  onFormDataChange,
  errors = {},
}: FormCanvasProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'form-canvas',
  });

  const handleFieldValueChange = (fieldId: string, value: any) => {
    if (onFormDataChange) {
      onFormDataChange({
        ...formData,
        [fieldId]: value,
      });
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div
        ref={setNodeRef}
        className={cn(
          'min-h-full rounded-lg border-2 border-dashed p-8 transition-colors',
          isOver && 'border-blue-400 bg-blue-50',
          fields.length === 0 && 'flex items-center justify-center'
        )}
        style={{
          borderColor: isOver ? theme.colors.primary : theme.colors.border,
          backgroundColor: isOver ? `${theme.colors.primary}10` : theme.colors.background,
        }}
      >
        {fields.length === 0 ? (
          <div className="text-center">
            <Plus
              size={48}
              className="mx-auto mb-4 opacity-50"
              style={{ color: theme.colors.textSecondary }}
            />
            <h3
              className="text-lg font-medium mb-2"
              style={{ color: theme.colors.text }}
            >
              Start Building Your Form
            </h3>
            <p style={{ color: theme.colors.textSecondary }}>
              Drag and drop form fields from the left panel to get started
            </p>
          </div>
        ) : (
          <SortableContext items={fields.map(f => f.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {fields.map((field) => (
                <SortableFormField
                  key={field.id}
                  field={field}
                  theme={theme}
                  mode={mode}
                  isSelected={selectedFieldId === field.id}
                  onSelect={() => onFieldSelect?.(field.id)}
                  onUpdate={(updates) => onFieldUpdate?.(field.id, updates)}
                  onDelete={() => onFieldDelete?.(field.id)}
                  value={formData[field.id]}
                  onChange={(value) => handleFieldValueChange(field.id, value)}
                  error={errors[field.id]}
                />
              ))}
            </div>
          </SortableContext>
        )}
      </div>
    </div>
  );
}
