import { nanoid } from "nanoid";
import jsonwebtoken from "jsonwebtoken";
import { cookieOptions } from "../../config/config.js";

export const generateNanoId = (length = 7) => nanoid(length);

export const signToken = (payload) => {
  return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};
