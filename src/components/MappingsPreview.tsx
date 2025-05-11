
import React from 'react';
import { ControlMapping } from '../types';

interface Props {
  mappings: ControlMapping[];
  synthName: string;
}

const MappingsPreview: React.FC<Props> = ({ mappings, synthName }) => {
  // Filter mappings by type
  const pots = mappings.filter(m => m.type === 'pot').slice(0, 16);
  const faders = mappings.filter(m => m.type === 'fader').slice(0, 8);
  const pads = mappings.filter(m => m.type === 'pad' || m.type === 'button').slice(0, 16);
  
  return (
    <div className="bg-gunmetal/80 rounded-lg p-6 mb-8 relative overflow-hidden">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-white">{synthName} Template</h2>
        <p className="text-sm text-slate">Preview your mappings before downloading</p>
      </div>
      
      {/* Responsive grid layout */}
      <div className="space-y-8 md:space-y-6">
        {/* Pots Section */}
        {pots.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-accent mb-3">POTS</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
              {pots.map((pot, index) => (
                <div key={`pot-${index}`} className="flex flex-col items-center">
                  <div className="virtual-knob mb-2" style={{ transform: `rotate(${45 + (pot.cc % 127)}deg)` }}>
                    <div className="absolute inset-3 rounded-full bg-midnight"></div>
                  </div>
                  <span className="text-xs text-accent truncate max-w-full">{pot.name}</span>
                  <span className="text-xs text-slate">CC {pot.cc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Faders Section */}
        {faders.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-accent mb-3">FADERS</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
              {faders.map((fader, index) => (
                <div key={`fader-${index}`} className="flex flex-col items-center">
                  <div className="virtual-fader mb-2">
                    <div 
                      className="virtual-fader-fill"
                      style={{ height: `${(fader.cc % 127) / 127 * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-accent truncate max-w-full">{fader.name}</span>
                  <span className="text-xs text-slate">CC {fader.cc}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Pads Section */}
        {pads.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-accent mb-3">PADS & BUTTONS</h3>
            <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {pads.map((pad, index) => (
                <div key={`pad-${index}`} className="flex flex-col items-center">
                  <div className="cc-pad mb-2">
                    <div className="cc-pad-glow"></div>
                    <span className="text-accent text-xs">{pad.cc}</span>
                  </div>
                  <span className="text-xs text-accent truncate max-w-full">{pad.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MappingsPreview;
