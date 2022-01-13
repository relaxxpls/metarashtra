import express from 'express';

import kingdoms from '../data/kingdoms.json';

const router = express.Router();

router.get('/available', (request, response) => {
  response.json(kingdoms);
});

export default router;
