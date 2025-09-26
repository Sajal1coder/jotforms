'use client';

import React, { useState } from 'react';
import { FormTheme } from '@/types/form';
import { defaultThemes } from '@/lib/themes';
import { cn } from '@/lib/utils';
import { Palette, Check } from 'lucide-react';

interface ThemeSelectorProps {
  currentTheme: FormTheme;
  onThemeChange: (theme: FormTheme) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg border bg-white hover:bg-gray-50 transition-colors shadow-sm"
      >
        <Palette size={18} style={{ color: currentTheme.colors.primary }} />
        <span className="text-gray-700 text-sm font-medium">
          {currentTheme.name}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div
            className="absolute top-full left-0 mt-2 w-80 rounded-lg border shadow-lg z-20 max-h-96 overflow-y-auto"
            style={{
              backgroundColor: currentTheme.colors.background,
              borderColor: currentTheme.colors.border,
            }}
          >
            <div className="p-4">
              <h3
                className="font-semibold mb-4"
                style={{ color: currentTheme.colors.text }}
              >
                Choose Theme
              </h3>
              <div className="space-y-3">
                {defaultThemes.map((theme) => (
                  <div
                    key={theme.id}
                    className={cn(
                      'p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md',
                      currentTheme.id === theme.id && 'ring-2 ring-blue-500'
                    )}
                    style={{
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                    }}
                    onClick={() => {
                      onThemeChange(theme);
                      setIsOpen(false);
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4
                        className="font-medium"
                        style={{ color: theme.colors.text }}
                      >
                        {theme.name}
                      </h4>
                      {currentTheme.id === theme.id && (
                        <Check size={16} style={{ color: theme.colors.primary }} />
                      )}
                    </div>
                    
                    {/* Color Preview */}
                    <div className="flex space-x-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: theme.colors.primary }}
                        title="Primary"
                      />
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: theme.colors.secondary }}
                        title="Secondary"
                      />
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: theme.colors.accent }}
                        title="Accent"
                      />
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{
                          backgroundColor: theme.colors.background,
                          borderColor: theme.colors.border,
                        }}
                        title="Background"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
