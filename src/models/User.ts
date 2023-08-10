import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  oldPassword: {
    type: String,
  },
  twoFactorEnabled: { type: Boolean, default: false },
  twoFactorSecret: {
    type: String,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
