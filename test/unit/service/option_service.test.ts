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

  describe('getOptions', () => {
    it('should return an empty array if no options are found', async () => {
      const pgMock: jest.Mocked<DatabaseManager> = {
        query: jest.fn().mockResolvedValue({ rows: [] }),
      } as any;

      const optionService = new OptionService(pgMock);

      const questionId = 1;
      const options = await optionService.getOptions(questionId);

      expect(options).toEqual([]);
      expect(pgMock.query).toHaveBeenCalledWith(Query.Get_Options, [
        questionId,
      ]);
    });

    it('should return options if found', async () => {
      const mockOptionData: OptionData[] = [
        {
          optionId: 1,
          questionId: 1,
          imageUrl: 'image1',
          subtitle: 'subtitle1',
          skipToQuestion: 8,
          order: 1,
        },
        {
          optionId: 2,
          questionId: 1,
          imageUrl: 'image2',
          subtitle: 'subtitle2',
          skipToQuestion: 9,
          order: 2,
        },
      ];

      const pgMock: jest.Mocked<DatabaseManager> = {
        query: jest.fn().mockResolvedValue({ rows: mockOptionData }),
      } as any;

      const optionService = new OptionService(pgMock);

      const questionId = 1;
      const options = await optionService.getOptions(questionId);

      expect(options).toEqual(mockOptionData);
      expect(pgMock.query).toHaveBeenCalledWith(Query.Get_Options, [
        questionId,
      ]);
    });

    it('should throw an error if database query fails', async () => {
      const pgMock: jest.Mocked<DatabaseManager> = {
        query: jest.fn().mockRejectedValue(new Error('Database error')),
      } as any;

      const optionService = new OptionService(pgMock);

      const questionId = 1;
      await expect(optionService.getOptions(questionId)).rejects.toThrow(
        'Database error',
      );
      expect(pgMock.query).toHaveBeenCalledWith(Query.Get_Options, [
        questionId,
      ]);
    });
  });
});
