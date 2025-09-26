'use client';

import React, { useState, useCallback } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { FormField, FormTheme, FormMode, FormConfig, FormFieldType } from '@/types/form';
import { defaultThemes } from '@/lib/themes';
import { generateId } from '@/lib/utils';
import { FieldPalette } from './FieldPalette';
import { FormCanvas } from './FormCanvas';
import { FieldPropertiesPanel } from './FieldPropertiesPanel';
import { ThemeSelector } from './ThemeSelector';
import { FormPreview } from './FormPreview';
import { cn } from '@/lib/utils';
import { Eye, Edit, Save, Settings, Smartphone, Monitor } from 'lucide-react';

interface FormBuilderProps {
  initialConfig?: Partial<FormConfig>;
  onSave?: (config: FormConfig) => void;
}

export function FormBuilder({ initialConfig, onSave }: FormBuilderProps) {
  const [mode, setMode] = useState<FormMode>('edit');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);
  const [formConfig, setFormConfig] = useState<FormConfig>({
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
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const createDefaultField = useCallback((type: FormFieldType): FormField => {
    const baseField: FormField = {
      id: generateId(),
      type,
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: `Enter ${type}`,
      required: false,
      validation: [],
      properties: {
        width: 'full',
        size: 'medium',
        style: {
          backgroundColor: '',
          textColor: '',
          borderColor: '',
          borderRadius: '',
          fontSize: '',
          fontWeight: '',
          padding: '',
        },
      },
    };

    // Add default options for select, radio, and checkbox fields
    if (['select', 'radio', 'checkbox'].includes(type)) {
      baseField.options = ['Option 1', 'Option 2', 'Option 3'];
    }

    return baseField;
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    // Optional: Add visual feedback when dragging starts
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Optional: Add visual feedback during drag
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    // Handle dropping field type from palette
    if (active.data.current?.type === 'field-type' && over.id === 'form-canvas') {
      const fieldType = active.data.current.fieldType as FormFieldType;
      const newField = createDefaultField(fieldType);
      
      setFormConfig(prev => ({
        ...prev,
        fields: [...prev.fields, newField],
      }));
      
      setSelectedFieldId(newField.id);
      return;
    }

    // Handle reordering fields
    if (active.id !== over.id) {
      const activeIndex = formConfig.fields.findIndex(field => field.id === active.id);
      const overIndex = formConfig.fields.findIndex(field => field.id === over.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        setFormConfig(prev => ({
          ...prev,
          fields: arrayMove(prev.fields, activeIndex, overIndex),
        }));
      }
    }
  };

  const handleFieldUpdate = (fieldId: string, updates: Partial<FormField>) => {
    setFormConfig(prev => ({
      ...prev,
      fields: prev.fields.map(field =>
        field.id === fieldId ? { ...field, ...updates } : field
      ),
    }));
  };

  const handleFieldDelete = (fieldId: string) => {
    setFormConfig(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId),
    }));
    
    if (selectedFieldId === fieldId) {
      setSelectedFieldId(null);
    }
  };

  const handleThemeChange = (theme: FormTheme) => {
    setFormConfig(prev => ({
      ...prev,
      theme,
    }));
  };

  const handleSave = () => {
    onSave?.(formConfig);
  };

  const selectedField = selectedFieldId 
    ? formConfig.fields.find(field => field.id === selectedFieldId) 
    : null;

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: formConfig.theme.colors.background }}>
      {/* Header */}
      <header
        className="border-b px-6 py-4 flex items-center justify-between"
        style={{ borderColor: formConfig.theme.colors.border }}
      >
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={formConfig.title}
            onChange={(e) => setFormConfig(prev => ({ ...prev, title: e.target.value }))}
            className="text-xl font-bold bg-transparent border-none outline-none"
            style={{ color: formConfig.theme.colors.text }}
            placeholder="Form Title"
          />
        </div>

        <div className="flex items-center space-x-4">
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('desktop')}
              className={cn(
                'p-2 rounded',
                viewMode === 'desktop' ? 'bg-blue-100' : 'hover:bg-gray-100'
              )}
            >
              <Monitor size={20} />
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={cn(
                'p-2 rounded',
                viewMode === 'mobile' ? 'bg-blue-100' : 'hover:bg-gray-100'
              )}
            >
              <Smartphone size={20} />
            </button>
          </div>

          {/* Theme Selector */}
          <ThemeSelector
            currentTheme={formConfig.theme}
            onThemeChange={handleThemeChange}
          />

          {/* Mode Toggle */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMode('edit')}
              className={cn(
                'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
                mode === 'edit'
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100'
              )}
            >
              <Edit size={20} />
              <span>Edit</span>
            </button>
            <button
              onClick={() => setMode('preview')}
              className={cn(
                'flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors',
                mode === 'preview'
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-100'
              )}
            >
              <Eye size={20} />
              <span>Preview</span>
            </button>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: formConfig.theme.colors.primary }}
          >
            <Save size={20} />
            <span>Save</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {mode === 'edit' ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            {/* Field Palette */}
            <FieldPalette theme={formConfig.theme} />

            {/* Form Canvas */}
            <div
              className={cn(
                'flex-1 transition-all duration-300',
                viewMode === 'mobile' ? 'max-w-md mx-auto' : ''
              )}
            >
              <FormCanvas
                fields={formConfig.fields}
                theme={formConfig.theme}
                mode={mode}
                selectedFieldId={selectedFieldId}
                onFieldSelect={setSelectedFieldId}
                onFieldUpdate={handleFieldUpdate}
                onFieldDelete={handleFieldDelete}
              />
            </div>

            {/* Properties Panel */}
            {selectedField && (
              <FieldPropertiesPanel
                field={selectedField}
                theme={formConfig.theme}
                onUpdate={(updates) => handleFieldUpdate(selectedField.id, updates)}
                onClose={() => setSelectedFieldId(null)}
              />
            )}
          </DndContext>
        ) : (
          /* Preview Mode */
          <div
            className={cn(
              'flex-1 overflow-y-auto',
              viewMode === 'mobile' ? 'max-w-md mx-auto' : ''
            )}
          >
            <FormPreview
              title={formConfig.title}
              description={formConfig.description}
              fields={formConfig.fields}
              theme={formConfig.theme}
              settings={formConfig.settings}
              onSubmit={(data) => {
                console.log('Form submitted:', data);
                alert('Form submitted successfully!');
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
