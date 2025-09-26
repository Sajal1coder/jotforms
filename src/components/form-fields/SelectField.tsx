'use client';

import React from 'react';
import { FormField, FormTheme } from '@/types/form';
import { BaseField, getFieldStyles } from './BaseField';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectFieldProps {
  field: FormField;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  theme: FormTheme;
  disabled?: boolean;
}

export function SelectField({
  field,
  value = '',
  onChange,
  error,
  theme,
  disabled = false,
}: SelectFieldProps) {
  const styles = getFieldStyles(field, theme, !!error);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
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
      <div className="relative">
        <select
          id={field.id}
          name={field.id}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          required={field.required}
          className={cn(
            'w-full border-2 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors appearance-none pr-10',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          style={{
            ...styles,
            borderWidth: '2px',
            borderStyle: 'solid',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = theme.colors.primary;
            e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primary}20`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = error ? theme.colors.error : theme.colors.border;
            e.target.style.boxShadow = 'none';
          }}
        >
          <option value="">
            {field.placeholder || `Select ${field.label}`}
          </option>
          {field.options?.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
          size={20}
          style={{ color: theme.colors.textSecondary }}
        />
      </div>
    </BaseField>
  );
}
