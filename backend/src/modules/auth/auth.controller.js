import asyncHandler from "../../shared/utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
});

export const loginUser = asyncHandler(async (req, res) => {});
