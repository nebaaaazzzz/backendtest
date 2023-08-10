import User from "@src/models/User";

const getMe = async (_, __, context) => {
  if (context.user) {
    return context.user;
  }
  throw new Error("User not found");
};

export default getMe;
