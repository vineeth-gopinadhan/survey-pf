import { Router } from 'express';

class AppRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.setupRoutes();
  }

  private setupRoutes() {
    // Add routes
  }

  getRouter(): Router {
    return this.router;
  }
}

export { AppRouter };
