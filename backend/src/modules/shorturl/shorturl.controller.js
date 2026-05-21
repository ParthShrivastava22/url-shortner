import {
  createShortUrlService,
  getLongUrlService,
} from "./shorturl.services.js";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import NotFoundError from "../../shared/errors/NotFoundError.js";
import BadRequestError from "../../shared/errors/BadRequestError.js";

export const createShortUrl = asyncHandler(async (req, res, next) => {
  const { url } = req.body;

  if (!url) {
    throw new BadRequestError("URL is required");
  }

  const shortUrl = await createShortUrlService(url);
  console.log(shortUrl);

  res.status(201).json({ shortUrl: process.env.APP_URL + "/" + shortUrl });
});

export const redirectToLongUrl = asyncHandler(async (req, res, next) => {
  const { shortId } = req.params;
  const longUrl = await getLongUrlService(shortId);
  if (longUrl) {
    res.redirect(longUrl.fullUrl);
  } else {
    next(new NotFoundError("Short URL not found"));
  }
});
