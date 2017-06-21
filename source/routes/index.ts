import * as express from 'express';
import * as request from 'request';
import config from '../config';

// set up a router
const router = express.Router();

// serve the default home page from the pug template cache('1 month'),
router.get('/', (request, response) => {
  response.render('index', { community: config.community, tokenRequired: true });
});

export default router;
