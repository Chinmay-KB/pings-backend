import express from 'express';
import cors from 'cors';
import auth from './util/basic_auth';
import router from './util/router';

const app = express();

app.use(cors(), auth, express.urlencoded({ extended: false }));

app.use('/', router);

app.listen(3000);
