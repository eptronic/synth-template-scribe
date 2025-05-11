
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

interface SecretApiKeyFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SecretApiKeyForm: React.FC<SecretApiKeyFormProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check if there's a stored key already
  useEffect(() => {
    const storedKey = localStorage.getItem('openai_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Store API key in localStorage (only for development)
      localStorage.setItem('openai_api_key', apiKey);
      
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been securely stored for this session.",
      });
      
      // Close the dialog
      onClose();
    } catch (error) {
      toast({
        title: "Error Saving API Key",
        description: "There was a problem saving your API key.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleClear = () => {
    localStorage.removeItem('openai_api_key');
    setApiKey('');
    toast({
      title: "API Key Removed",
      description: "Your OpenAI API key has been removed.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>OpenAI API Key</DialogTitle>
          <DialogDescription>
            Enter your OpenAI API key for development purposes. This key is stored only in your browser and not sent to our servers.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="sk-..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              disabled={isLoading}
              className="font-mono"
              autoComplete="off"
            />
            <p className="text-xs text-muted-foreground">
              Your API key is stored only in your browser's local storage.
            </p>
          </div>
          
          <div className="flex gap-2 justify-end">
            {apiKey && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClear}
                disabled={isLoading}
              >
                Clear Key
              </Button>
            )}
            <Button type="submit" disabled={isLoading || !apiKey}>
              {isLoading ? "Saving..." : "Save Key"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
