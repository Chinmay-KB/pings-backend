import { Request } from 'express';
import { toClass } from 'class-converter';
import { AlarmModel } from '../schema/alarm';
import { addUserAlarm } from './user_alarm';
import db from '../init_db';

const createAlarm = async (res: Request) => {
  const data = toClass(res.body, AlarmModel);
  const key = 'gj3828qijwdsdd';
  const doc = db.collection('alarms').doc(key);
  console.log(res.body);
  await doc.set({
    time: data.time,
    title: data.title,
    users: data.users,
    alarm_tone: data.alarm_tone,
    creator:data.creator,
    trusted:data.trusted
  });
  return JSON.stringify({ success: await addUserAlarm(data.users,data.trusted,data.creator, key) });
};

export default createAlarm;
