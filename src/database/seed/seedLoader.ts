import productsSeed from '../../../data/seed/products.json';
import techSeed from '../../../data/seed/technology.json';
import solutionsSeed from '../../../data/seed/solutions.json';
import {getDb} from '@db/client/sqlite';

const now = () => new Date().toISOString();

export const seedDatabase = async (): Promise<void> => {
  const db = await getDb();
  const [seedVersion] = await db.executeSql("SELECT value FROM app_meta WHERE key='seed_version';");
  if (seedVersion.rows.length > 0 && seedVersion.rows.item(0).value === '1') return;

  for (const c of productsSeed.categories) {
    await db.executeSql('INSERT OR IGNORE INTO product_categories(id,name,created_at,updated_at) VALUES(?,?,?,?)', [c.id, c.name, now(), now()]);
  }

  const categoryByIndex = ['cat-botanical','cat-botanical','cat-microbial','cat-stimulants','cat-fertilizers','cat-substrates'];
  for (const [idx, name] of productsSeed.products.entries()) {
    const bucket = idx < 17 ? 0 : idx < 26 ? 2 : idx < 32 ? 3 : idx < 40 ? 4 : 5;
    const categoryId = categoryByIndex[bucket];
    await db.executeSql('INSERT OR IGNORE INTO products(id,category_id,name,created_at,updated_at) VALUES(?,?,?,?,?)', [`prod-${idx + 1}`, categoryId, name, now(), now()]);
  }

  for (const t of techSeed as Array<{id: string; name: string; description: string}>) {
    await db.executeSql('INSERT OR IGNORE INTO technologies(id,name,description,created_at,updated_at) VALUES(?,?,?,?,?)', [t.id, t.name, t.description, now(), now()]);
  }

  for (const [index, s] of (solutionsSeed as Array<{crop: string; problem: string; products: string[]}>).entries()) {
    const solId = `sol-${index + 1}`;
    await db.executeSql('INSERT OR IGNORE INTO solutions(id,crop,problem,created_at,updated_at) VALUES(?,?,?,?,?)', [solId, s.crop, s.problem, now(), now()]);
  }
  await db.executeSql("INSERT OR REPLACE INTO app_meta(key,value,updated_at) VALUES('seed_version','1',datetime('now')); ");
};
