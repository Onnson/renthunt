import { useNavigate } from 'react-router-dom';
import { Users, User, UserPlus } from 'lucide-react';
import { useUserPreferencesStore } from '@/stores/userPreferencesStore';
import type { LivingSituation } from '@/types/user';

export const LivingSituationScreen = () => {
  const navigate = useNavigate();
  const { setLivingSituation, setCurrentStep } = useUserPreferencesStore();

  const handleSelection = (situation: LivingSituation) => {
    setLivingSituation(situation);
    setCurrentStep(2);
    navigate('/onboarding/location');
  };

  const situations = [
    {
      id: 'solo' as LivingSituation,
      icon: User,
      title: 'Renting Alone',
      description: 'Looking for your own place',
      color: 'blue',
    },
    {
      id: 'group' as LivingSituation,
      title: 'With Friends',
      icon: Users,
      description: 'Already have roommates lined up',
      color: 'green',
    },
    {
      id: 'seeking' as LivingSituation,
      icon: UserPlus,
      title: 'Need Roommates',
      description: 'Looking to find compatible roommates',
      color: 'purple',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/onboarding')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <span className="text-sm text-gray-500">Step 1 of 6</span>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          What's your living situation?
        </h1>
        <p className="text-gray-600">
          This helps us match you with the right apartments
        </p>
      </div>

      {/* Options */}
      <div className="flex-1 space-y-4">
        {situations.map((situation) => {
          const Icon = situation.icon;
          const colorClasses = {
            blue: 'bg-blue-50 border-blue-200 hover:bg-blue-100 hover:border-blue-300',
            green: 'bg-green-50 border-green-200 hover:bg-green-100 hover:border-green-300',
            purple: 'bg-purple-50 border-purple-200 hover:bg-purple-100 hover:border-purple-300',
          };

          return (
            <button
              key={situation.id}
              onClick={() => handleSelection(situation.id)}
              className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                colorClasses[situation.color as keyof typeof colorClasses]
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${
                  situation.color === 'blue' ? 'bg-blue-100' :
                  situation.color === 'green' ? 'bg-green-100' : 'bg-purple-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    situation.color === 'blue' ? 'text-blue-600' :
                    situation.color === 'green' ? 'text-green-600' : 'text-purple-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {situation.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {situation.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-600 rounded-full" style={{ width: '16.67%' }} />
        </div>
      </div>
    </div>
  );
};
