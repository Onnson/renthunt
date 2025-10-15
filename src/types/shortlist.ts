// Shortlist and related types
export interface ShortlistItem {
  apartmentId: string;
  createdAt: Date;
  note?: string;
}

export type ShortlistSortOrder = 'recent' | 'compatibility' | 'price-low' | 'price-high';
export type ShortlistViewMode = 'grid' | 'list';

export interface ShortlistExportData {
  items: ShortlistItem[];
  exportedAt: Date;
  version: string;
}
