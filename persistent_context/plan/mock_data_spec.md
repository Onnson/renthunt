# Mock Data Specification - RentHunt MVP

**Design Date**: 2025-10-15  
**Data Volume**: 10 apartments, 5 roommate personas  
**Generation**: Hybrid approach (manual + scripted)  
**Persistence**: LocalStorage (no backend)  

---

## Data Generation Strategy

### Approach: Hybrid Manual + Scripted
- **Manual Creation**: Core apartment/roommate data with realistic details
- **Scripted Generation**: Variations, IDs, timestamps, derived fields
- **Validation**: TypeScript interfaces ensure data integrity
- **Maintenance**: Easy to modify individual records or regenerate all

### File Structure
```
src/data/
├── apartments.ts           # Main apartment data
├── roommates.ts            # Roommate personas
├── generators.ts           # Generation utilities
├── index.ts               # Data exports
└── types.ts               # Data-specific types
```

---

## JSON Schemas

### Apartment Schema
```typescript
interface Apartment {
  id: string;
  type: 'whole' | 'room-available';

  // Basic info
  title: string;
  description: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    zipCode: string;
  };

  // Pricing
  price: {
    monthly: number;
    currency: 'USD';
    splitType: 'equal' | 'proportional'; // For room-available
  };

  // Property details
  details: {
    bedrooms: number;
    bathrooms: number;
    squareFeet: number;
    floor: number;
    buildingType: 'apartment' | 'brownstone' | 'loft';
    yearBuilt: number;
  };

  // Features
  amenities: string[]; // ['dishwasher', 'laundry', 'gym', etc.]
  images: string[]; // URLs to placeholder images

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
```

### Roommate Profile Schema
```typescript
interface RoommateProfile {
  id: string;
  userId: string; // Links to user account (future)

  // Demographics
  demographics: {
    name: string;
    age: number;
    gender: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say';
    occupation: string;
    university?: string; // If student
  };

  // Preferences (1-5 scale)
  preferences: {
    cleanliness: number; // 1=very messy, 5=very clean
    socialLevel: number; // 1=very private, 5=very social
    noiseLevel: number; // 1=needs silence, 5=can handle noise
    workSchedule: number; // 1=9-5 office, 5=irregular/night shift
    smoking: boolean;
    pets: boolean;
    drinking: number; // 1=never, 5=frequently
  };

  // Profile
  bio: string;
  interests: string[];
  photoUrl: string; // Placeholder image URL

  // Metadata
  createdAt: string;
  verified: boolean; // Trust indicator
}
```

### User Schema (Future Extension)
```typescript
interface User {
  id: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  preferences: UserPreferences; // From store
  onboardingCompleted: boolean;
  createdAt: string;
}
```

---

## Apartment Inventory (10 Units)

### Solo Apartments (3 units)
```typescript
const soloApartments: Apartment[] = [
  {
    id: "apt_solo_001",
    type: "whole",
    title: "Cozy Williamsburg Studio",
    description: "Bright and modern studio in trendy Williamsburg neighborhood...",
    address: {
      street: "123 Bedford Ave",
      neighborhood: "Williamsburg",
      city: "Brooklyn",
      zipCode: "11211"
    },
    price: { monthly: 2200, currency: "USD", splitType: "equal" },
    details: {
      bedrooms: 0,
      bathrooms: 1,
      squareFeet: 450,
      floor: 3,
      buildingType: "apartment",
      yearBuilt: 2015
    },
    amenities: ["dishwasher", "laundry", "gym", "roof-deck"],
    images: ["/images/apartments/studio-001.jpg"],
    createdAt: "2025-01-15T10:00:00Z",
    updatedAt: "2025-01-15T10:00:00Z",
    isActive: true
  },
  // ... 2 more solo apartments
];
```

### Group Apartments (4 units)
```typescript
const groupApartments: Apartment[] = [
  {
    id: "apt_group_001",
    type: "whole",
    title: "Spacious 2BR in Bushwick",
    description: "Perfect for 2 roommates looking for their own space...",
    address: {
      street: "456 Knickerbocker Ave",
      neighborhood: "Bushwick",
      city: "Brooklyn",
      zipCode: "11237"
    },
    price: { monthly: 2800, currency: "USD", splitType: "equal" },
    details: {
      bedrooms: 2,
      bathrooms: 1,
      squareFeet: 850,
      floor: 2,
      buildingType: "brownstone",
      yearBuilt: 1920
    },
    amenities: ["laundry", "backyard", "storage"],
    images: ["/images/apartments/2br-001.jpg"],
    createdAt: "2025-01-10T14:30:00Z",
    updatedAt: "2025-01-10T14:30:00Z",
    isActive: true
  },
  // ... 3 more group apartments
];
```

### Room-Available Apartments (3 units)
```typescript
const roomAvailableApartments: Apartment[] = [
  {
    id: "apt_room_001",
    type: "room-available",
    title: "Room in Vibrant 3BR Share",
    description: "Join an established group of 2 in this beautiful brownstone...",
    address: {
      street: "789 Prospect Park West",
      neighborhood: "Windsor Terrace",
      city: "Brooklyn",
      zipCode: "11215"
    },
    price: { monthly: 1200, currency: "USD", splitType: "equal" },
    details: {
      bedrooms: 3,
      bathrooms: 2,
      squareFeet: 1200,
      floor: 1,
      buildingType: "brownstone",
      yearBuilt: 1890
    },
    amenities: ["dishwasher", "laundry", "garden", "parking"],
    images: ["/images/apartments/3br-001.jpg"],
    roommateInfo: {
      availableRooms: 1,
      totalRooms: 3,
      currentRoommates: [roommateProfiles.alex, roommateProfiles.jordan]
    },
    createdAt: "2025-01-20T09:15:00Z",
    updatedAt: "2025-01-20T09:15:00Z",
    isActive: true
  },
  // ... 2 more room-available apartments
];
```

---

## Roommate Personas (5 Profiles)

### Persona 1: Alex (Software Engineer)
```typescript
const alex: RoommateProfile = {
  id: "roommate_alex_001",
  userId: "user_alex_001",
  demographics: {
    name: "Alex Chen",
    age: 28,
    gender: "male",
    occupation: "Software Engineer",
    university: "NYU (Masters)"
  },
  preferences: {
    cleanliness: 4, // Clean but not obsessive
    socialLevel: 3, // Moderate social
    noiseLevel: 4, // Can handle some noise
    workSchedule: 2, // Standard 9-5
    smoking: false,
    pets: true, // Has a cat
    drinking: 2 // Occasional social drinking
  },
  bio: "Tech professional who loves cooking and board games. Looking for respectful roommates who value communication.",
  interests: ["cooking", "board games", "hiking", "coding"],
  photoUrl: "/images/roommates/alex.jpg",
  createdAt: "2025-01-05T12:00:00Z",
  verified: true
};
```

### Persona 2: Jordan (Graphic Designer)
```typescript
const jordan: RoommateProfile = {
  id: "roommate_jordan_001",
  userId: "user_jordan_001",
  demographics: {
    name: "Jordan Rivera",
    age: 26,
    gender: "non-binary",
    occupation: "Graphic Designer"
  },
  preferences: {
    cleanliness: 5, // Very clean and organized
    socialLevel: 4, // Social but respects boundaries
    noiseLevel: 2, // Needs quiet for creative work
    workSchedule: 4, // Freelance, irregular hours
    smoking: false,
    pets: false, // Allergic to cats
    drinking: 3 // Social drinker
  },
  bio: "Creative professional with a passion for design and photography. I keep things tidy and love hosting small gatherings.",
  interests: ["photography", "design", "yoga", "art galleries"],
  photoUrl: "/images/roommates/jordan.jpg",
  createdAt: "2025-01-08T16:45:00Z",
  verified: true
};
```

### Persona 3: Sam (Teacher)
```typescript
const sam: RoommateProfile = {
  id: "roommate_sam_001",
  userId: "user_sam_001",
  demographics: {
    name: "Sam Thompson",
    age: 32,
    gender: "male",
    occupation: "High School Teacher"
  },
  preferences: {
    cleanliness: 3, // Neat but practical
    socialLevel: 5, // Very social, loves people
    noiseLevel: 5, // Grew up in a big family
    workSchedule: 1, // Consistent 8-3 schedule
    smoking: false,
    pets: true, // Loves animals
    drinking: 4 // Regular social drinker
  },
  bio: "Enthusiastic teacher who loves meeting new people and trying new restaurants. Always up for game nights!",
  interests: ["teaching", "sports", "cooking", "travel"],
  photoUrl: "/images/roommates/sam.jpg",
  createdAt: "2025-01-12T11:20:00Z",
  verified: true
};
```

### Persona 4: Casey (Marketing Coordinator)
```typescript
const casey: RoommateProfile = {
  id: "roommate_casey_001",
  userId: "user_casey_001",
  demographics: {
    name: "Casey Liu",
    age: 25,
    gender: "female",
    occupation: "Marketing Coordinator"
  },
  preferences: {
    cleanliness: 4, // Clean and organized
    socialLevel: 2, // Private, needs alone time
    noiseLevel: 3, // Moderate noise tolerance
    workSchedule: 3, // Some evening work
    smoking: false,
    pets: true, // Has a small dog
    drinking: 1 // Rarely drinks
  },
  bio: "Focused professional who values work-life balance. I enjoy reading and quiet evenings at home.",
  interests: ["reading", "yoga", "baking", "podcasts"],
  photoUrl: "/images/roommates/casey.jpg",
  createdAt: "2025-01-18T13:10:00Z",
  verified: true
};
```

### Persona 5: Taylor (Graduate Student)
```typescript
const taylor: RoommateProfile = {
  id: "roommate_taylor_001",
  userId: "user_taylor_001",
  demographics: {
    name: "Taylor Williams",
    age: 24,
    gender: "female",
    occupation: "Graduate Student",
    university: "Columbia University"
  },
  preferences: {
    cleanliness: 2, // Casual about cleaning
    socialLevel: 4, // Social and outgoing
    noiseLevel: 4, // Can handle student life noise
    workSchedule: 5, // Irregular student schedule
    smoking: false,
    pets: false, // No pets in dorms before
    drinking: 3 // Social drinker, student life
  },
  bio: "Outgoing grad student studying psychology. Love meeting people and exploring the city!",
  interests: ["psychology", "music", "dancing", "city exploration"],
  photoUrl: "/images/roommates/taylor.jpg",
  createdAt: "2025-01-22T15:30:00Z",
  verified: false // Newer account
};
```

---

## Data Generation Utilities

### ID Generation
```typescript
// generators.ts
export const generateId = (prefix: string): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substr(2, 5);
  return `${prefix}_${timestamp}_${random}`;
};

// Usage
const apartmentId = generateId('apt'); // "apt_1yz5a_2b3c4"
```

### Timestamp Generation
```typescript
export const generateTimestamp = (daysAgo: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

// Usage
const createdAt = generateTimestamp(7); // 7 days ago
```

### Price Variation
```typescript
export const generatePriceVariation = (
  basePrice: number,
  variance: number = 0.1
): number => {
  const variation = (Math.random() - 0.5) * 2 * variance;
  return Math.round(basePrice * (1 + variation));
};

// Usage
const price = generatePriceVariation(2500, 0.15); // ±15% variation
```

### Amenity Randomization
```typescript
const amenityPool = [
  'dishwasher', 'laundry', 'gym', 'roof-deck', 'parking',
  'storage', 'backyard', 'balcony', 'hardwood-floors', 'exposed-brick'
];

export const generateAmenities = (count: number): string[] => {
  const shuffled = [...amenityPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Usage
const amenities = generateAmenities(4); // Random 4 amenities
```

---

## Compatibility Scoring Test Data

### Scoring Matrix
Based on 7 dimensions with weights:
- Cleanliness: 20%
- Social level: 15%
- Noise level: 15%
- Work schedule: 10%
- Smoking: 15% (hard constraint)
- Pets: 15%
- Drinking: 10%

### Test Scenarios
```typescript
// High compatibility scenario
const userPrefs = {
  cleanliness: 4, socialLevel: 3, noiseLevel: 4, workSchedule: 2,
  smoking: false, pets: true, drinking: 2
};

const roommateAlex = {
  cleanliness: 4, socialLevel: 3, noiseLevel: 4, workSchedule: 2,
  smoking: false, pets: true, drinking: 2
};
// Expected score: ~95% (perfect match)

// Low compatibility scenario
const roommateCasey = {
  cleanliness: 4, socialLevel: 2, noiseLevel: 3, workSchedule: 3,
  smoking: false, pets: true, drinking: 1
};
// Expected score: ~75% (good but not perfect)

// Hard constraint violation
const smokingRoommate = { ...roommateAlex, smoking: true };
// Expected score: 0% (hard fail on smoking)
```

---

## Data Loading Strategy

### Initial Load
```typescript
// data/index.ts
import { apartments } from './apartments';
import { roommateProfiles } from './roommates';

export const mockData = {
  apartments: [...soloApartments, ...groupApartments, ...roomAvailableApartments],
  roommates: Object.values(roommateProfiles),
};

// Initialize stores with mock data
export const initializeMockData = () => {
  const apartmentsStore = useApartmentsStore.getState();
  const userPrefsStore = useUserPreferencesStore.getState();

  apartmentsStore.setApartments(mockData.apartments);
  apartmentsStore.calculateCompatibilityScores();

  // Mark data as loaded
  return { success: true, count: mockData.apartments.length };
};
```

### Development vs Production
```typescript
// In development, always load mock data
if (process.env.NODE_ENV === 'development') {
  initializeMockData();
}

// In production, load from API or show empty state
// (Future implementation)
```

---

## Data Validation

### TypeScript Validation
All data conforms to defined interfaces:
```typescript
// Validate at runtime
import { z } from 'zod'; // Optional: add runtime validation

const ApartmentSchema = z.object({
  id: z.string(),
  type: z.enum(['whole', 'room-available']),
  // ... full schema
});

export const validateApartment = (data: unknown): Apartment => {
  return ApartmentSchema.parse(data);
};
```

### Data Integrity Checks
- All IDs are unique
- Foreign keys reference existing entities
- Required fields are present
- Date formats are valid ISO strings
- Price ranges are reasonable ($800-$5000)
- Compatibility scores are 0-100

---

## Future Data Extensions

### Additional Apartments
- Scale to 50+ apartments for better testing
- Include different cities (Queens, Manhattan)
- Add seasonal pricing variations

### Dynamic Generation
- Script to generate apartments based on user preferences
- Randomized roommate profiles
- Realistic address generation

### Real Data Integration
- API endpoints for apartment listings
- User account system
- Real roommate profiles with photos

---

**Mock data specification complete with 10 apartments, 5 personas, and generation utilities for realistic testing.**
