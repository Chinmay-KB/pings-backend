"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlarmModel = void 0;
const class_converter_1 = require("class-converter");
class AlarmModel {
}
__decorate([
    class_converter_1.property()
], AlarmModel.prototype, "time", void 0);
__decorate([
    class_converter_1.property()
], AlarmModel.prototype, "title", void 0);
__decorate([
    class_converter_1.property()
], AlarmModel.prototype, "users", void 0);
__decorate([
    class_converter_1.property()
], AlarmModel.prototype, "alarm_tone", void 0);
__decorate([
    class_converter_1.property()
], AlarmModel.prototype, "creator", void 0);
__decorate([
    class_converter_1.defaultVal([]),
    class_converter_1.property()
], AlarmModel.prototype, "trusted", void 0);
exports.AlarmModel = AlarmModel;
