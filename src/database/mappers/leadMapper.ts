import {Lead} from '@shared/types/models';

export const mapLeadRow = (row: any): Lead => ({
  id: row.id,
  name: row.name,
  company: row.company,
  country: row.country,
  phone: row.phone,
  email: row.email,
  website: row.website,
  event: row.event,
  booth: row.booth,
  city: row.city,
  partnerType: row.partner_type,
  estimatedPurchaseVolume: row.estimated_purchase_volume,
  meetingNotes: row.meeting_notes,
  visitingCardPath: row.visiting_card_path,
  interestedProducts: [],
  interestTags: [],
  businessTags: [],
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  deletedAt: row.deleted_at
});
