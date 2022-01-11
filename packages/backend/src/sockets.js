import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { Server } from 'socket.io';

import { logger } from './config';

const attachSockets = async (httpServer) => {
  const io = new Server(httpServer);

  const pubClient = createClient({ url: process.env.REDIS_URL });
  const subClient = pubClient.duplicate();
  await pubClient.connect();
  await subClient.connect();

  io.adapter(createAdapter(pubClient, subClient));

  io.on('connection', (socket) => {
    logger.info('New user connected', { socket: socket.id });

    socket.on('disconnect', () => {
      logger.info('User disconnected', { socket: socket.id });
    });
  });
};

export default attachSockets;
