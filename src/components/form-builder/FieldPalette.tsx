'use client';

import React from 'react';
import { FormFieldType, FormTheme } from '@/types/form';
import { useDraggable } from '@dnd-kit/core';
import { cn } from '@/lib/utils';
import {
  Type,
  Mail,
  Hash,
  FileText,
  ChevronDown,
  Circle,
  Square,
  Calendar,
  Upload,
  Phone,
  Link,
} from 'lucide-react';

interface FieldTypeConfig {
  type: FormFieldType;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description: string;
}

const fieldTypes: FieldTypeConfig[] = [
  {
    type: 'text',
    label: 'Text Input',
    icon: Type,
    description: 'Single line text input',
  },
  {
    type: 'email',
    label: 'Email',
    icon: Mail,
    description: 'Email address input with validation',
  },
  {
    type: 'number',
    label: 'Number',
    icon: Hash,
    description: 'Numeric input field',
  },
  {
    type: 'phone',
    label: 'Phone',
    icon: Phone,
    description: 'Phone number input',
  },
  {
    type: 'url',
    label: 'URL',
    icon: Link,
    description: 'Website URL input',
  },
  {
    type: 'textarea',
    label: 'Text Area',
    icon: FileText,
    description: 'Multi-line text input',
  },
  {
    type: 'select',
    label: 'Dropdown',
    icon: ChevronDown,
    description: 'Select from dropdown options',
  },
  {
    type: 'radio',
    label: 'Radio Buttons',
    icon: Circle,
    description: 'Single choice from multiple options',
  },
  {
    type: 'checkbox',
    label: 'Checkboxes',
    icon: Square,
    description: 'Multiple choice selection',
  },
  {
    type: 'date',
    label: 'Date',
    icon: Calendar,
    description: 'Date picker input',
  },
  {
    type: 'file',
    label: 'File Upload',
    icon: Upload,
    description: 'File upload field',
  },
];

interface DraggableFieldTypeProps {
  fieldType: FieldTypeConfig;
  theme: FormTheme;
}

function DraggableFieldType({ fieldType, theme }: DraggableFieldTypeProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `field-type-${fieldType.type}`,
    data: {
      type: 'field-type',
      fieldType: fieldType.type,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const Icon = fieldType.icon;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        'p-4 rounded-lg border-2 cursor-grab active:cursor-grabbing transition-all hover:shadow-md',
        isDragging && 'opacity-50 shadow-lg'
      )}
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border,
        ...style,
      }}
    >
      <div className="flex items-center space-x-3">
        <Icon
          size={20}
          style={{ color: theme.colors.primary }}
        />
        <div>
          <h3
            className="font-medium"
            style={{
              color: theme.colors.text,
              fontSize: theme.typography.fontSize.sm,
            }}
          >
            {fieldType.label}
          </h3>
          <p
            className="text-xs mt-1"
            style={{ color: theme.colors.textSecondary }}
          >
            {fieldType.description}
          </p>
        </div>
      </div>
    </div>
  );
}

interface FieldPaletteProps {
  theme: FormTheme;
}

export function FieldPalette({ theme }: FieldPaletteProps) {
  return (
    <div className="w-80 h-full border-r overflow-y-auto" style={{ borderColor: theme.colors.border }}>
      <div className="p-4" style={{ backgroundColor: theme.colors.surface }}>
        <h2
          className="text-lg font-semibold mb-4"
          style={{ color: theme.colors.text }}
        >
          Form Fields
        </h2>
        <div className="space-y-3">
          {fieldTypes.map((fieldType) => (
            <DraggableFieldType
              key={fieldType.type}
              fieldType={fieldType}
              theme={theme}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
