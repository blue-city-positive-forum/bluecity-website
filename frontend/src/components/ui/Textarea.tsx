import React from 'react';
import { classNames } from '../../utils/helpers';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
  maxLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, showCharCount, maxLength, className, value, ...props }, ref) => {
    const currentLength = typeof value === 'string' ? value.length : 0;
    
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-blue-city-text mb-2">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <textarea
          ref={ref}
          value={value}
          maxLength={maxLength}
          className={classNames(
            'w-full rounded-xl border px-4 py-3 transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-blue-city-primary focus:border-transparent',
            'disabled:bg-gray-100 disabled:cursor-not-allowed',
            'resize-none',
            error
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300',
            className
          )}
          {...props}
        />
        
        <div className="flex justify-between items-center mt-1">
          <div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
          </div>
          
          {showCharCount && maxLength && (
            <p className="text-sm text-gray-500">
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

