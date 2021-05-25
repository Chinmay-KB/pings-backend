import db, { ArrayUpdate, ArrayRemove } from '../init_db';

const userAlarmResponse = async (
  uid: string,
  key: string,
  alarmResponse: boolean,
) => {
  const userRef = db.collection('users').doc(uid);
  const batch = db.batch();
  batch.update(userRef, {
    ongoing: ArrayRemove(key),
    completed: ArrayUpdate(key),
  });
  const alarmRef = db.collection('alarms').doc(key);
  batch.update(
    alarmRef,
    alarmResponse
      ? {
          alarm_accepted: ArrayUpdate(uid),
        }
      : {
          alarm_rejected: ArrayUpdate(uid),
        },
  );
  return batch.commit().then(
    () =>
      JSON.stringify({
        success: true,
        message: 'Alarm Invite ' + alarmResponse ? 'accepted' : 'declined',
      }),
    (_err) =>
      JSON.stringify({
        success: false,
        message: 'Error',
      }),
  );
};

export default userAlarmResponse;
