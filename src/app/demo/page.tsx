'use client';

import React, { useState } from 'react';
import { FormBuilder } from '@/components/form-builder';
import { Navigation } from '@/components/ui/Navigation';
import { FormConfig } from '@/types/form';
import { sampleForms } from '@/lib/sampleForms';
import { cn } from '@/lib/utils';
import { Play, FileText, Users, Calendar, Plus } from 'lucide-react';

export default function DemoPage() {
  const [selectedForm, setSelectedForm] = useState<FormConfig | null>(null);
  const [showBuilder, setShowBuilder] = useState(false);

  const handleLoadSample = (form: FormConfig) => {
    setSelectedForm(form);
    setShowBuilder(true);
  };

  const handleCreateNew = () => {
    setSelectedForm(null);
    setShowBuilder(true);
  };

  const handleSave = (config: FormConfig) => {
    console.log('Saving form config:', config);
    localStorage.setItem(`form-${config.id}`, JSON.stringify(config));
    alert('Form saved successfully!');
  };

  const sampleFormIcons = [FileText, Users, Calendar];

  if (showBuilder) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation variant="app" />
        <main className="flex-1">
          <FormBuilder
            initialConfig={selectedForm || undefined}
            onSave={handleSave}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation variant="app" />
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Form Builder Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of our drag-and-drop form builder. Create beautiful, 
            responsive forms with advanced validation, theme customization, and real-time preview.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Play className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Drag & Drop Builder</h3>
            <p className="text-gray-600">
              Intuitive drag-and-drop interface for creating forms without any coding knowledge.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Rich Form Fields</h3>
            <p className="text-gray-600">
              11+ field types including text, email, file upload, date picker, and more.
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Theme Customization</h3>
            <p className="text-gray-600">
              4 built-in themes with full customization of colors, fonts, and spacing.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={handleCreateNew}
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Create New Form</span>
          </button>
        </div>

        {/* Sample Forms */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">
            Try Sample Forms
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {sampleForms.map((form, index) => {
              const Icon = sampleFormIcons[index];
              return (
                <div
                  key={form.id}
                  className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleLoadSample(form)}
                >
                  <div className="flex items-center mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center mr-3"
                      style={{ backgroundColor: `${form.theme.colors.primary}20` }}
                    >
                      <Icon
                        className="w-5 h-5"
                        style={{ color: form.theme.colors.primary }}
                      />
                    </div>
                    <h3 className="text-lg font-semibold">{form.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {form.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{form.fields.length} fields</span>
                      <span>•</span>
                      <span>{form.theme.name}</span>
                    </div>
                    
                    <button
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLoadSample(form);
                      }}
                    >
                      Try it →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features List */}
        <div className="max-w-4xl mx-auto mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Form Building</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Drag-and-drop form builder</li>
                <li>• 11+ field types with validation</li>
                <li>• Real-time preview mode</li>
                <li>• Mobile-responsive design</li>
                <li>• Field reordering and duplication</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customization</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• 4 built-in themes</li>
                <li>• Custom color schemes</li>
                <li>• Typography controls</li>
                <li>• Field styling options</li>
                <li>• Progress bar and success messages</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Validation</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Required field validation</li>
                <li>• Email and URL validation</li>
                <li>• Min/max length validation</li>
                <li>• Custom regex patterns</li>
                <li>• Real-time error messages</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Developer Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• TypeScript support</li>
                <li>• Component-driven architecture</li>
                <li>• Auto-save functionality</li>
                <li>• Export/import form configs</li>
                <li>• Extensible field types</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="max-w-4xl mx-auto mt-16 text-center">
          <h2 className="text-2xl font-bold mb-8">Built With Modern Technology</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'Next.js 14',
              'TypeScript',
              'Tailwind CSS',
              '@dnd-kit',
              'React Hook Form',
              'Lucide Icons'
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white rounded-full shadow-sm border text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
