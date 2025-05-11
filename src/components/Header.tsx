
import React from 'react';

const Header = () => {
  return (
    <header className="h-10 bg-gunmetal flex items-center px-4 w-full">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
        <div className="logomark"></div>
        
        <h1 className="text-accent text-lg font-medium">SL MkIII Template Builder</h1>
        
        <div className="flex items-center">
          <div className="h-2 w-2 bg-accent rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
