
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { LockKeyhole, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string) => void;
  requiredForOperation: boolean;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeyChange, requiredForOperation = true }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [saved, setSaved] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    // Load key from localStorage on component mount
    const savedKey = localStorage.getItem('openai_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setSaved(true);
      onApiKeyChange(savedKey);
    }
  }, [onApiKeyChange]);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey);
      setSaved(true);
      onApiKeyChange(apiKey);
    }
  };

  const handleClearKey = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    setSaved(false);
    onApiKeyChange('');
    setVisible(false);
  };

  return (
    <div className="bg-gunmetal/50 rounded-lg p-4 mb-6">
      <div className="flex items-center mb-2">
        <LockKeyhole className="mr-2 text-cyan-500" size={18} />
        <h3 className="text-white font-medium">OpenAI API Key</h3>
      </div>
      
      {requiredForOperation && !saved && (
        <Alert variant="destructive" className="mb-3 bg-red-900/20 border-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            OpenAI API key required. The app cannot function without it.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex flex-col space-y-2">
        <div className="flex space-x-2">
          <Input
            type={visible ? "text" : "password"}
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              setSaved(false);
            }}
            placeholder="sk-..."
            className="flex-1"
          />
          <Button
            variant="outline"
            className="whitespace-nowrap"
            onClick={() => setVisible(!visible)}
          >
            {visible ? "Hide" : "Show"}
          </Button>
        </div>
        
        <div className="flex justify-between">
          <div className="flex items-center">
            {saved ? (
              <span className="flex items-center text-green-500 text-xs">
                <CheckCircle className="mr-1" size={14} />
                API key saved
              </span>
            ) : apiKey ? (
              <span className="flex items-center text-amber-500 text-xs">
                <XCircle className="mr-1" size={14} />
                Unsaved changes
              </span>
            ) : null}
          </div>
          
          <div className="flex space-x-2">
            {saved && (
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleClearKey}
              >
                Clear
              </Button>
            )}
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleSaveKey} 
              disabled={!apiKey || saved}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
      
      <p className="text-slate-400 text-xs mt-2">
        Your API key is stored locally in your browser and never sent to our servers.
      </p>
    </div>
  );
};

export default ApiKeyInput;
