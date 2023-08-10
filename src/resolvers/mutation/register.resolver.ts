import User from "@src/models/User";

const register = async (
  _,
  { email, password }: { email: string; password: string }
) => {
  const newUser = new User({ email, password });
  await newUser.save();
  return "User registered successfully";
};

export default register;
