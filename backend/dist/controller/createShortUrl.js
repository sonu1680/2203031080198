"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShortUrl = void 0;
const links_1 = __importDefault(require("../schema/links"));
const generateShortCode_1 = require("../lib/generateShortCode");
const createShortUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { url, expiryIn } = req.body;
        if (!url) {
            res.status(400).json({ error: "URL is required." });
            return;
        }
        // Check if the URL already exists
        const existingLink = yield links_1.default.findOne({ fullLink: url });
        if (existingLink) {
            return res.status(200).json({
                message: "Short URL already exists",
                data: {
                    fullLink: existingLink.fullLink,
                    shortLink: `${req.protocol}://${req.get("host")}/${existingLink.shortLink}`,
                    expiresAt: existingLink.expiry,
                },
            });
        }
        const shortLink = (0, generateShortCode_1.generateShortCode)(7); // Generate new short link
        const expiryDate = expiryIn
            ? new Date(Date.now() + expiryIn * 60 * 1000)
            : new Date(Date.now() + 30 * 60 * 1000);
        const newLink = yield links_1.default.create({
            fullLink: url,
            shortLink,
            expiry: expiryDate,
        });
        res.status(201).json({
            message: "Short URL created successfully",
            data: {
                fullLink: newLink.fullLink,
                shortLink: `${req.protocol}://${req.get("host")}/${newLink.shortLink}`,
                expiresAt: newLink.expiry,
            },
        });
    }
    catch (err) {
        console.error("Error creating short URL:", err);
        res.status(500).json({ error: "Server error while creating short URL." });
    }
});
exports.createShortUrl = createShortUrl;
