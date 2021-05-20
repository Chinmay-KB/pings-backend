"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_login_1 = __importDefault(require("../db/operations/user_login"));
const create_alarm_1 = __importDefault(require("../db/operations/create_alarm"));
const user_alarm_1 = require("../db/operations/user_alarm");
const router = express_1.Router();
router.get('/', (_req, res) => {
    res.send('Root of API endpoint');
});
router.get('/getAlarmData', async (_req, res) => {
    const data = await user_alarm_1.getUserAlarm(_req.body['uid']);
    return res.send(data);
});
router.post('/login', async (req, res) => res.send(await user_login_1.default(req)));
router.post('/createAlarm', async (req, res) => res.send(await create_alarm_1.default(req)));
exports.default = router;
