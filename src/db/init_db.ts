import FirebaseAdmin, { initializeApp } from 'firebase-admin';
// import * as process.env from '../private_key.json';
import dotenv from 'dotenv';

dotenv.config();

const params = {
  type: process.env.type,
  projectId: process.env.project_id,
  privateKeyId: process.env.private_key_id,
  privateKey: process.env.private_key!.replace(/\\n/g, '\n'),
  clientEmail: process.env.client_email,
  clientId: process.env.client_id,
  authUri: process.env.auth_uri,
  tokenUri: process.env.token_uri,
  authProviderX509CertUrl: process.env.auth_provider_x509_cert_url,
  clientC509CertUrl: process.env.client_x509_cert_url,
};

const app = FirebaseAdmin.initializeApp({
  credential: FirebaseAdmin.credential.cert(params),
});

export default app.firestore();
export const ArrayUpdate = FirebaseAdmin.firestore.FieldValue.arrayUnion;
export const ArrayRemove = FirebaseAdmin.firestore.FieldValue.arrayRemove;
