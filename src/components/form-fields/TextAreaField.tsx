'use client';

import React from 'react';
import { FormField, FormTheme } from '@/types/form';
import { BaseField, getFieldStyles } from './BaseField';
import { cn } from '@/lib/utils';

interface TextAreaFieldProps {
  field: FormField;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  theme: FormTheme;
  disabled?: boolean;
}

export function TextAreaField({
  field,
  value = '',
  onChange,
  error,
  theme,
  disabled = false,
}: TextAreaFieldProps) {
  const styles = getFieldStyles(field, theme, !!error);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
        id={field.id}
        name={field.id}
        value={value}
        onChange={handleChange}
        placeholder={field.placeholder}
        disabled={disabled}
        required={field.required}
        rows={4}
        className={cn(
          'w-full border-2 focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors resize-vertical',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        style={{
          ...styles,
          borderWidth: '2px',
          borderStyle: 'solid',
          minHeight: '100px',
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
