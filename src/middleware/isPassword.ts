import { NextFunction, Request, Response } from "express";

//it is valid password
export function isValidPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }
  if (password.length > 20) {
    return res
      .status(400)
      .json({ message: "Password must be less than 20 characters" });
  }
  if (!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
    return res.status(400).json({
      message: "Password must contain at least one letter and one number",
    });
  }
  if (!password.match(/[A-Z]/)) {
    return res
      .status(400)
      .json({ message: "Password must contain at least one uppercase letter" });
  }
  next();
}
