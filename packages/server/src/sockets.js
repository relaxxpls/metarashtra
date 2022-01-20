import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';
import { Server } from 'socket.io';

import { Battle, FreeRoam } from './events';

const attachSockets = async (httpServer) => {
  const io = new Server(httpServer);

  const pubClient = createClient({ url: process.env.REDIS_URL });
  const subClient = pubClient.duplicate();
  await pubClient.connect();
  await subClient.connect();

  io.adapter(createAdapter(pubClient, subClient));

  io.on('connection', (socket) => {
    socket.on('join', FreeRoam.join(io, socket));
    socket.on('movement', FreeRoam.movement(io, socket));
    socket.on('exit', FreeRoam.exit(io, socket));
    socket.on('disconnect', FreeRoam.exit(io, socket));

    socket.on('battle:request', Battle.request(io, socket));
    socket.on('battle:accept', Battle.accept(io, socket));
    socket.on('battle:reject', Battle.reject(io, socket));
  });
};

export default attachSockets;
