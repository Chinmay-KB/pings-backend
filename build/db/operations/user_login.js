"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_db_1 = __importDefault(require("../init_db"));
const class_converter_1 = require("class-converter");
const user_1 = require("../schema/user");
const check_exists_1 = __importDefault(require("./check_exists"));
/**
 * Function handling user login. Determines if a user is existing or a new user. Controls flow accordingly.
 *
 * @param req - The body in post request.
 * @returns true if the login is successful. Any error and it returns false.
 */
/// TODO: Change the response into a json response. Add success flag.
const handleUserLogin = async (req) => {
    const userData = class_converter_1.toClass(req.body, user_1.UserModel);
    return (await check_exists_1.default('users', userData.uid))
        ? updateUser(userData)
        : addUser(userData);
};
/**
 * Handles the first time user. Creates a new document for the new user.
 *
 * @param user A class storing user details.
 * @returns true if the login is successful. Any error and it returns false.
 */
const addUser = async (user) => {
    const docRef = init_db_1.default.collection('users').doc(user.uid);
    console.log('add');
    return docRef
        .set({
        uid: user.uid,
        fcm_token: user.fcm_token,
        ongoing: user.ongoing,
        completed: user.completed,
        pending: user.pending,
    })
        .then(() => true, (_err) => false);
};
/**
 * Handles an existing user. Just updates the fcm token of the device user is logging in from.
 *
 * @param user A class storing user details.
 * @returns true if the login is successful. Any error and it returns false.
 */
const updateUser = async (user) => {
    const docRef = init_db_1.default.collection('users').doc(user.uid);
    return docRef
        .update({
        fcm_token: user.fcm_token,
    })
        .then(() => true, (_err) => false);
};
exports.default = handleUserLogin;
