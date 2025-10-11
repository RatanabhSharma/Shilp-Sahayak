import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
const About: React.FC = () => {
  return <div className="bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            About Shilp Sahayak
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <div className="prose prose-lg">
                <p>
                  Shilp Sahayak brings your ideas to life with precision 3D
                  printing. Founded in 2019, we specialize in custom designs at
                  affordable rates.
                </p>
                <p>
                  What started as a passion project in a small workshop has
                  grown into a full-fledged 3D printing service, catering to
                  individuals, businesses, and educational institutions across
                  India.
                </p>
                <p>
                  Our team of skilled designers and technicians work tirelessly
                  to ensure that every print meets our high standards of quality
                  and precision.
                </p>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg overflow-hidden h-80">
              {/* Placeholder for team photo */}
              <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
                Team Photo
              </div>
            </div>
          </div>
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Our Mission
            </h2>
            <div className="bg-primary-50 border border-primary-100 rounded-lg p-8 text-center">
              <p className="text-xl text-primary-800 italic">
                "To democratize access to custom manufacturing by providing
                high-quality, affordable 3D printing solutions that bring
                creative ideas to life."
              </p>
            </div>
          </div>
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">What Sets Us Apart</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-primary-600">
                  Quality
                </h3>
                <p className="text-gray-600">
                  We use premium materials and state-of-the-art printers to
                  ensure every product meets our high standards.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-primary-600">
                  Customization
                </h3>
                <p className="text-gray-600">
                  From personal keychains to complex prototypes, we bring your
                  unique vision to life.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-xl font-medium mb-3 text-primary-600">
                  Affordability
                </h3>
                <p className="text-gray-600">
                  Our transparent pricing ensures you get quality prints without
                  breaking the bank.
                </p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">
              Ready to Bring Your Ideas to Life?
            </h2>
            <div className="flex justify-center space-x-4">
              <Link to="/products">
                <Button variant="primary" size="lg">
                  Browse Products
                </Button>
              </Link>
              <Link to="/customized">
                <Button variant="outline" size="lg">
                  Start Custom Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default About;