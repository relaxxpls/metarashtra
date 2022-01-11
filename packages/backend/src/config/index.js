import path from 'path';

import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export { default as logger } from './logger';
export { successHandler, errorHandler } from './morgan';
