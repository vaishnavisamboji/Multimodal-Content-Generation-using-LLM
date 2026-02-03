import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, BookOpen, Image } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              ContentForge AI
            </span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/education"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/education')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span className="font-medium">Education</span>
            </Link>
            <Link
              to="/social"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/social')
                  ? 'bg-secondary-100 text-secondary-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Image className="h-5 w-5" />
              <span className="font-medium">Social Media</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
