import db, { ArrayUpdate, ArrayRemove } from '../init_db';

const addUserAlarm = async (users: string[],trusted:string[], creator:string, key: string): Promise<boolean> => {
  const batch = db.batch();
  users.forEach((uid: string) => {
    const userRef = db.collection('users').doc(uid);
    batch.update(userRef, {
      pending: ArrayUpdate(key),
    });
  });
  const creatorRef= db.collection('users').doc(creator);
  batch.update(creatorRef,{
    ongoing:ArrayUpdate(key)
  } );
  trusted.forEach((uid: string) => {
    const userRef = db.collection('users').doc(uid);
    batch.update(userRef, {
      ongoing: ArrayUpdate(key),
    });
  });
  return batch.commit().then(
    () => {
      return true
    },
    (_error) => false,
  );
};

const removeUserAlarm = async (
  users: string[],
  key: string,
): Promise<boolean> => {
  const batch = db.batch();
  users.forEach((uid: string) => {
    const userRef = db.collection('users').doc(uid);
    batch.update(userRef, {
      pending: ArrayRemove(key),
    });
  });
  return batch.commit().then(
    () => true,
    (_error) => false,
  );
};

export { addUserAlarm, removeUserAlarm };
