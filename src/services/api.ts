
import { ControlMapping, TemplateData, ApiResponse } from '../types';

// This is a mock implementation for the frontend
// In a real app, these would connect to actual backend endpoints

export const parseChartData = async (
  data: FormData | { text: string; synthName: string }
): Promise<ApiResponse<ControlMapping[]>> => {
  try {
    // In a real app, this would be a fetch call to your API
    // For demo purposes, we'll simulate a successful response
    console.log('Parsing chart data:', data);
    
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response with sample mappings
    const mockControls: ControlMapping[] = [
      { name: "Cutoff", cc: 74, type: "pot" },
      { name: "Resonance", cc: 71, type: "pot" },
      { name: "Attack", cc: 73, type: "pot" },
      { name: "Decay", cc: 75, type: "pot" },
      { name: "Sustain", cc: 76, type: "pot" },
      { name: "Release", cc: 72, type: "pot" },
      { name: "LFO Rate", cc: 77, type: "pot" },
      { name: "LFO Amount", cc: 78, type: "pot" },
      { name: "Filter Env", cc: 79, type: "pot" },
      { name: "Osc Mix", cc: 70, type: "fader" },
      { name: "Volume", cc: 7, type: "fader" },
      { name: "Pan", cc: 10, type: "fader" },
      { name: "Delay Send", cc: 91, type: "fader" },
      { name: "Reverb Send", cc: 94, type: "fader" },
      { name: "Note On", cc: 80, type: "pad" },
      { name: "Note Off", cc: 81, type: "pad" },
    ];
    
    return { success: true, data: mockControls };
  } catch (error) {
    console.error("Error parsing chart data:", error);
    return { 
      success: false, 
      error: "Failed to parse chart data. Please check your input and try again."
    };
  }
};

export const buildTemplate = async (
  templateData: TemplateData
): Promise<ApiResponse<Blob>> => {
  try {
    // In a real app, this would be a fetch call to your backend API
    console.log('Building template with data:', templateData);
    
    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create a mock .syx file (just a small binary blob for demonstration)
    // In a real app, this would be actual sysex data from your backend
    const mockSyxData = new Uint8Array([
      0xF0, 0x00, 0x20, 0x29, 0x01, 0x42, 0x12, 
      0x00, 0x01, 0x00, 0x00, 0xF7
    ]);
    
    const blob = new Blob([mockSyxData], { type: 'application/octet-stream' });
    return { success: true, data: blob };
  } catch (error) {
    console.error("Error building template:", error);
    return { 
      success: false, 
      error: "Failed to build template. Please try again later."
    };
  }
};

export const downloadTemplate = (blob: Blob, synthName: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${synthName.replace(/[^a-zA-Z0-9]/g, '_')}_Template.syx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
