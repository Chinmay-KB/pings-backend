import db from '../init_db';
import { Request } from 'express';
import { toClass ,toPlain } from 'class-converter';
import { UserModel } from '../schema/user';
import checkExists from './check_exists';

const handleUserLogin = async (req: Request) => {
  const userData = toClass(req.body, UserModel);
  return (await checkExists('users', userData.uid))
    ? updateUser(userData)
    : addUser(userData);
};

const addUser = async (user: UserModel): Promise<boolean> => {
  const docRef = db.collection('users').doc(user.uid);
  console.log('add');
  return docRef
    .set({
      uid: user.uid,
      fcm_token: user.fcm_token,
      ongoing: user.ongoing,
      completed: user.completed,
      pending: user.pending,
    })
    .then(
      () => true,
      (_err) => false,
    );
};

const updateUser = async (user: UserModel): Promise<boolean> => {
  const docRef = db.collection('users').doc(user.uid);
  return docRef
    .update({
      fcm_token: user.fcm_token,
    })
    .then(
      () => true,
      (_err) => false,
    );
};

export default handleUserLogin;
