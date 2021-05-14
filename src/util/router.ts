import { Router } from 'express';
import getData from '../db/get_data';
import userLogin from '../db/user_login';
import checkExist from '../db/check_exists';

const router = Router();

router.get('/', (_req, res) => {
  res.send('Root of API endpoint');
});

router.get('/data', async (_req, res) => {
  const data = await getData();
  console.log();
  return res.send(data);
});

router.post('/login', async (req, res) => res.send(await userLogin(req)));

router.get('/check', async (req, res) => {
  const body = req.body;
  return res.send(await checkExist(body['doc'], body['collection']));
});

export default router;
