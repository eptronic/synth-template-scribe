
import React from 'react';

interface TextEditorProps {
  text: string;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isProcessing: boolean;
  isPdfSelected: boolean;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  text,
  handleTextChange,
  isProcessing,
  isPdfSelected
}) => {
  return (
    <>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Or paste your CC chart data here..."
        className="mt-4 w-full h-40 px-3 py-2 bg-gunmetal border border-accentDim rounded-md text-white resize-y focus:outline-none focus:ring-2 focus:ring-accent/50"
        disabled={isProcessing || isPdfSelected}
      />
      {isPdfSelected && (
        <p className="text-xs text-slate mt-1">
          Text input disabled while PDF is selected
        </p>
      )}
    </>
  );
};
