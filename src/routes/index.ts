import { Router } from 'express';
import OptionService from '../services/option_service';
import OptionController from '../controllers/option_controller';
import DatabaseManager from '../db';

class AppRouter {
  router: Router;
  optionController: OptionController;
  optionService: OptionService;
  pg: DatabaseManager;

  constructor() {
    this.router = Router();
    this.pg = new DatabaseManager();
    this.optionService = new OptionService(this.pg);
    this.optionController = new OptionController(this.optionService);
    this.setupRoutes();
  }

  private setupRoutes() {
    // ToDo: Add proper validations
    // ToDo: Add DB validation on questionId, skip_to_question
    this.router.post(
      '/v1/questions/:questionId/option',
      this.optionController.createOption.bind(this.optionController),
    );
    this.router.get(
      '/v1/questions/:questionId/options',
      this.optionController.retrieveOptions.bind(this.optionController),
    );
    this.router.delete(
      '/v1/options/:optionId',
      this.optionController.deleteOption.bind(this.optionController),
    );
    // ToDo: Add DB validation on questionId, optionId, skip_to_question
    this.router.put(
      '/v1/questions/:questionId/options/:optionId',
      this.optionController.updateOption.bind(this.optionController),
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export { AppRouter };
