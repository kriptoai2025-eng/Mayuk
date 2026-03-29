import React from 'react';
import { Link } from 'react-router-dom';
import { Home, DollarSign, TrendingUp, Users, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useProperties } from '../context/PropertyContext';

const AdminDashboard: React.FC = () => {
  const { properties } = useProperties();
  
  const totalProperties = properties.length;
  const forSale = properties.filter(p => p.type === 'sale').length;
  const forRent = properties.filter(p => p.type === 'rent').length;
  const featured = properties.filter(p => p.featured).length;
  const totalValue = properties
    .filter(p => p.type === 'sale')
    .reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="min-h-screen bg-mayuk-gray-light">
      {/* Header */}
      <section className="bg-gradient-to-r from-mayuk-red to-mayuk-red-dark py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white opacity-90">Manage your real estate listings</p>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Properties</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{totalProperties}</p>
                </div>
                <div className="w-14 h-14 bg-mayuk-red rounded-full flex items-center justify-center">
                  <Home className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">For Sale</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{forSale}</p>
                </div>
                <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">For Rent</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{forRent}</p>
                </div>
                <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Featured</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{featured}</p>
                </div>
                <div className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/admin/properties/new" className="btn-primary flex items-center justify-center">
                <Plus className="w-5 h-5 mr-2" />
                Add New Property
              </Link>
              <Link to="/admin/properties" className="btn-secondary flex items-center justify-center">
                <Edit className="w-5 h-5 mr-2" />
                Manage Properties
              </Link>
              <Link to="/" className="btn-secondary flex items-center justify-center bg-transparent">
                <Eye className="w-5 h-5 mr-2" />
                View Website
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Properties */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Recent Properties</h2>
              <Link to="/admin/properties" className="text-mayuk-red hover:text-mayuk-red-dark font-medium">
                View All →
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Property</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Location</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Price</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Type</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.slice(0, 5).map(property => (
                    <tr key={property.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <img
                            src={property.image}
                            alt={property.title}
                            className="w-12 h-12 rounded-lg object-cover mr-4"
                          />
                          <span className="font-medium text-gray-800">{property.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{property.location}</td>
                      <td className="py-4 px-4 font-semibold text-mayuk-red">
                        ${property.price.toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
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
                      <td className="py-4 px-4">
                        {property.featured ? (
                          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                            Featured
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                            Active
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
