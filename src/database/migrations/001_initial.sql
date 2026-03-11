PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS app_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS admin_pin (
  id INTEGER PRIMARY KEY CHECK(id = 1),
  pin_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS product_categories (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL,
  name TEXT NOT NULL,
  formulation_type TEXT,
  active_ingredient TEXT,
  concentration TEXT,
  application_method TEXT,
  repeat_interval TEXT,
  key_benefits TEXT,
  mode_of_action TEXT,
  compatibility TEXT,
  unique_strain_info TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(category_id) REFERENCES product_categories(id)
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_name ON products(name);

CREATE TABLE IF NOT EXISTS product_pack_sizes (id TEXT PRIMARY KEY, product_id TEXT NOT NULL, pack_size TEXT NOT NULL, created_at TEXT NOT NULL, FOREIGN KEY(product_id) REFERENCES products(id));
CREATE TABLE IF NOT EXISTS product_crops (id TEXT PRIMARY KEY, product_id TEXT NOT NULL, crop_name TEXT NOT NULL, FOREIGN KEY(product_id) REFERENCES products(id));
CREATE TABLE IF NOT EXISTS product_pests (id TEXT PRIMARY KEY, product_id TEXT NOT NULL, pest_name TEXT NOT NULL, FOREIGN KEY(product_id) REFERENCES products(id));
CREATE TABLE IF NOT EXISTS product_dosages (id TEXT PRIMARY KEY, product_id TEXT NOT NULL, crop_name TEXT NOT NULL, dosage TEXT NOT NULL, stage TEXT, FOREIGN KEY(product_id) REFERENCES products(id));
CREATE TABLE IF NOT EXISTS product_benefits (id TEXT PRIMARY KEY, product_id TEXT NOT NULL, benefit TEXT NOT NULL, FOREIGN KEY(product_id) REFERENCES products(id));
CREATE TABLE IF NOT EXISTS product_media (id TEXT PRIMARY KEY, product_id TEXT NOT NULL, media_type TEXT NOT NULL, relative_path TEXT NOT NULL, thumbnail_path TEXT, FOREIGN KEY(product_id) REFERENCES products(id));
CREATE TABLE IF NOT EXISTS product_documents (id TEXT PRIMARY KEY, product_id TEXT NOT NULL, document_id TEXT NOT NULL);

CREATE TABLE IF NOT EXISTS technologies (id TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS technology_media (id TEXT PRIMARY KEY, technology_id TEXT NOT NULL, media_type TEXT NOT NULL, relative_path TEXT NOT NULL, FOREIGN KEY(technology_id) REFERENCES technologies(id));

CREATE TABLE IF NOT EXISTS kriya_sections (id TEXT PRIMARY KEY, section_key TEXT UNIQUE NOT NULL, title TEXT NOT NULL, body TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS kriya_media (id TEXT PRIMARY KEY, section_id TEXT NOT NULL, media_type TEXT NOT NULL, relative_path TEXT NOT NULL, FOREIGN KEY(section_id) REFERENCES kriya_sections(id));

CREATE TABLE IF NOT EXISTS solutions (id TEXT PRIMARY KEY, crop TEXT NOT NULL, problem TEXT NOT NULL, metadata_json TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS solution_recommendations (id TEXT PRIMARY KEY, solution_id TEXT NOT NULL, product_id TEXT NOT NULL, FOREIGN KEY(solution_id) REFERENCES solutions(id), FOREIGN KEY(product_id) REFERENCES products(id));

CREATE TABLE IF NOT EXISTS documents (id TEXT PRIMARY KEY, title TEXT NOT NULL, type TEXT NOT NULL, related_product_id TEXT, relative_path TEXT NOT NULL, searchable_summary TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, FOREIGN KEY(related_product_id) REFERENCES products(id));
CREATE TABLE IF NOT EXISTS document_tags (id TEXT PRIMARY KEY, document_id TEXT NOT NULL, tag TEXT NOT NULL, FOREIGN KEY(document_id) REFERENCES documents(id));

CREATE TABLE IF NOT EXISTS videos (id TEXT PRIMARY KEY, title TEXT NOT NULL, category TEXT NOT NULL, relative_path TEXT NOT NULL, thumbnail_path TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS video_tags (id TEXT PRIMARY KEY, video_id TEXT NOT NULL, tag TEXT NOT NULL, FOREIGN KEY(video_id) REFERENCES videos(id));

CREATE TABLE IF NOT EXISTS leads (id TEXT PRIMARY KEY, name TEXT NOT NULL, company TEXT, country TEXT, phone TEXT, email TEXT, website TEXT, event TEXT, booth TEXT, city TEXT, partner_type TEXT, country_of_operation TEXT, estimated_purchase_volume TEXT, meeting_notes TEXT, visiting_card_path TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, deleted_at TEXT);
CREATE TABLE IF NOT EXISTS lead_interested_products (id TEXT PRIMARY KEY, lead_id TEXT NOT NULL, product_id TEXT NOT NULL, FOREIGN KEY(lead_id) REFERENCES leads(id));
CREATE TABLE IF NOT EXISTS lead_interest_tags (id TEXT PRIMARY KEY, lead_id TEXT NOT NULL, tag TEXT NOT NULL, FOREIGN KEY(lead_id) REFERENCES leads(id));
CREATE TABLE IF NOT EXISTS lead_business_tags (id TEXT PRIMARY KEY, lead_id TEXT NOT NULL, tag TEXT NOT NULL, FOREIGN KEY(lead_id) REFERENCES leads(id));

CREATE TABLE IF NOT EXISTS meetings (id TEXT PRIMARY KEY, lead_id TEXT, title TEXT NOT NULL, notes TEXT NOT NULL, meeting_datetime TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, deleted_at TEXT, FOREIGN KEY(lead_id) REFERENCES leads(id));
CREATE TABLE IF NOT EXISTS meeting_attachments (id TEXT PRIMARY KEY, meeting_id TEXT NOT NULL, relative_path TEXT NOT NULL, attachment_type TEXT NOT NULL, FOREIGN KEY(meeting_id) REFERENCES meetings(id));

CREATE TABLE IF NOT EXISTS media_packs (id TEXT PRIMARY KEY, name TEXT NOT NULL, version TEXT NOT NULL, manifest_path TEXT NOT NULL, imported_at TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS import_jobs (id TEXT PRIMARY KEY, job_type TEXT NOT NULL, status TEXT NOT NULL, payload_json TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL);

CREATE VIRTUAL TABLE IF NOT EXISTS products_fts USING fts5(product_id UNINDEXED, name, active_ingredient, crops, pests, category, key_benefits);
CREATE VIRTUAL TABLE IF NOT EXISTS documents_fts USING fts5(document_id UNINDEXED, title, type, tags, related_product_name, searchable_summary);

CREATE TRIGGER IF NOT EXISTS products_ai AFTER INSERT ON products BEGIN
  INSERT INTO products_fts(product_id,name,active_ingredient,crops,pests,category,key_benefits)
  VALUES (NEW.id, NEW.name, COALESCE(NEW.active_ingredient,''), '', '', (SELECT name FROM product_categories WHERE id = NEW.category_id), COALESCE(NEW.key_benefits,''));
END;
CREATE TRIGGER IF NOT EXISTS products_ad AFTER DELETE ON products BEGIN
  DELETE FROM products_fts WHERE product_id = OLD.id;
END;
CREATE TRIGGER IF NOT EXISTS products_au AFTER UPDATE ON products BEGIN
  DELETE FROM products_fts WHERE product_id = OLD.id;
  INSERT INTO products_fts(product_id,name,active_ingredient,crops,pests,category,key_benefits)
  VALUES (NEW.id, NEW.name, COALESCE(NEW.active_ingredient,''), '', '', (SELECT name FROM product_categories WHERE id = NEW.category_id), COALESCE(NEW.key_benefits,''));
END;
