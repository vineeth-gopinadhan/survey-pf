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
    this.router.post(
      '/v1/questions/:questionId/option',
      this.optionController.createOption.bind(this.optionController),
    );
    this.router.get(
      '/v1/questions/:questionId/option',
      this.optionController.retrieveOptions.bind(this.optionController),
    );
  }

  getRouter(): Router {
    return this.router;
  }
}

export { AppRouter };
