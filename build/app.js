"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const basic_auth_1 = __importDefault(require("./util/basic_auth"));
const router_1 = __importDefault(require("./util/router"));
const app = express_1.default();
const PORT = process.env.PORT || 3000;
app.use(cors_1.default(), basic_auth_1.default, express_1.default.urlencoded({ extended: false }));
app.use('/', router_1.default);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
