import {Lead} from '@shared/types/models';

const escape = (value: string): string => `"${value.replace(/"/g, '""')}"`;

export const leadsToCsv = (leads: Lead[]): string => {
  const header = ['id', 'name', 'company', 'phone', 'email', 'country', 'interestTags', 'businessTags', 'visitingCardPath'];
  const rows = leads.map(lead => [
    lead.id,
    lead.name,
    lead.company ?? '',
    lead.phone ?? '',
    lead.email ?? '',
    lead.country ?? '',
    lead.interestTags.join('|'),
    lead.businessTags.join('|'),
    lead.visitingCardPath ?? ''
  ]);
  return [header, ...rows].map(cols => cols.map(c => escape(String(c))).join(',')).join('\n');
};
