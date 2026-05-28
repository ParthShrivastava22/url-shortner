import ConflictError from "../../shared/errors/ConflictError.js";
import { createUser, findUserByEmail, findUserById } from "./user.dao.js";

export const registerUserService = async (name, email, password) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new ConflictError("User with that email already exists");
  }
  const user = await createUser(name, email, password);
  const safeUser = user.toObject();

  delete safeUser.password;
  return safeUser;
};

export const findUserByIdService = async (id) => {
  const user = await findUserById(id);
  if (!user) {
    throw new ConflictError("User not found");
  }
  const safeUser = user.toObject();
  delete safeUser.password;
  return safeUser;
};
