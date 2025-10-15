import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Bed, Bath } from 'lucide-react';
import { useUserPreferencesStore } from '@/stores/userPreferencesStore';

export const BudgetScreen = () => {
  const navigate = useNavigate();
  const { apartmentPreferences, setApartmentPreferences, setCurrentStep } = useUserPreferencesStore();
  
  const [minBudget, setMinBudget] = useState(apartmentPreferences.budget.min || 1000);
  const [maxBudget, setMaxBudget] = useState(apartmentPreferences.budget.max || 3000);
  const [bedrooms, setBedrooms] = useState(apartmentPreferences.size.bedrooms || 1);
  const [bathrooms, setBathrooms] = useState(apartmentPreferences.size.bathrooms || 1);

  const handleContinue = () => {
    setApartmentPreferences({
      ...apartmentPreferences,
      budget: { min: minBudget, max: maxBudget },
      size: { bedrooms, bathrooms },
    });
    setCurrentStep(4);
    navigate('/onboarding/timeline');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/onboarding/location')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <span className="text-sm text-gray-500">Step 3 of 6</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          What's your budget?
        </h1>
        <p className="text-gray-600">
          Set your monthly rent range and apartment size
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-8">
        {/* Budget Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Monthly Rent Budget
          </label>
          
          <div className="bg-blue-50 rounded-xl p-6 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-center flex-1">
                <p className="text-sm text-gray-600 mb-1">Minimum</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(minBudget)}</p>
              </div>
              <div className="text-gray-400 mx-4">—</div>
              <div className="text-center flex-1">
                <p className="text-sm text-gray-600 mb-1">Maximum</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(maxBudget)}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-600">Min: {formatCurrency(minBudget)}</label>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={minBudget}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setMinBudget(value);
                  if (value > maxBudget) {
                    setMaxBudget(value + 500);
                  }
                }}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-600">Max: {formatCurrency(maxBudget)}</label>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="100"
                value={maxBudget}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  setMaxBudget(value);
                  if (value < minBudget) {
                    setMinBudget(value - 500);
                  }
                }}
                className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Bed className="inline w-5 h-5 mr-2" />
            Bedrooms
          </label>
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setBedrooms(num)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  bedrooms === num
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Bath className="inline w-5 h-5 mr-2" />
            Bathrooms
          </label>
          <div className="flex gap-3">
            {[1, 1.5, 2, 2.5, 3].map((num) => (
              <button
                key={num}
                onClick={() => setBathrooms(num)}
                className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                  bathrooms === num
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="space-y-4 mt-6">
        <button
          onClick={handleContinue}
          className="w-full py-4 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: '50%' }} />
        </div>
      </div>
    </div>
  );
};
