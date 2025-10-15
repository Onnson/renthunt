import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserPreferences } from '@/types/user';

interface UserPreferencesActions {
  // Onboarding flow
  setCurrentStep: (step: number) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;

  // Apartment preferences
  updateApartmentPreferences: (preferences: Partial<UserPreferences['apartmentPreferences']>) => void;
  setApartmentPreferences: (preferences: UserPreferences['apartmentPreferences']) => void;
  setLocation: (city: string, neighborhoods: string[]) => void;
  setBudget: (min: number, max: number) => void;
  setSize: (bedrooms: number, bathrooms: number) => void;
  toggleSpaceRequirement: (requirementId: string) => void;
  toggleAmenity: (amenityId: string) => void;
  setTimeline: (moveInDate: Date, leaseDuration: number) => void;

  // Roommate preferences
  updateRoommatePreferences: (preferences: Partial<UserPreferences['roommatePreferences']>) => void;
  setRoommatePreferences: (preferences: UserPreferences['roommatePreferences']) => void;
  setLivingSituation: (situation: UserPreferences['livingSituation']) => void;
  setSeekingRoommates: (seeking: boolean) => void;
  setGroupSize: (size: number) => void;

  // Bulk operations
  importPreferences: (preferences: UserPreferences) => void;
  resetAllPreferences: () => void;
}

interface UserPreferencesSelectors {
  // Computed values
  selectIsOnboardingComplete: () => boolean;
  selectHasRoommatePreferences: () => boolean;
  selectBudgetRange: () => { min: number; max: number };
  selectFormattedBudget: () => string;

  // Validation helpers
  selectIsValidForMatching: () => boolean;
  selectMissingRequiredFields: () => string[];

  // Filtering helpers
  selectLocationFilter: () => { city: string; neighborhoods: string[] };
  selectAmenityFilter: () => string[];
}

type UserPreferencesStore = UserPreferences & UserPreferencesActions & UserPreferencesSelectors;

const defaultUserPreferences: UserPreferences = {
  onboardingCompleted: false,
  currentStep: 1,
  apartmentPreferences: {
    location: {
      city: '',
      neighborhoods: [],
    },
    budget: {
      min: 1000,
      max: 3000,
    },
    size: {
      bedrooms: 1,
      bathrooms: 1,
    },
    spaceRequirements: [],
    amenities: [],
    timeline: {
      moveInDate: new Date(),
      leaseDuration: 12,
    },
  },
  roommatePreferences: {
    seekingRoommates: false,
    hasGroup: false,
    groupSize: 1,
    preferences: {
      cleanliness: 3,
      socialLevel: 3,
      noiseLevel: 3,
      workSchedule: 3,
      smoking: false,
      pets: false,
      drinking: 3,
      guests: 3,
    },
  },
  livingSituation: 'solo',
};

export const useUserPreferencesStore = create<UserPreferencesStore>()(
  persist(
    (set, get) => ({
      ...defaultUserPreferences,

      // Onboarding flow
      setCurrentStep: (step: number) => set({ currentStep: step }),
      completeOnboarding: () => set({ onboardingCompleted: true }),
      resetOnboarding: () => set({
        onboardingCompleted: false,
        currentStep: 1
      }),

      // Apartment preferences
      updateApartmentPreferences: (preferences) =>
        set((state) => ({
          apartmentPreferences: { ...state.apartmentPreferences, ...preferences }
        })),
      setApartmentPreferences: (preferences) =>
        set({ apartmentPreferences: preferences }),
      setLocation: (city: string, neighborhoods: string[]) =>
        set((state) => ({
          apartmentPreferences: {
            ...state.apartmentPreferences,
            location: { city, neighborhoods }
          }
        })),
      setBudget: (min: number, max: number) =>
        set((state) => ({
          apartmentPreferences: {
            ...state.apartmentPreferences,
            budget: { min, max }
          }
        })),
      setSize: (bedrooms: number, bathrooms: number) =>
        set((state) => ({
          apartmentPreferences: {
            ...state.apartmentPreferences,
            size: { bedrooms, bathrooms }
          }
        })),
      toggleSpaceRequirement: (requirementId: string) =>
        set((state) => {
          const requirements = state.apartmentPreferences.spaceRequirements;
          const updated = requirements.includes(requirementId)
            ? requirements.filter(id => id !== requirementId)
            : [...requirements, requirementId];
          return {
            apartmentPreferences: {
              ...state.apartmentPreferences,
              spaceRequirements: updated
            }
          };
        }),
      toggleAmenity: (amenityId: string) =>
        set((state) => {
          const amenities = state.apartmentPreferences.amenities;
          const updated = amenities.includes(amenityId)
            ? amenities.filter(id => id !== amenityId)
            : [...amenities, amenityId];
          return {
            apartmentPreferences: {
              ...state.apartmentPreferences,
              amenities: updated
            }
          };
        }),
      setTimeline: (moveInDate: Date, leaseDuration: number) =>
        set((state) => ({
          apartmentPreferences: {
            ...state.apartmentPreferences,
            timeline: { moveInDate, leaseDuration }
          }
        })),

      // Roommate preferences
      updateRoommatePreferences: (preferences) =>
        set((state) => ({
          roommatePreferences: { ...state.roommatePreferences, ...preferences }
        })),
      setRoommatePreferences: (preferences) =>
        set({ roommatePreferences: preferences }),
      setLivingSituation: (situation) => set({ livingSituation: situation }),
      setSeekingRoommates: (seeking: boolean) =>
        set((state) => ({
          roommatePreferences: { ...state.roommatePreferences, seekingRoommates: seeking }
        })),
      setGroupSize: (size: number) =>
        set((state) => ({
          roommatePreferences: { ...state.roommatePreferences, groupSize: size }
        })),

      // Bulk operations
      importPreferences: (preferences) => set(preferences),
      resetAllPreferences: () => set(defaultUserPreferences),

      // Selectors
      selectIsOnboardingComplete: () => get().onboardingCompleted,
      selectHasRoommatePreferences: () => get().roommatePreferences.seekingRoommates,
      selectBudgetRange: () => get().apartmentPreferences.budget,
      selectFormattedBudget: () => {
        const { min, max } = get().apartmentPreferences.budget;
        return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
      },
      selectIsValidForMatching: () => {
        const prefs = get().apartmentPreferences;
        return !!(prefs.location.city && prefs.budget.min > 0 && prefs.budget.max > 0);
      },
      selectMissingRequiredFields: () => {
        const prefs = get().apartmentPreferences;
        const missing: string[] = [];
        if (!prefs.location.city) missing.push('location');
        if (prefs.budget.min <= 0) missing.push('minimum budget');
        if (prefs.budget.max <= 0) missing.push('maximum budget');
        return missing;
      },
      selectLocationFilter: () => get().apartmentPreferences.location,
      selectAmenityFilter: () => get().apartmentPreferences.amenities,
    }),
    {
      name: 'renthunt-user-preferences',
      partialize: (state) => ({
        onboardingCompleted: state.onboardingCompleted,
        currentStep: state.currentStep,
        apartmentPreferences: state.apartmentPreferences,
        roommatePreferences: state.roommatePreferences,
        livingSituation: state.livingSituation,
      }),
    }
  )
);
