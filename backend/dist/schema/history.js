"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const clickHistorySchema = new mongoose_1.default.Schema({
    linkId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Link",
        required: true,
    },
    clickedAt: {
        type: Date,
        default: Date.now,
    },
    source: {
        type: String, // e.g., "Chrome", "Android", etc.
    },
    ip: {
        type: String, //ip address
    },
});
const ClickHistory = mongoose_1.default.model("ClickHistory", clickHistorySchema);
exports.default = ClickHistory;
