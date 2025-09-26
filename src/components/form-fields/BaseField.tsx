'use client';

import React from 'react';
import { FormField, FormTheme } from '@/types/form';
import { cn } from '@/lib/utils';

interface BaseFieldProps {
  field: FormField;
  value?: any;
  onChange?: (value: any) => void;
  error?: string;
  theme: FormTheme;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function BaseField({
  field,
  value,
  onChange,
  error,
  theme,
  disabled = false,
  className,
  children,
}: BaseFieldProps) {
  const widthClass = {
    full: 'w-full',
    half: 'w-full md:w-1/2',
    third: 'w-full md:w-1/3',
  }[field.properties.width];

  const sizeClass = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  }[field.properties.size];

  return (
    <div className={cn('mb-4', widthClass, className)}>
      <label
        htmlFor={field.id}
        className={cn(
          'block font-medium mb-2',
          sizeClass,
          error ? 'text-red-600' : ''
        )}
        style={{
          color: error ? theme.colors.error : theme.colors.text,
          fontSize: theme.typography.fontSize[field.properties.size === 'small' ? 'sm' : field.properties.size === 'large' ? 'lg' : 'base'],
          fontWeight: theme.typography.fontWeight.medium,
        }}
      >
        {field.label}
        {field.required && (
          <span className="text-red-500 ml-1">*</span>
        )}
      </label>
      
      <div className="relative">
        {children}
      </div>
      
      {error && (
        <p
          className="mt-1 text-sm"
          style={{ color: theme.colors.error }}
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function getFieldStyles(field: FormField, theme: FormTheme, hasError: boolean = false) {
  return {
    backgroundColor: field.properties.style.backgroundColor || theme.colors.surface,
    color: field.properties.style.textColor || theme.colors.text,
    borderColor: hasError 
      ? theme.colors.error 
      : field.properties.style.borderColor || theme.colors.border,
    borderRadius: field.properties.style.borderRadius || theme.borderRadius.md,
    fontSize: field.properties.style.fontSize || theme.typography.fontSize.base,
    fontWeight: field.properties.style.fontWeight || theme.typography.fontWeight.normal,
    padding: field.properties.style.padding || theme.spacing.md,
    fontFamily: theme.typography.fontFamily,
  };
}
