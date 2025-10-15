import { Outlet } from 'react-router-dom';

export const OnboardingLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-md mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
};
