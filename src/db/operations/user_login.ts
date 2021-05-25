import db from '../init_db';
import { Request } from 'express';
import { toClass, toPlain } from 'class-converter';
import { UserModel } from '../schema/user';
import checkExists from './check_exists';

/**
 * Function handling user login. Determines if a user is existing or a new user. Controls flow accordingly.
 *
 * @param req - The body in post request.
 * @returns true if the login is successful. Any error and it returns false.
 */

/// TODO: Change the response into a json response. Add success flag.
const handleUserLogin = async (req: Request) => {
  const userData = toClass(req.body, UserModel);
  return (await checkExists('users', userData.uid))
    ? updateUser(userData)
    : addUser(userData);
};

/**
 * Handles the first time user. Creates a new document for the new user.
 *
 * @param user A class storing user details.
 * @returns true if the login is successful. Any error and it returns false.
 */

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
      trusted_by:user.trusted_by,
      trusting:user.trusting, 
      name:user.name
    })
    .then(
      () => true,
      (_err) => false,
    );
};

/**
 * Handles an existing user. Just updates the fcm token of the device user is logging in from.
 *
 * @param user A class storing user details.
 * @returns true if the login is successful. Any error and it returns false.
 */

const updateUser = async (user: UserModel): Promise<boolean> => {
  const docRef = db.collection('users').doc(user.uid);
  return docRef
    .update({
      fcm_token: user.fcm_token,
      name:user.name
    })
    .then(
      () => true,
      (_err) => false,
    );
};

export default handleUserLogin;
