import express from "express";
import { createShortUrl, redirectToLongUrl } from "./shorturl.controller.js";
import { strictAuth } from "../auth/auth.middleware.js";

const router = express.Router();

router.post("/", strictAuth, createShortUrl);
router.get("/:shortId", redirectToLongUrl);

export default router;
