import {getDb} from '@db/client/sqlite';
import {Product} from '@shared/types/models';

export const productRepository = {
  async list(): Promise<Product[]> {
    const db = await getDb();
    const [res] = await db.executeSql('SELECT * FROM products ORDER BY name ASC');
    const output: Product[] = [];
    for (let i = 0; i < res.rows.length; i += 1) {
      const row = res.rows.item(i);
      output.push({
        id: row.id,
        categoryId: row.category_id,
        name: row.name,
        formulationType: row.formulation_type,
        activeIngredient: row.active_ingredient,
        concentration: row.concentration,
        applicationMethod: row.application_method,
        repeatInterval: row.repeat_interval,
        modeOfAction: row.mode_of_action,
        compatibility: row.compatibility,
        uniqueStrainInfo: row.unique_strain_info,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      });
    }
    return output;
  }
};
