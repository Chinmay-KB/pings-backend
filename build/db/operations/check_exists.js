"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const init_db_1 = __importDefault(require("../init_db"));
const checkExist = async (collection, document) => {
    const docRef = await init_db_1.default.collection(collection).doc(document).get();
    return docRef.exists;
};
exports.default = checkExist;
