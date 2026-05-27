import User from "./user.model.js";

export const createUser = async (name, email, password) => {
  const newUser = new User({
    name,
    email,
    password,
  });
  return await newUser.save();
};
