// Viewings and related types
export interface Viewing {
  id: string;
  apartmentId: string;
  dateTime: Date;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeSlot {
  id: string;
  apartmentId: string;
  dateTime: Date;
  duration: number; // minutes
  isAvailable: boolean;
  isBooked: boolean;
}

export interface ViewingExportData {
  viewings: Viewing[];
  exportedAt: Date;
  version: string;
}

export interface ViewingPreferences {
  sameDayPriority: boolean;
  preferredTimes: ('morning' | 'afternoon' | 'evening')[];
  maxDistance: number;
}

export interface BusinessHours {
  mondayToThursday: { start: string; end: string };
  friday: { start: string; end: string };
  weekend: boolean;
}
