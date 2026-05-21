import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema(
  {
    fullUrl: {
      type: String,
      required: true,
      match: /^https?:\/\/.+/,
    },

    shortUrl: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    clickCount: {
      type: Number,
      default: 0,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  },
);

const shortUrl = mongoose.model("ShortUrl", shortUrlSchema);

export default shortUrl;
