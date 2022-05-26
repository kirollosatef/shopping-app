import { Request, Response } from "express";
import { userClass } from "../models/user.model";

const newUser = new userClass();

const createUser = async (req: Request, res: Response) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    streetNumber: req.body.streetNumber,
    streetName: req.body.streetName,
    city: req.body.city,
  };
  try {
    const user = await newUser.create(userData);
    res.status(200).json({ message: "DONE!!", user: user });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await newUser.index();
    res.status(200).json({ message: "DONE!!", users: users });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id as unknown as number;
  try {
    const user = await newUser.show(userId);
    res.status(200).json({ message: "DONE!!", user: user });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id as unknown as number;
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    streetNumber: req.body.streetNumber,
    streetName: req.body.streetName,
    city: req.body.city,
  };
  try {
    const user = await newUser.update(userId, userData);
    res.status(200).json({ message: "DONE!!", user: user });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id as unknown as number;
  try {
    const user = await newUser.destroy(userId);
    res.status(200).json({ message: "DONE!!", user: user });
  } catch (err) {
    res.status(500).json(err);
  }
};

const loginUser = async (req: Request, res: Response) => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const user = await newUser.login(userData.email, userData.password);
    res.status(200).json({ message: "DONE!!", user: user });
  } catch (err) {
    res.status(500).json(err);
  }
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
};
