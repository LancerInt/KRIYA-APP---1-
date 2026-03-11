import SQLite from 'react-native-sqlite-storage';
import {migration001} from '../migrations/001_initial';

SQLite.enablePromise(true);
let dbInstance: SQLite.SQLiteDatabase | null = null;

const splitStatements = (sql: string): string[] =>
  sql
    .split(';')
    .map(stmt => stmt.trim())
    .filter(Boolean)
    .map(stmt => `${stmt};`);

export const getDb = async (): Promise<SQLite.SQLiteDatabase> => {
  if (dbInstance) return dbInstance;
  dbInstance = await SQLite.openDatabase({name: 'biodesk.db', location: 'default'});
  return dbInstance;
};

export const runMigrations = async (): Promise<void> => {
  const db = await getDb();
  await db.executeSql('CREATE TABLE IF NOT EXISTS app_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL);');
  const [rows] = await db.executeSql("SELECT value FROM app_meta WHERE key='schema_version';");
  if (rows.rows.length > 0) return;
  for (const stmt of splitStatements(migration001)) {
    await db.executeSql(stmt);
  }
  await db.executeSql("INSERT INTO app_meta(key,value,updated_at) VALUES('schema_version','1',datetime('now')); ");
};
