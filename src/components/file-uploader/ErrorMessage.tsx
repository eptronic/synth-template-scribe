
import React from 'react';

interface ErrorMessageProps {
  error: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="mb-4 p-3 bg-destructive/20 border border-destructive/50 rounded-md text-white text-sm">
      {error}
    </div>
  );
};
