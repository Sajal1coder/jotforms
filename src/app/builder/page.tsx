'use client';

import React from 'react';
import { FormBuilder } from '@/components/form-builder';
import { Navigation } from '@/components/ui/Navigation';
import { FormConfig } from '@/types/form';

export default function BuilderPage() {
  const handleSave = (config: FormConfig) => {
    // In a real application, you would save this to a database
    console.log('Saving form config:', config);
    
    // For demo purposes, save to localStorage
    localStorage.setItem(`form-${config.id}`, JSON.stringify(config));
    
    // Show success message
    alert('Form saved successfully!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation variant="app" />
      <main className="flex-1">
        <FormBuilder onSave={handleSave} />
      </main>
    </div>
  );
}
