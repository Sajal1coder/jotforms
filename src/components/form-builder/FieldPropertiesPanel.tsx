'use client';

import React, { useState } from 'react';
import { FormField, FormTheme, ValidationRule } from '@/types/form';
import { cn } from '@/lib/utils';
import { X, Plus, Trash2 } from 'lucide-react';

interface FieldPropertiesPanelProps {
  field: FormField | null;
  theme: FormTheme;
  onUpdate: (updates: Partial<FormField>) => void;
  onClose: () => void;
}

export function FieldPropertiesPanel({
  field,
  theme,
  onUpdate,
  onClose,
}: FieldPropertiesPanelProps) {
  const [activeTab, setActiveTab] = useState<'general' | 'validation' | 'style'>('general');

  if (!field) return null;

  const handleBasicUpdate = (key: keyof FormField, value: any) => {
    onUpdate({ [key]: value });
  };

  const handlePropertiesUpdate = (key: keyof FormField['properties'], value: any) => {
    onUpdate({
      properties: {
        ...field.properties,
        [key]: value,
      },
    });
  };

  const handleStyleUpdate = (key: keyof FormField['properties']['style'], value: any) => {
    onUpdate({
      properties: {
        ...field.properties,
        style: {
          ...field.properties.style,
          [key]: value,
        },
      },
    });
  };

  const handleValidationUpdate = (rules: ValidationRule[]) => {
    onUpdate({ validation: rules });
  };

  const addValidationRule = () => {
    const newRule: ValidationRule = {
      type: 'required',
      message: 'This field is required',
    };
    const currentRules = field.validation || [];
    handleValidationUpdate([...currentRules, newRule]);
  };

  const updateValidationRule = (index: number, updates: Partial<ValidationRule>) => {
    const currentRules = field.validation || [];
    const newRules = [...currentRules];
    newRules[index] = { ...newRules[index], ...updates };
    handleValidationUpdate(newRules);
  };

  const removeValidationRule = (index: number) => {
    const currentRules = field.validation || [];
    const newRules = currentRules.filter((_, i) => i !== index);
    handleValidationUpdate(newRules);
  };

  const addOption = () => {
    const currentOptions = field.options || [];
    const newOptions = [...currentOptions, `Option ${currentOptions.length + 1}`];
    handleBasicUpdate('options', newOptions);
  };

  const updateOption = (index: number, value: string) => {
    const currentOptions = field.options || [];
    const newOptions = [...currentOptions];
    newOptions[index] = value;
    handleBasicUpdate('options', newOptions);
  };

  const removeOption = (index: number) => {
    const currentOptions = field.options || [];
    const newOptions = currentOptions.filter((_, i) => i !== index);
    handleBasicUpdate('options', newOptions);
  };

  const tabs = [
    { id: 'general', label: 'General' },
    { id: 'validation', label: 'Validation' },
    { id: 'style', label: 'Style' },
  ] as const;

  return (
    <div
      className="w-80 h-full border-l overflow-y-auto"
      style={{
        borderColor: theme.colors.border,
        backgroundColor: theme.colors.background,
      }}
    >
      {/* Header */}
      <div
        className="p-4 border-b flex items-center justify-between"
        style={{ borderColor: theme.colors.border }}
      >
        <h3
          className="font-semibold"
          style={{ color: theme.colors.text }}
        >
          Field Properties
        </h3>
        <button
          onClick={onClose}
          className="p-1 rounded hover:bg-gray-100"
        >
          <X size={20} style={{ color: theme.colors.textSecondary }} />
        </button>
      </div>

      {/* Tabs */}
      <div
        className="flex border-b"
        style={{ borderColor: theme.colors.border }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'flex-1 px-4 py-2 text-sm font-medium border-b-2 transition-colors',
              activeTab === tab.id
                ? 'border-current'
                : 'border-transparent hover:bg-gray-50'
            )}
            style={{
              color: activeTab === tab.id ? theme.colors.primary : theme.colors.textSecondary,
              borderBottomColor: activeTab === tab.id ? theme.colors.primary : 'transparent',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {activeTab === 'general' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                Label
              </label>
              <input
                type="text"
                value={field.label}
                onChange={(e) => handleBasicUpdate('label', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                style={{
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.surface,
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                Placeholder
              </label>
              <input
                type="text"
                value={field.placeholder || ''}
                onChange={(e) => handleBasicUpdate('placeholder', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                style={{
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.surface,
                }}
              />
            </div>

            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={(e) => handleBasicUpdate('required', e.target.checked)}
                />
                <span className="text-sm font-medium" style={{ color: theme.colors.text }}>
                  Required field
                </span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                Width
              </label>
              <select
                value={field.properties.width}
                onChange={(e) => handlePropertiesUpdate('width', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                style={{
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.surface,
                }}
              >
                <option value="full">Full Width</option>
                <option value="half">Half Width</option>
                <option value="third">Third Width</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                Size
              </label>
              <select
                value={field.properties.size}
                onChange={(e) => handlePropertiesUpdate('size', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                style={{
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.surface,
                }}
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            {/* Options for select, radio, checkbox */}
            {(['select', 'radio', 'checkbox'].includes(field.type)) && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium" style={{ color: theme.colors.text }}>
                    Options
                  </label>
                  <button
                    onClick={addOption}
                    className="p-1 rounded hover:bg-gray-100"
                    style={{ color: theme.colors.primary }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="space-y-2">
                  {(field.options || []).map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        className="flex-1 px-3 py-2 border rounded-md text-sm"
                        style={{
                          borderColor: theme.colors.border,
                          backgroundColor: theme.colors.surface,
                        }}
                      />
                      <button
                        onClick={() => removeOption(index)}
                        className="p-1 rounded hover:bg-red-100"
                        style={{ color: theme.colors.error }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'validation' && (
          <>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium" style={{ color: theme.colors.text }}>
                Validation Rules
              </h4>
              <button
                onClick={addValidationRule}
                className="px-3 py-1 text-sm rounded"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.background,
                }}
              >
                Add Rule
              </button>
            </div>

            <div className="space-y-4">
              {(field.validation || []).map((rule, index) => (
                <div
                  key={index}
                  className="p-3 border rounded-md"
                  style={{
                    borderColor: theme.colors.border,
                    backgroundColor: theme.colors.surface,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <select
                      value={rule.type}
                      onChange={(e) => updateValidationRule(index, { type: e.target.value as any })}
                      className="text-sm border rounded px-2 py-1"
                    >
                      <option value="required">Required</option>
                      <option value="minLength">Min Length</option>
                      <option value="maxLength">Max Length</option>
                      <option value="min">Min Value</option>
                      <option value="max">Max Value</option>
                      <option value="pattern">Pattern</option>
                    </select>
                    <button
                      onClick={() => removeValidationRule(index)}
                      className="p-1 rounded hover:bg-red-100"
                      style={{ color: theme.colors.error }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>

                  {rule.type !== 'required' && (
                    <input
                      type={rule.type === 'pattern' ? 'text' : 'number'}
                      value={rule.value || ''}
                      onChange={(e) => updateValidationRule(index, { value: e.target.value })}
                      placeholder={rule.type === 'pattern' ? 'Regular expression' : 'Value'}
                      className="w-full px-2 py-1 text-sm border rounded mb-2"
                    />
                  )}

                  <input
                    type="text"
                    value={rule.message}
                    onChange={(e) => updateValidationRule(index, { message: e.target.value })}
                    placeholder="Error message"
                    className="w-full px-2 py-1 text-sm border rounded"
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'style' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                Background Color
              </label>
              <input
                type="color"
                value={field.properties.style.backgroundColor || theme.colors.surface}
                onChange={(e) => handleStyleUpdate('backgroundColor', e.target.value)}
                className="w-full h-10 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                Text Color
              </label>
              <input
                type="color"
                value={field.properties.style.textColor || theme.colors.text}
                onChange={(e) => handleStyleUpdate('textColor', e.target.value)}
                className="w-full h-10 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                Border Color
              </label>
              <input
                type="color"
                value={field.properties.style.borderColor || theme.colors.border}
                onChange={(e) => handleStyleUpdate('borderColor', e.target.value)}
                className="w-full h-10 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                Border Radius
              </label>
              <select
                value={field.properties.style.borderRadius || theme.borderRadius.md}
                onChange={(e) => handleStyleUpdate('borderRadius', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="0">None</option>
                <option value="0.25rem">Small</option>
                <option value="0.375rem">Medium</option>
                <option value="0.5rem">Large</option>
                <option value="9999px">Full</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                Font Size
              </label>
              <select
                value={field.properties.style.fontSize || theme.typography.fontSize.base}
                onChange={(e) => handleStyleUpdate('fontSize', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="0.75rem">Extra Small</option>
                <option value="0.875rem">Small</option>
                <option value="1rem">Medium</option>
                <option value="1.125rem">Large</option>
                <option value="1.25rem">Extra Large</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                Font Weight
              </label>
              <select
                value={field.properties.style.fontWeight || theme.typography.fontWeight.normal}
                onChange={(e) => handleStyleUpdate('fontWeight', e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="400">Normal</option>
                <option value="500">Medium</option>
                <option value="600">Semi Bold</option>
                <option value="700">Bold</option>
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
