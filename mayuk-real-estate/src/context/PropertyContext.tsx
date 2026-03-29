import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Property, properties as initialProperties } from '../data/properties';

interface PropertyContextType {
  properties: Property[];
  addProperty: (property: Property) => void;
  updateProperty: (id: number, property: Partial<Property>) => void;
  deleteProperty: (id: number) => void;
  getFeaturedProperties: () => Property[];
  getPropertiesByType: (type: 'sale' | 'rent') => Property[];
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined);

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertyProvider');
  }
  return context;
};

interface PropertyProviderProps {
  children: ReactNode;
}

export const PropertyProvider: React.FC<PropertyProviderProps> = ({ children }) => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);

  const addProperty = (property: Property) => {
    setProperties(prev => [...prev, property]);
  };

  const updateProperty = (id: number, updatedProperty: Partial<Property>) => {
    setProperties(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedProperty } : p))
    );
  };

  const deleteProperty = (id: number) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  const getFeaturedProperties = () => {
    return properties.filter(p => p.featured);
  };

  const getPropertiesByType = (type: 'sale' | 'rent') => {
    return properties.filter(p => p.type === type);
  };

  return (
    <PropertyContext.Provider
      value={{
        properties,
        addProperty,
        updateProperty,
        deleteProperty,
        getFeaturedProperties,
        getPropertiesByType,
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};
