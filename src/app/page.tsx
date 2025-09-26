'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Play, 
  ArrowRight, 
  Zap, 
  Palette, 
  Smartphone, 
  Shield, 
  Code, 
  Users,
  CheckCircle,
  Star,
  Github
} from 'lucide-react';

export default function LandingPage() {
  const features = [
    {
      icon: Zap,
      title: 'Drag & Drop Builder',
      description: 'Create forms effortlessly with our intuitive drag-and-drop interface. No coding required.',
    },
    {
      icon: Palette,
      title: 'Theme Customization',
      description: '4 built-in themes with full customization of colors, fonts, and spacing.',
    },
    {
      icon: Smartphone,
      title: 'Mobile Responsive',
      description: 'Forms look perfect on all devices with our mobile-first design approach.',
    },
    {
      icon: Shield,
      title: 'Advanced Validation',
      description: 'Comprehensive validation system with real-time error feedback.',
    },
    {
      icon: Code,
      title: 'Developer Friendly',
      description: 'Built with TypeScript, Next.js, and modern web technologies.',
    },
    {
      icon: Users,
      title: 'User Experience',
      description: 'Optimized for both form builders and end users with smooth interactions.',
    },
  ];

  const stats = [
    { number: '11+', label: 'Field Types' },
    { number: '4', label: 'Built-in Themes' },
    { number: '100%', label: 'Responsive' },
    { number: '0', label: 'Coding Required' },
  ];

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">FormBuilder</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/demo"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Demo
              </Link>
              <Link
                href="/builder"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Build Beautiful Forms
              <span className="text-blue-600"> Without Code</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Create stunning, responsive forms with our professional drag-and-drop builder. 
              Advanced validation, theme customization, and real-time preview included.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/builder"
                className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
              >
                <Play className="w-5 h-5" />
                <span>Start Building</span>
              </Link>
              <Link
                href="/demo"
                className="flex items-center justify-center space-x-2 bg-white text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors border shadow-md"
              >
                <span>View Demo</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Build Forms
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed for both beginners and professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form Fields Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Rich Form Field Library
            </h2>
            <p className="text-xl text-gray-600">
              11+ field types to handle any form requirement
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
            {[
              'Text Input',
              'Email',
              'Number',
              'Phone',
              'URL',
              'Textarea',
              'Dropdown',
              'Radio',
              'Checkbox',
              'Date',
              'File Upload'
            ].map((field, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border text-center hover:shadow-md transition-shadow"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">{field}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Build Your First Form?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust our form builder for their projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/builder"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Start Building Now
            </Link>
            <Link
              href="/demo"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Explore Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">FormBuilder</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/demo" className="hover:text-blue-400 transition-colors">
                Demo
              </Link>
              <Link href="/builder" className="hover:text-blue-400 transition-colors">
                Builder
              </Link>
              <a
                href="#"
                className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FormBuilder. Built with Next.js, TypeScript & Tailwind CSS.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
