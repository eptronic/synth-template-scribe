
import React from 'react';

interface SubmitButtonProps {
  isProcessing: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isProcessing }) => {
  return (
    <button
      type="submit"
      className={`
        w-full py-3 px-4 rounded-md bg-accent text-white font-medium 
        transition-all hover:bg-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent
        ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      disabled={isProcessing}
    >
      {isProcessing ? 'Processing...' : 'Generate Template'}
    </button>
  );
};
