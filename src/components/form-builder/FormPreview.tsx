'use client';

import React, { useState } from 'react';
import { FormField as FormFieldType, FormTheme, FormSettings } from '@/types/form';
import { FormField } from '@/components/form-fields';
import { validateForm, ValidationError } from '@/lib/validation';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface FormPreviewProps {
  title: string;
  description?: string;
  fields: FormFieldType[];
  theme: FormTheme;
  settings: FormSettings;
  onSubmit?: (data: Record<string, any>) => void;
}

export function FormPreview({
  title,
  description,
  fields,
  theme,
  settings,
  onSubmit,
}: FormPreviewProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value,
    }));

    // Clear field error when user starts typing
    if (errors.some(error => error.field === fieldId)) {
      setErrors(prev => prev.filter(error => error.field !== fieldId));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateForm(fields, formData);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors([]);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onSubmit?.(formData);
      setIsSubmitted(true);
      
      if (!settings.allowMultipleSubmissions) {
        // Reset form if multiple submissions not allowed
        setFormData({});
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldError = (fieldId: string): string | undefined => {
    return errors.find(error => error.field === fieldId)?.message;
  };

  const errorsByField = errors.reduce((acc, error) => {
    acc[error.field] = error.message;
    return acc;
  }, {} as Record<string, string>);

  if (isSubmitted && !settings.allowMultipleSubmissions) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <div
          className="text-center p-8 rounded-lg border"
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.success,
          }}
        >
          <CheckCircle
            size={48}
            className="mx-auto mb-4"
            style={{ color: theme.colors.success }}
          />
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: theme.colors.text }}
          >
            Thank You!
          </h2>
          <p style={{ color: theme.colors.textSecondary }}>
            {settings.successMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div
        className="rounded-lg border shadow-sm"
        style={{
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.border,
        }}
      >
        {/* Form Header */}
        <div
          className="p-6 border-b"
          style={{ borderColor: theme.colors.border }}
        >
          <h1
            className="text-2xl font-bold mb-2"
            style={{
              color: theme.colors.text,
              fontFamily: theme.typography.fontFamily,
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              className="text-lg"
              style={{ color: theme.colors.textSecondary }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Progress Bar */}
          {settings.showProgressBar && (
            <div className="mb-6">
              <div
                className="w-full bg-gray-200 rounded-full h-2"
                style={{ backgroundColor: theme.colors.border }}
              >
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: theme.colors.primary,
                    width: `${(Object.keys(formData).length / fields.length) * 100}%`,
                  }}
                />
              </div>
              <p
                className="text-sm mt-2"
                style={{ color: theme.colors.textSecondary }}
              >
                {Object.keys(formData).length} of {fields.length} fields completed
              </p>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-6">
            {fields.map((field) => (
              <FormField
                key={field.id}
                field={field}
                value={formData[field.id]}
                onChange={(value) => handleFieldChange(field.id, value)}
                error={getFieldError(field.id)}
                theme={theme}
              />
            ))}
          </div>

          {/* Global Errors */}
          {errors.length > 0 && (
            <div
              className="mt-6 p-4 rounded-lg border"
              style={{
                backgroundColor: `${theme.colors.error}10`,
                borderColor: theme.colors.error,
              }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle size={20} style={{ color: theme.colors.error }} />
                <h3
                  className="font-medium"
                  style={{ color: theme.colors.error }}
                >
                  Please fix the following errors:
                </h3>
              </div>
              <ul className="list-disc list-inside space-y-1">
                {errors.map((error, index) => (
                  <li
                    key={index}
                    className="text-sm"
                    style={{ color: theme.colors.error }}
                  >
                    {error.message}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'w-full py-3 px-6 rounded-lg font-medium transition-all',
                isSubmitting && 'opacity-50 cursor-not-allowed'
              )}
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.background,
                fontSize: theme.typography.fontSize.base,
                fontFamily: theme.typography.fontFamily,
              }}
            >
              {isSubmitting ? 'Submitting...' : settings.submitButtonText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
