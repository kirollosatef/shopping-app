import Jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const { TOKEN_SECRET } = process.env;

export function tokenValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("token");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    Jwt.verify(token, TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(401).json({ message: `Invalid token: ${err}` });
  }
}
