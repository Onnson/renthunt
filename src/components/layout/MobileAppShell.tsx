import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Home, Heart, Calendar, User } from 'lucide-react';
import { useUserPreferencesStore } from '@/stores/userPreferencesStore';
import { useEffect } from 'react';

export const MobileAppShell = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { onboardingCompleted } = useUserPreferencesStore();

  // Redirect to onboarding if not completed
  useEffect(() => {
    if (!onboardingCompleted && !location.pathname.startsWith('/onboarding')) {
      navigate('/onboarding', { replace: true });
    }
  }, [onboardingCompleted, location.pathname, navigate]);

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/shortlist', icon: Heart, label: 'Saved' },
    { path: '/viewings', icon: Calendar, label: 'Viewings' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 safe-area-bottom">
        <div className="flex justify-around items-center h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  active ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${active ? 'stroke-2' : 'stroke-1.5'}`} />
                <span className={`text-xs ${active ? 'font-semibold' : 'font-medium'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
