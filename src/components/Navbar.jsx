import React from 'react';
import { HelpCircle } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white/0 backdrop-blur-sm shadow-sm rounded-b-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="text-3xl font-bold  font-host-grotesk text-black tracking-tight">
          VeloCity
        </div>

        {/* Help Icon */}
        <button 
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 p-2 rounded-full transition-all"
          aria-label="Help and Support"
        >
          <HelpCircle size={24} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;