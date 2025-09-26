'use client';

import React, { useRef } from 'react';
import { FormField, FormTheme } from '@/types/form';
import { BaseField, getFieldStyles } from './BaseField';
import { cn } from '@/lib/utils';
import { Upload, X, File } from 'lucide-react';

interface FileFieldProps {
  field: FormField;
  value?: File[];
  onChange?: (value: File[]) => void;
  error?: string;
  theme: FormTheme;
  disabled?: boolean;
}

export function FileField({
  field,
  value = [],
  onChange,
  error,
  theme,
  disabled = false,
}: FileFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const styles = getFieldStyles(field, theme, !!error);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    onChange?.(files);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange?.(newFiles);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onChange?.(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
      <div>
        <input
          ref={fileInputRef}
          type="file"
          id={field.id}
          name={field.id}
          onChange={handleFileChange}
          disabled={disabled}
          required={field.required}
          multiple
          className="sr-only"
        />
        
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors hover:bg-opacity-50',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          style={{
            borderColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
          }}
          onClick={() => !disabled && fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Upload
            size={32}
            className="mx-auto mb-2"
            style={{ color: theme.colors.textSecondary }}
          />
          <p style={{ color: theme.colors.text }}>
            Click to upload or drag and drop files here
          </p>
          <p
            className="text-sm mt-1"
            style={{ color: theme.colors.textSecondary }}
          >
            {field.placeholder || 'Select files to upload'}
          </p>
        </div>

        {value.length > 0 && (
          <div className="mt-4 space-y-2">
            {value.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg"
                style={{ backgroundColor: theme.colors.surface }}
              >
                <div className="flex items-center space-x-3">
                  <File
                    size={20}
                    style={{ color: theme.colors.textSecondary }}
                  />
                  <div>
                    <p
                      className="font-medium"
                      style={{ color: theme.colors.text }}
                    >
                      {file.name}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(index)}
                  disabled={disabled}
                  className="p-1 rounded-full hover:bg-red-100 transition-colors"
                  style={{ color: theme.colors.error }}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </BaseField>
  );
}
