import {leadsToCsv} from '../src/services/export/csvExportService';

test('creates CSV with header and quoted values', () => {
  const csv = leadsToCsv([{id:'1',name:'A',company:'B',country:'IN',phone:'1',email:'a@b.com',website:'',city:'',event:'',booth:'',interestedProducts:[],interestTags:['Microbials'],businessTags:['Distributor'],createdAt:'',updatedAt:''}]);
  expect(csv.split('\n')[0]).toContain('id');
  expect(csv).toContain('"Microbials"');
});
