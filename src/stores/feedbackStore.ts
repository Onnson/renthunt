import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  Feedback,
  PersonalFeedback,
  FairnessFeedback,
  FeedbackExportData,
  FeedbackStats,
  PendingFeedbackItem,
  CurrentFeedbackState
} from '@/types/feedback';

interface FeedbackState {
  // Submitted feedback
  submittedFeedback: Feedback[];

  // Pending feedback (after viewings)
  pendingFeedback: PendingFeedbackItem[];

  // Feedback statistics
  stats: FeedbackStats;

  // UI state
  currentFeedback: CurrentFeedbackState;
}

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
  updateFeedbackStats: () => void;
}

interface FeedbackSelectors {
  // Feedback data
  selectFeedbackForApartment: (apartmentId: string) => Feedback[];
  selectFeedbackForViewing: (viewingId: string) => Feedback | null;
  selectAllSubmittedFeedback: () => Feedback[];

  // Pending feedback
  selectPendingFeedback: () => PendingFeedbackItem[];
  selectOverdueFeedback: () => PendingFeedbackItem[];
  selectFeedbackDueToday: () => PendingFeedbackItem[];

  // Statistics
  selectFeedbackStats: () => FeedbackStats;
  selectCompletionRate: () => number;
  selectAverageRatings: () => { personal: number; fairness: number };

  // UI helpers
  selectCurrentFeedbackForm: () => Feedback | null;
  selectNextPendingFeedback: () => PendingFeedbackItem | null;

  // Status checks
  selectHasPendingFeedback: () => boolean;
  selectHasSubmittedFeedback: () => boolean;
}

type FeedbackStore = FeedbackState & FeedbackActions & FeedbackSelectors;

const defaultFeedbackState: FeedbackState = {
  submittedFeedback: [],
  pendingFeedback: [],
  stats: {
    totalSubmitted: 0,
    averagePersonalRating: 0,
    averageFairnessRating: 0,
    completionRate: 0,
  },
  currentFeedback: {
    viewingId: null,
    step: 'personal',
  },
};

export const useFeedbackStore = create<FeedbackStore>()(
  persist(
    (set, get) => ({
      ...defaultFeedbackState,

      // Feedback submission
      startFeedback: (viewingId: string) => {
        set({
          currentFeedback: {
            viewingId,
            step: 'personal',
          },
        });
      },

      submitPersonalFeedback: (_viewingId: string, _feedback: PersonalFeedback) => {
        set((state) => ({
          currentFeedback: {
            ...state.currentFeedback,
            step: 'fairness',
          },
        }));
        // Store personal feedback temporarily until fairness feedback is submitted
        // This would be handled by a temporary state or local storage in a real app
      },

      submitFairnessFeedback: (viewingId: string, feedback: FairnessFeedback) => {
        // This would combine with previously stored personal feedback
        // For now, create a mock personal feedback
        const mockPersonalFeedback: PersonalFeedback = {
          overallRating: 4,
          cleanlinessRating: 4,
          locationRating: 4,
          valueRating: 4,
          amenitiesRating: 4,
        };

        const newFeedback: Feedback = {
          id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          viewingId,
          apartmentId: get().pendingFeedback.find(p => p.viewingId === viewingId)?.apartmentId || '',
          submittedAt: new Date(),
          personal: mockPersonalFeedback,
          fairness: feedback,
          overallSatisfaction: Math.round(
            (mockPersonalFeedback.overallRating + feedback.advertisedAccuracyRating +
             feedback.priceFairnessRating + feedback.responsivenessRating +
             feedback.professionalismRating) / 5
          ),
        };

        set((state) => ({
          submittedFeedback: [...state.submittedFeedback, newFeedback],
          pendingFeedback: state.pendingFeedback.filter(p => p.viewingId !== viewingId),
          currentFeedback: {
            viewingId: null,
            step: 'complete',
          },
        }));
      },

      completeFeedback: (_viewingId: string) => {
        set(() => ({
          currentFeedback: {
            viewingId: null,
            step: 'complete',
          },
        }));
      },

      // Pending management
      addPendingFeedback: (viewingId: string, apartmentId: string) => {
        const dueDate = new Date();
        dueDate.setHours(dueDate.getHours() + 24); // 24 hours from now

        const pendingItem: PendingFeedbackItem = {
          viewingId,
          apartmentId,
          dueDate,
        };

        set((state) => ({
          pendingFeedback: [...state.pendingFeedback, pendingItem],
        }));
      },

      removePendingFeedback: (viewingId: string) => {
        set((state) => ({
          pendingFeedback: state.pendingFeedback.filter(p => p.viewingId !== viewingId),
        }));
      },

      extendDeadline: (viewingId: string, newDueDate: Date) => {
        set((state) => ({
          pendingFeedback: state.pendingFeedback.map(p =>
            p.viewingId === viewingId ? { ...p, dueDate: newDueDate } : p
          ),
        }));
      },

      // Feedback management
      updateFeedback: (feedbackId: string, updates: Partial<Feedback>) => {
        set((state) => ({
          submittedFeedback: state.submittedFeedback.map(f =>
            f.id === feedbackId ? { ...f, ...updates } : f
          ),
        }));
      },

      deleteFeedback: (feedbackId: string) => {
        set((state) => ({
          submittedFeedback: state.submittedFeedback.filter(f => f.id !== feedbackId),
        }));
      },

      // UI state
      setCurrentFeedbackStep: (step: FeedbackState['currentFeedback']['step']) => {
        set((state) => ({
          currentFeedback: {
            ...state.currentFeedback,
            step,
          },
        }));
      },

      clearCurrentFeedback: () => {
        set({
          currentFeedback: {
            viewingId: null,
            step: 'personal',
          },
        });
      },

      // Bulk operations
      exportFeedbackHistory: () => {
        const state = get();
        return {
          feedback: state.submittedFeedback,
          exportedAt: new Date(),
          version: '1.0',
        };
      },

      clearOldFeedback: (olderThan: Date) => {
        set((state) => ({
          submittedFeedback: state.submittedFeedback.filter(f => f.submittedAt >= olderThan),
        }));
      },

      // Helper method to update statistics
      updateFeedbackStats: () => {
        const state = get();
        const totalSubmitted = state.submittedFeedback.length;
        const totalPending = state.pendingFeedback.length;
        const total = totalSubmitted + totalPending;

        if (total === 0) {
          set({
            stats: {
              totalSubmitted: 0,
              averagePersonalRating: 0,
              averageFairnessRating: 0,
              completionRate: 0,
            },
          });
          return;
        }

        const personalRatings = state.submittedFeedback.map(f => f.personal.overallRating);
        const fairnessRatings = state.submittedFeedback.map(f => f.fairness.advertisedAccuracyRating);

        const averagePersonalRating = personalRatings.length > 0
          ? personalRatings.reduce((sum, rating) => sum + rating, 0) / personalRatings.length
          : 0;

        const averageFairnessRating = fairnessRatings.length > 0
          ? fairnessRatings.reduce((sum, rating) => sum + rating, 0) / fairnessRatings.length
          : 0;

        const completionRate = total > 0 ? (totalSubmitted / total) * 100 : 0;

        set({
          stats: {
            totalSubmitted,
            averagePersonalRating: Math.round(averagePersonalRating * 10) / 10,
            averageFairnessRating: Math.round(averageFairnessRating * 10) / 10,
            completionRate: Math.round(completionRate),
          },
        });
      },

      // Selectors
      selectFeedbackForApartment: (apartmentId: string) =>
        get().submittedFeedback.filter(f => f.apartmentId === apartmentId),

      selectFeedbackForViewing: (viewingId: string) =>
        get().submittedFeedback.find(f => f.viewingId === viewingId) || null,

      selectAllSubmittedFeedback: () => get().submittedFeedback,

      selectPendingFeedback: () => get().pendingFeedback,

      selectOverdueFeedback: () => {
        const now = new Date();
        return get().pendingFeedback.filter(p => p.dueDate < now);
      },

      selectFeedbackDueToday: () => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return get().pendingFeedback.filter(p =>
          p.dueDate >= now && p.dueDate < tomorrow
        );
      },

      selectFeedbackStats: () => get().stats,

      selectCompletionRate: () => get().stats.completionRate,

      selectAverageRatings: () => ({
        personal: get().stats.averagePersonalRating,
        fairness: get().stats.averageFairnessRating,
      }),

      selectCurrentFeedbackForm: () => {
        const current = get().currentFeedback;
        if (current.viewingId) {
          return get().selectFeedbackForViewing(current.viewingId);
        }
        return null;
      },

      selectNextPendingFeedback: (): PendingFeedbackItem | null => {
        const pending = get().selectPendingFeedback();
        return pending.length > 0 ? pending[0]! : null;
      },

      selectHasPendingFeedback: () => get().pendingFeedback.length > 0,

      selectHasSubmittedFeedback: () => get().submittedFeedback.length > 0,
    }),
    {
      name: 'renthunt-feedback',
      partialize: (state) => ({
        submittedFeedback: state.submittedFeedback,
        pendingFeedback: state.pendingFeedback,
        stats: state.stats,
      }),
    }
  )
);
