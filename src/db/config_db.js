import FirebaseAdmin from 'firebase-admin';
import ServiceAccount from '../../private_key.json';

FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(ServiceAccount),
});

export default null;
