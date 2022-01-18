import express from 'express';

import kingdomRoute from './kingdom.route';

const router = express.Router();

const routes = [
  {
    path: '/kingdoms',
    route: kingdomRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
