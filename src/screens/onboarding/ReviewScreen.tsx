import { useNavigate } from 'react-router-dom';
import { MapPin, DollarSign, Calendar, Users, Check } from 'lucide-react';
import { useUserPreferencesStore } from '@/stores/userPreferencesStore';

export const ReviewScreen = () => {
  const navigate = useNavigate();
  const { 
    apartmentPreferences, 
    roommatePreferences, 
    livingSituation,
    completeOnboarding 
  } = useUserPreferencesStore();

  const handleComplete = () => {
    completeOnboarding();
    navigate('/home');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'Not set';
    return new Date(date).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate(livingSituation === 'solo' ? '/onboarding/timeline' : '/onboarding/roommate-preferences')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <span className="text-sm text-gray-500">Step 6 of 6</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Review your preferences
        </h1>
        <p className="text-gray-600">
          Everything look good? You can edit these later
        </p>
      </div>

      {/* Summary Cards */}
      <div className="flex-1 space-y-4 overflow-y-auto">
        {/* Location */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Location</h3>
                <p className="text-sm text-gray-500">{apartmentPreferences.location.city}</p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/onboarding/location')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Edit
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {apartmentPreferences.location.neighborhoods.map((area) => (
              <span key={area} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Budget */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Budget & Size</h3>
                <p className="text-sm text-gray-500">
                  {formatCurrency(apartmentPreferences.budget.min)} - {formatCurrency(apartmentPreferences.budget.max)}
                </p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/onboarding/budget')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Edit
            </button>
          </div>
          <div className="flex gap-4 text-sm">
            <span className="text-gray-700">
              <strong>{apartmentPreferences.size.bedrooms}</strong> bedroom{apartmentPreferences.size.bedrooms > 1 ? 's' : ''}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-700">
              <strong>{apartmentPreferences.size.bathrooms}</strong> bathroom{apartmentPreferences.size.bathrooms > 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Timeline</h3>
                <p className="text-sm text-gray-500">
                  {formatDate(apartmentPreferences.timeline?.moveInDate)}
                </p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/onboarding/timeline')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Edit
            </button>
          </div>
          <p className="text-sm text-gray-700">
            {apartmentPreferences.timeline?.leaseDuration} month lease
          </p>
        </div>

        {/* Roommate Preferences (if not solo) */}
        {livingSituation !== 'solo' && (
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Roommate Match</h3>
                  <p className="text-sm text-gray-500">Preferences set</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/onboarding/roommate-preferences')}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Edit
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-gray-700">Cleanliness: {roommatePreferences.preferences.cleanliness}/5</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-gray-700">Social: {roommatePreferences.preferences.socialLevel}/5</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-gray-700">{roommatePreferences.preferences.pets ? 'Pets OK' : 'No Pets'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-gray-700">{roommatePreferences.preferences.smoking ? 'Smoking OK' : 'No Smoking'}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Complete Button */}
      <div className="space-y-4 mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={handleComplete}
          className="w-full py-4 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
        >
          <Check className="w-5 h-5" />
          Complete Setup & Start Swiping
        </button>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: '100%' }} />
        </div>
      </div>
    </div>
  );
};
