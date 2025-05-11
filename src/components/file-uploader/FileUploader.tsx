
import React, { useState, useCallback } from 'react';
import { SynthNameInput } from './SynthNameInput';
import { DropZone } from './DropZone';
import { TextEditor } from './TextEditor';
import { ErrorMessage } from './ErrorMessage';
import { SubmitButton } from './SubmitButton';
import { useFileUpload } from './hooks/useFileUpload';

interface Props {
  onDataSubmit: (data: FormData | { text: string, synthName: string }) => void;
  isProcessing: boolean;
}

const FileUploader: React.FC<Props> = ({ onDataSubmit, isProcessing }) => {
  const {
    state,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileInputChange,
    handleTextChange,
    setError
  } = useFileUpload();
  
  const [synthName, setSynthName] = useState<string>('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!synthName.trim()) {
      setError('Please enter a synth name');
      return;
    }
    
    // If we have a file, especially a PDF, use FormData
    if (state.file) {
      const formData = new FormData();
      formData.append('file', state.file);
      formData.append('synthName', synthName);
      
      // If we have text and it's not a PDF, also send that
      if (state.text && state.file.type !== 'application/pdf') {
        formData.append('text', state.text);
      }
      
      onDataSubmit(formData);
    } else if (state.text.trim()) {
      // No file, but we have text
      onDataSubmit({
        text: state.text,
        synthName: synthName
      });
    } else {
      setError('Please enter or upload CC chart data');
    }
  }, [state.file, state.text, synthName, onDataSubmit, setError]);

  const isPdfSelected = state.file?.type === 'application/pdf';

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <SynthNameInput 
        synthName={synthName}
        setSynthName={setSynthName}
        isProcessing={isProcessing}
      />
      
      <div className="mb-6">
        <label className="block text-white text-sm font-medium mb-2">
          CC Chart Data
        </label>
        
        <DropZone
          isDragging={state.isDragging}
          isProcessing={isProcessing}
          file={state.file}
          handleDrop={handleDrop}
          handleDragOver={handleDragOver}
          handleDragLeave={handleDragLeave}
          handleFileInputChange={handleFileInputChange}
        />
        
        <TextEditor
          text={state.text}
          handleTextChange={handleTextChange}
          isProcessing={isProcessing}
          isPdfSelected={isPdfSelected}
        />
      </div>
      
      <ErrorMessage error={state.error} />
      <SubmitButton isProcessing={isProcessing} />
    </form>
  );
};

export default FileUploader;
