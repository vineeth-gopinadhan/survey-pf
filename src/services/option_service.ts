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

  async getOptions(questionId: number) {
    try {
      const reqParam: any[] = [questionId];
      let options: OptionData[] = [];
      const result = await this.pg.query(Query.Get_Options, reqParam);
      if (result && result.rows) {
        options = result.rows as OptionData[];
      }
      return options;
    } catch (err) {
      throw err;
    }
  }

  async deleteOption(optionId: number) {
    try {
      const reqParam: any[] = [optionId];
      await this.pg.query(Query.Delete_Option, reqParam);
    } catch (err) {
      throw err;
    }
  }

  async updateOption(option: OptionData) {
    try {
      const reqParam: any[] = [
        option.optionId,
        option.questionId,
        option.imageUrl,
        option.subtitle,
        option.skipToQuestion,
        option.order,
      ];
      await this.pg.query(Query.Update_Option, reqParam);
    } catch (err) {
      throw err;
    }
  }
}
