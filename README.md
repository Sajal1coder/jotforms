# Form Builder - JotForm Clone

A modern, responsive form builder application built with Next.js, TypeScript, and Tailwind CSS. Create beautiful, customizable forms with drag-and-drop functionality, theme management, and real-time preview.

## 🚀 Features

### Core Functionality
- **Drag & Drop Form Builder**: Intuitive interface for creating forms
- **Real-time Preview**: Switch between edit and preview modes instantly
- **Component-driven Architecture**: Modular, reusable form field components
- **Mobile-first Responsive Design**: Works perfectly on all devices

### Form Fields
- Text Input (with validation)
- Email Input (with email validation)
- Number Input (with numeric validation)
- Phone Input (with phone validation)
- URL Input (with URL validation)
- Textarea (multi-line text)
- Dropdown/Select
- Radio Buttons
- Checkboxes
- Date Picker
- File Upload (with drag & drop)

### Theme Management
- **4 Built-in Themes**: Modern Blue, Elegant Purple, Minimal Gray, Vibrant Orange
- **Customizable Colors**: Primary, secondary, accent, background, text colors
- **Typography Control**: Font family, size, weight customization
- **Spacing & Border Radius**: Complete visual control

### Form Validation
- **Field-level Validation**: Required fields, min/max length, patterns
- **Type-specific Validation**: Email, phone, URL, number validation
- **Custom Validation Rules**: Add custom validation with error messages
- **Real-time Error Display**: Instant feedback as users type

### Advanced Features
- **Form Settings**: Custom submit button text, success messages
- **Progress Bar**: Visual progress indicator for form completion
- **Multiple Submissions**: Control whether forms can be submitted multiple times
- **Auto-save**: Automatic saving of form configurations
- **Responsive Preview**: Desktop and mobile preview modes

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Drag & Drop**: @dnd-kit/core
- **Form Validation**: Custom validation with Zod-like patterns
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useCallback)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd form-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Creating a Form

1. **Start Building**: Drag form fields from the left palette to the canvas
2. **Customize Fields**: Click on any field to open the properties panel
3. **Set Validation**: Add validation rules in the validation tab
4. **Style Fields**: Customize colors, fonts, and spacing in the style tab
5. **Preview Form**: Switch to preview mode to test your form
6. **Save Form**: Click the save button to store your form configuration

### Field Customization

Each form field can be customized with:
- **General Properties**: Label, placeholder, required status, width, size
- **Validation Rules**: Required, min/max length, patterns, custom messages
- **Visual Styling**: Colors, fonts, borders, spacing

### Theme Management

Choose from built-in themes or customize:
- **Colors**: Primary, secondary, accent, background, text, border colors
- **Typography**: Font family, sizes, weights
- **Spacing**: Consistent spacing throughout the form
- **Border Radius**: Control the roundness of form elements

### Form Modes

- **Edit Mode**: Build and customize your form with full editing capabilities
- **Preview Mode**: Test your form as end users would see it
- **Mobile/Desktop**: Preview how your form looks on different devices

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── form-fields/       # Individual form field components
│   │   ├── BaseField.tsx  # Base field wrapper
│   │   ├── TextField.tsx  # Text input component
│   │   ├── SelectField.tsx# Dropdown component
│   │   └── ...            # Other field components
│   └── form-builder/      # Form builder components
│       ├── FormBuilder.tsx# Main form builder
│       ├── FieldPalette.tsx# Draggable field palette
│       ├── FormCanvas.tsx # Form canvas/workspace
│       └── ...            # Other builder components
├── lib/
│   ├── utils.ts           # Utility functions
│   ├── themes.ts          # Theme definitions
│   └── validation.ts      # Form validation logic
└── types/
    └── form.ts            # TypeScript type definitions
```

## 🎨 Customization

### Adding New Field Types

1. **Define the field type** in `src/types/form.ts`
2. **Create the field component** in `src/components/form-fields/`
3. **Add to the field palette** in `src/components/form-builder/FieldPalette.tsx`
4. **Update the FormField component** to handle the new type

### Creating Custom Themes

```typescript
import { createCustomTheme } from '@/lib/themes';

const myTheme = createCustomTheme(defaultThemes[0], {
  name: 'My Custom Theme',
  colors: {
    primary: '#your-color',
    // ... other color overrides
  },
});
```

### Adding Validation Rules

```typescript
const customValidation: ValidationRule = {
  type: 'pattern',
  value: '^[A-Z]{2}[0-9]{4}$',
  message: 'Please enter a valid format (e.g., AB1234)',
};
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

```bash
npx vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload the 'out' directory to Netlify
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **@dnd-kit** for the drag and drop functionality
- **Lucide React** for the beautiful icons

## 📞 Support

If you have any questions or need help, please:
1. Check the documentation above
2. Open an issue on GitHub
3. Contact the development team

---

**Built with ❤️ using modern web technologies**
