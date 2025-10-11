import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, UploadIcon } from 'lucide-react';
import { categories } from '../utils/mockData';
import Button from '../components/ui/Button';
import ModelViewer from '../components/3d/ModelViewer';
const Home: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedColor, setSelectedColor] = useState('#3f83f8');
  const [selectedSize, setSelectedSize] = useState(50);
  const slides = [{
    id: 1,
    title: 'Custom 3D Printed Keychains',
    description: 'Personalized keychains with your name or design.',
    image: 'https://images.unsplash.com/photo-1631631480669-535cc43f2327?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    cta: 'Shop Keychains',
    link: '/products?category=keychains'
  }, {
    id: 2,
    title: 'Beautiful Lithoframes',
    description: 'Turn your photos into stunning 3D printed lithoframes.',
    image: 'https://images.unsplash.com/photo-1616088886430-caaae4b1af9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    cta: 'Shop Lithoframes',
    link: '/products?category=lithoframes'
  }, {
    id: 3,
    title: 'Elegant Light Fixtures',
    description: 'Illuminate your space with our designer 3D printed lamps.',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    cta: 'Shop Lamps',
    link: '/products?category=lamps'
  }];
  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
  };
  return <div className="w-full bg-white">
      {/* Hero Slideshow */}
      <section className="relative">
        <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
          {slides.map((slide, index) => <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${activeSlide === index ? 'opacity-100' : 'opacity-0'}`} style={{
          zIndex: activeSlide === index ? 10 : 0
        }}>
              <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
              <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-3xl">
                  {slide.title}
                </h1>
                <p className="text-xl text-white mb-8 max-w-2xl">
                  {slide.description}
                </p>
                <Link to={slide.link}>
                  <Button variant="secondary" size="lg">
                    {slide.cta}
                  </Button>
                </Link>
              </div>
            </div>)}
        </div>
        {/* Slide indicators */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2 z-30">
          {slides.map((_, index) => <button key={index} className={`w-3 h-3 rounded-full ${activeSlide === index ? 'bg-secondary-500' : 'bg-white bg-opacity-50'}`} onClick={() => handleSlideChange(index)} aria-label={`Go to slide ${index + 1}`} />)}
        </div>
      </section>
      {/* Product Categories */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(category => <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <Link to={`/products?category=${category.id}`} className="block">
                <div className="h-48 bg-gray-200">
                  {/* Placeholder for category image */}
                  <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600">
                    <span className="text-lg font-medium">{category.name}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {category.customizable ? `Customizable ${category.name.toLowerCase()} for your unique needs.` : `Explore our range of ${category.name.toLowerCase()}.`}
                  </p>
                  <div className="flex items-center text-primary-600 font-medium">
                    <span>View Products</span>
                    <ArrowRightIcon size={16} className="ml-2" />
                  </div>
                </div>
              </Link>
            </div>)}
        </div>
      </section>
      {/* Customize Shortcut */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Create Your Custom Design
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Upload your 3D model or image and we'll bring it to life with our
              precision 3D printing. Base price starts at ₹12 per gram.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="mb-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 transition-colors">
                      <UploadIcon size={32} className="mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600">
                        Drag & drop your 3D model or image here, or click to
                        browse
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Supported formats: .STL, .OBJ, .JPG, .PNG
                      </p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <div className="flex space-x-2">
                      {['#3f83f8', '#ff5a1f', '#16a34a', '#ef4444', '#8b5cf6', '#000000'].map(color => <button key={color} className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-gray-900' : 'border-transparent'}`} style={{
                      backgroundColor: color
                    }} onClick={() => setSelectedColor(color)} aria-label={`Select color ${color}`} />)}
                    </div>
                  </div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Size (mm)
                    </label>
                    <input type="range" min="10" max="100" value={selectedSize} onChange={e => setSelectedSize(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>10mm</span>
                      <span>{selectedSize}mm</span>
                      <span>100mm</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md mb-6">
                    <h4 className="font-medium mb-2">Price Estimate</h4>
                    <p className="text-gray-600 text-sm">
                      Base: ₹12/gram – Upload model to calculate final price
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Link to="/customized">
                      <Button variant="primary" size="lg">
                        Go to Full Customize
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <ModelViewer height={350} backgroundColor={selectedColor === '#000000' ? '#1f2937' : '#f3f4f6'} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Home;