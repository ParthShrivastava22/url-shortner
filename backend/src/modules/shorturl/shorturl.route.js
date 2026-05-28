import express from "express";
import { createShortUrl, redirectToLongUrl } from "./shorturl.controller.js";
import { optionalAuth } from "../auth/auth.middleware.js";

const router = express.Router();

router.post("/", optionalAuth, createShortUrl);
router.get("/:shortId", redirectToLongUrl);

export default router;
