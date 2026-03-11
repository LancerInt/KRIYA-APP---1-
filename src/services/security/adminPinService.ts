import {getDb} from '@db/client/sqlite';

const pseudoHash = (input: string): string => {
  let h = 0;
  for (let i = 0; i < input.length; i += 1) h = (h << 5) - h + input.charCodeAt(i);
  return String(h >>> 0);
};

export const adminPinService = {
  async setPin(pin: string): Promise<void> {
    const db = await getDb();
    const salt = String(Date.now());
    await db.executeSql('INSERT OR REPLACE INTO admin_pin(id,pin_hash,salt,updated_at) VALUES(1,?,?,datetime(\'now\'))', [pseudoHash(`${pin}:${salt}`), salt]);
  },
  async verifyPin(pin: string): Promise<boolean> {
    const db = await getDb();
    const [res] = await db.executeSql('SELECT pin_hash,salt FROM admin_pin WHERE id=1');
    if (!res.rows.length) return false;
    const row = res.rows.item(0);
    return pseudoHash(`${pin}:${row.salt}`) === row.pin_hash;
  }
};
