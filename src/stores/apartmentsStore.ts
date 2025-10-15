import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Apartment } from '@/types/apartment';

interface ApartmentsState {
  // Apartment inventory
  apartments: Apartment[];
  filteredApartments: Apartment[];

  // Swipe state
  currentIndex: number;
  swipedApartments: {
    liked: string[];
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
  compatibilityScores: Record<string, number>;

  // Loading states
  isLoading: boolean;
  hasMoreApartments: boolean;
}

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
  applyFilters: () => void;

  // Compatibility
  calculateCompatibilityScores: () => void;
  updateCompatibilityScore: (apartmentId: string, score: number) => void;

  // Navigation
  goToApartment: (index: number) => void;
  loadMoreApartments: () => void;
}

interface ApartmentsSelectors {
  // Current apartment
  selectCurrentApartment: () => Apartment | null;
  selectCurrentCompatibilityScore: () => number;

  // Filtered results
  selectFilteredApartments: () => Apartment[];
  selectApartmentById: (id: string) => Apartment | null;

  // Statistics
  selectTotalApartments: () => number;
  selectSwipeProgress: () => number;

  // Compatibility helpers
  selectHighCompatibilityApartments: () => Apartment[];
  selectAverageCompatibilityApartments: () => Apartment[];

  // Filter helpers
  selectActiveFilterCount: () => number;
  selectIsFiltered: () => boolean;
}

type ApartmentsStore = ApartmentsState & ApartmentsActions & ApartmentsSelectors;

const defaultApartmentsState: ApartmentsState = {
  apartments: [],
  filteredApartments: [],
  currentIndex: 0,
  swipedApartments: {
    liked: [],
    passed: [],
    superLiked: [],
  },
  activeFilters: {
    priceRange: [1000, 3000],
    bedrooms: 1,
    bathrooms: 1,
    amenities: [],
    neighborhoods: [],
  },
  compatibilityScores: {},
  isLoading: false,
  hasMoreApartments: true,
};

export const useApartmentsStore = create<ApartmentsStore>()(
  persist(
    (set, get) => ({
      ...defaultApartmentsState,

      // Data management
      setApartments: (apartments: Apartment[]) =>
        set({
          apartments,
          filteredApartments: apartments,
          currentIndex: 0,
          hasMoreApartments: apartments.length > 0
        }),

      addApartments: (apartments: Apartment[]) =>
        set((state) => {
          const newApartments = [...state.apartments, ...apartments];
          return {
            apartments: newApartments,
            filteredApartments: newApartments,
            hasMoreApartments: true,
          };
        }),

      updateApartment: (id: string, updates: Partial<Apartment>) =>
        set((state) => {
          const updatedApartments = state.apartments.map(apt =>
            apt.id === id ? { ...apt, ...updates } : apt
          );
          return {
            apartments: updatedApartments,
            filteredApartments: updatedApartments,
          };
        }),

      // Swipe actions
      swipeLike: (apartmentId: string) =>
        set((state) => ({
          swipedApartments: {
            ...state.swipedApartments,
            liked: [...state.swipedApartments.liked, apartmentId],
          },
          currentIndex: state.currentIndex + 1,
        })),

      swipePass: (apartmentId: string) =>
        set((state) => ({
          swipedApartments: {
            ...state.swipedApartments,
            passed: [...state.swipedApartments.passed, apartmentId],
          },
          currentIndex: state.currentIndex + 1,
        })),

      swipeSuperLike: (apartmentId: string) =>
        set((state) => ({
          swipedApartments: {
            ...state.swipedApartments,
            superLiked: [...state.swipedApartments.superLiked, apartmentId],
          },
          currentIndex: state.currentIndex + 1,
        })),

      undoLastSwipe: () => {
        const state = get();
        const allSwiped = [
          ...state.swipedApartments.liked,
          ...state.swipedApartments.passed,
          ...state.swipedApartments.superLiked,
        ];

        if (allSwiped.length > 0 && state.currentIndex > 0) {
          const lastSwipedId = allSwiped[allSwiped.length - 1];

          if (typeof lastSwipedId === 'string') {
            const id = lastSwipedId as string;
            set((state) => {
              const newSwiped = { ...state.swipedApartments };

              // Remove from the appropriate array
              if (newSwiped.liked.includes(id)) {
                newSwiped.liked = newSwiped.liked.filter(apartmentId => apartmentId !== id);
              } else if (newSwiped.passed.includes(id)) {
                newSwiped.passed = newSwiped.passed.filter(apartmentId => apartmentId !== id);
              } else if (newSwiped.superLiked.includes(id)) {
                newSwiped.superLiked = newSwiped.superLiked.filter(apartmentId => apartmentId !== id);
              }

              return {
                swipedApartments: newSwiped,
                currentIndex: state.currentIndex - 1,
              };
            });
          }
        }
      },

      resetSwipeState: () =>
        set({
          currentIndex: 0,
          swipedApartments: {
            liked: [],
            passed: [],
            superLiked: [],
          },
        }),

      // Filtering
      setFilters: (filters) =>
        set((state) => ({
          activeFilters: { ...state.activeFilters, ...filters },
        })),

      clearFilters: () =>
        set(() => ({
          activeFilters: defaultApartmentsState.activeFilters,
        })),

      applyFilters: () => {
        const state = get();
        let filtered = [...state.apartments];

        // Apply price filter
        const [minPrice, maxPrice] = state.activeFilters.priceRange;
        filtered = filtered.filter(apt =>
          apt.price.monthly >= minPrice && apt.price.monthly <= maxPrice
        );

        // Apply bedroom filter
        if (state.activeFilters.bedrooms > 0) {
          filtered = filtered.filter(apt =>
            apt.details.bedrooms >= state.activeFilters.bedrooms
          );
        }

        // Apply bathroom filter
        if (state.activeFilters.bathrooms > 0) {
          filtered = filtered.filter(apt =>
            apt.details.bathrooms >= state.activeFilters.bathrooms
          );
        }

        // Apply amenities filter
        if (state.activeFilters.amenities.length > 0) {
          filtered = filtered.filter(apt =>
            state.activeFilters.amenities.every(amenity =>
              apt.amenities.includes(amenity)
            )
          );
        }

        // Apply neighborhood filter
        if (state.activeFilters.neighborhoods.length > 0) {
          filtered = filtered.filter(apt =>
            state.activeFilters.neighborhoods.includes(apt.address.neighborhood)
          );
        }

        set({ filteredApartments: filtered, currentIndex: 0 });
      },

      // Compatibility
      calculateCompatibilityScores: () => {
        // This would integrate with user preferences store
        // For now, assign random scores as placeholder
        const state = get();
        const scores: Record<string, number> = {};

        state.apartments.forEach(apt => {
          scores[apt.id] = Math.floor(Math.random() * 100);
        });

        set({ compatibilityScores: scores });
      },

      updateCompatibilityScore: (apartmentId: string, score: number) =>
        set((state) => ({
          compatibilityScores: {
            ...state.compatibilityScores,
            [apartmentId]: score,
          },
        })),

      // Navigation
      goToApartment: (index: number) =>
        set({ currentIndex: Math.max(0, Math.min(index, get().filteredApartments.length - 1)) }),

      loadMoreApartments: () =>
        set({ isLoading: true }), // This would trigger data fetching

      // Selectors
      selectCurrentApartment: () => {
        const state = get();
        return state.filteredApartments[state.currentIndex] || null;
      },

      selectCurrentCompatibilityScore: () => {
        const currentApt = get().selectCurrentApartment();
        return currentApt ? get().compatibilityScores[currentApt.id] || 0 : 0;
      },

      selectFilteredApartments: () => get().filteredApartments,

      selectApartmentById: (id: string) =>
        get().apartments.find(apt => apt.id === id) || null,

      selectTotalApartments: () => get().apartments.length,

      selectSwipeProgress: () => {
        const total = get().filteredApartments.length;
        return total > 0 ? (get().currentIndex / total) * 100 : 0;
      },

      selectHighCompatibilityApartments: () =>
        get().apartments.filter(apt => (get().compatibilityScores[apt.id] || 0) > 70),

      selectAverageCompatibilityApartments: () =>
        get().apartments.filter(apt => {
          const score = get().compatibilityScores[apt.id] || 0;
          return score >= 40 && score <= 70;
        }),

      selectActiveFilterCount: () => {
        const filters = get().activeFilters;
        let count = 0;

        if (filters.priceRange[0] !== 1000 || filters.priceRange[1] !== 3000) count++;
        if (filters.bedrooms > 1) count++;
        if (filters.bathrooms > 1) count++;
        if (filters.amenities.length > 0) count++;
        if (filters.neighborhoods.length > 0) count++;

        return count;
      },

      selectIsFiltered: () => get().selectActiveFilterCount() > 0,
    }),
    {
      name: 'renthunt-apartments',
      partialize: (state) => ({
        apartments: state.apartments,
        swipedApartments: state.swipedApartments,
        activeFilters: state.activeFilters,
        compatibilityScores: state.compatibilityScores,
      }),
    }
  )
);
