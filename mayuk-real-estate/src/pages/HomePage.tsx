import React from 'react';
import { Link } from 'react-router-dom';
import { Home, DollarSign, TrendingUp, Users, Phone, Mail, MapPin } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';

const HomePage: React.FC = () => {
  const { getFeaturedProperties, properties } = useProperties();
  const featuredProperties = getFeaturedProperties();
  const totalProperties = properties.length;
  const forSale = properties.filter(p => p.type === 'sale').length;
  const forRent = properties.filter(p => p.type === 'rent').length;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-mayuk-red to-mayuk-red-dark flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your Dream Home with Mayuk
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
            Discover premium properties across the nation. Your perfect home is just a click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/properties" className="btn-primary text-lg px-8 py-4">
              Browse Properties
            </Link>
            <Link to="/contact" className="btn-secondary text-lg px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-mayuk-red">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-mayuk-gray-light">
              <Home className="w-16 h-16 text-mayuk-red mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-800 mb-2">{totalProperties}</h3>
              <p className="text-gray-600 text-lg">Total Properties</p>
            </div>
            <div className="text-center p-8 rounded-xl bg-mayuk-gray-light">
              <DollarSign className="w-16 h-16 text-mayuk-red mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-800 mb-2">{forSale}</h3>
              <p className="text-gray-600 text-lg">Properties For Sale</p>
            </div>
            <div className="text-center p-8 rounded-xl bg-mayuk-gray-light">
              <TrendingUp className="w-16 h-16 text-mayuk-red mx-auto mb-4" />
              <h3 className="text-4xl font-bold text-gray-800 mb-2">{forRent}</h3>
              <p className="text-gray-600 text-lg">Properties For Rent</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-mayuk-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Featured Properties</h2>
            <p className="section-subtitle">Explore our handpicked selection of premium properties</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/properties" className="btn-primary text-lg px-8 py-4">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose Mayuk?</h2>
            <p className="section-subtitle">We're committed to helping you find the perfect property</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-mayuk-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Expert Agents</h3>
              <p className="text-gray-600">Our experienced team is dedicated to finding you the best deals and guiding you through every step.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-mayuk-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Home className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Quality Listings</h3>
              <p className="text-gray-600">We carefully curate our property listings to ensure only the highest quality homes are available.</p>
            </div>
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-mayuk-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">24/7 Support</h3>
              <p className="text-gray-600">Our customer support team is always available to answer your questions and provide assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-mayuk-red to-mayuk-red-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Find Your Dream Home?</h2>
          <p className="text-xl text-white mb-8">Contact us today and let our experts help you find the perfect property.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-secondary bg-white text-mayuk-red hover:bg-gray-100">
              Get in Touch
            </Link>
            <Link to="/properties" className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-mayuk-red">
              Browse Listings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
