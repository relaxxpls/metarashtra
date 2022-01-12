import http from 'http';

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';

import { logger, successHandler, errorHandler } from './config';
import attachSockets from './sockets';

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

// ? Logging middleware
app.use(successHandler);
app.use(errorHandler);

// ? Enable CORS
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

// ? JWT authentication
app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

// ? Start api server
const APIPort = process.env.API_PORT || 8000;
app.listen(APIPort, () => {
  logger.info(`API server listening on port ${APIPort}.`);
});

// ? Start the websocket server
attachSockets(httpServer);

const SocketPort = process.env.SOCKET_PORT || 8080;
httpServer.listen(SocketPort, () => {
  logger.info(`WebSocket server listening on port ${SocketPort}.`);
});
