import db from './init_db';
import { Request } from 'express';
import checkExists from './check_exists';

const handleUserLogin = async (req: Request) => {
  const body = req.body;
  return await checkExists('users', body['uid']) ? updateUser(req) : addUser(req);
};

const addUser = async (req: Request): Promise<boolean> => {
  const docRef = db.collection('users').doc(req.body['uid']);
  console.log('add');
  return docRef
    .set({
      uid: req.body['uid'],
      fcm_token: req.body['fcm_token'],
    })
    .then(
      () => true,
      (_err) => false,
    );
};

const updateUser = async (req: Request): Promise<boolean> => {
  const docRef = db.collection('users').doc(req.body['uid']);
  return docRef
    .update({
      fcm_token: req.body['fcm_token'],
    })
    .then(
      () => true,
      (_err) => false,
    );
};

export default handleUserLogin;
