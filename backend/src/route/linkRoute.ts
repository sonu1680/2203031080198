import express from "express";
import { createShortUrl } from "../controller/createShortUrl.js";
import { handleRedirect } from "../controller/redirectUrl.js";
import { getLinkDetails } from "../controller/getLinkDetails.js";

const router = express.Router();

router.post("/shorturls", createShortUrl);
router.get("/:id", handleRedirect);      

router.get("/link/:id", getLinkDetails);

export default router;
