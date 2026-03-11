export type UUID = string;

export interface Product {
  id: UUID;
  categoryId: UUID;
  name: string;
  formulationType?: string;
  activeIngredient?: string;
  concentration?: string;
  applicationMethod?: string;
  repeatInterval?: string;
  modeOfAction?: string;
  compatibility?: string;
  uniqueStrainInfo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  id: UUID;
  name: string;
  company?: string;
  country?: string;
  phone?: string;
  email?: string;
  website?: string;
  city?: string;
  event?: string;
  booth?: string;
  interestedProducts: string[];
  interestTags: string[];
  businessTags: string[];
  partnerType?: string;
  estimatedPurchaseVolume?: string;
  meetingNotes?: string;
  visitingCardPath?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface Meeting {
  id: UUID;
  leadId?: UUID;
  title: string;
  notes: string;
  meetingDateTime: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface Recommendation {
  crop: string;
  problem: string;
  products: string[];
}
