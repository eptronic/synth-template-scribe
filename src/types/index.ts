
export interface ControlMapping {
  name: string;
  cc: number;
  type: 'pot' | 'fader' | 'button' | 'pad';
}

export interface TemplateData {
  synthName: string;
  controls: ControlMapping[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface FileUploadState {
  file: File | null;
  text: string;
  isDragging: boolean;
  isProcessing: boolean;
  error: string | null;
}

// SysEx related types
export interface SysExData {
  byteLength: number;
  bytes: Uint8Array;
}
