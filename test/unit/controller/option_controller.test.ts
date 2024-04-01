import { Request, Response } from 'express';
import OptionController from './../../../src/controllers/option_controller';
import OptionService from './../../../src/services/option_service';
import { OptionData } from '../../../src/interfaces';
import sinon from 'sinon';

describe('OptionController', () => {
  describe('createOption', () => {
    let optionService: sinon.SinonStubbedInstance<OptionService>;
    let optionController: OptionController;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
      optionService = sinon.createStubInstance(OptionService);
      optionController = new OptionController(optionService);
      req = {
        params: {
          questionId: '1',
        },
        body: {
          image_url: 'image-url',
          subtitle: 'subtitle',
          skip_to_question: 2,
          order: 1,
        },
      };
      res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should call optionService.postOption with correct option data', async () => {
      await optionController.createOption(req as Request, res as Response);

      sinon.assert.calledOnceWithExactly(optionService.postOption, {
        optionId: -1,
        questionId: 1,
        imageUrl: 'image-url',
        subtitle: 'subtitle',
        skipToQuestion: 2,
        order: 1,
      });
    });

    it('should send response with status "ok" when option is successfully posted', async () => {
      await optionController.createOption(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({
        status: 'ok',
        message: 'Successfully Posted Option',
      });
    });

    it('should send response with status "nok" and error message when error occurs during posting option', async () => {
      const errorMessage = 'Internal Error';
      optionService.postOption.rejects(new Error(errorMessage));

      await optionController.createOption(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'nok',
        error: 'Internal Server Error',
      });
    });
  });

  describe('retrieveOptions', () => {
    it('should return "Not Found" if no options are found', async () => {
      const req: Partial<Request> = {
        params: { questionId: '1' },
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const optionServiceMock: jest.Mocked<OptionService> = {
        getOptions: jest.fn().mockResolvedValue([]),
      } as any;
      const optionController = new OptionController(optionServiceMock);

      await optionController.retrieveOptions(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        status: 'nok',
        error: 'Not Found',
      });
    });

    it('should return options if found', async () => {
      const mockOptions: OptionData[] = [
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

      const req: Partial<Request> = {
        params: { questionId: '1' },
      };
      const res: Partial<Response> = {
        json: jest.fn(),
      };
      const optionServiceMock: jest.Mocked<OptionService> = {
        getOptions: jest.fn().mockResolvedValue(mockOptions),
      } as any;
      const optionController = new OptionController(optionServiceMock);

      await optionController.retrieveOptions(req as Request, res as Response);

      expect(res.json).toHaveBeenCalledWith({
        status: 'ok',
        options: mockOptions,
      });
    });

    it('should return "Internal Error" if an error occurs', async () => {
      const req: Partial<Request> = {
        params: { questionId: '1' },
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const optionServiceMock: jest.Mocked<OptionService> = {
        getOptions: jest.fn().mockRejectedValue(new Error('Database error')),
      } as any;
      const optionController = new OptionController(optionServiceMock);

      await optionController.retrieveOptions(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        status: 'nok',
        error: 'Internal Server Error',
      });
    });
  });
});
