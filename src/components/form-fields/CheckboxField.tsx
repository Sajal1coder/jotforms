'use client';

import React from 'react';
import { FormField, FormTheme } from '@/types/form';
import { BaseField } from './BaseField';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface CheckboxFieldProps {
  field: FormField;
  value?: string[];
  onChange?: (value: string[]) => void;
  error?: string;
  theme: FormTheme;
  disabled?: boolean;
}

export function CheckboxField({
  field,
  value = [],
  onChange,
  error,
  theme,
  disabled = false,
}: CheckboxFieldProps) {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange?.([...value, optionValue]);
    } else {
      onChange?.(value.filter(v => v !== optionValue));
    }
  };

  return (
    <BaseField
      field={field}
      value={value}
      onChange={onChange}
      error={error}
      theme={theme}
      disabled={disabled}
    >
      <div className="space-y-2">
        {field.options?.map((option, index) => {
          const isChecked = value.includes(option);
          
          return (
            <label
              key={index}
              className={cn(
                'flex items-center space-x-3 cursor-pointer',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <input
                type="checkbox"
                name={field.id}
                value={option}
                checked={isChecked}
                onChange={(e) => handleChange(option, e.target.checked)}
                disabled={disabled}
                required={field.required && value.length === 0}
                className="sr-only"
              />
              <div
                className={cn(
                  'w-4 h-4 border-2 flex items-center justify-center transition-colors',
                  isChecked ? 'border-current' : 'border-gray-300'
                )}
                style={{
                  borderColor: isChecked ? theme.colors.primary : theme.colors.border,
                  backgroundColor: isChecked ? theme.colors.primary : 'transparent',
                  borderRadius: theme.borderRadius.sm,
                }}
              >
                {isChecked && (
                  <Check
                    size={12}
                    style={{ color: theme.colors.background }}
                  />
                )}
              </div>
              <span
                style={{
                  color: theme.colors.text,
                  fontSize: theme.typography.fontSize.base,
                }}
              >
                {option}
              </span>
            </label>
          );
        })}
      </div>
    </BaseField>
  );
}
