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
exports.handleRedirect = void 0;
const links_1 = __importDefault(require("../schema/links"));
const history_1 = __importDefault(require("../schema/history"));
const handleRedirect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: shortLink } = req.params;
    try {
        const link = yield links_1.default.findOne({ shortLink });
        if (!link) {
            res.status(404).send("Short URL not found");
            return;
        }
        link.clicks += 1;
        yield link.save();
        yield history_1.default.create({
            linkId: link._id,
            clickedAt: new Date(),
            ip: req.ip,
        });
        res.redirect(link.fullLink);
    }
    catch (error) {
        console.error("Redirect error:", error);
        res.status(500).send("Server error during redirect");
    }
});
exports.handleRedirect = handleRedirect;
