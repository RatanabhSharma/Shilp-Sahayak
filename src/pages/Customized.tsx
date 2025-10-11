import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, UploadIcon, CheckIcon } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { getProductById } from '../utils/mockData';
import Button from '../components/ui/Button';
import ModelViewer from '../components/3d/ModelViewer';
const Customized: React.FC = () => {
  const {
    productId
  } = useParams<{
    productId: string;
  }>();
  const {
    addToCart
  } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedColor, setSelectedColor] = useState('#3f83f8');
  const [selectedSize, setSelectedSize] = useState({
    width: 50,
    height: 50,
    depth: 10
  });
  const [infillDensity, setInfillDensity] = useState(20);
  const [hasUploadedFile, setHasUploadedFile] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const product = useMemo(() => {
    if (!productId) return null;
    return getProductById(productId);
  }, [productId]);
  // Calculate estimated weight based on size and infill density
  const estimatedWeight = useMemo(() => {
    const volume = selectedSize.width * selectedSize.height * selectedSize.depth;
    const density = 0.00125; // PLA density in g/mm³
    return Math.round(volume * density * (infillDensity / 100));
  }, [selectedSize, infillDensity]);
  // Calculate price based on weight
  const estimatedPrice = useMemo(() => {
    const baseRate = 12; // Rs per gram
    const baseCost = estimatedWeight * baseRate;
    const setupFee = 100; // Fixed setup fee
    return Math.max(250, baseCost + setupFee); // Minimum price of Rs 250
  }, [estimatedWeight]);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setHasUploadedFile(true);
      setUploadedFileName(e.target.files[0].name);
    }
  };
  const handleAddToCart = () => {
    if (!product && !hasUploadedFile) return;
    addToCart({
      id: '',
      productId: productId || 'custom',
      name: product ? `Custom ${product.name}` : 'Custom 3D Print',
      price: estimatedPrice,
      quantity: 1,
      image: product ? product.images[0] : 'https://images.unsplash.com/photo-1631631480669-535cc43f2327?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      isCustom: true,
      customOptions: {
        color: selectedColor,
        size: selectedSize,
        infillDensity,
        modelFile: uploadedFileName
      },
      weight: estimatedWeight
    });
  };
  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <div className="space-y-6">
            <h3 className="text-xl font-semibold">Step 1: Upload Your Model</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-500 transition-colors">
              <input type="file" id="file-upload" className="hidden" accept=".stl,.obj,.jpg,.png" onChange={handleFileUpload} />
              <label htmlFor="file-upload" className="cursor-pointer">
                {hasUploadedFile ? <div className="flex flex-col items-center">
                    <CheckIcon size={32} className="text-green-500 mb-2" />
                    <p className="text-green-600 font-medium">
                      {uploadedFileName}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Click to change file
                    </p>
                  </div> : <div className="flex flex-col items-center">
                    <UploadIcon size={32} className="text-gray-400 mb-2" />
                    <p className="text-gray-600">
                      Drag & drop your 3D model or image here, or click to
                      browse
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Supported formats: .STL, .OBJ, .JPG, .PNG
                    </p>
                  </div>}
              </label>
            </div>
            {product && <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-blue-700">
                  You're customizing:{' '}
                  <span className="font-medium">{product.name}</span>
                </p>
              </div>}
            <div className="flex justify-between">
              <Link to="/products">
                <Button variant="outline" icon={<ArrowLeftIcon size={16} />}>
                  Back to Products
                </Button>
              </Link>
              <Button variant="primary" onClick={nextStep} disabled={!hasUploadedFile && !product} icon={<ArrowRightIcon size={16} />} iconPosition="right">
                Next: Preview
              </Button>
            </div>
          </div>;
      case 2:
        return <div className="space-y-6">
            <h3 className="text-xl font-semibold">
              Step 2: Preview Your Model
            </h3>
            <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
              <ModelViewer height={300} backgroundColor={selectedColor} />
            </div>
            <p className="text-sm text-gray-600">
              Rotate and zoom to inspect your model. This is how your 3D print
              will look.
            </p>
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep} icon={<ArrowLeftIcon size={16} />}>
                Back: Upload
              </Button>
              <Button variant="primary" onClick={nextStep} icon={<ArrowRightIcon size={16} />} iconPosition="right">
                Next: Customize
              </Button>
            </div>
          </div>;
      case 3:
        return <div className="space-y-6">
            <h3 className="text-xl font-semibold">
              Step 3: Customize Your Print
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['#3f83f8', '#ff5a1f', '#16a34a', '#ef4444', '#8b5cf6', '#000000', '#ffffff'].map(color => <button key={color} className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? 'border-gray-900' : 'border-transparent'} ${color === '#ffffff' ? 'border border-gray-300' : ''}`} style={{
                    backgroundColor: color
                  }} onClick={() => setSelectedColor(color)} aria-label={`Select color ${color}`} />)}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size (mm)
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Width
                      </label>
                      <input type="number" value={selectedSize.width} onChange={e => setSelectedSize({
                      ...selectedSize,
                      width: parseInt(e.target.value) || 0
                    })} className="w-full px-3 py-2 border border-gray-300 rounded-md" min="10" max="200" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Height
                      </label>
                      <input type="number" value={selectedSize.height} onChange={e => setSelectedSize({
                      ...selectedSize,
                      height: parseInt(e.target.value) || 0
                    })} className="w-full px-3 py-2 border border-gray-300 rounded-md" min="10" max="200" />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">
                        Depth
                      </label>
                      <input type="number" value={selectedSize.depth} onChange={e => setSelectedSize({
                      ...selectedSize,
                      depth: parseInt(e.target.value) || 0
                    })} className="w-full px-3 py-2 border border-gray-300 rounded-md" min="1" max="50" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Infill Density: {infillDensity}%
                  </label>
                  <input type="range" min="10" max="100" step="5" value={infillDensity} onChange={e => setInfillDensity(parseInt(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>10% (Lightweight)</span>
                    <span>100% (Solid)</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <h4 className="font-medium mb-2">Price Estimate</h4>
                  <dl className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <dt>Estimated Weight:</dt>
                      <dd>{estimatedWeight} grams</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Base Cost (₹12/gram):</dt>
                      <dd>₹{estimatedWeight * 12}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt>Setup Fee:</dt>
                      <dd>₹100</dd>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t border-gray-200 mt-2">
                      <dt>Total:</dt>
                      <dd>₹{estimatedPrice}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div>
                <ModelViewer height={300} backgroundColor={selectedColor} />
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={prevStep} icon={<ArrowLeftIcon size={16} />}>
                Back: Preview
              </Button>
              <Button variant="primary" onClick={handleAddToCart} icon={<CheckIcon size={16} />}>
                Add to Cart
              </Button>
            </div>
          </div>;
      default:
        return null;
    }
  };
  return <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Customize Your 3D Print</h1>
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3].map(step => <div key={step} className={`flex-1 text-center ${step < currentStep ? 'text-primary-600' : step === currentStep ? 'text-primary-800 font-medium' : 'text-gray-400'}`}>
                  Step {step}
                </div>)}
            </div>
            <div className="overflow-hidden h-2 bg-gray-200 rounded-full">
              <div className="h-full bg-primary-500 rounded-full transition-all duration-300" style={{
              width: `${(currentStep - 1) / 2 * 100}%`
            }} />
            </div>
          </div>
          {/* Step Content */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>;
};
export default Customized;