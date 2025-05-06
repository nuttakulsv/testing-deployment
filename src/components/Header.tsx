import React from 'react';
import { Activity } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Activity className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">SystemStatus</h1>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Dashboard</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Documentation</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;