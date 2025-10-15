import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { useUserPreferencesStore } from '@/stores/userPreferencesStore';

export const TimelineScreen = () => {
  const navigate = useNavigate();
  const { apartmentPreferences, setApartmentPreferences, setCurrentStep, livingSituation } = useUserPreferencesStore();
  
  const [moveInDate, setMoveInDate] = useState(
    apartmentPreferences.timeline?.moveInDate 
      ? new Date(apartmentPreferences.timeline.moveInDate).toISOString().split('T')[0]
      : ''
  );
  const [leaseDuration, setLeaseDuration] = useState(
    apartmentPreferences.timeline?.leaseDuration || 12
  );

  const handleContinue = () => {
    if (!moveInDate) return;
    
    setApartmentPreferences({
      ...apartmentPreferences,
      timeline: {
        moveInDate: new Date(moveInDate),
        leaseDuration,
      },
    });
    setCurrentStep(5);
    
    // Skip roommate preferences if renting solo
    if (livingSituation === 'solo') {
      navigate('/onboarding/review');
    } else {
      navigate('/onboarding/roommate-preferences');
    }
  };

  const isValid = moveInDate !== '';

  const durations = [
    { months: 6, label: '6 months' },
    { months: 12, label: '1 year' },
    { months: 18, label: '18 months' },
    { months: 24, label: '2 years' },
  ];

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/onboarding/budget')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <span className="text-sm text-gray-500">Step 4 of 6</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          When do you need to move?
        </h1>
        <p className="text-gray-600">
          Set your move-in date and lease duration
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-6">
        {/* Move-in Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline w-5 h-5 mr-2" />
            Move-in Date
          </label>
          <input
            type="date"
            value={moveInDate}
            onChange={(e) => setMoveInDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Lease Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Clock className="inline w-5 h-5 mr-2" />
            Preferred Lease Duration
          </label>
          <div className="grid grid-cols-2 gap-3">
            {durations.map(({ months, label }) => (
              <button
                key={months}
                onClick={() => setLeaseDuration(months)}
                className={`py-4 px-4 rounded-lg font-semibold transition-colors ${
                  leaseDuration === months
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Flexibility Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            💡 <strong>Tip:</strong> Most landlords require move-in within 30-60 days. 
            We'll show you apartments available in your timeframe.
          </p>
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
          <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: '66.67%' }} />
        </div>
      </div>
    </div>
  );
};
