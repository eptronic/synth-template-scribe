
import { useState, useCallback } from 'react';
import { FileUploadState } from '../../../types';

export const useFileUpload = () => {
  const [state, setState] = useState<FileUploadState>({
    file: null,
    text: '',
    isDragging: false,
    isProcessing: false,
    error: null
  });

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setState(prev => ({ ...prev, isDragging: true }));
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setState(prev => ({ ...prev, isDragging: false }));
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setState(prev => ({ ...prev, isDragging: false }));
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      
      if (file.type === 'text/plain' || file.type === 'application/pdf' || file.type === 'text/csv') {
        setState(prev => ({ ...prev, file, error: null }));
        
        // If it's not a PDF, we can read it as text
        if (file.type !== 'application/pdf') {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target && typeof event.target.result === 'string') {
              setState(prev => ({ ...prev, text: event.target.result as string }));
            }
          };
          reader.readAsText(file);
        }
      } else {
        setState(prev => ({ 
          ...prev, 
          error: 'Invalid file type. Please upload a .txt, .pdf, or .csv file.' 
        }));
      }
    }
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      if (file.type === 'text/plain' || file.type === 'application/pdf' || file.type === 'text/csv') {
        setState(prev => ({ ...prev, file, error: null }));
        
        // If it's not a PDF, we can read it as text
        if (file.type !== 'application/pdf') {
          const reader = new FileReader();
          reader.onload = (event) => {
            if (event.target && typeof event.target.result === 'string') {
              setState(prev => ({ ...prev, text: event.target.result as string }));
            }
          };
          reader.readAsText(file);
        }
      } else {
        setState(prev => ({ 
          ...prev, 
          error: 'Invalid file type. Please upload a .txt, .pdf, or .csv file.' 
        }));
      }
    }
  }, []);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState(prev => ({ ...prev, text: e.target.value, error: null }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  return {
    state,
    setState,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
    handleTextChange,
    setError
  };
};
