"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const linkSchema = new mongoose_1.default.Schema({
    fullLink: {
        type: String,
        required: true,
    },
    shortLink: {
        type: String,
        required: true,
        unique: true,
    },
    expiry: {
        type: Date,
        default: () => Date.now() + 30 * 60 * 1000, // 30 minutes
        index: { expires: 0 },
    },
    clicks: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Link = mongoose_1.default.model("Link", linkSchema);
exports.default = Link;
