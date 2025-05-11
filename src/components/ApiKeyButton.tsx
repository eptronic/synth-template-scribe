
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Key } from "lucide-react";
import { SecretApiKeyForm } from "./file-uploader/SecretApiKeyForm";

const ApiKeyButton: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  return (
    <>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setIsDialogOpen(true)}
        className="gap-1 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20"
      >
        <Key className="h-3.5 w-3.5" />
        Set API Key
      </Button>
      
      <SecretApiKeyForm 
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default ApiKeyButton;
