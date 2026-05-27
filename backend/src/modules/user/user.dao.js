import User from "./user.model.js";

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};
