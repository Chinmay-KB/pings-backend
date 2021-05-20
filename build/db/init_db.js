"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayRemove = exports.ArrayUpdate = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// import * as process.env from '../private_key.json';
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const params = {
    type: process.env.type,
    projectId: process.env.project_id,
    privateKeyId: process.env.private_key_id,
    privateKey: process.env.private_key.replace(/\\n/g, '\n'),
    clientEmail: process.env.client_email,
    clientId: process.env.client_id,
    authUri: process.env.auth_uri,
    tokenUri: process.env.token_uri,
    authProviderX509CertUrl: process.env.auth_provider_x509_cert_url,
    clientC509CertUrl: process.env.client_x509_cert_url,
};
const app = firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(params),
});
exports.default = app.firestore();
exports.ArrayUpdate = firebase_admin_1.default.firestore.FieldValue.arrayUnion;
exports.ArrayRemove = firebase_admin_1.default.firestore.FieldValue.arrayRemove;
