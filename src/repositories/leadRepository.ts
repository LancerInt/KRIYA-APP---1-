import {getDb} from '@db/client/sqlite';
import {Lead} from '@shared/types/models';

export const leadRepository = {
  async list(): Promise<Lead[]> {
    const db = await getDb();
    const [res] = await db.executeSql('SELECT * FROM leads WHERE deleted_at IS NULL ORDER BY created_at DESC');
    const leads: Lead[] = [];
    for (let i = 0; i < res.rows.length; i += 1) {
      const row = res.rows.item(i);
      leads.push({
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
    }
    return leads;
  },
  async upsert(lead: Lead): Promise<void> {
    const db = await getDb();
    await db.executeSql(
      `INSERT OR REPLACE INTO leads (id,name,company,country,phone,email,website,event,booth,city,partner_type,country_of_operation,estimated_purchase_volume,meeting_notes,visiting_card_path,created_at,updated_at)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        lead.id,
        lead.name,
        lead.company ?? null,
        lead.country ?? null,
        lead.phone ?? null,
        lead.email ?? null,
        lead.website ?? null,
        lead.event ?? null,
        lead.booth ?? null,
        lead.city ?? null,
        lead.partnerType ?? null,
        lead.country ?? null,
        lead.estimatedPurchaseVolume ?? null,
        lead.meetingNotes ?? null,
        lead.visitingCardPath ?? null,
        lead.createdAt,
        lead.updatedAt
      ]
    );
  }
};
