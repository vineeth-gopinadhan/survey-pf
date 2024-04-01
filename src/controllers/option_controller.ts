import { Request, Response } from 'express';
import { parseServiceError } from './../utils/error';
import OptionService from '../services/option_service';
import { CustomError, OptionData } from '../interfaces';

class OptionController {
  private optionService: OptionService;

  constructor(service: OptionService) {
    this.optionService = service;
  }

  async createOption(req: Request, res: Response) {
    try {
      const { questionId } = req.params;
      const { image_url, subtitle, skip_to_question, order } = req.body;
      console.log('POST Option Args:', {
        questionId,
        image_url,
        subtitle,
        skip_to_question,
        order,
      });

      const option: OptionData = {
        optionId: -1,
        questionId: parseInt(questionId, 10),
        imageUrl: image_url,
        subtitle,
        skipToQuestion: skip_to_question,
        order,
      };
      await this.optionService.postOption(option);
      res.json({
        status: 'ok',
        message: 'Successfully Posted Option',
      });
      console.log('POST Option API completed successfully ');
    } catch (error) {
      console.error('Error posting option:', error);
      const err: CustomError = { message: 'Internal Error' };
      const { statusCode, message } = parseServiceError(err);
      res.status(statusCode).json({ status: 'nok', error: message });
    }
  }

  async retrieveOptions(req: Request, res: Response) {
    try {
      const { questionId } = req.params;
      console.log('GET Option Args:', {
        questionId,
      });

      const options = await this.optionService.getOptions(
        parseInt(questionId, 10),
      );

      if (options.length == 0) {
        console.error('No options found');
        const err: CustomError = { message: 'Not Found' };
        const { statusCode, message } = parseServiceError(err);
        res.status(statusCode).json({ status: 'nok', error: message });
        return;
      }
      res.json({
        status: 'ok',
        options,
      });
      console.log('GET Option API completed successfully ');
    } catch (error) {
      console.error('Error retrieving option:', error);
      const err: CustomError = { message: 'Internal Error' };
      const { statusCode, message } = parseServiceError(err);
      res.status(statusCode).json({ status: 'nok', error: message });
    }
  }

  async deleteOption(req: Request, res: Response) {
    try {
      const { optionId } = req.params;
      console.log('DEL Option Args:', {
        optionId,
      });

      await this.optionService.deleteOption(
        parseInt(optionId, 10),
      );
      res.json({
        status: 'ok',
        message: 'Successfully Deleted Option',
      });
      console.log('DEL Option API completed successfully ');
    } catch (error) {
      console.error('Error retrieving option:', error);
      const err: CustomError = { message: 'Internal Error' };
      const { statusCode, message } = parseServiceError(err as CustomError);
      res.status(statusCode).json({ status: 'nok', error: message });
    }
  }
}

export default OptionController;
