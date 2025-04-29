'use client';

import React, { ReactNode } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

interface FormFieldProps {
  id: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: () => void;
  placeholder?: string;
  icon?: ReactNode;
  error?: string;
  touched?: boolean;
  required?: boolean;
  isTextArea?: boolean; // Add flag for textarea
  rows?: number;        // Add rows prop for textarea
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  type,
  value,
  onChange,
  onBlur,
  placeholder,
  icon,
  error,
  touched,
  required = false,
  isTextArea = false,
  rows = 3,
}) => {
  const { t } = useTranslation();
  const hasError = touched && error;
  const InputComponent = isTextArea ? 'textarea' : 'input';

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-gray-800 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <InputComponent
          id={id}
          name={id} // Add name attribute, same as id typically
          type={!isTextArea ? type : undefined} // Type only for input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          rows={isTextArea ? rows : undefined} // Rows only for textarea
          className={`block w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-3 border ${
            hasError
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 focus:ring-pink-500 focus:border-pink-500'
          } rounded-lg transition-all duration-200 text-gray-900 placeholder-gray-400`}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${id}-error` : undefined}
        />
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
      </div>
      {hasError && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {/* Use translated error if available, otherwise use error string */}
          {error === 'requiredField' ? t('requiredField') : error}
        </p>
      )}
    </div>
  );
};

export default FormField; 