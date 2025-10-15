import { User, MapPin, DollarSign, Home, Users, Settings, LogOut, Edit, Bell, Shield } from 'lucide-react';
import { useUserPreferencesStore } from '@/stores/userPreferencesStore';
import { useNavigate } from 'react-router-dom';

export const ProfileScreen = () => {
  const navigate = useNavigate();
  const { 
    apartmentPreferences, 
    roommatePreferences, 
    livingSituation,
    onboardingCompleted,
    resetOnboarding
  } = useUserPreferencesStore();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleEditPreferences = () => {
    resetOnboarding();
    navigate('/onboarding');
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="px-4 py-6 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <User className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Your Profile</h1>
            <p className="text-blue-100 text-sm">
              {onboardingCompleted ? 'Profile complete' : 'Complete your profile'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Preferences Summary */}
        <div className="p-4 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Your Preferences</h2>
              <button 
                onClick={handleEditPreferences}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
            </div>

            <div className="p-4 space-y-4">
              {/* Living Situation */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">Living Situation</h3>
                  <p className="text-sm text-gray-600">
                    {livingSituation === 'solo' ? 'Renting Alone' : 
                     livingSituation === 'group' ? 'With Friends' : 
                     'Need Roommates'}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">Location</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {apartmentPreferences.location.city || 'Not set'}
                  </p>
                  {apartmentPreferences.location.neighborhoods.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {apartmentPreferences.location.neighborhoods.slice(0, 3).map((area) => (
                        <span key={area} className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                          {area}
                        </span>
                      ))}
                      {apartmentPreferences.location.neighborhoods.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs">
                          +{apartmentPreferences.location.neighborhoods.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Budget */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <DollarSign className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">Budget</h3>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(apartmentPreferences.budget.min)} - {formatCurrency(apartmentPreferences.budget.max)} / month
                  </p>
                </div>
              </div>

              {/* Size */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Home className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">Apartment Size</h3>
                  <p className="text-sm text-gray-600">
                    {apartmentPreferences.size.bedrooms} bed, {apartmentPreferences.size.bathrooms} bath
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Roommate Preferences (if not solo) */}
          {livingSituation !== 'solo' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Roommate Match Preferences</h2>
              </div>

              <div className="p-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Cleanliness</p>
                    <p className="font-semibold text-gray-900">{roommatePreferences.preferences.cleanliness}/5</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Social Level</p>
                    <p className="font-semibold text-gray-900">{roommatePreferences.preferences.socialLevel}/5</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Noise Tolerance</p>
                    <p className="font-semibold text-gray-900">{roommatePreferences.preferences.noiseLevel}/5</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Schedule</p>
                    <p className="font-semibold text-gray-900">{roommatePreferences.preferences.workSchedule}/5</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Smoking</p>
                    <p className="font-semibold text-gray-900">{roommatePreferences.preferences.smoking ? 'OK' : 'Not OK'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Pets</p>
                    <p className="font-semibold text-gray-900">{roommatePreferences.preferences.pets ? 'OK' : 'Not OK'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Menu */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-200">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="flex-1 text-left font-medium text-gray-900">Notifications</span>
              <span className="text-sm text-gray-500">→</span>
            </button>

            <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-200">
              <Shield className="w-5 h-5 text-gray-600" />
              <span className="flex-1 text-left font-medium text-gray-900">Privacy & Security</span>
              <span className="text-sm text-gray-500">→</span>
            </button>

            <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors border-b border-gray-200">
              <Settings className="w-5 h-5 text-gray-600" />
              <span className="flex-1 text-left font-medium text-gray-900">App Settings</span>
              <span className="text-sm text-gray-500">→</span>
            </button>

            <button className="w-full px-4 py-3 flex items-center gap-3 hover:bg-red-50 transition-colors text-red-600">
              <LogOut className="w-5 h-5" />
              <span className="flex-1 text-left font-medium">Log Out</span>
            </button>
          </div>

          {/* App Info */}
          <div className="text-center py-4">
            <p className="text-xs text-gray-500">RentHunt v1.0.0</p>
            <p className="text-xs text-gray-400 mt-1">Made with ❤️ for apartment hunters</p>
          </div>
        </div>
      </div>
    </div>
  );
};
