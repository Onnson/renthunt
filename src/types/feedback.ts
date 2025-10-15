// Feedback and related types
export interface PersonalFeedback {
  overallRating: number; // 1-5 scale
  cleanlinessRating: number; // 1-5 scale
  locationRating: number; // 1-5 scale
  valueRating: number; // 1-5 scale
  amenitiesRating: number; // 1-5 scale
  comments?: string;
}

export interface FairnessFeedback {
  advertisedAccuracyRating: number; // 1-5 scale (how accurate was the listing)
  priceFairnessRating: number; // 1-5 scale (was the price fair)
  responsivenessRating: number; // 1-5 scale (how responsive was communication)
  professionalismRating: number; // 1-5 scale (how professional was the process)
  wouldRecommend: boolean;
  suggestions?: string;
}

export interface Feedback {
  id: string;
  viewingId: string;
  apartmentId: string;
  submittedAt: Date;
  personal: PersonalFeedback;
  fairness: FairnessFeedback;
  overallSatisfaction: number; // calculated average
}

export interface FeedbackExportData {
  feedback: Feedback[];
  exportedAt: Date;
  version: string;
}

export interface FeedbackStats {
  totalSubmitted: number;
  averagePersonalRating: number;
  averageFairnessRating: number;
  completionRate: number;
}

export interface PendingFeedbackItem {
  viewingId: string;
  apartmentId: string;
  dueDate: Date;
}

export interface CurrentFeedbackState {
  viewingId: string | null;
  step: 'personal' | 'fairness' | 'complete';
}
