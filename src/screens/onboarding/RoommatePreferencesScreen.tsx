import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Volume2, Users, Clock, Cigarette, Wine, Dog } from 'lucide-react';
import { useUserPreferencesStore } from '@/stores/userPreferencesStore';

export const RoommatePreferencesScreen = () => {
  const navigate = useNavigate();
  const { roommatePreferences, setRoommatePreferences, setCurrentStep } = useUserPreferencesStore();
  
  const [cleanliness, setCleanliness] = useState(roommatePreferences.preferences.cleanliness || 3);
  const [socialLevel, setSocialLevel] = useState(roommatePreferences.preferences.socialLevel || 3);
  const [noiseLevel, setNoiseLevel] = useState(roommatePreferences.preferences.noiseLevel || 3);
  const [workSchedule, setWorkSchedule] = useState(roommatePreferences.preferences.workSchedule || 3);
  const [smoking, setSmoking] = useState(roommatePreferences.preferences.smoking || false);
  const [pets, setPets] = useState(roommatePreferences.preferences.pets || false);
  const [drinking, setDrinking] = useState(roommatePreferences.preferences.drinking || 2);

  const handleContinue = () => {
    setRoommatePreferences({
      ...roommatePreferences,
      preferences: {
        cleanliness,
        socialLevel,
        noiseLevel,
        workSchedule,
        smoking,
        pets,
        drinking,
        guests: 3, // Default value
      },
    });
    setCurrentStep(6);
    navigate('/onboarding/review');
  };

  const SliderWithLabels = ({ 
    value, 
    onChange, 
    icon: Icon, 
    label, 
    leftLabel, 
    rightLabel 
  }: { 
    value: number; 
    onChange: (val: number) => void; 
    icon: any; 
    label: string; 
    leftLabel: string; 
    rightLabel: string;
  }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        <Icon className="inline w-4 h-4 mr-2" />
        {label}
      </label>
      <div className="px-2">
        <input
          type="range"
          min="1"
          max="5"
          step="1"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{leftLabel}</span>
          <span className="font-semibold text-blue-600">{value}/5</span>
          <span>{rightLabel}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/onboarding/timeline')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <span className="text-sm text-gray-500">Step 5 of 6</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Roommate preferences
        </h1>
        <p className="text-gray-600">
          Help us find compatible roommates for you
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-6 overflow-y-auto">
        <SliderWithLabels
          value={cleanliness}
          onChange={setCleanliness}
          icon={Sparkles}
          label="Cleanliness Level"
          leftLabel="Relaxed"
          rightLabel="Very Tidy"
        />

        <SliderWithLabels
          value={socialLevel}
          onChange={setSocialLevel}
          icon={Users}
          label="Social Preference"
          leftLabel="Private"
          rightLabel="Very Social"
        />

        <SliderWithLabels
          value={noiseLevel}
          onChange={setNoiseLevel}
          icon={Volume2}
          label="Noise Tolerance"
          leftLabel="Quiet"
          rightLabel="Lively"
        />

        <SliderWithLabels
          value={workSchedule}
          onChange={setWorkSchedule}
          icon={Clock}
          label="Work Schedule"
          leftLabel="Early Bird"
          rightLabel="Night Owl"
        />

        {/* Yes/No Preferences */}
        <div className="space-y-3 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Cigarette className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Smoking OK?</span>
            </div>
            <button
              onClick={() => setSmoking(!smoking)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                smoking ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  smoking ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Dog className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Pets OK?</span>
            </div>
            <button
              onClick={() => setPets(!pets)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                pets ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  pets ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Wine className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Drinking Level</span>
            </div>
            <select
              value={drinking}
              onChange={(e) => setDrinking(parseInt(e.target.value))}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={1}>Never</option>
              <option value={2}>Occasionally</option>
              <option value={3}>Socially</option>
              <option value={4}>Frequently</option>
            </select>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="space-y-4 mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={handleContinue}
          className="w-full py-4 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          Continue
        </button>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: '83.33%' }} />
        </div>
      </div>
    </div>
  );
};
