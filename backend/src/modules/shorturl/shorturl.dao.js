import shortUrlSchema from "./shorturl.model.js";

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
  try {
    const newUrl = new shortUrlSchema({
      fullUrl: longUrl,
      shortUrl: shortUrl,
    });
    if (userId) {
      newUrl.user = userId;
    }
    await newUrl.save();
  } catch (error) {
    console.error("Error saving short URL:", error);
    throw error;
  }
};

export const getExistingShortUrl = async (shortId) => {
  return await shortUrlSchema.findOne({ shortUrl: shortId });
};

export const getLongUrl = async (shortId) => {
  return await shortUrlSchema.findOneAndUpdate(
    { shortUrl: shortId },
    { $inc: { clickCount: 1 } },
  );
};
