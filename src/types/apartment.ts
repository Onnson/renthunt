// Apartment and related types
export interface ApartmentPrice {
  monthly: number;
  currency: 'USD';
  splitType: 'equal' | 'proportional';
}

export interface ApartmentDetails {
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  floor: number;
  buildingType: 'apartment' | 'brownstone' | 'loft';
  yearBuilt: number;
}

export interface RoommateProfile {
  id: string;
  userId: string;
  demographics: {
    name: string;
    age: number;
    gender: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
    occupation: string;
    university?: string;
  };
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
  lifestyle: {
    hobbies: string[];
    diet: string;
    sleepSchedule: 'early' | 'night-owl' | 'flexible';
  };
}

export interface Apartment {
  id: string;

  // Basic info
  title: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    neighborhood: string;
  };

  // Pricing
  price: ApartmentPrice;

  // Property details
  details: ApartmentDetails;

  // Features
  amenities: string[];
  images: string[];

  // Roommate info (for room-available)
  roommateInfo?: {
    availableRooms: number;
    totalRooms: number;
    currentRoommates: RoommateProfile[];
  };

  // Metadata
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}
