import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useProperties } from '../context/PropertyContext';
import { Bed, Bath, Maximize, MapPin, Phone, Mail, ArrowLeft, DollarSign } from 'lucide-react';

const PropertyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { properties } = useProperties();
  
  const property = properties.find(p => p.id === parseInt(id || '0'));

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mayuk-gray-light">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-700 mb-4">Property Not Found</h1>
          <Link to="/properties" className="btn-primary">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number, type: 'sale' | 'rent') => {
    if (type === 'rent') {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-mayuk-gray-light">
      {/* Back Button */}
      <div className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/properties" className="inline-flex items-center text-mayuk-red hover:text-mayuk-red-dark font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Properties
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative h-[500px]">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span
              className={`px-4 py-2 rounded-full text-white font-semibold text-sm ${
                property.type === 'sale' ? 'bg-mayuk-red' : 'bg-green-500'
              }`}
            >
              For {property.type}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-2">
              {property.title}
            </h1>
            <div className="flex items-center text-white text-lg">
              <MapPin className="w-6 h-6 mr-2" />
              {property.location}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-8 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-gray-800">
                    {formatPrice(property.price, property.type)}
                  </h2>
                  {property.featured && (
                    <span className="px-4 py-2 bg-yellow-500 text-white rounded-full font-semibold">
                      Featured Listing
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b">
                  <div className="text-center">
                    <Bed className="w-8 h-8 text-mayuk-red mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">{property.bedrooms}</p>
                    <p className="text-gray-600">Bedrooms</p>
                  </div>
                  <div className="text-center">
                    <Bath className="w-8 h-8 text-mayuk-red mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">{property.bathrooms}</p>
                    <p className="text-gray-600">Bathrooms</p>
                  </div>
                  <div className="text-center">
                    <Maximize className="w-8 h-8 text-mayuk-red mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-800">{property.area.toLocaleString()}</p>
                    <p className="text-gray-600">Sq Ft</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Description</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {property.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar - Agent Contact */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-8 sticky top-24">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Agent</h3>
                
                <div className="mb-6">
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-mayuk-red rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                      {property.agent.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 text-lg">{property.agent.name}</p>
                      <p className="text-gray-600">Listing Agent</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <a
                      href={`tel:${property.agent.phone}`}
                      className="flex items-center text-gray-700 hover:text-mayuk-red transition-colors"
                    >
                      <Phone className="w-5 h-5 mr-3 text-mayuk-red" />
                      {property.agent.phone}
                    </a>
                    <a
                      href={`mailto:${property.agent.email}`}
                      className="flex items-center text-gray-700 hover:text-mayuk-red transition-colors"
                    >
                      <Mail className="w-5 h-5 mr-3 text-mayuk-red" />
                      {property.agent.email}
                    </a>
                  </div>
                </div>

                <button className="btn-primary w-full mb-4">
                  Schedule a Viewing
                </button>
                <button className="btn-secondary w-full">
                  Request Information
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetailPage;
