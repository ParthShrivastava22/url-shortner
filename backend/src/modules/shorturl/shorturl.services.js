import { generateNanoId } from "../../shared/utils/helper.js";
import {
  saveShortUrl,
  getLongUrl,
  getExistingShortUrl,
} from "./shorturl.dao.js";
import AppError from "../../shared/errors/AppError.js";
import ConflictError from "../../shared/errors/ConflictError.js";

// Service to create a short URL
export const createShortUrlService = async (
  originalUrl,
  userId = null,
  slug = null,
) => {
  const shortId = slug || generateNanoId();

  // Check for collision
  const existing = await getExistingShortUrl(shortId);
  if (existing) {
    throw new ConflictError("Short URL already exists");
  }

  await saveShortUrl(shortId, originalUrl, userId);
  return shortId;
};

// Service to get the long URL from a short ID
export const getLongUrlService = async (shortId) => {
  const longUrl = await getLongUrl(shortId);

  return longUrl;
};
