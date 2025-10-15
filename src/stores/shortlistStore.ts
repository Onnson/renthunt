import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ShortlistItem, ShortlistSortOrder, ShortlistViewMode, ShortlistExportData } from '@/types/shortlist';
import type { Apartment } from '@/types/apartment';

interface ShortlistState {
  // Saved apartments
  savedApartments: string[]; // Apartment IDs in order added

  // Shortlist metadata
  createdAt: Record<string, Date>; // apartmentId -> date added
  notes: Record<string, string>; // apartmentId -> user notes

  // UI state
  sortOrder: ShortlistSortOrder;
  viewMode: ShortlistViewMode;
}

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
  setSortOrder: (order: ShortlistSortOrder) => void;
  setViewMode: (mode: ShortlistViewMode) => void;
  reorderShortlist: (apartmentIds: string[]) => void; // Manual reordering

  // Bulk operations
  clearShortlist: () => void;
  exportShortlist: () => ShortlistExportData;
  importShortlist: (data: ShortlistExportData) => void;
}

interface ShortlistSelectors {
  // Shortlist data
  selectShortlistApartments: (apartments: Apartment[]) => Apartment[]; // With full apartment data
  selectShortlistWithMetadata: () => ShortlistItem[]; // With notes, dates

  // Statistics
  selectShortlistCount: () => number;
  selectShortlistByDate: (apartments: Apartment[]) => Apartment[]; // Sorted by date added

  // Filtering/sorting
  selectSortedShortlist: (apartments: Apartment[]) => Apartment[]; // Based on sortOrder
  selectShortlistWithNotes: () => ShortlistItem[]; // Only items with notes

  // Status checks
  selectIsInShortlist: (apartmentId: string) => boolean;
  selectHasNotes: (apartmentId: string) => boolean;
}

type ShortlistStore = ShortlistState & ShortlistActions & ShortlistSelectors;

const defaultShortlistState: ShortlistState = {
  savedApartments: [],
  createdAt: {},
  notes: {},
  sortOrder: 'recent',
  viewMode: 'grid',
};

export const useShortlistStore = create<ShortlistStore>()(
  persist(
    (set, get) => ({
      ...defaultShortlistState,

      // Basic operations
      addToShortlist: (apartmentId: string) => {
        const state = get();
        if (!state.savedApartments.includes(apartmentId)) {
          set((state) => ({
            savedApartments: [...state.savedApartments, apartmentId],
            createdAt: {
              ...state.createdAt,
              [apartmentId]: new Date(),
            },
          }));
        }
      },

      removeFromShortlist: (apartmentId: string) => {
        set((state) => {
          const newSaved = state.savedApartments.filter(id => id !== apartmentId);
          const newCreatedAt = { ...state.createdAt };
          const newNotes = { ...state.notes };
          delete newCreatedAt[apartmentId];
          delete newNotes[apartmentId];

          return {
            savedApartments: newSaved,
            createdAt: newCreatedAt,
            notes: newNotes,
          };
        });
      },

      toggleShortlist: (apartmentId: string) => {
        const state = get();
        if (state.savedApartments.includes(apartmentId)) {
          get().removeFromShortlist(apartmentId);
        } else {
          get().addToShortlist(apartmentId);
        }
      },

      // Notes management
      addNote: (apartmentId: string, note: string) => {
        set((state) => ({
          notes: {
            ...state.notes,
            [apartmentId]: note,
          },
        }));
      },

      updateNote: (apartmentId: string, note: string) => {
        get().addNote(apartmentId, note);
      },

      removeNote: (apartmentId: string) => {
        set((state) => {
          const newNotes = { ...state.notes };
          delete newNotes[apartmentId];
          return { notes: newNotes };
        });
      },

      // Organization
      setSortOrder: (order: ShortlistSortOrder) => set({ sortOrder: order }),
      setViewMode: (mode: ShortlistViewMode) => set({ viewMode: mode }),

      reorderShortlist: (apartmentIds: string[]) => {
        // Validate that all IDs exist in current shortlist
        const state = get();
        const currentIds = new Set(state.savedApartments);
        const validIds = apartmentIds.filter(id => currentIds.has(id));

        if (validIds.length === state.savedApartments.length) {
          set({ savedApartments: validIds });
        }
      },

      // Bulk operations
      clearShortlist: () =>
        set({
          savedApartments: [],
          createdAt: {},
          notes: {},
        }),

      exportShortlist: () => {
        const state = get();
        const items: ShortlistItem[] = state.savedApartments.map(id => ({
          apartmentId: id,
          createdAt: state.createdAt[id] || new Date(),
          note: state.notes[id],
        }));

        return {
          items,
          exportedAt: new Date(),
          version: '1.0',
        };
      },

      importShortlist: (data: ShortlistExportData) => {
        const savedApartments: string[] = [];
        const createdAt: Record<string, Date> = {};
        const notes: Record<string, string> = {};

        data.items.forEach(item => {
          savedApartments.push(item.apartmentId);
          createdAt[item.apartmentId] = item.createdAt;
          if (item.note) {
            notes[item.apartmentId] = item.note;
          }
        });

        set({
          savedApartments,
          createdAt,
          notes,
        });
      },

      // Selectors
      selectShortlistApartments: (apartments: Apartment[]) => {
        const state = get();
        return state.savedApartments
          .map(id => apartments.find(apt => apt.id === id))
          .filter((apt): apt is Apartment => apt !== undefined);
      },

      selectShortlistWithMetadata: () => {
        const state = get();
        return state.savedApartments.map(id => ({
          apartmentId: id,
          createdAt: state.createdAt[id] || new Date(),
          note: state.notes[id],
        }));
      },

      selectShortlistCount: () => get().savedApartments.length,

      selectShortlistByDate: (apartments: Apartment[]) => {
        const state = get();
        return state.savedApartments
          .map(id => ({
            apartment: apartments.find(apt => apt.id === id),
            date: state.createdAt[id] || new Date(),
          }))
          .filter((item): item is { apartment: Apartment; date: Date } => item.apartment !== undefined)
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .map(item => item.apartment);
      },

      selectSortedShortlist: (apartments: Apartment[]) => {
        const state = get();
        let sortedApartments = get().selectShortlistApartments(apartments);

        switch (state.sortOrder) {
          case 'recent':
            return get().selectShortlistByDate(apartments);
          case 'price-low':
            return sortedApartments.sort((a, b) => a.price.monthly - b.price.monthly);
          case 'price-high':
            return sortedApartments.sort((a, b) => b.price.monthly - a.price.monthly);
          case 'compatibility':
            // This would need compatibility scores from apartments store
            // For now, return as-is
            return sortedApartments;
          default:
            return sortedApartments;
        }
      },

      selectShortlistWithNotes: () => {
        const state = get();
        return state.savedApartments
          .filter(id => state.notes[id])
          .map(id => ({
            apartmentId: id,
            createdAt: state.createdAt[id] || new Date(),
            note: state.notes[id]!,
          }));
      },

      selectIsInShortlist: (apartmentId: string) =>
        get().savedApartments.includes(apartmentId),

      selectHasNotes: (apartmentId: string) =>
        Boolean(get().notes[apartmentId]),
    }),
    {
      name: 'renthunt-shortlist',
      partialize: (state) => ({
        savedApartments: state.savedApartments,
        createdAt: state.createdAt,
        notes: state.notes,
        sortOrder: state.sortOrder,
        viewMode: state.viewMode,
      }),
    }
  )
);
