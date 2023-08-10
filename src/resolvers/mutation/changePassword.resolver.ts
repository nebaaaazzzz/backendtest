import User from "@src/models/User";
import bcrypt from "bcryptjs";
const changePassword = async (
  _,
  {
    email,
    password,
    oldPassword,
  }: { email: string; password: string; oldPassword: string }
) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  const isValid = await bcrypt.compare(oldPassword, user.password);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }
  user.oldPassword = user.password;
  user.password = password;
  await user.save();
  return "Password changed successfully";
};
export default changePassword;
