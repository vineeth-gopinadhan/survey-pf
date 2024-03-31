import { OptionData } from '../interfaces';
import DatabaseManager from './../db';
import Query from '../utils/query';

export default class OptionService {
  private pg: DatabaseManager;

  constructor(db: DatabaseManager) {
    this.pg = db;
  }

  async postOption(option: OptionData) {
    try {
      const reqParam: any[] = [
        option.questionId,
        option.imageUrl,
        option.subtitle,
        option.skipToQuestion,
        option.order,
      ];
      await this.pg.query(Query.Insert_Option, reqParam);
    } catch (err) {
      throw err;
    }
  }
}
