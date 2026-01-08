'use client';

import { forwardRef, type InputHTMLAttributes } from 'react';
import { Input } from '../atoms/Input';
import { Label } from '../atoms/Label';
import { cn } from '@/src/lib/utils';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, helperText, required, className, id, ...props }, ref) => {
    const fieldId = id || label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className={cn('space-y-1', className)}>
        <Label htmlFor={fieldId} required={required}>
          {label}
        </Label>
        <Input ref={ref} id={fieldId} error={!!error} {...props} />
        {error && (
          <p className="text-sm text-red-500 mt-1" role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-sm text-slate-500 mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
