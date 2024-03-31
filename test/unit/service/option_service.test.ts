import OptionService from './../../../src/services/option_service';
import DatabaseManager from './../../../src/db';
import Query from './../../../src/utils/query';
import { OptionData } from '../../../src/interfaces';
import sinon from 'sinon';

describe('OptionService', () => {
  let db: DatabaseManager;
  let optionService: OptionService;
  let queryStub: any;

  beforeEach(() => {
    db = new DatabaseManager();
    optionService = new OptionService(db);
    queryStub = sinon.stub(db, 'query');
  });

  afterEach(() => {
    queryStub.restore();
  });

  describe('postOption', () => {
    it('should call pg.query with correct parameters', async () => {
      const option: OptionData = {
        optionId: -1,
        questionId: 1,
        imageUrl: 'image-url',
        subtitle: 'subtitle',
        skipToQuestion: 2,
        order: 1,
      };

      await optionService.postOption(option);

      sinon.assert.calledOnceWithExactly(queryStub, Query.Insert_Option, [
        option.questionId,
        option.imageUrl,
        option.subtitle,
        option.skipToQuestion,
        option.order,
      ]);
    });

    it('should throw error if pg.query throws error', async () => {
      const option: OptionData = {
        optionId: -1,
        questionId: 1,
        imageUrl: 'image-url',
        subtitle: 'subtitle',
        skipToQuestion: 2,
        order: 1,
      };

      const errorMessage = 'Database error';
      queryStub.rejects(new Error(errorMessage));

      await expect(optionService.postOption(option)).rejects.toThrow(
        errorMessage,
      );
    });
  });
});
