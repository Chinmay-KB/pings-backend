import db from '../init_db';

const docRef = db.collection('users');
const getData = async (): Promise<string> => {
  const snapshot = await docRef.get();
  return JSON.stringify(snapshot.docs.map((doc) => doc.data()));
};

export default getData;
