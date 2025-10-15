# Zustand Stores Architecture - RentHunt MVP

**Design Date**: 2025-10-15  
**Library**: Zustand 4.x with persist middleware  
**Persistence**: LocalStorage  
**Stores**: 5 stores with full API specification  

---

## Store Design Principles

### State Management Patterns
- **Single Responsibility**: Each store handles one domain concern
- **Immutability**: All state updates create new objects
- **Persistence**: LocalStorage for cross-session continuity
- **Selectors**: Computed values for complex state derivations

### API Structure
Each store provides:
- **State**: Current data
- **Actions**: State mutation functions
- **Selectors**: Computed/derived values
- **Persistence**: Automatic LocalStorage sync

### Naming Conventions
- Store hooks: `use{CamelCase}Store`
- Actions: `set{Property}`, `add{Item}`, `remove{Item}`, `update{Item}`
- Selectors: `select{ComputedValue}`, `get{FilteredItems}`

---

## Store 1: User Preferences Store

**Purpose**: Manages user onboarding data and preference settings  
**Persistence**: Yes (critical user data)  
**File**: `src/stores/userPreferencesStore.ts`

### State Interface
```typescript
interface UserPreferencesState {
  // Onboarding completion status
  onboardingCompleted: boolean;
  currentStep: number; // 1-9 for onboarding screens

  // Apartment preferences
  apartmentPreferences: {
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
    spaceRequirements: string[]; // Array of requirement IDs
    amenities: string[]; // Array of amenity IDs
    timeline: {
      moveInDate: Date;
      leaseDuration: number; // months
    };
  };

  // Roommate preferences (conditional)
  roommatePreferences: {
    seekingRoommates: boolean;
    hasGroup: boolean;
    groupSize: number; // 1-3
    preferences: {
      cleanliness: number; // 1-5 scale
      socialLevel: number; // 1-5 scale
      noiseLevel: number; // 1-5 scale
      workSchedule: number; // 1-5 scale
      smoking: boolean;
      pets: boolean;
      drinking: number; // 1-5 scale
    };
  };

  // Living situation
  livingSituation: 'solo' | 'group' | 'seeking';
}
```

### Actions
```typescript
interface UserPreferencesActions {
  // Onboarding flow
  setCurrentStep: (step: number) => void;
  completeOnboarding: () => void;
  resetOnboarding: () => void;

  // Apartment preferences
  updateApartmentPreferences: (preferences: Partial<UserPreferencesState['apartmentPreferences']>) => void;
  setLocation: (city: string, neighborhoods: string[]) => void;
  setBudget: (min: number, max: number) => void;
  setSize: (bedrooms: number, bathrooms: number) => void;
  toggleSpaceRequirement: (requirementId: string) => void;
  toggleAmenity: (amenityId: string) => void;
  setTimeline: (moveInDate: Date, leaseDuration: number) => void;

  // Roommate preferences
  updateRoommatePreferences: (preferences: Partial<UserPreferencesState['roommatePreferences']>) => void;
  setLivingSituation: (situation: UserPreferencesState['livingSituation']) => void;
  setSeekingRoommates: (seeking: boolean) => void;
  setGroupSize: (size: number) => void;

  // Bulk operations
  importPreferences: (preferences: UserPreferencesState) => void;
  resetAllPreferences: () => void;
}
```

### Selectors
```typescript
interface UserPreferencesSelectors {
  // Computed values
  selectIsOnboardingComplete: () => boolean;
  selectHasRoommatePreferences: () => boolean;
  selectBudgetRange: () => { min: number; max: number };
  selectFormattedBudget: () => string; // "$1,500 - $3,000"

  // Validation helpers
  selectIsValidForMatching: () => boolean; // Has required preferences
  selectMissingRequiredFields: () => string[]; // List of missing fields

  // Filtering helpers
  selectLocationFilter: () => { city: string; neighborhoods: string[] };
  selectAmenityFilter: () => string[];
}
```

---

## Store 2: Apartments Store

**Purpose**: Manages apartment inventory, filtering, and swipe state  
**Persistence**: Yes (current session state)  
**File**: `src/stores/apartmentsStore.ts`

### State Interface
```typescript
interface ApartmentsState {
  // Apartment inventory
  apartments: Apartment[];
  filteredApartments: Apartment[];

  // Swipe state
  currentIndex: number; // Current apartment in swipe stack
  swipedApartments: {
    liked: string[]; // Apartment IDs
    passed: string[];
    superLiked: string[];
  };

  // Filtering state
  activeFilters: {
    priceRange: [number, number];
    bedrooms: number;
    bathrooms: number;
    amenities: string[];
    neighborhoods: string[];
  };

  // Compatibility scores (computed per user)
  compatibilityScores: Record<string, number>; // apartmentId -> score 0-100

  // Loading states
  isLoading: boolean;
  hasMoreApartments: boolean;
}
```

### Actions
```typescript
interface ApartmentsActions {
  // Data management
  setApartments: (apartments: Apartment[]) => void;
  addApartments: (apartments: Apartment[]) => void;
  updateApartment: (id: string, updates: Partial<Apartment>) => void;

  // Swipe actions
  swipeLike: (apartmentId: string) => void;
  swipePass: (apartmentId: string) => void;
  swipeSuperLike: (apartmentId: string) => void;
  undoLastSwipe: () => void;
  resetSwipeState: () => void;

  // Filtering
  setFilters: (filters: Partial<ApartmentsState['activeFilters']>) => void;
  clearFilters: () => void;
  applyFilters: () => void; // Recalculate filteredApartments

  // Compatibility
  calculateCompatibilityScores: () => void; // Based on user preferences
  updateCompatibilityScore: (apartmentId: string, score: number) => void;

  // Navigation
  goToApartment: (index: number) => void;
  loadMoreApartments: () => void;
}
```

### Selectors
```typescript
interface ApartmentsSelectors {
  // Current apartment
  selectCurrentApartment: () => Apartment | null;
  selectCurrentCompatibilityScore: () => number;

  // Filtered results
  selectFilteredApartments: () => Apartment[];
  selectApartmentById: (id: string) => Apartment | null;

  // Statistics
  selectTotalApartments: () => number;
  selectSwipeProgress: () => number; // 0-100 percentage through stack

  // Compatibility helpers
  selectHighCompatibilityApartments: () => Apartment[]; // score > 70
  selectAverageCompatibilityApartments: () => Apartment[]; // score 40-70

  // Filter helpers
  selectActiveFilterCount: () => number;
  selectIsFiltered: () => boolean;
}
```

---

## Store 3: Shortlist Store

**Purpose**: Manages user's saved/favorited apartments  
**Persistence**: Yes (user's saved items)  
**File**: `src/stores/shortlistStore.ts`

### State Interface
```typescript
interface ShortlistState {
  // Saved apartments
  savedApartments: string[]; // Apartment IDs in order added

  // Shortlist metadata
  createdAt: Record<string, Date>; // apartmentId -> date added
  notes: Record<string, string>; // apartmentId -> user notes

  // UI state
  sortOrder: 'recent' | 'compatibility' | 'price-low' | 'price-high';
  viewMode: 'grid' | 'list';
}
```

### Actions
```typescript
interface ShortlistActions {
  // Basic operations
  addToShortlist: (apartmentId: string) => void;
  removeFromShortlist: (apartmentId: string) => void;
  toggleShortlist: (apartmentId: string) => void;

  // Notes management
  addNote: (apartmentId: string, note: string) => void;
  updateNote: (apartmentId: string, note: string) => void;
  removeNote: (apartmentId: string) => void;

  // Organization
  setSortOrder: (order: ShortlistState['sortOrder']) => void;
  setViewMode: (mode: ShortlistState['viewMode']) => void;
  reorderShortlist: (apartmentIds: string[]) => void; // Manual reordering

  // Bulk operations
  clearShortlist: () => void;
  exportShortlist: () => ShortlistExportData;
  importShortlist: (data: ShortlistExportData) => void;
}
```

### Selectors
```typescript
interface ShortlistSelectors {
  // Shortlist data
  selectShortlistApartments: () => Apartment[]; // With full apartment data
  selectShortlistWithMetadata: () => ShortlistItem[]; // With notes, dates

  // Statistics
  selectShortlistCount: () => number;
  selectShortlistByDate: () => Apartment[]; // Sorted by date added

  // Filtering/sorting
  selectSortedShortlist: () => Apartment[]; // Based on sortOrder
  selectShortlistWithNotes: () => ShortlistItem[]; // Only items with notes

  // Status checks
  selectIsInShortlist: (apartmentId: string) => boolean;
  selectHasNotes: (apartmentId: string) => boolean;
}
```

---

## Store 4: Viewings Store

**Purpose**: Manages scheduled apartment viewings and availability  
**Persistence**: Yes (scheduled appointments)  
**File**: `src/stores/viewingsStore.ts`

### State Interface
```typescript
interface ViewingsState {
  // Scheduled viewings
  scheduledViewings: Viewing[];

  // Availability data
  availableSlots: TimeSlot[]; // For all apartments
  bookedSlots: Record<string, TimeSlot[]>; // apartmentId -> booked slots

  // Scheduling preferences
  preferences: {
    sameDayPriority: boolean; // 80% of users prefer same-day
    preferredTimes: ('morning' | 'afternoon' | 'evening')[];
    maxDistance: number; // miles from user location
  };

  // Calendar state
  selectedDate: Date | null;
  selectedApartment: string | null;

  // Business rules
  businessHours: {
    mondayToThursday: { start: string; end: string }; // 10AM-7PM
    friday: { start: string; end: string }; // 10AM-5PM
    weekend: boolean; // false - closed
  };
}
```

### Actions
```typescript
interface ViewingsActions {
  // Scheduling
  scheduleViewing: (apartmentId: string, dateTime: Date) => void;
  cancelViewing: (viewingId: string) => void;
  rescheduleViewing: (viewingId: string, newDateTime: Date) => void;

  // Availability management
  loadAvailableSlots: (apartmentId: string, date: Date) => void;
  updateAvailableSlots: (slots: TimeSlot[]) => void;
  markSlotBooked: (apartmentId: string, slotId: string) => void;

  // Preferences
  updatePreferences: (preferences: Partial<ViewingsState['preferences']>) => void;
  setSameDayPriority: (enabled: boolean) => void;

  // Calendar navigation
  setSelectedDate: (date: Date) => void;
  setSelectedApartment: (apartmentId: string) => void;

  // Bulk operations
  cancelAllViewings: () => void;
  exportSchedule: () => ViewingExportData;
}
```

### Selectors
```typescript
interface ViewingsSelectors {
  // Scheduled viewings
  selectUpcomingViewings: () => Viewing[];
  selectTodayViewings: () => Viewing[];
  selectViewingById: (id: string) => Viewing | null;

  // Availability
  selectAvailableSlotsForDate: (date: Date) => TimeSlot[];
  selectAvailableSlotsForApartment: (apartmentId: string) => TimeSlot[];
  selectNextAvailableSlot: (apartmentId: string) => TimeSlot | null;

  // Calendar helpers
  selectViewingsForMonth: (month: Date) => Viewing[];
  selectBookedDates: () => Date[];
  selectAvailableDates: (apartmentId: string) => Date[];

  // Business rules
  selectIsBusinessHour: (dateTime: Date) => boolean;
  selectNextBusinessDay: (from: Date) => Date;

  // Statistics
  selectTotalScheduledViewings: () => number;
  selectViewingsThisWeek: () => number;
}
```

---

## Store 5: Feedback Store

**Purpose**: Manages post-viewing feedback and reviews  
**Persistence**: Yes (user's feedback history)  
**File**: `src/stores/feedbackStore.ts`

### State Interface
```typescript
interface FeedbackState {
  // Submitted feedback
  submittedFeedback: Feedback[];

  // Pending feedback (after viewings)
  pendingFeedback: {
    viewingId: string;
    apartmentId: string;
    dueDate: Date; // 24 hours after viewing
  }[];

  // Feedback statistics
  stats: {
    totalSubmitted: number;
    averagePersonalRating: number;
    averageFairnessRating: number;
    completionRate: number; // submitted / (submitted + pending)
  };

  // UI state
  currentFeedback: {
    viewingId: string | null;
    step: 'personal' | 'fairness' | 'complete';
  };
}
```

### Actions
```typescript
interface FeedbackActions {
  // Feedback submission
  startFeedback: (viewingId: string) => void;
  submitPersonalFeedback: (viewingId: string, feedback: PersonalFeedback) => void;
  submitFairnessFeedback: (viewingId: string, feedback: FairnessFeedback) => void;
  completeFeedback: (viewingId: string) => void;

  // Pending management
  addPendingFeedback: (viewingId: string, apartmentId: string) => void;
  removePendingFeedback: (viewingId: string) => void;
  extendDeadline: (viewingId: string, newDueDate: Date) => void;

  // Feedback management
  updateFeedback: (feedbackId: string, updates: Partial<Feedback>) => void;
  deleteFeedback: (feedbackId: string) => void;

  // UI state
  setCurrentFeedbackStep: (step: FeedbackState['currentFeedback']['step']) => void;
  clearCurrentFeedback: () => void;

  // Bulk operations
  exportFeedbackHistory: () => FeedbackExportData;
  clearOldFeedback: (olderThan: Date) => void;
}
```

### Selectors
```typescript
interface FeedbackSelectors {
  // Feedback data
  selectFeedbackForApartment: (apartmentId: string) => Feedback[];
  selectFeedbackForViewing: (viewingId: string) => Feedback | null;
  selectAllSubmittedFeedback: () => Feedback[];

  // Pending feedback
  selectPendingFeedback: () => FeedbackState['pendingFeedback'];
  selectOverdueFeedback: () => FeedbackState['pendingFeedback'];
  selectFeedbackDueToday: () => FeedbackState['pendingFeedback'];

  // Statistics
  selectFeedbackStats: () => FeedbackState['stats'];
  selectCompletionRate: () => number;
  selectAverageRatings: () => { personal: number; fairness: number };

  // UI helpers
  selectCurrentFeedbackForm: () => Feedback | null;
  selectNextPendingFeedback: () => FeedbackState['pendingFeedback'][0] | null;

  // Status checks
  selectHasPendingFeedback: () => boolean;
  selectHasSubmittedFeedback: () => boolean;
}
```

---

## Store Implementation Template

### Base Store Structure
```typescript
// stores/userPreferencesStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferencesState extends UserPreferencesData, UserPreferencesActions, UserPreferencesSelectors {}

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set, get) => ({
      // Initial state
      onboardingCompleted: false,
      currentStep: 1,
      // ... rest of initial state

      // Actions
      setCurrentStep: (step) => set({ currentStep: step }),

      // Selectors
      selectIsOnboardingComplete: () => get().onboardingCompleted,
    }),
    {
      name: 'userPreferences',
      partialize: (state) => ({
        // Only persist these fields
        onboardingCompleted: state.onboardingCompleted,
        apartmentPreferences: state.apartmentPreferences,
        roommatePreferences: state.roommatePreferences,
        livingSituation: state.livingSituation,
      }),
    }
  )
);
```

### Store Composition
```typescript
// stores/index.ts
export { useUserPreferencesStore } from './userPreferencesStore';
export { useApartmentsStore } from './apartmentsStore';
export { useShortlistStore } from './shortlistStore';
export { useViewingsStore } from './viewingsStore';
export { useFeedbackStore } from './feedbackStore';

// Typed hooks for better DX
export const useUserPreferences = () => useUserPreferencesStore();
export const useApartments = () => useApartmentsStore();
export const useShortlist = () => useShortlistStore();
export const useViewings = () => useViewingsStore();
export const useFeedback = () => useFeedbackStore();
```

---

## Cross-Store Communication

### Store Dependencies
- **apartmentsStore** depends on **userPreferencesStore** for filtering/compatibility
- **viewingsStore** depends on **apartmentsStore** for available slots
- **feedbackStore** depends on **viewingsStore** for pending feedback
- **shortlistStore** is independent but references apartments

### State Synchronization
```typescript
// Example: Apartments store reacts to preference changes
useEffect(() => {
  const preferences = useUserPreferencesStore.getState();
  const apartmentsStore = useApartmentsStore.getState();

  // Recalculate filters and compatibility
  apartmentsStore.applyFilters();
  apartmentsStore.calculateCompatibilityScores();
}, [userPreferencesStore]);
```

### Event-Driven Updates
- Use Zustand's subscribe for cross-store updates
- Avoid circular dependencies
- Prefer reactive updates over direct store calls

---

## Performance Considerations

### State Size Limits
- Keep stores focused on essential data
- Use selectors for computed values
- Paginate large datasets (apartments)

### Persistence Strategy
- Only persist user-critical data
- Use compression for large objects
- Version persistence schema for migrations

### Memory Management
- Clear unused data when navigating
- Use shallow comparison in selectors
- Debounce frequent updates

---

**Zustand stores architected with full API specification, persistence, and cross-store communication patterns.**
