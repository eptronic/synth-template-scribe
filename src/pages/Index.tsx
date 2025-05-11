
import React, { useState } from 'react';
import Header from '../components/Header';
import FileUploader from '../components/FileUploader';
import MappingsPreview from '../components/MappingsPreview';
import { parseChartData, buildTemplate, downloadTemplate } from '../services/api';
import { ControlMapping } from '../types';
import { toast } from "../components/ui/use-toast";

const Index = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [mappings, setMappings] = useState<ControlMapping[]>([]);
  const [synthName, setSynthName] = useState<string>('');
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  const handleDataSubmit = async (data: { text: string, synthName: string }) => {
    try {
      setIsProcessing(true);
      
      // Store synth name for later use
      setSynthName(data.synthName);
      
      // Call API to parse the data
      const parseResponse = await parseChartData(data);
      
      if (!parseResponse.success || !parseResponse.data) {
        throw new Error(parseResponse.error || 'Failed to parse chart data');
      }
      
      // Save the mappings
      setMappings(parseResponse.data);
      
      // Build the template
      const buildResponse = await buildTemplate({
        synthName: data.synthName,
        controls: parseResponse.data
      });
      
      if (!buildResponse.success || !buildResponse.data) {
        throw new Error(buildResponse.error || 'Failed to build template');
      }
      
      // Show success animation
      setShowAnimation(true);
      setTimeout(() => setShowAnimation(false), 1500);
      
      // Download the template
      downloadTemplate(buildResponse.data, data.synthName);
      
      toast({
        title: "Template generated successfully!",
        description: `${data.synthName}_Template.syx has been downloaded.`,
      });
    } catch (error) {
      console.error('Error processing data:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-midnight">
      <Header />
      
      <main className="flex-1 px-4 py-8">
        <div className="max-w-xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white text-left mb-2">
              SL MkIII Template Builder
            </h1>
            <p className="text-slate text-left">
              Turn any CC chart into a Novation SL MkIII template .syx file in one click.
            </p>
          </div>
          
          <div className="bg-gunmetal/80 rounded-2xl p-8 shadow-lg relative">
            {showAnimation && <div className="data-sent-animation"></div>}
            <FileUploader onDataSubmit={handleDataSubmit} isProcessing={isProcessing} />
          </div>
          
          {mappings.length > 0 && (
            <div className="mt-8">
              <MappingsPreview mappings={mappings} synthName={synthName} />
            </div>
          )}
        </div>
      </main>
      
      <footer className="py-8 px-4 relative">
        <div className="hardware-watermark"></div>
        <div className="max-w-xl mx-auto text-center text-slate text-sm">
          <p>SL MkIII Template Builder &copy; {new Date().getFullYear()}</p>
          <p className="mt-1 text-xs">Not officially affiliated with Novation.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
