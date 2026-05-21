import express from "express";
import { createShortUrl, redirectToLongUrl } from "./shorturl.controller.js";

const router = express.Router();

router.post("/", createShortUrl);
router.get("/:shortId", redirectToLongUrl);

export default router;
