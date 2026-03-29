import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu, X, User, Phone, Mail } from 'lucide-react';

interface NavbarProps {
  isAdmin?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isAdmin = false }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Home className="w-10 h-10 text-mayuk-red" />
            <span className="text-3xl font-bold text-mayuk-red">Mayuk</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!isAdmin ? (
              <>
                <Link to="/" className="text-gray-700 hover:text-mayuk-red font-medium transition-colors">
                  Home
                </Link>
                <Link to="/properties" className="text-gray-700 hover:text-mayuk-red font-medium transition-colors">
                  Properties
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-mayuk-red font-medium transition-colors">
                  About
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-mayuk-red font-medium transition-colors">
                  Contact
                </Link>
                <Link to="/admin" className="btn-primary">
                  Admin Panel
                </Link>
              </>
            ) : (
              <>
                <Link to="/admin" className="text-gray-700 hover:text-mayuk-red font-medium transition-colors">
                  Dashboard
                </Link>
                <Link to="/admin/properties" className="text-gray-700 hover:text-mayuk-red font-medium transition-colors">
                  Manage Properties
                </Link>
                <Link to="/" className="btn-secondary">
                  Back to Site
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-mayuk-red focus:outline-none"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              {!isAdmin ? (
                <>
                  <Link to="/" className="text-gray-700 hover:text-mayuk-red font-medium transition-colors">
                    Home
                  </Link>
                  <Link to="/properties" className="text-gray-700 hover:text-mayuk-red font-medium transition-colors">
                    Properties
                  </Link>
                  <Link to="/about" className="text-gray-700 hover:text-mayuk-red font-medium transition-colors">
                    About
                  </Link>
                  <Link to="/contact" className="text-gray-700 hover:text-mayuk-red font-medium transition-colors">
                    Contact
                  </Link>
                  <Link to="/admin" className="btn-primary text-center">
                    Admin Panel
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/admin" className="text-gray-700 hover:text-mayuk-red font-medium transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/admin/properties" className="text-gray-700 hover:text-mayuk-red font-medium transition-colors">
                    Manage Properties
                  </Link>
                  <Link to="/" className="btn-secondary text-center">
                    Back to Site
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
