"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const linkRoute_1 = __importDefault(require("./route/linkRoute"));
dotenv_1.default.config();
const URI = process.env.DATABASE_URL || "";
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/v1", linkRoute_1.default);
app.use("/", linkRoute_1.default);
mongoose_1.default.connect(URI).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listenong at ${PORT}`);
    });
});
