import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, X } from 'lucide-react';
import { useUserPreferencesStore } from '@/stores/userPreferencesStore';

export const LocationScreen = () => {
  const navigate = useNavigate();
  const { apartmentPreferences, setApartmentPreferences, setCurrentStep } = useUserPreferencesStore();
  
  const [city, setCity] = useState(apartmentPreferences.location.city || '');
  const [neighborhoodInput, setNeighborhoodInput] = useState('');
  const [neighborhoods, setNeighborhoods] = useState<string[]>(
    apartmentPreferences.location.neighborhoods || []
  );

  const handleAddNeighborhood = () => {
    if (neighborhoodInput.trim() && !neighborhoods.includes(neighborhoodInput.trim())) {
      setNeighborhoods([...neighborhoods, neighborhoodInput.trim()]);
      setNeighborhoodInput('');
    }
  };

  const handleRemoveNeighborhood = (neighborhood: string) => {
    setNeighborhoods(neighborhoods.filter(n => n !== neighborhood));
  };

  const handleContinue = () => {
    if (city && neighborhoods.length > 0) {
      setApartmentPreferences({
        ...apartmentPreferences,
        location: { city, neighborhoods },
      });
      setCurrentStep(3);
      navigate('/onboarding/budget');
    }
  };

  const isValid = city && neighborhoods.length > 0;

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/onboarding/living-situation')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <span className="text-sm text-gray-500">Step 2 of 6</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Where do you want to live?
        </h1>
        <p className="text-gray-600">
          Select your city and preferred neighborhoods
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-6">
        {/* City Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g., New York"
              className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Neighborhoods Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Neighborhoods (Add at least 1)
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={neighborhoodInput}
              onChange={(e) => setNeighborhoodInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddNeighborhood()}
              placeholder="e.g., Brooklyn Heights"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              onClick={handleAddNeighborhood}
              className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Selected Neighborhoods */}
          {neighborhoods.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {neighborhoods.map((neighborhood) => (
                <div
                  key={neighborhood}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg border border-blue-200"
                >
                  <span className="text-sm font-medium">{neighborhood}</span>
                  <button
                    onClick={() => handleRemoveNeighborhood(neighborhood)}
                    className="hover:bg-blue-100 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Popular Neighborhoods */}
        <div>
          <p className="text-sm text-gray-500 mb-3">Popular neighborhoods:</p>
          <div className="flex flex-wrap gap-2">
            {['Manhattan', 'Brooklyn', 'Queens', 'Williamsburg', 'East Village', 'Upper West Side'].map((area) => (
              <button
                key={area}
                onClick={() => {
                  if (!neighborhoods.includes(area)) {
                    setNeighborhoods([...neighborhoods, area]);
                  }
                }}
                disabled={neighborhoods.includes(area)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  neighborhoods.includes(area)
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="space-y-4 mt-6">
        <button
          onClick={handleContinue}
          disabled={!isValid}
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-colors ${
            isValid
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continue
        </button>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: '33.33%' }} />
        </div>
      </div>
    </div>
  );
};
