import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export function hashPassword(pw: string) {
  return bcrypt.hashSync(pw, 10);
}
export function verifyPassword(pw: string, hash: string) {
  return bcrypt.compareSync(pw, hash);
}
export function makeToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}