'use client';

import React from 'react';
import { FormField, FormTheme } from '@/types/form';
import { BaseField, getFieldStyles } from './BaseField';
import { cn } from '@/lib/utils';

interface TextFieldProps {
  field: FormField;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  theme: FormTheme;
  disabled?: boolean;
}

export function TextField({
  field,
  value = '',
  onChange,
  error,
  theme,
  disabled = false,
}: TextFieldProps) {
  const styles = getFieldStyles(field, theme, !!error);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const inputType = {
    text: 'text',
    email: 'email',
    number: 'number',
    phone: 'tel',
    url: 'url',
    date: 'date',
  }[field.type] || 'text';

  return (
    <BaseField
      field={field}
      value={value}
      onChange={onChange}
      error={error}
      theme={theme}
      disabled={disabled}
    >
      <input
        id={field.id}
        name={field.id}
        type={inputType}
        value={value}
        onChange={handleChange}
        placeholder={field.placeholder}
        disabled={disabled}
        required={field.required}
        className={cn(
          'w-full border-2 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors',
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
      />
    </BaseField>
  );
}
