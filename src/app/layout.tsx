import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Form Builder - Create Beautiful Forms',
  description: 'A powerful, intuitive form builder with drag-and-drop functionality, theme customization, and real-time preview.',
  keywords: ['form builder', 'drag and drop', 'forms', 'survey', 'questionnaire'],
  authors: [{ name: 'Form Builder Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
