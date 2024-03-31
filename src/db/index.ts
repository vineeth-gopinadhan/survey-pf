import { Pool, types, QueryResult } from 'pg';

// ToDo: Move to env
const POSTGRES_USER = 'survey_admin';
const POSTGRES_HOST = '127.0.0.1';
const POSTGRES_DB = 'survey_db';
const POSTGRES_PASSWORD = 'survey_admin';
const POSTGRES_PORT = 15432;
const POSTGRES_MAX_CONN = 5;

class DatabaseManager {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: POSTGRES_USER,
      host: POSTGRES_HOST,
      max: POSTGRES_MAX_CONN,
      database: POSTGRES_DB,
      password: POSTGRES_PASSWORD,
      port: POSTGRES_PORT,
    });
  }

  /**
   * DB Query
   * @param {string} text
   * @param {Array} params
   * @returns {Promise<QueryResult>} Promise object representing query result
   */
  async query(text: string, params: any[]): Promise<QueryResult> {
    try {
      const res = await this.pool.query(text, params);
      return res;
    } catch (err) {
      throw err;
    }
  }
}

export default DatabaseManager;
