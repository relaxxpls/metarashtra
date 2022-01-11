import { Server } from 'socket.io';

import { logger } from './config';

const attachSockets = (httpServer) => {
  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    logger.info('New user connected', { socket: socket.id });

    socket.on('disconnect', () => {
      logger.info('User disconnected', { socket: socket.id });
    });
  });
};

export default attachSockets;
