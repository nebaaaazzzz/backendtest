import jwt from "jsonwebtoken";
export function generateJwtToken(data) {
  return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "30m" });
}
export function verifyJwtToken(token) {
  try {
    console.log(jwt.verify(token, process.env.JWT_SECRET));
  } catch (err) {
    console.log(err);
  }
  return jwt.verify(token, process.env.JWT_SECRET);
}
