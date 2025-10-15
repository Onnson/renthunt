// User preferences and onboarding types
export interface ApartmentPreferences {
  location: {
    city: string;
    neighborhoods: string[];
  };
  budget: {
    min: number;
    max: number;
  };
  size: {
    bedrooms: number;
    bathrooms: number;
  };
  spaceRequirements: string[];
  amenities: string[];
  timeline: {
    moveInDate: Date;
    leaseDuration: number;
  };
}

export interface RoommatePreferences {
  seekingRoommates: boolean;
  hasGroup: boolean;
  groupSize: number;
  preferences: {
    cleanliness: number;
    socialLevel: number;
    noiseLevel: number;
    workSchedule: number;
    smoking: boolean;
    pets: boolean;
    drinking: number;
    guests: number;
  };
}

export type LivingSituation = 'solo' | 'group' | 'seeking';

export interface UserPreferences {
  // Onboarding completion status
  onboardingCompleted: boolean;
  currentStep: number;

  // Apartment preferences
  apartmentPreferences: ApartmentPreferences;

  // Roommate preferences (conditional)
  roommatePreferences: RoommatePreferences;

  // Living situation
  livingSituation: LivingSituation;
}
