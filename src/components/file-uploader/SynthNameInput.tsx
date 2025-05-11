
import React from 'react';

interface SynthNameInputProps {
  synthName: string;
  setSynthName: (name: string) => void;
  isProcessing: boolean;
}

export const SynthNameInput: React.FC<SynthNameInputProps> = ({
  synthName,
  setSynthName,
  isProcessing
}) => {
  return (
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
  );
};
