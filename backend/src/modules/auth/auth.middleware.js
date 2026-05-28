import { findUserByIdService } from "../user/user.service.js";
import { verifyToken } from "./auth.utils.js";

export const strictAuth = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = verifyToken(token);
    const user = await findUserByIdService(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized", error: error.message });
  }
};

export const optionalAuth = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return next();
  }

  try {
    const decoded = verifyToken(token);
    const user = await findUserByIdService(decoded.id);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.user = user;
    next();
  } catch (error) {
    next();
  }
};
