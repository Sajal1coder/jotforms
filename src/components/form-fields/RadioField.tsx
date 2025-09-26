'use client';

import React from 'react';
import { FormField, FormTheme } from '@/types/form';
import { BaseField } from './BaseField';
import { cn } from '@/lib/utils';

interface RadioFieldProps {
  field: FormField;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  theme: FormTheme;
  disabled?: boolean;
}

export function RadioField({
  field,
  value = '',
  onChange,
  error,
  theme,
  disabled = false,
}: RadioFieldProps) {
  const handleChange = (optionValue: string) => {
    onChange?.(optionValue);
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
        {field.options?.map((option, index) => (
          <label
            key={index}
            className={cn(
              'flex items-center space-x-3 cursor-pointer',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <input
              type="radio"
              name={field.id}
              value={option}
              checked={value === option}
              onChange={() => handleChange(option)}
              disabled={disabled}
              required={field.required}
              className="sr-only"
            />
            <div
              className={cn(
                'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
                value === option ? 'border-current' : 'border-gray-300'
              )}
              style={{
                borderColor: value === option ? theme.colors.primary : theme.colors.border,
                backgroundColor: value === option ? theme.colors.primary : 'transparent',
              }}
            >
              {value === option && (
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: theme.colors.background }}
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
        ))}
      </div>
    </BaseField>
  );
}
