'use client';

import React from 'react';
import { FormField as FormFieldType, FormTheme } from '@/types/form';
import { TextField } from './TextField';
import { TextAreaField } from './TextAreaField';
import { SelectField } from './SelectField';
import { RadioField } from './RadioField';
import { CheckboxField } from './CheckboxField';
import { FileField } from './FileField';

interface FormFieldProps {
  field: FormFieldType;
  value?: any;
  onChange?: (value: any) => void;
  error?: string;
  theme: FormTheme;
  disabled?: boolean;
}

export function FormField({
  field,
  value,
  onChange,
  error,
  theme,
  disabled = false,
}: FormFieldProps) {
  const commonProps = {
    field,
    value,
    onChange,
    error,
    theme,
    disabled,
  };

  switch (field.type) {
    case 'text':
    case 'email':
    case 'number':
    case 'phone':
    case 'url':
    case 'date':
      return <TextField {...commonProps} />;

    case 'textarea':
      return <TextAreaField {...commonProps} />;

    case 'select':
      return <SelectField {...commonProps} />;

    case 'radio':
      return <RadioField {...commonProps} />;

    case 'checkbox':
      return <CheckboxField {...commonProps} />;

    case 'file':
      return <FileField {...commonProps} />;

    default:
      return (
        <div className="p-4 border border-red-300 bg-red-50 rounded-md">
          <p className="text-red-600">
            Unsupported field type: {field.type}
          </p>
        </div>
      );
  }
}
