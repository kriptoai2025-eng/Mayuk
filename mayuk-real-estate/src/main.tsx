import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { PropertyProvider } from './context/PropertyContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PropertiesPage from './pages/PropertiesPage';
import PropertyDetailPage from './pages/PropertyDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminPropertiesPage from './pages/AdminPropertiesPage';

const App: React.FC = () => {
  return (
    <PropertyProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <HomePage />
              </>
            } />
            <Route path="/properties" element={
              <>
                <Navbar />
                <PropertiesPage />
              </>
            } />
            <Route path="/property/:id" element={
              <>
                <Navbar />
                <PropertyDetailPage />
              </>
            } />
            <Route path="/about" element={
              <>
                <Navbar />
                <AboutPage />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Navbar />
                <ContactPage />
              </>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <>
                <Navbar isAdmin />
                <AdminDashboard />
              </>
            } />
            <Route path="/admin/properties" element={
              <>
                <Navbar isAdmin />
                <AdminPropertiesPage />
              </>
            } />
            <Route path="/admin/properties/new" element={
              <>
                <Navbar isAdmin />
                <AdminPropertiesPage />
              </>
            } />
          </Routes>
          
          {/* Footer */}
          <footer className="bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-mayuk-red mb-4">Mayuk</h3>
                  <p className="text-gray-400">Your trusted partner in finding the perfect property.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="/" className="hover:text-mayuk-red transition-colors">Home</a></li>
                    <li><a href="/properties" className="hover:text-mayuk-red transition-colors">Properties</a></li>
                    <li><a href="/about" className="hover:text-mayuk-red transition-colors">About</a></li>
                    <li><a href="/contact" className="hover:text-mayuk-red transition-colors">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4">Services</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="/properties?type=sale" className="hover:text-mayuk-red transition-colors">Buy Property</a></li>
                    <li><a href="/properties?type=rent" className="hover:text-mayuk-red transition-colors">Rent Property</a></li>
                    <li><a href="/contact" className="hover:text-mayuk-red transition-colors">Sell Property</a></li>
                    <li><a href="/contact" className="hover:text-mayuk-red transition-colors">Property Management</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-4">Contact Info</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li>123 Real Estate Blvd</li>
                    <li>Beverly Hills, CA 90210</li>
                    <li>(555) 123-4567</li>
                    <li>info@mayuk.com</li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 Mayuk Real Estate. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </PropertyProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
