import db, { ArrayUpdate, ArrayRemove } from '../init_db';
import { firestore } from 'firebase-admin/lib/firestore';

/**
 * Adds an alarm to the respective users according to their roles.
 *
 * @param users List of `uid of general users.
 * @param trusted List of `uid`of trusted users. These users won't have to approve the alarm.
 * @param creator `uid` of creator. Alarm is pre-approved for this user
 * @param key document key of the alarm document of this specific alarm
 * @returns [true] if alarm added successfully, returns [false] otherwise
 */

const addUserAlarm = async (
  users: string[],
  trusted: string[],
  creator: string,
  key: string,
): Promise<boolean> => {
  const batch = db.batch();
  users.forEach((uid: string) => {
    const userRef = db.collection('users').doc(uid);
    batch.update(userRef, {
      pending: ArrayUpdate(key),
    });
  });
  const creatorRef = db.collection('users').doc(creator);
  batch.update(creatorRef, {
    ongoing: ArrayUpdate(key),
  });
  trusted.forEach((uid: string) => {
    const userRef = db.collection('users').doc(uid);
    batch.update(userRef, {
      ongoing: ArrayUpdate(key),
    });
  });
  return batch.commit().then(
    () => {
      return true;
    },
    (_error) => false,
  );
};

/**
 * Removes a given alarm from a list of users.
 *
 * @param users List of users from whom we have to remove the alarm
 * @param key Document key of the alarm document
 * @returns [true] if successfully removed, [false] otherwise.
 */

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

/**
 * Gets list of pending and ongoing alarms for a specific user
 *
 * @param uid phone number of the user whose list of alarms to be fetched
 * @returns Map containing list of pending and ongoing alarms.
 */

const getUserAlarm = async (uid: string): Promise<string> => {
  const data = {};
  const userDoc = await db.collection('users').doc(uid).get();
  let pendingDocRefs: firestore.DocumentReference[] = [];
  let ongoingDocRefs: firestore.DocumentReference[] = [];
  userDoc
    .get('pending')
    .forEach((key: string) => pendingDocRefs.push(db.doc('alarms/' + key)));
  userDoc
    .get('ongoing')
    .forEach((key: string) => ongoingDocRefs.push(db.doc('alarms/' + key)));
  let pendingData: (firestore.DocumentData | undefined)[] = [];
  let ongoingData: (firestore.DocumentData | undefined)[] = [];
  if (pendingDocRefs.length != 0) {
    const fetchPending = await db.getAll(...pendingDocRefs);
    fetchPending.forEach((doc) => pendingData.push(doc.data()));
  }
  if (ongoingDocRefs.length != 0) {
    const fetchOngoing = await db.getAll(...ongoingDocRefs);
    fetchOngoing.forEach((doc) => ongoingData.push(doc.data()));
  }
  return JSON.stringify({
    pending: pendingData,
    ongoing: ongoingData,
  });
};

export { addUserAlarm, removeUserAlarm, getUserAlarm };
