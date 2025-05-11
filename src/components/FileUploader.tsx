
import React, { useState, useCallback } from 'react';
import { FileUploadState } from '../types';

interface Props {
  onDataSubmit: (data: FormData | { text: string, synthName: string }) => void;
  isProcessing: boolean;
}

const FileUploader: React.FC<Props> = ({ onDataSubmit, isProcessing }) => {
  const [state, setState] = useState<FileUploadState>({
    file: null,
    text: '',
    isDragging: false,
    isProcessing: false,
    error: null
  });
  
  const [synthName, setSynthName] = useState<string>('');

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
        
        // If it's a PDF, we don't attempt to read it as text
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

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      if (file.type === 'text/plain' || file.type === 'application/pdf' || file.type === 'text/csv') {
        setState(prev => ({ ...prev, file, error: null }));
        
        // If it's a PDF, we don't attempt to read it as text
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

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!synthName.trim()) {
      setState(prev => ({ ...prev, error: 'Please enter a synth name' }));
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
      setState(prev => ({ ...prev, error: 'Please enter or upload CC chart data' }));
    }
  }, [state.file, state.text, synthName, onDataSubmit]);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="mb-6">
        <label htmlFor="synthName" className="block text-white text-sm font-medium mb-2">
          Synth/Effect Name
        </label>
        <input
          type="text"
          id="synthName"
          value={synthName}
          onChange={(e) => setSynthName(e.target.value)}
          placeholder="e.g., Arturia MiniFreak, Dreadbox Typhon"
          className="w-full px-3 py-2 bg-gunmetal border border-accentDim rounded-md text-white focus:outline-none focus:ring-2 focus:ring-accent/50"
          disabled={isProcessing}
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-white text-sm font-medium mb-2">
          CC Chart Data
        </label>
        
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center transition-all 
            ${state.isDragging ? 'border-accent drag-active' : 'border-accentDim'}
            ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:ring-2 hover:ring-accent/50'}
          `}
        >
          <div className="space-y-2">
            <p className="text-sm">Drag & drop file or paste MIDI CC mapping below</p>
            <p className="text-xs text-slate">Supported formats: .txt, .pdf, .csv</p>
            
            <label className="inline-block px-4 py-2 bg-gunmetal rounded-md border border-accentDim text-white cursor-pointer hover:bg-gunmetal/80 transition-colors">
              Browse Files
              <input
                type="file"
                className="hidden"
                accept=".txt,.pdf,.csv"
                onChange={handleFileInputChange}
                disabled={isProcessing}
              />
            </label>
            
            {state.file && (
              <div className="text-xs">
                <p className="text-accent">
                  Selected file: {state.file.name}
                </p>
                {state.file.type === 'application/pdf' && (
                  <p className="text-slate mt-1">
                    PDF will be processed on the server
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        
        <textarea
          value={state.text}
          onChange={handleTextChange}
          placeholder="Or paste your CC chart data here..."
          className="mt-4 w-full h-40 px-3 py-2 bg-gunmetal border border-accentDim rounded-md text-white resize-y focus:outline-none focus:ring-2 focus:ring-accent/50"
          disabled={isProcessing || (state.file?.type === 'application/pdf')}
        />
        {state.file?.type === 'application/pdf' && (
          <p className="text-xs text-slate mt-1">
            Text input disabled while PDF is selected
          </p>
        )}
      </div>
      
      {state.error && (
        <div className="mb-4 p-3 bg-destructive/20 border border-destructive/50 rounded-md text-white text-sm">
          {state.error}
        </div>
      )}
      
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
    </form>
  );
};

export default FileUploader;
