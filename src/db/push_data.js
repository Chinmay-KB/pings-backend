import FirebaseAdmin from 'firebase-admin';
// eslint-disable-next-line no-unused-vars
import ConfigDb from './config_db.js';

const db = FirebaseAdmin.firestore();
const docRef = db.collection('users').doc();

async function addData() {
  await docRef.set({
    first: 'Yes',
  });
  return 'pushed';
}

export default addData;
