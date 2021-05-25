"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_converter_1 = require("class-converter");
const alarm_1 = require("../schema/alarm");
const user_alarm_1 = require("./user_alarm");
const uuid_1 = require("uuid");
const init_db_1 = __importDefault(require("../init_db"));
/**
 * Create a new alarm, add it to the alarms collection in firebase and adds it to the documents of each user mentioned
 * @param res body in POST request
 * @returns true if added successfully, false otherwise
 */
const createAlarm = async (res) => {
    const data = class_converter_1.toClass(res.body, alarm_1.AlarmModel);
    const key = uuid_1.v4();
    const doc = init_db_1.default.collection('alarms').doc(key);
    console.log(res.body);
    await doc.set({
        time: data.time,
        title: data.title,
        users: data.users,
        alarm_tone: data.alarm_tone,
        creator: data.creator,
        trusted: data.trusted,
        accepted: [],
        rejected: [],
    });
    return JSON.stringify({
        success: await user_alarm_1.addUserAlarm(data.users, data.trusted, data.creator, key),
    });
};
exports.default = createAlarm;
