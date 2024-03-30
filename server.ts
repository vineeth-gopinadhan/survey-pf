import express, { Express } from 'express';
import { AppRouter } from './src/routes';

class Server {
  app: Express;
  port: number | string;
  router: AppRouter;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;
    this.router = new AppRouter();
  }

  async createApp(): Promise<void> {
    this.app.use(express.json());
    this.app.use(this.router.getRouter());
  }

  async start(): Promise<void> {
    try {
      await this.createApp();
      this.app.listen(this.port, () => {
        console.info(`Server is running on http://localhost:${this.port}`);
      });
    } catch (error) {
      console.error('Error starting the server:', error);
    }
  }
}

export { Server };
