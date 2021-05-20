"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAlarm = exports.removeUserAlarm = exports.addUserAlarm = void 0;
const init_db_1 = __importStar(require("../init_db"));
/**
 * Adds an alarm to the respective users according to their roles.
 *
 * @param users List of `uid of general users.
 * @param trusted List of `uid`of trusted users. These users won't have to approve the alarm.
 * @param creator `uid` of creator. Alarm is pre-approved for this user
 * @param key document key of the alarm document of this specific alarm
 * @returns [true] if alarm added successfully, returns [false] otherwise
 */
const addUserAlarm = async (users, trusted, creator, key) => {
    const batch = init_db_1.default.batch();
    users.forEach((uid) => {
        const userRef = init_db_1.default.collection('users').doc(uid);
        batch.update(userRef, {
            pending: init_db_1.ArrayUpdate(key),
        });
    });
    const creatorRef = init_db_1.default.collection('users').doc(creator);
    batch.update(creatorRef, {
        ongoing: init_db_1.ArrayUpdate(key),
    });
    trusted.forEach((uid) => {
        const userRef = init_db_1.default.collection('users').doc(uid);
        batch.update(userRef, {
            ongoing: init_db_1.ArrayUpdate(key),
        });
    });
    return batch.commit().then(() => {
        return true;
    }, (_error) => false);
};
exports.addUserAlarm = addUserAlarm;
/**
 * Removes a given alarm from a list of users.
 *
 * @param users List of users from whom we have to remove the alarm
 * @param key Document key of the alarm document
 * @returns [true] if successfully removed, [false] otherwise.
 */
const removeUserAlarm = async (users, key) => {
    const batch = init_db_1.default.batch();
    users.forEach((uid) => {
        const userRef = init_db_1.default.collection('users').doc(uid);
        batch.update(userRef, {
            pending: init_db_1.ArrayRemove(key),
        });
    });
    return batch.commit().then(() => true, (_error) => false);
};
exports.removeUserAlarm = removeUserAlarm;
/**
 * Gets list of pending and ongoing alarms for a specific user
 *
 * @param uid phone number of the user whose list of alarms to be fetched
 * @returns Map containing list of pending and ongoing alarms.
 */
const getUserAlarm = async (uid) => {
    const data = {};
    const userDoc = await init_db_1.default.collection('users').doc(uid).get();
    let pendingDocRefs = [];
    let ongoingDocRefs = [];
    userDoc
        .get('pending')
        .forEach((key) => pendingDocRefs.push(init_db_1.default.doc('alarms/' + key)));
    userDoc
        .get('ongoing')
        .forEach((key) => ongoingDocRefs.push(init_db_1.default.doc('alarms/' + key)));
    let pendingData = [];
    let ongoingData = [];
    if (pendingDocRefs.length != 0) {
        const fetchPending = await init_db_1.default.getAll(...pendingDocRefs);
        fetchPending.forEach((doc) => pendingData.push(doc.data()));
    }
    if (ongoingDocRefs.length != 0) {
        const fetchOngoing = await init_db_1.default.getAll(...ongoingDocRefs);
        fetchOngoing.forEach((doc) => ongoingData.push(doc.data()));
    }
    return JSON.stringify({
        pending: pendingData,
        ongoing: ongoingData,
    });
};
exports.getUserAlarm = getUserAlarm;
