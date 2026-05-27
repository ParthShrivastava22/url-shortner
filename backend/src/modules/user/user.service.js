import ConflictError from "../../shared/errors/ConflictError.js";

export const registerUserService = async (username, password) => {
  // Check if user already exists
  const existingUser = await findUserByUsername(username);
  if (existingUser) {
    throw new ConflictError("Username already exists");
  }

  const newUser = await createUser(name, email, password);
};
