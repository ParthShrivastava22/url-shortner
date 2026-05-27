import asyncHandler from "../../shared/utils/asyncHandler.js";
import { registerUserService, loginUserService } from "./auth.service.js";
import { cookieOptions } from "../../config/config.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const { token, user } = await registerUserService(name, email, password);
  res.cookie("accessToken", token, cookieOptions);
  res.status(201).json({ token, user });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await loginUserService(email, password);
  res.cookie("accessToken", token, cookieOptions);
  res.json({ token, user });
});
