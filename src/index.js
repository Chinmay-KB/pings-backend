import cors from 'cors';
import express from 'express';
import logger from 'morgan';
import router from './util/router.js';
import auth from './util/basic_auth.js';

const app = express();

// enabling CORS for all requests
app.use(cors());
app.use(logger('dev'));

// Basic auth, with dummy credentials for now
// TODO Use proper credentials
app.use(auth);

app.use('/', router);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 3000');
});
