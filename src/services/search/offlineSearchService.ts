import {getDb} from '@db/client/sqlite';

export const offlineSearchService = {
  async searchProducts(query: string): Promise<string[]> {
    const db = await getDb();
    const [res] = await db.executeSql('SELECT name FROM products_fts WHERE products_fts MATCH ? LIMIT 25', [query]);
    return Array.from({length: res.rows.length}, (_, i) => res.rows.item(i).name);
  },
  async searchDocuments(query: string): Promise<string[]> {
    const db = await getDb();
    const [res] = await db.executeSql('SELECT title FROM documents_fts WHERE documents_fts MATCH ? LIMIT 25', [query]);
    return Array.from({length: res.rows.length}, (_, i) => res.rows.item(i).title);
  }
};
