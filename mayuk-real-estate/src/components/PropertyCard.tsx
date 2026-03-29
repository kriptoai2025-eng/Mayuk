import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from '../data/properties';
import { Bed, Bath, Maximize, MapPin, DollarSign } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const formatPrice = (price: number, type: 'sale' | 'rent') => {
    if (type === 'rent') {
      return `$${price.toLocaleString()}/month`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <div className="card group">
      {/* Image */}
      <div className="relative overflow-hidden h-64">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`px-4 py-2 rounded-full text-white font-semibold text-sm ${
              property.type === 'sale' ? 'bg-mayuk-red' : 'bg-green-500'
            }`}
          >
            For {property.type}
          </span>
        </div>
        {property.featured && (
          <div className="absolute top-4 right-4">
            <span className="px-4 py-2 bg-yellow-500 text-white rounded-full text-sm font-semibold">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800">{property.title}</h3>
          <p className="text-2xl font-bold text-mayuk-red">
            {formatPrice(property.price, property.type)}
          </p>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-5 h-5 mr-2 text-mayuk-red" />
          <span>{property.location}</span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>

        {/* Features */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center space-x-2">
            <Bed className="w-5 h-5 text-mayuk-red" />
            <span className="text-gray-700 font-medium">{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center space-x-2">
            <Bath className="w-5 h-5 text-mayuk-red" />
            <span className="text-gray-700 font-medium">{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center space-x-2">
            <Maximize className="w-5 h-5 text-mayuk-red" />
            <span className="text-gray-700 font-medium">{property.area.toLocaleString()} sqft</span>
          </div>
        </div>

        {/* Agent Info */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-800">{property.agent.name}</p>
              <p className="text-sm text-gray-600">Listing Agent</p>
            </div>
            <Link
              to={`/property/${property.id}`}
              className="btn-primary text-sm py-2 px-4"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
