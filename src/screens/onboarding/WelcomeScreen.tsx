import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

export const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/onboarding/living-situation');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <div className="mb-8">
        <div className="w-24 h-24 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4">
          <Home className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          RentHunt
        </h1>
        <p className="text-lg text-gray-600">
          Find your perfect home & roommate match
        </p>
      </div>

      <div className="w-full max-w-sm space-y-4 mb-8">
        <div className="flex items-start gap-3 text-left">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-blue-600 font-semibold text-sm">1</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Share your preferences</h3>
            <p className="text-sm text-gray-600">Tell us about your ideal home and roommate</p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-left">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-blue-600 font-semibold text-sm">2</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Swipe & match</h3>
            <p className="text-sm text-gray-600">Browse apartments with compatibility scores</p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-left">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-blue-600 font-semibold text-sm">3</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Schedule viewings</h3>
            <p className="text-sm text-gray-600">Book tours and find your new home</p>
          </div>
        </div>
      </div>

      <button
        onClick={handleGetStarted}
        className="w-full max-w-sm bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl hover:bg-blue-700 transition-colors"
      >
        Get Started
      </button>

      <p className="mt-4 text-xs text-gray-500">
        Takes less than 2 minutes to complete
      </p>
    </div>
  );
};
