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
exports.getLinkDetails = void 0;
const links_1 = __importDefault(require("../schema/links"));
const history_1 = __importDefault(require("../schema/history"));
const getLinkDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: shortLink } = req.params;
    try {
        const link = yield links_1.default.findOne({ shortLink });
        if (!link) {
            res.status(404).json({ error: "Short link not found" });
            return;
        }
        const history = yield history_1.default.find({ linkId: link._id }).sort({
            clickedAt: -1,
        });
        res.status(200).json({
            message: "Link details fetched successfully",
            data: {
                fullLink: link.fullLink,
                shortLink: `${req.protocol}://${req.get("host")}/${link.shortLink}`,
                clicks: link.clicks,
                expiry: link.expiry.toISOString(),
                clickHistory: history.map((entry) => ({
                    clickedAt: entry.clickedAt.toISOString(),
                    ip: entry.ip,
                })),
            },
        });
    }
    catch (error) {
        console.error("Error fetching link details:", error);
        res.status(500).json({ error: "Server error fetching link details" });
    }
});
exports.getLinkDetails = getLinkDetails;
