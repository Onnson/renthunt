# Domain Model - RentHunt

**Last Updated**: 2025-10-06  
**Modeling Approach**: Domain-Driven Design (DDD)  
**Status**: Conceptual model (pre-implementation)

---

## Bounded Contexts

RentHunt system organized into three main bounded contexts:

### 1. Discovery Context (MVP Focus)
**Purpose**: Help users find apartments that match their preferences

**Core Processes**:
- Preference collection (onboarding)
- Apartment filtering and matching
- Compatibility scoring (for roommate-seekers)
- Swipe-based browsing
- Shortlist management

**Primary Entities**: User, Apartment, RoommateProfile, UserPreferences

---

### 2. Evaluation Context (MVP)
**Purpose**: Enable informed decision-making through viewings and feedback

**Core Processes**:
- Viewing scheduling (with same-day priority)
- Physical viewing coordination (via company reps)
- Post-viewing feedback collection
- Dual ranking calculation (personal + fairness)

**Primary Entities**: Viewing, Feedback, ViewingSlot

---

### 3. Transaction Context (Deferred Post-MVP)
**Purpose**: Facilitate lease signing and ongoing tenancy

**Core Processes**:
- Contract generation
- Digital signing
- Ongoing landlord-tenant mediation
- Payment processing

**Primary Entities**: Lease, Payment, Dispute

---

## Entities & Aggregates

### Apartment (Aggregate Root)

**Entity**: Core business object representing a rental property

**Attributes**:
```typescript
interface Apartment {
  // Identity
  id: string                    // Unique identifier
  
  // Classification
  type: 'whole' | 'room-available'
  
  // Physical Characteristics
  bedrooms: number
  bathrooms: number
  sqft: number
  floorNumber?: number
  buildingType: 'walk-up' | 'elevator' | 'townhouse'
  
  // Location
  location: {
    city: string
    neighborhood: string
    address: string
    coordinates: { lat: number; lng: number }
  }
  
  // Financial
  price: number                 // Monthly rent (total or per room)
  deposit: number              // Security deposit
  fees: {                      // Additional costs
    broker?: number
    application?: number
  }
  
  // Availability
  availableDate: Date
  leaseDuration: string[]      // ['6mo', '1yr', '2yr']
  
  // Features
  amenities: string[]          // ['dishwasher', 'laundry', 'gym', etc.]
  images: string[]             // Image URLs
  description: string
  
  // Roommate-Specific (for room-available apartments)
  availableRooms?: number      // How many rooms open
  totalRooms?: number          // Total bedrooms in unit
  currentRoommates?: RoommateProfile[]
  
  // Metadata
  listedDate: Date
  lastUpdated: Date
  landlordId: string
}
```

**Invariants** (Business Rules):
- Price must be > 0
- Bedrooms must be >= 0 (0 = studio)
- Bathrooms must be >= 0.5
- If type = 'room-available', must have currentRoommates array
- If type = 'whole', currentRoommates must be undefined
- AvailableRooms must be < totalRooms (can't have all rooms available)
- Images array must have at least 1 image

**Behavior**:
- `calculateCompatibilityScore(userPrefs)`: Returns 0-100 match score
- `isAvailableOn(date)`: Check if apartment available on specific date
- `getRentPerPerson(groupSize)`: Calculate split rent

---

### RoommateProfile (Value Object within Apartment)

**Purpose**: Describes a person currently living in room-available apartment

**Attributes**:
```typescript
interface RoommateProfile {
  // Identity
  name: string                 // First name only for privacy
  
  // Demographics
  age: number
  gender: 'male' | 'female' | 'non-binary' | 'prefer-not-to-say'
  occupation: string
  
  // Personality
  bio: string                  // 100-200 char description
  
  // Lifestyle Preferences
  preferences: {
    cleanliness: 1 | 2 | 3 | 4 | 5        // 1=messy, 5=very clean
    socialLevel: 'private' | 'friendly' | 'social'
    noiseLevel: 'quiet' | 'moderate' | 'lively'
    workSchedule: '9-5' | 'night-shift' | 'flexible' | 'wfh'
    smoking: boolean
    pets: 'have-pets' | 'allergic' | 'neutral'
    drinking: 'never' | 'socially' | 'frequently'
  }
  
  // Metadata
  photo: string                // URL to photo (stock image for MVP)
  moveInDate: Date            // When they moved in
}
```

**Invariants**:
- Name must not be empty
- Age must be 18-100
- Bio max length: 250 characters
- All preference fields required

**Behavior**:
- `calculateCompatibilityWith(userPrefs)`: Returns 0-100 compatibility score
- `hasDealBreakerWith(userPrefs)`: Returns true if fundamental incompatibility

---

### User (Aggregate Root)

**Entity**: Person using the platform to find an apartment

**Attributes**:
```typescript
interface User {
  // Identity (MVP: single mock user)
  id: string
  
  // Status
  onboardingComplete: boolean
  searchActive: boolean
  
  // Preferences (captured during onboarding)
  preferences: {
    apartment: ApartmentPreferences
    roommate: RoommatePreferences | null  // null if not seeking roommates
  }
  
  // Search Context
  seekingRoommates: boolean
  hasGroup: boolean
  groupSize: number                        // 1-3
  
  // Activity
  shortlistedApartments: string[]         // Apartment IDs
  scheduledViewings: string[]             // Viewing IDs
  completedViewings: string[]             // Apartment IDs
  submittedFeedback: string[]             // Apartment IDs
  
  // Metadata
  createdAt: Date
  lastActive: Date
}
```

**Invariants**:
- If seekingRoommates = true, roommate preferences must not be null
- If hasGroup = true, groupSize must be 2-3
- If hasGroup = false and seekingRoommates = false, groupSize must be 1
- Cannot schedule viewing for apartment already in completedViewings
- Cannot submit feedback without completing viewing

**Behavior**:
- `completeOnboarding(prefs)`: Set preferences and mark complete
- `addToShortlist(aptId)`: Add apartment to shortlist
- `removeFromShortlist(aptId)`: Remove apartment
- `scheduleViewing(viewing)`: Add to scheduled viewings
- `completeViewing(aptId)`: Move to completed, enable feedback
- `submitFeedback(aptId, feedback)`: Record feedback submission

---

### ApartmentPreferences (Value Object)

**Purpose**: User's criteria for apartment search

```typescript
interface ApartmentPreferences {
  budget: {
    min: number
    max: number
  }
  locations: string[]                    // Neighborhood IDs
  bedrooms: number                       // Exact or minimum
  bathrooms: number                      // Minimum
  minSqft?: number
  
  mustHaveAmenities: string[]
  niceToHaveAmenities: string[]
  
  moveInDate: Date
  leaseDuration: '6mo' | '1yr' | '2yr' | 'month-to-month'
  
  petFriendly?: boolean
  furnished?: boolean
  parkingRequired?: boolean
}
```

**Invariants**:
- budget.max must be >= budget.min
- budget.min must be > 0
- bedrooms must be 0-5
- bathrooms must be 1-3
- moveInDate must be in future (or within 60 days past for flexibility)
- locations array must not be empty

---

### RoommatePreferences (Value Object)

**Purpose**: User's criteria for roommate compatibility

```typescript
interface RoommatePreferences {
  // Lifestyle
  cleanliness: 1 | 2 | 3 | 4 | 5
  socialLevel: 'private' | 'friendly' | 'social'
  noiseLevel: 'quiet' | 'moderate' | 'lively'
  workSchedule: '9-5' | 'night-shift' | 'flexible' | 'wfh'
  
  // Habits
  smoking: boolean
  pets: 'have-pets' | 'allergic' | 'neutral'
  drinking: 'never' | 'socially' | 'frequently'
  
  // Demographic Preferences
  ageRange: {
    min: number
    max: number
  }
  genderPreference: 'any' | 'same' | 'male' | 'female'
  occupationType: 'student' | 'professional' | 'freelancer' | 'any'
}
```

**Invariants**:
- ageRange.min must be 18-65
- ageRange.max must be >= ageRange.min
- All lifestyle fields required (no undefined)

---

### Viewing (Entity)

**Purpose**: Scheduled physical apartment viewing

```typescript
interface Viewing {
  id: string
  apartmentId: string
  userId: string
  
  datetime: Date
  duration: number                       // Minutes (default: 60)
  
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show'
  
  // Representative (company employee showing apartment)
  repId: string
  repName: string
  
  // Logistics
  meetingPoint: string                  // "Building lobby" or address
  notes?: string                        // User's special requests
  
  createdAt: Date
  updatedAt: Date
}
```

**Invariants**:
- datetime must be in future when status = 'scheduled'
- duration must be 30-120 minutes
- Cannot schedule multiple viewings for same apartment + user
- Cannot schedule during non-business hours (per constraints.md)

**Behavior**:
- `cancel()`: Set status to cancelled
- `complete()`: Set status to completed, enable feedback
- `markNoShow()`: Set status to no-show

---

### ViewingSlot (Value Object)

**Purpose**: Available time for scheduling viewings

```typescript
interface ViewingSlot {
  apartmentId: string
  datetime: Date
  available: boolean
  repId?: string                        // Assigned rep if booked
}
```

**Invariants**:
- datetime must align to hour boundaries (10:00, 11:00, etc.)
- Cannot be on Saturday
- Cannot be Friday after 5 PM
- Must be Mon-Thu 10 AM - 7 PM, Fri 10 AM - 5 PM, Sun 11 AM - 5 PM

---

### Feedback (Value Object)

**Purpose**: Post-viewing evaluation of apartment

```typescript
interface Feedback {
  apartmentId: string
  userId: string
  viewingId: string
  
  // Section 1: Personal Preferences (user-scoped ranking)
  personalLikes: string[]               // Tags selected
  personalDislikes: string[]            // Tags selected
  personalRating: 1 | 2 | 3 | 4 | 5    // Overall personal fit
  roommateCompatible?: boolean          // Only for room-available apts
  
  // Section 2: Fairness & Transparency (global ranking)
  trueToDescription: 1 | 2 | 3 | 4      // 1=exactly, 4=very misleading
  worthPrice: 1 | 2 | 3 | 4             // 1=great value, 4=overpriced
  wouldRecommend: boolean
  
  submittedAt: Date
}
```

**Invariants**:
- Must have completed viewing for apartment before submitting
- Cannot submit duplicate feedback for same apartment
- personalLikes and personalDislikes must not overlap
- All required fields must be provided (no partial submissions)

---

## Domain Services

### CompatibilityCalculator

**Responsibility**: Calculate compatibility scores between users and apartments/roommates

**Methods**:
- `calculateApartmentMatch(userPrefs: ApartmentPreferences, apartment: Apartment): number`
  - Returns 0-100 score
  - Weights: Budget (30%), Location (25%), Size (20%), Amenities (25%)
  
- `calculateRoommateCompatibility(userPrefs: RoommatePreferences, roommate: RoommateProfile): number`
  - Returns 0-100 score
  - Weights: Cleanliness (20%), Social (15%), Noise (15%), Schedule (10%), Smoking (15%), Pets (15%), Drinking (10%)
  
- `hasRoommateDealBreaker(userPrefs, roommate): boolean`
  - Returns true if fundamental incompatibility (e.g., user allergic, roommate has pets)

### FilteringService

**Responsibility**: Filter apartments based on user preferences

**Methods**:
- `filterByBudget(apartments, budgetRange): Apartment[]`
- `filterByLocation(apartments, neighborhoods): Apartment[]`
- `filterBySize(apartments, bedrooms, bathrooms): Apartment[]`
- `filterByAmenities(apartments, required, niceToHave): Apartment[]`
- `applyAllFilters(apartments, userPrefs): Apartment[]`

### RankingService

**Responsibility**: Rank and sort filtered apartments

**Methods**:
- `rankByCompatibility(apartments, userPrefs): Apartment[]`
  - Sort by compatibility score descending
- `rankByPrice(apartments): Apartment[]`
- `rankByRecency(apartments): Apartment[]`

### ViewingScheduler

**Responsibility**: Generate and manage viewing time slots

**Methods**:
- `generateAvailableSlots(apartmentId, startDate, endDate): ViewingSlot[]`
  - Respects business hour constraints
  - Excludes already-booked slots
- `optimizeSameDayRoute(viewings: Viewing[]): Viewing[]`
  - Sort by proximity for travel efficiency
  - Calculate travel time between locations
- `suggestSameDaySlots(apartmentIds: string[]): ViewingSlot[][]`
  - Find compatible slots for multiple apartments on same day

---

## Ubiquitous Language

**Terms used consistently across code, UI, and documentation**:

| Term | Definition | Usage |
|------|------------|-------|
| **Apartment** | A rental property listing | "Browse apartments" |
| **Whole Apartment** | Complete unit for single person/group | "2BR whole apartment" |
| **Room-Available** | Apartment with open rooms + current roommates | "1 room available in 3BR" |
| **Shortlist** | User's saved apartments of interest | "Add to shortlist" |
| **Viewing** | Physical tour of apartment with company rep | "Schedule viewing" |
| **Compatibility Score** | 0-100 measure of match quality | "92% compatible" |
| **Personal Ranking** | User-specific apartment scores based on feedback | Internal system term |
| **Fairness Ranking** | Global apartment quality score | "4.5★ verified listing" |
| **Roommate Seeker** | User open to sharing with strangers | Onboarding option |
| **Group** | Users searching together (pre-existing roommates) | "Group of 3" |
| **Preferences** | User's search criteria and lifestyle attributes | "Update preferences" |
| **Onboarding** | Initial setup flow to collect preferences | "Complete onboarding" |
| **Swipe Right** | Indicate interest (add to shortlist) | UI gesture |
| **Swipe Left** | Pass on apartment | UI gesture |
| **Same-Day Viewing** | Viewing scheduled for today | Priority feature |
| **Rep** | Company representative showing apartments | "Meet rep in lobby" |

---

## Aggregates & Bounded Context Relationships

```
Discovery Context:
  Apartment (aggregate root)
    ├─ contains: RoommateProfile (value object)
    └─ references: Landlord (external entity)
  
  User (aggregate root)
    ├─ contains: ApartmentPreferences (value object)
    └─ contains: RoommatePreferences (value object)

Evaluation Context:
  Viewing (aggregate root)
    ├─ references: Apartment (from Discovery)
    ├─ references: User (from Discovery)
    └─ contains: ViewingSlot (value object)
  
  Feedback (value object)
    ├─ references: Apartment (from Discovery)
    └─ references: User (from Discovery)

Transaction Context (deferred):
  Lease (aggregate root)
    ├─ references: Apartment
    ├─ references: User(s)
    └─ contains: PaymentSchedule
```

---

## Event Flows (for future event-driven architecture)

**Onboarding Completed**:
```
User completes onboarding
  → UserPreferencesSet event
  → ApartmentFilteringTriggered event
  → CompatibilityScoresCalculated event
  → UserReadyForDiscovery event
```

**Apartment Shortlisted**:
```
User swipes right
  → ApartmentShortlisted event
  → ShortlistUpdated event
  → UserNotified event (if mutual match in future)
```

**Viewing Scheduled**:
```
User books viewing
  → ViewingScheduled event
  → RepAssigned event
  → UserNotified event
  → CalendarInviteSent event (post-MVP)
```

**Feedback Submitted**:
```
User submits feedback
  → FeedbackSubmitted event
  → PersonalRankingUpdated event
  → FairnessRankingRecalculated event
  → RecommendationEngineRetrained event (post-MVP)
```

---

**Domain model provides foundation for PLAN phase component and data structure design.**
