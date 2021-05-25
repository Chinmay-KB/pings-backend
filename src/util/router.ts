import { Router } from 'express';
import userLogin from '../db/operations/user_login';
import createAlarm from '../db/operations/create_alarm';
import {
  getUserAlarm,
  acceptInvite,
  rejectInvite,
} from '../db/operations/user_alarm';
import alarmResponse from '../db/operations/answer_alarm_user';
import addTrusted from '../db/operations/trusted_alarms';
import userAlarmResponse from '../db/operations/answer_alarm_user';
const router = Router();

router.get('/', (_req, res) => {
  res.send('Root of API endpoint');
});

router.get('/getAlarmData', async (_req, res) => {
  const data = await getUserAlarm(_req.body['uid']);
  return res.send(data);
});

router.post('/login', async (req, res) =>
  res.send(
    JSON.stringify({
      success: await userLogin(req),
    }),
  ),
);

router.post('/createAlarm', async (req, res) =>
  res.send(await createAlarm(req)),
);

router.post('/alarmInviteResponse', async (req, res) => {
  const accepted: boolean = req.body['accepted'] == 'true';
  res.send(
    accepted
      ? await acceptInvite(req.body['uid'], req.body['key'])
      : await rejectInvite(req.body['uid'], req.body['key']),
  );
});

router.post('/addTrusted', async (req, res) => {
  res.send(
    await addTrusted(req.body['trusted_by_uid'], req.body['trusting_uid']),
  );
});

router.post('/userAlarmResponse', async (req, res) => {
  res.send(
    await userAlarmResponse(
      req.body['uid'],
      req.body['key'],
      req.body['alarm_response'] == 'true',
    ),
  );
});

export default router;
