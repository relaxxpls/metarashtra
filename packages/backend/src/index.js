import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';

import { logger, successHandler, errorHandler } from './config';

dotenv.config();

const app = express();

// ? Logging middleware
app.use(successHandler);
app.use(errorHandler);

// ? Enable CORS
app.use(cors());
app.options('*', cors());

// ? JWT authentication
app.use(passport.initialize());
// passport.use('jwt', jwtStrategy);

// ? Start the server
app.listen(process.env.PORT, () => {
  logger.info(`Server running at ${process.env.PORT}`);
});
