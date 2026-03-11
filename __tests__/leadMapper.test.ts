import {mapLeadRow} from '../src/database/mappers/leadMapper';

test('maps db row to lead model', () => {
  const lead = mapLeadRow({id:'l1',name:'Lead 1',created_at:'a',updated_at:'b'});
  expect(lead.id).toBe('l1');
  expect(lead.name).toBe('Lead 1');
});
