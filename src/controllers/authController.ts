import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import createHttpError from "http-errors";

// Register User
export const register = async (req: Request, res: Response,next: NextFunction) => {
  const { password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  delete req.body.password

  try {
    const user = await User.create({ ...req.body, password: hashedPassword });
    return res.status(201).json({ message: "User created", userId: user.id });
  } catch (error) {
    return next(
      createHttpError.Conflict(
        error.message || "Something went wrong during registration."
      )
    );
  }
};

// Login User
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return createHttpError.Unauthorized("Invalid username/password!");
    }

    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    return createHttpError.Unauthorized();
  }
};
