import express from 'express';
import cors from 'cors';
import auth from './util/basic_auth';
import router from './util/router';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(), auth, express.urlencoded({ extended: false }));

app.use('/', router);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
