import { Request } from 'express';
import { toClass } from 'class-converter';
import { AlarmModel } from '../schema/alarm';
import { addUserAlarm, acceptInvite } from './user_alarm';
import { getTrusted } from './trusted_alarms';
import * as crypto from 'crypto';
import db from '../init_db';

/**
 * Create a new alarm, add it to the alarms collection in firebase and adds it to the documents of each user mentioned
 * @param res body in POST request
 * @returns true if added successfully, false otherwise
 */
const createAlarm = async (res: Request) => {
  const data = toClass(res.body, AlarmModel);
  const key = crypto.randomBytes(21).toString('base64').slice(0, 21);
  const doc = db.collection('alarms').doc(key);
  console.log(res.body);
  const trustedContacts = await getTrusted(data.creator);
  await doc.set({
    time: data.time,
    title: data.title,
    users: data.users,
    alarm_tone: data.alarm_tone,
    creator: data.creator,
    trusted: trustedContacts,
    alarm_accepted: [],
    alarm_rejected: [],
    invite_accepted: trustedContacts,
    invite_rejected: [],
  });
  return JSON.stringify({
    success: await addUserAlarm(data.users, trustedContacts, data.creator, key),
  });
};

export default createAlarm;
