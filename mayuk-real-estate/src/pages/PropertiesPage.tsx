import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Home } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import PropertyCard from '../components/PropertyCard';

const PropertiesPage: React.FC = () => {
  const { properties } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'sale' | 'rent'>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000000]);

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || property.type === filterType;
    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];
    
    return matchesSearch && matchesType && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-mayuk-gray-light">
      {/* Header */}
      <section className="bg-gradient-to-r from-mayuk-red to-mayuk-red-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Properties
          </h1>
          <p className="text-xl text-white opacity-90">
            Find the perfect property that matches your needs
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-md sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-12"
              />
            </div>

            {/* Type Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'all' | 'sale' | 'rent')}
              className="input-field"
            >
              <option value="all">All Properties</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>

            {/* Price Range */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Max Price:</span>
              <input
                type="range"
                min="0"
                max="2000000"
                step="50000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="flex-1 accent-mayuk-red"
              />
              <span className="text-mayuk-red font-semibold whitespace-nowrap">
                ${priceRange[1].toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredProperties.length > 0 ? (
            <>
              <div className="mb-6">
                <p className="text-gray-600">
                  Showing {filteredProperties.length} of {properties.length} properties
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <Home className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-700 mb-4">No Properties Found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search criteria</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('all');
                  setPriceRange([0, 2000000]);
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PropertiesPage;
