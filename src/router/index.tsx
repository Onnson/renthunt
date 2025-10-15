import { createBrowserRouter, Navigate } from 'react-router-dom';
import { RootLayout } from '@/components/layout/RootLayout';
import { OnboardingLayout } from '@/components/layout/OnboardingLayout';
import { MobileAppShell } from '@/components/layout/MobileAppShell';

// Onboarding Screens
import { WelcomeScreen } from '@/screens/onboarding/WelcomeScreen';
import { LivingSituationScreen } from '@/screens/onboarding/LivingSituationScreen';
import { LocationScreen } from '@/screens/onboarding/LocationScreen';
import { BudgetScreen } from '@/screens/onboarding/BudgetScreen';
import { TimelineScreen } from '@/screens/onboarding/TimelineScreen';
import { RoommatePreferencesScreen } from '@/screens/onboarding/RoommatePreferencesScreen';
import { ReviewScreen } from '@/screens/onboarding/ReviewScreen';

// Main App Screens
import { HomeScreen } from '@/screens/HomeScreen';
import { ShortlistScreen } from '@/screens/ShortlistScreen';
import { ViewingsScreen } from '@/screens/ViewingsScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/onboarding" replace />,
      },
      {
        path: 'onboarding',
        element: <OnboardingLayout />,
        children: [
          {
            index: true,
            element: <WelcomeScreen />,
          },
          {
            path: 'living-situation',
            element: <LivingSituationScreen />,
          },
          {
            path: 'location',
            element: <LocationScreen />,
          },
          {
            path: 'budget',
            element: <BudgetScreen />,
          },
          {
            path: 'timeline',
            element: <TimelineScreen />,
          },
          {
            path: 'roommate-preferences',
            element: <RoommatePreferencesScreen />,
          },
          {
            path: 'review',
            element: <ReviewScreen />,
          },
        ],
      },
      {
        path: '/',
        element: <MobileAppShell />,
        children: [
          {
            path: 'home',
            element: <HomeScreen />,
          },
          {
            path: 'shortlist',
            element: <ShortlistScreen />,
          },
          {
            path: 'viewings',
            element: <ViewingsScreen />,
          },
          {
            path: 'profile',
            element: <ProfileScreen />,
          },
        ],
      },
    ],
  },
]);
