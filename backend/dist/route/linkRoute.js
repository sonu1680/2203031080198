"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createShortUrl_js_1 = require("../controller/createShortUrl.js");
const redirectUrl_js_1 = require("../controller/redirectUrl.js");
const getLinkDetails_js_1 = require("../controller/getLinkDetails.js");
const router = express_1.default.Router();
router.post("/shorturls", createShortUrl_js_1.createShortUrl);
router.get("/:id", redirectUrl_js_1.handleRedirect);
router.get("/link/:id", getLinkDetails_js_1.getLinkDetails);
exports.default = router;
