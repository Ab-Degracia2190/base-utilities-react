import React, { useState } from 'react';
import { X } from 'lucide-react';
import PrimaryButton from '@/components/partials/buttons/primary';
import SecondaryButton from '@/components/partials/buttons/secondary';

interface FormContext {
  data: Record<string, any>;
  errors: Record<string, string>;
  onChange: (field: string) => (value: any) => void;
  setErrors: (errors: Record<string, string>) => void;
}

interface PrimaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  onSubmit?: (data: any) => void;
  children?: React.ReactNode | ((context: FormContext) => React.ReactNode);
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  // Button configuration
  cancelButtonText?: string;
  submitButtonText?: string;
  cancelButtonClassName?: string;
  submitButtonClassName?: string;
  // Form state management
  initialData?: Record<string, any>;
  validateForm?: (data: Record<string, any>) => Record<string, string>;
  // Section visibility
  hasHeader?: boolean;
  hasBody?: boolean;
  hasFooter?: boolean;
}

const PrimaryModal: React.FC<PrimaryModalProps> = ({
  isOpen,
  onClose,
  title = 'Contact Form',
  onSubmit,
  children,
  maxWidth = 'lg',
  cancelButtonText = 'Cancel',
  submitButtonText = 'Submit Form',
  cancelButtonClassName = '',
  submitButtonClassName = 'bg-purple-500 hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-700',
  initialData = {},
  validateForm,
  hasHeader = true,
  hasBody = true,
  hasFooter = true
}) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    full: 'max-w-full'
  };

  const handleValidateForm = (): boolean => {
    if (validateForm) {
      const newErrors = validateForm(formData);
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }
    return true; // If no validation function provided, assume valid
  };

  const handleSubmit = () => {
    if (handleValidateForm()) {
      onSubmit?.(formData);
      onClose();
      setFormData(initialData);
      setErrors({});
    }
  };

  const handleInputChange = (field: string) => (value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Expose form data and handlers to children through context-like props
  const formContext = {
    data: formData,
    errors,
    onChange: handleInputChange,
    setErrors
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full ${maxWidthClasses[maxWidth]} transform transition-all max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        {hasHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
            <div className="flex items-center gap-3">
              <h3 className="text-sm md:text-lg font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        
        {/* Body - Slot for form fields */}
        {hasBody && (typeof children === 'function' ? (children as (context: FormContext) => React.ReactNode)(formContext) : children)}
        
        {/* Footer */}
        {hasFooter && (
          <div className="flex gap-2 justify-end p-4 border-t border-gray-200 dark:border-gray-700 sticky bottom-0 bg-white dark:bg-gray-800 z-10">
            <div className="flex gap-2 w-auto max-w-xs">
              <SecondaryButton 
                onClick={onClose}
                className={`${cancelButtonClassName} text-xs px-3 py-2 w-auto min-w-[80px]`}
              >
                {cancelButtonText}
              </SecondaryButton>
              <PrimaryButton 
                onClick={handleSubmit}
                className={`${submitButtonClassName} text-xs px-3 py-2 w-auto min-w-[80px]`}
              >
                {submitButtonText}
              </PrimaryButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrimaryModal;