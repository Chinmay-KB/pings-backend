import { Router } from 'express';
import userLogin from '../db/operations/user_login';
import createAlarm from '../db/operations/create_alarm';
import { getUserAlarm } from '../db/operations/user_alarm';
const router = Router();

router.get('/', (_req, res) => {
  res.send('Root of API endpoint');
});

router.get('/getAlarmData', async (_req, res) => {
  const data = await getUserAlarm(_req.body['uid']);
  return res.send(data);
});

router.post('/login', async (req, res) => res.send(await userLogin(req)));

router.post('/createAlarm', async (req, res) =>
  res.send(await createAlarm(req)),
);

export default router;
