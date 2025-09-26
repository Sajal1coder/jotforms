export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  validation?: ValidationRule[];
  options?: string[]; // for select, radio, checkbox
  properties: FormFieldProperties;
}

export type FormFieldType = 
  | 'text' 
  | 'email' 
  | 'number' 
  | 'textarea' 
  | 'select' 
  | 'radio' 
  | 'checkbox' 
  | 'date' 
  | 'file'
  | 'phone'
  | 'url';

export interface FormFieldProperties {
  width: 'full' | 'half' | 'third';
  size: 'small' | 'medium' | 'large';
  style: FormFieldStyle;
}

export interface FormFieldStyle {
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  borderRadius: string;
  fontSize: string;
  fontWeight: string;
  padding: string;
}

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'min' | 'max';
  value?: string | number;
  message: string;
}

export interface FormTheme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
    border: string;
    error: string;
    success: string;
  };
  typography: {
    fontFamily: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
    fontWeight: {
      normal: string;
      medium: string;
      semibold: string;
      bold: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
}

export interface FormConfig {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  theme: FormTheme;
  settings: FormSettings;
}

export interface FormSettings {
  submitButtonText: string;
  successMessage: string;
  allowMultipleSubmissions: boolean;
  showProgressBar: boolean;
  enableAutoSave: boolean;
}

export interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, any>;
  submittedAt: Date;
}

export type FormMode = 'edit' | 'preview';
