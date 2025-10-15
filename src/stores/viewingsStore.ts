import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Viewing,
  TimeSlot,
  ViewingExportData,
  ViewingPreferences,
  BusinessHours
} from '@/types/viewings';

interface ViewingsState {
  // Scheduled viewings
  scheduledViewings: Viewing[];

  // Availability data
  availableSlots: TimeSlot[]; // For all apartments
  bookedSlots: Record<string, TimeSlot[]>; // apartmentId -> booked slots

  // Scheduling preferences
  preferences: ViewingPreferences;

  // Calendar state
  selectedDate: Date | null;
  selectedApartment: string | null;

  // Business rules
  businessHours: BusinessHours;
}

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

type ViewingsStore = ViewingsState & ViewingsActions & ViewingsSelectors;

const defaultViewingsState: ViewingsState = {
  scheduledViewings: [],
  availableSlots: [],
  bookedSlots: {},
  preferences: {
    sameDayPriority: true,
    preferredTimes: ['afternoon', 'morning', 'evening'],
    maxDistance: 10,
  },
  selectedDate: null,
  selectedApartment: null,
  businessHours: {
    mondayToThursday: { start: '10:00', end: '19:00' },
    friday: { start: '10:00', end: '17:00' },
    weekend: false,
  },
};

export const useViewingsStore = create<ViewingsStore>()(
  persist(
    (set, get) => ({
      ...defaultViewingsState,

      // Scheduling
      scheduleViewing: (apartmentId: string, dateTime: Date) => {
        const newViewing: Viewing = {
          id: `viewing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          apartmentId,
          dateTime,
          status: 'scheduled',
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          scheduledViewings: [...state.scheduledViewings, newViewing],
        }));

        // Mark the slot as booked
        get().markSlotBooked(apartmentId, `slot_${dateTime.getTime()}`);
      },

      cancelViewing: (viewingId: string) => {
        set((state) => ({
          scheduledViewings: state.scheduledViewings.map(viewing =>
            viewing.id === viewingId
              ? { ...viewing, status: 'cancelled' as const, updatedAt: new Date() }
              : viewing
          ),
        }));
      },

      rescheduleViewing: (viewingId: string, newDateTime: Date) => {
        set((state) => ({
          scheduledViewings: state.scheduledViewings.map(viewing =>
            viewing.id === viewingId
              ? { ...viewing, dateTime: newDateTime, updatedAt: new Date() }
              : viewing
          ),
        }));
      },

      // Availability management
      loadAvailableSlots: (apartmentId: string, date: Date) => {
        // Generate available time slots for the given date
        const slots: TimeSlot[] = [];
        const startHour = 10;
        const endHour = date.getDay() === 5 ? 17 : 19; // Friday ends at 5PM, others at 7PM

        for (let hour = startHour; hour < endHour; hour++) {
          for (let minute = 0; minute < 60; minute += 30) {
            const slotTime = new Date(date);
            slotTime.setHours(hour, minute, 0, 0);

            const slotId = `slot_${slotTime.getTime()}`;
            const isBooked = get().bookedSlots[apartmentId]?.some(
              slot => slot.id === slotId && slot.isBooked
            ) || false;

            slots.push({
              id: slotId,
              apartmentId,
              dateTime: slotTime,
              duration: 30,
              isAvailable: !isBooked && slotTime > new Date(),
              isBooked,
            });
          }
        }

        get().updateAvailableSlots(slots);
      },

      updateAvailableSlots: (slots: TimeSlot[]) => {
        set({ availableSlots: slots });
      },

      markSlotBooked: (apartmentId: string, slotId: string) => {
        const slot: TimeSlot = {
          id: slotId,
          apartmentId,
          dateTime: new Date(parseInt(slotId.split('_')[1])),
          duration: 30,
          isAvailable: false,
          isBooked: true,
        };

        set((state) => ({
          bookedSlots: {
            ...state.bookedSlots,
            [apartmentId]: [...(state.bookedSlots[apartmentId] || []), slot],
          },
        }));
      },

      // Preferences
      updatePreferences: (preferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...preferences },
        })),

      setSameDayPriority: (enabled: boolean) =>
        set((state) => ({
          preferences: { ...state.preferences, sameDayPriority: enabled },
        })),

      // Calendar navigation
      setSelectedDate: (date: Date) => set({ selectedDate: date }),
      setSelectedApartment: (apartmentId: string) => set({ selectedApartment: apartmentId }),

      // Bulk operations
      cancelAllViewings: () =>
        set((state) => ({
          scheduledViewings: state.scheduledViewings.map(viewing => ({
            ...viewing,
            status: 'cancelled' as const,
            updatedAt: new Date(),
          })),
        })),

      exportSchedule: () => {
        const state = get();
        return {
          viewings: state.scheduledViewings,
          exportedAt: new Date(),
          version: '1.0',
        };
      },

      // Selectors
      selectUpcomingViewings: () => {
        const now = new Date();
        return get().scheduledViewings
          .filter(viewing => viewing.dateTime > now && viewing.status === 'scheduled')
          .sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime());
      },

      selectTodayViewings: () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return get().scheduledViewings.filter(viewing =>
          viewing.dateTime >= today &&
          viewing.dateTime < tomorrow &&
          viewing.status === 'scheduled'
        );
      },

      selectViewingById: (id: string) =>
        get().scheduledViewings.find(viewing => viewing.id === id) || null,

      selectAvailableSlotsForDate: (date: Date) => {
        const dateStr = date.toDateString();
        return get().availableSlots.filter(slot =>
          slot.dateTime.toDateString() === dateStr && slot.isAvailable
        );
      },

      selectAvailableSlotsForApartment: (apartmentId: string) =>
        get().availableSlots.filter(slot =>
          slot.apartmentId === apartmentId && slot.isAvailable
        ),

      selectNextAvailableSlot: (apartmentId: string) => {
        const availableSlots = get().selectAvailableSlotsForApartment(apartmentId);
        return availableSlots.length > 0 ? availableSlots[0] : null;
      },

      selectViewingsForMonth: (month: Date) => {
        const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
        const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);

        return get().scheduledViewings.filter(viewing =>
          viewing.dateTime >= monthStart &&
          viewing.dateTime <= monthEnd &&
          viewing.status === 'scheduled'
        );
      },

      selectBookedDates: () => {
        const dates = new Set<Date>();
        Object.values(get().bookedSlots).forEach(slots => {
          slots.forEach(slot => {
            if (slot.isBooked) {
              const date = new Date(slot.dateTime);
              date.setHours(0, 0, 0, 0);
              dates.add(date);
            }
          });
        });
        return Array.from(dates);
      },

      selectAvailableDates: (apartmentId: string) => {
        const availableSlots = get().selectAvailableSlotsForApartment(apartmentId);
        const dates = new Set<Date>();

        availableSlots.forEach(slot => {
          const date = new Date(slot.dateTime);
          date.setHours(0, 0, 0, 0);
          dates.add(date);
        });

        return Array.from(dates);
      },

      selectIsBusinessHour: (dateTime: Date) => {
        const state = get();
        const day = dateTime.getDay();
        const time = dateTime.toTimeString().slice(0, 5);

        if (day === 0 || day === 6) {
          return state.businessHours.weekend;
        }

        const hours = day === 5 ? state.businessHours.friday : state.businessHours.mondayToThursday;
        return time >= hours.start && time <= hours.end;
      },

      selectNextBusinessDay: (from: Date) => {
        const state = get();
        let date = new Date(from);

        do {
          date.setDate(date.getDate() + 1);
          const day = date.getDay();
          if (day === 0 || day === 6) {
            if (state.businessHours.weekend) break;
          } else {
            break;
          }
        } while (true);

        return date;
      },

      selectTotalScheduledViewings: () =>
        get().scheduledViewings.filter(v => v.status === 'scheduled').length,

      selectViewingsThisWeek: () => {
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        weekStart.setHours(0, 0, 0, 0);

        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7);

        return get().scheduledViewings.filter(viewing =>
          viewing.dateTime >= weekStart &&
          viewing.dateTime < weekEnd &&
          viewing.status === 'scheduled'
        ).length;
      },
    }),
    {
      name: 'renthunt-viewings',
      partialize: (state) => ({
        scheduledViewings: state.scheduledViewings,
        bookedSlots: state.bookedSlots,
        preferences: state.preferences,
      }),
    }
  )
);
