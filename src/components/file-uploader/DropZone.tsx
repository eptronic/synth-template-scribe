
import React, { useCallback } from 'react';

interface DropZoneProps {
  isDragging: boolean;
  isProcessing: boolean;
  file: File | null;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({
  isDragging,
  isProcessing,
  file,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  handleFileInputChange
}) => {
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-lg p-6 text-center transition-all 
        ${isDragging ? 'border-accent drag-active' : 'border-accentDim'}
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
        
        {file && (
          <div className="text-xs">
            <p className="text-accent">
              Selected file: {file.name}
            </p>
            {file.type === 'application/pdf' && (
              <p className="text-slate mt-1">
                PDF will be processed on the server
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
