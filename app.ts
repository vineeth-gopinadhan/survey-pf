import { Server } from './server';

function startServer() {
  const server = new Server();
  server.start();
}

startServer();
