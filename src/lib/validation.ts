import { FormField, ValidationRule } from '@/types/form';
import { validateEmail, validatePhone, validateUrl } from './utils';

export interface ValidationError {
  field: string;
  message: string;
}

export function validateFormField(field: FormField, value: any): ValidationError[] {
  const errors: ValidationError[] = [];

  // Required validation
  if (field.required && (!value || (typeof value === 'string' && value.trim() === ''))) {
    errors.push({
      field: field.id,
      message: `${field.label} is required`,
    });
    return errors; // Return early if required field is empty
  }

  // Skip other validations if field is empty and not required
  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return errors;
  }

  // Type-specific validation
  switch (field.type) {
    case 'email':
      if (!validateEmail(value)) {
        errors.push({
          field: field.id,
          message: 'Please enter a valid email address',
        });
      }
      break;

    case 'phone':
      if (!validatePhone(value)) {
        errors.push({
          field: field.id,
          message: 'Please enter a valid phone number',
        });
      }
      break;

    case 'url':
      if (!validateUrl(value)) {
        errors.push({
          field: field.id,
          message: 'Please enter a valid URL',
        });
      }
      break;

    case 'number':
      if (isNaN(Number(value))) {
        errors.push({
          field: field.id,
          message: 'Please enter a valid number',
        });
      }
      break;

    case 'date':
      if (isNaN(Date.parse(value))) {
        errors.push({
          field: field.id,
          message: 'Please enter a valid date',
        });
      }
      break;
  }

  // Custom validation rules
  if (field.validation) {
    for (const rule of field.validation) {
      const error = validateRule(field, value, rule);
      if (error) {
        errors.push(error);
      }
    }
  }

  return errors;
}

function validateRule(field: FormField, value: any, rule: ValidationRule): ValidationError | null {
  switch (rule.type) {
    case 'minLength':
      if (typeof value === 'string' && value.length < (rule.value as number)) {
        return {
          field: field.id,
          message: rule.message || `Minimum length is ${rule.value} characters`,
        };
      }
      break;

    case 'maxLength':
      if (typeof value === 'string' && value.length > (rule.value as number)) {
        return {
          field: field.id,
          message: rule.message || `Maximum length is ${rule.value} characters`,
        };
      }
      break;

    case 'min':
      if (field.type === 'number' && Number(value) < (rule.value as number)) {
        return {
          field: field.id,
          message: rule.message || `Minimum value is ${rule.value}`,
        };
      }
      break;

    case 'max':
      if (field.type === 'number' && Number(value) > (rule.value as number)) {
        return {
          field: field.id,
          message: rule.message || `Maximum value is ${rule.value}`,
        };
      }
      break;

    case 'pattern':
      if (typeof value === 'string' && rule.value) {
        const regex = new RegExp(rule.value as string);
        if (!regex.test(value)) {
          return {
            field: field.id,
            message: rule.message || 'Invalid format',
          };
        }
      }
      break;
  }

  return null;
}

export function validateForm(fields: FormField[], formData: Record<string, any>): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const field of fields) {
    const fieldErrors = validateFormField(field, formData[field.id]);
    errors.push(...fieldErrors);
  }

  return errors;
}

export function hasValidationErrors(errors: ValidationError[]): boolean {
  return errors.length > 0;
}

export function getFieldError(errors: ValidationError[], fieldId: string): string | undefined {
  const error = errors.find(err => err.field === fieldId);
  return error?.message;
}
