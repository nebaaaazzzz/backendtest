import User from "@src/models/User";
import bcrypt from "bcryptjs";
import speakeasy from "speakeasy";
import { generateJwtToken } from "@src/helpers/jwt";
const login = async (
  _,
  {
    email,
    password,
    oneTimeCode,
  }: { email: string; password: string; oneTimeCode?: string }
) => {
  const user = await User.findOne({ email });
  const isNewValid = await bcrypt.compare(user?.password as string, password);
  const isOldValid = await bcrypt.compare(user?.oldPassword ?? "", password);
  if (!user || isNewValid || isOldValid) {
    throw new Error("Invalid credentials");
  }
  if (user.twoFactorEnabled && user.twoFactorSecret && oneTimeCode) {
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: "base32",
      token: oneTimeCode,
    });
    if (!verified) {
      throw new Error("Invalid two-factor code");
    }
  }
  return generateJwtToken({ email: user.email, sub: user._id });
};
export default login;
