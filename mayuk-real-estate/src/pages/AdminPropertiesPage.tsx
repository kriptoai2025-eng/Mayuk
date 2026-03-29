import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Save, X } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';
import { Property } from '../data/properties';

const AdminPropertiesPage: React.FC = () => {
  const { properties, addProperty, updateProperty, deleteProperty } = useProperties();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      deleteProperty(id);
    }
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-mayuk-gray-light">
      {/* Header */}
      <section className="bg-gradient-to-r from-mayuk-red to-mayuk-red-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Manage Properties</h1>
              <p className="text-white opacity-90">View, edit, and manage all property listings</p>
            </div>
            <button onClick={() => setShowForm(true)} className="btn-primary bg-white text-mayuk-red hover:bg-gray-100">
              <Plus className="w-5 h-5 mr-2" />
              Add New Property
            </button>
          </div>
        </div>
      </section>

      {/* Properties Table */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Property</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Location</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Price</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Featured</th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map(property => (
                    <tr key={property.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <img
                            src={property.image}
                            alt={property.title}
                            className="w-16 h-12 rounded-lg object-cover mr-4"
                          />
                          <span className="font-medium text-gray-800">{property.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-600">{property.location}</td>
                      <td className="py-4 px-6 font-semibold text-mayuk-red">
                        ${property.price.toLocaleString()}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            property.type === 'sale'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          For {property.type}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        {property.featured ? (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                            Yes
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                            No
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleEdit(property)}
                            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(property.id)}
                            className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Property Form Modal */}
      {showForm && (
        <PropertyFormModal
          property={editingProperty}
          onClose={() => {
            setShowForm(false);
            setEditingProperty(null);
          }}
        />
      )}
    </div>
  );
};

interface PropertyFormModalProps {
  property: Property | null;
  onClose: () => void;
}

const PropertyFormModal: React.FC<PropertyFormModalProps> = ({ property, onClose }) => {
  const { addProperty, updateProperty } = useProperties();
  const [formData, setFormData] = useState<Partial<Property>>({
    title: property?.title || '',
    price: property?.price || 0,
    location: property?.location || '',
    bedrooms: property?.bedrooms || 0,
    bathrooms: property?.bathrooms || 0,
    area: property?.area || 0,
    description: property?.description || '',
    image: property?.image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    type: property?.type || 'sale',
    featured: property?.featured || false,
    agent: property?.agent || { name: '', phone: '', email: '' },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (property) {
      updateProperty(property.id, formData as Property);
    } else {
      const newProperty: Property = {
        id: Date.now(),
        ...formData as Property,
      };
      addProperty(newProperty);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {property ? 'Edit Property' : 'Add New Property'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Price</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'sale' | 'rent' })}
                className="input-field"
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Bedrooms</label>
              <input
                type="number"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: parseInt(e.target.value) })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Bathrooms</label>
              <input
                type="number"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: parseInt(e.target.value) })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Area (sqft)</label>
              <input
                type="number"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: parseInt(e.target.value) })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Featured</label>
              <label className="flex items-center space-x-2 mt-2">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5 accent-mayuk-red"
                />
                <span className="text-gray-700">Mark as featured property</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field"
                rows={4}
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div className="md:col-span-2 border-t pt-6 mt-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Agent Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.agent?.name}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      agent: { ...formData.agent!, name: e.target.value } 
                    })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.agent?.phone}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      agent: { ...formData.agent!, phone: e.target.value } 
                    })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.agent?.email}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      agent: { ...formData.agent!, email: e.target.value } 
                    })}
                    className="input-field"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <Save className="w-5 h-5 mr-2 inline" />
              {property ? 'Update Property' : 'Add Property'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPropertiesPage;
