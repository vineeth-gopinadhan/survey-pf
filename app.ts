import { Server } from './server';

async function startServer() {
  const server = new Server();
  await server.start();
}

startServer();
