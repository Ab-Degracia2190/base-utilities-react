import React from 'react';
import { X, AlertCircle } from 'lucide-react';
import PrimaryButton from '@/components/partials/buttons/primary';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  onConfirm?: () => void;
  hasHeader?: boolean;
  hasBody?: boolean;
  hasFooter?: boolean;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  title = 'Error',
  message,
  onConfirm,
  hasHeader = true,
  hasBody = true,
  hasFooter = true
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
        {/* Header */}
        {hasHeader && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
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
        
        {/* Body */}
        {hasBody && (
          <div className="p-6">
            <p className="text-gray-700 dark:text-gray-300 text-xs md:text-sm leading-relaxed">
              {message}
            </p>
          </div>
        )}
        
        {/* Footer */}
        {hasFooter && (
          <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
            <PrimaryButton 
              onClick={onConfirm || onClose}
              className="bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
            >
              Understand
            </PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorModal;