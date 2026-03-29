import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Award, Heart, Building } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-mayuk-gray-light">
      {/* Header */}
      <section className="bg-gradient-to-r from-mayuk-red to-mayuk-red-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Mayuk</h1>
          <p className="text-xl text-white opacity-90 max-w-3xl mx-auto">
            Your trusted partner in finding the perfect property since 2010
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Founded in 2010, Mayuk has grown from a small local real estate agency to one of the most trusted names in the industry. Our journey began with a simple mission: to help people find their dream homes while providing exceptional service and expertise.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Over the years, we've helped thousands of families find their perfect homes, assisted countless investors in building their portfolios, and established ourselves as leaders in the real estate market.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Today, Mayuk continues to innovate and adapt to the changing needs of our clients, leveraging technology and maintaining our commitment to personalized service.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
                alt="Modern office building"
                className="rounded-xl shadow-lg w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-mayuk-gray-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-20 h-20 bg-mayuk-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Client First</h3>
              <p className="text-gray-600">Your needs and satisfaction are at the heart of everything we do.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-20 h-20 bg-mayuk-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Excellence</h3>
              <p className="text-gray-600">We strive for excellence in every transaction and interaction.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-20 h-20 bg-mayuk-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Integrity</h3>
              <p className="text-gray-600">Honesty and transparency are the foundation of our business.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <div className="w-20 h-20 bg-mayuk-red rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Innovation</h3>
              <p className="text-gray-600">We embrace new technologies and approaches to serve you better.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gradient-to-r from-mayuk-red to-mayuk-red-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <p className="text-5xl font-bold mb-2">15+</p>
              <p className="text-lg opacity-90">Years Experience</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">5000+</p>
              <p className="text-lg opacity-90">Properties Sold</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">3000+</p>
              <p className="text-lg opacity-90">Happy Clients</p>
            </div>
            <div>
              <p className="text-5xl font-bold mb-2">50+</p>
              <p className="text-lg opacity-90">Expert Agents</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Meet Our Leadership</h2>
            <p className="section-subtitle">The team behind Mayuk's success</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Jennifer Williams', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop' },
              { name: 'Robert Chen', role: 'Chief Operating Officer', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop' },
              { name: 'Sarah Martinez', role: 'Head of Sales', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop' },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-48 h-48 rounded-full mx-auto mb-6 object-cover shadow-lg"
                />
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-mayuk-red font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-mayuk-gray-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Work With Us?</h2>
          <p className="text-gray-600 text-lg mb-8">
            Let our experienced team help you find your dream property today.
          </p>
          <Link to="/contact" className="btn-primary text-lg px-8 py-4">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
