import { createUser, findUserByEmail } from "../user/user.dao.js";
import ConflictError from "../../shared/errors/ConflictError.js";
import AuthError from "../../shared/errors/AuthError.js";
import { signToken } from "./auth.utils.js";

export const registerUserService = async (name, email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new ConflictError("User with that email already exists");
  }
  const user = await createUser(name, email, password);
  const payload = { id: user._id };
  const token = signToken(payload);
  const safeUser = user.toObject();

  delete safeUser.password;

  return {
    token,
    user: safeUser,
  };
};

export const loginUserService = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user || !(await user.comparePassword(password))) {
    throw new AuthError("Invalid credentials");
  }

  const token = signToken({ id: user._id });
  const safeUser = user.toObject();

  delete safeUser.password;

  return {
    token,
    user: safeUser,
  };
};
