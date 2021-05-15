import { Router } from 'express';
import getData from '../db/operations/get_data';
import userLogin from '../db/operations/user_login';
import createAlarm from '../db/operations/create_alarm';

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

router.post('/createAlarm',async (req, res)=>res.send(await createAlarm(req)));

// router.get('/check', async (req, res) => {
//   const body = req.body;
//   return res.send(await checkExist(body['doc'], body['collection']));
// });

export default router;
