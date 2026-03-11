import {getDb} from '@db/client/sqlite';
import {Recommendation} from '@shared/types/models';

export const solutionRepository = {
  async listRecommendations(): Promise<Recommendation[]> {
    const db = await getDb();
    const [res] = await db.executeSql(`
      SELECT s.crop, s.problem, GROUP_CONCAT(p.name) as products
      FROM solutions s
      JOIN solution_recommendations sr ON sr.solution_id = s.id
      JOIN products p ON p.id = sr.product_id
      GROUP BY s.id
      ORDER BY s.crop, s.problem
    `);
    return Array.from({length: res.rows.length}, (_, i) => {
      const row = res.rows.item(i);
      return {crop: row.crop, problem: row.problem, products: String(row.products).split(',')};
    });
  }
};
