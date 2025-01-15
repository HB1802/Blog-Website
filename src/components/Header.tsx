import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, User, LogOut, PenSquare } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import CategoryDropdown from './CategoryDropdown';
import { ROUTES } from '../routes';

export default function Header() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button 
              className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
            <Link to={ROUTES.HOME} className="text-2xl font-bold text-gray-900 ml-2 lg:ml-0">
              Mindscape
            </Link>
          </div>
          
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to={ROUTES.HOME} className="text-gray-700 hover:text-gray-900 px-3 py-2">Home</Link>
            <Link to={ROUTES.ARTICLES} className="text-gray-700 hover:text-gray-900 px-3 py-2">Articles</Link>
            <CategoryDropdown />
            <Link to="/submit-article" className="text-gray-700 hover:text-gray-900 px-3 py-2">Post</Link>
            <Link to={ROUTES.ABOUT} className="text-gray-700 hover:text-gray-900 px-3 py-2">About</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-lg hover:bg-gray-100"
              onClick={() => navigate(ROUTES.ARTICLES)}
            >
              <Search size={20} />
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-gray-100"
                  title="Sign out"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100">
            <div className="py-2 space-y-1">
              <Link to={ROUTES.HOME} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</Link>
              <Link to={ROUTES.ARTICLES} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Articles</Link>
              <Link to="/submit-article" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Post</Link>
              <Link to={ROUTES.ABOUT} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}