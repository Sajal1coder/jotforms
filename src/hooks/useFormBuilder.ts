'use client';

import { useState, useCallback, useEffect } from 'react';
import { FormConfig, FormField, FormTheme } from '@/types/form';
import { defaultThemes } from '@/lib/themes';
import { generateId, debounce } from '@/lib/utils';

interface UseFormBuilderOptions {
  initialConfig?: Partial<FormConfig>;
  autoSave?: boolean;
  autoSaveDelay?: number;
  onSave?: (config: FormConfig) => void;
}

export function useFormBuilder({
  initialConfig,
  autoSave = true,
  autoSaveDelay = 2000,
  onSave,
}: UseFormBuilderOptions = {}) {
  const [formConfig, setFormConfig] = useState<FormConfig>(() => ({
    id: generateId(),
    title: 'Untitled Form',
    description: '',
    fields: [],
    theme: defaultThemes[0],
    settings: {
      submitButtonText: 'Submit',
      successMessage: 'Thank you for your submission!',
      allowMultipleSubmissions: false,
      showProgressBar: true,
      enableAutoSave: true,
    },
    ...initialConfig,
  }));

  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Debounced auto-save function
  const debouncedSave = useCallback(
    debounce((config: FormConfig) => {
      if (autoSave && onSave) {
        onSave(config);
        setLastSaved(new Date());
        setIsDirty(false);
      }
    }, autoSaveDelay),
    [autoSave, onSave, autoSaveDelay]
  );

  // Update form config and trigger auto-save
  const updateFormConfig = useCallback((updates: Partial<FormConfig> | ((prev: FormConfig) => FormConfig)) => {
    setFormConfig(prev => {
      const newConfig = typeof updates === 'function' ? updates(prev) : { ...prev, ...updates };
      setIsDirty(true);
      
      if (autoSave) {
        debouncedSave(newConfig);
      }
      
      return newConfig;
    });
  }, [autoSave, debouncedSave]);

  // Add a new field
  const addField = useCallback((field: FormField) => {
    updateFormConfig(prev => ({
      ...prev,
      fields: [...prev.fields, field],
    }));
  }, [updateFormConfig]);

  // Update a specific field
  const updateField = useCallback((fieldId: string, updates: Partial<FormField>) => {
    updateFormConfig(prev => ({
      ...prev,
      fields: prev.fields.map(field =>
        field.id === fieldId ? { ...field, ...updates } : field
      ),
    }));
  }, [updateFormConfig]);

  // Delete a field
  const deleteField = useCallback((fieldId: string) => {
    updateFormConfig(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId),
    }));
  }, [updateFormConfig]);

  // Reorder fields
  const reorderFields = useCallback((fromIndex: number, toIndex: number) => {
    updateFormConfig(prev => {
      const newFields = [...prev.fields];
      const [movedField] = newFields.splice(fromIndex, 1);
      newFields.splice(toIndex, 0, movedField);
      
      return {
        ...prev,
        fields: newFields,
      };
    });
  }, [updateFormConfig]);

  // Update theme
  const updateTheme = useCallback((theme: FormTheme) => {
    updateFormConfig(prev => ({
      ...prev,
      theme,
    }));
  }, [updateFormConfig]);

  // Manual save
  const save = useCallback(() => {
    if (onSave) {
      onSave(formConfig);
      setLastSaved(new Date());
      setIsDirty(false);
    }
  }, [formConfig, onSave]);

  // Load form config
  const loadFormConfig = useCallback((config: FormConfig) => {
    setFormConfig(config);
    setIsDirty(false);
    setLastSaved(new Date());
  }, []);

  // Reset form
  const resetForm = useCallback(() => {
    setFormConfig({
      id: generateId(),
      title: 'Untitled Form',
      description: '',
      fields: [],
      theme: defaultThemes[0],
      settings: {
        submitButtonText: 'Submit',
        successMessage: 'Thank you for your submission!',
        allowMultipleSubmissions: false,
        showProgressBar: true,
        enableAutoSave: true,
      },
    });
    setIsDirty(false);
    setLastSaved(null);
  }, []);

  // Get field by ID
  const getField = useCallback((fieldId: string): FormField | undefined => {
    return formConfig.fields.find(field => field.id === fieldId);
  }, [formConfig.fields]);

  // Duplicate field
  const duplicateField = useCallback((fieldId: string) => {
    const field = getField(fieldId);
    if (field) {
      const duplicatedField: FormField = {
        ...field,
        id: generateId(),
        label: `${field.label} (Copy)`,
      };
      
      const fieldIndex = formConfig.fields.findIndex(f => f.id === fieldId);
      updateFormConfig(prev => ({
        ...prev,
        fields: [
          ...prev.fields.slice(0, fieldIndex + 1),
          duplicatedField,
          ...prev.fields.slice(fieldIndex + 1),
        ],
      }));
    }
  }, [formConfig.fields, getField, updateFormConfig]);

  return {
    // State
    formConfig,
    isDirty,
    lastSaved,
    
    // Actions
    updateFormConfig,
    addField,
    updateField,
    deleteField,
    reorderFields,
    updateTheme,
    duplicateField,
    
    // Utilities
    save,
    loadFormConfig,
    resetForm,
    getField,
  };
}
