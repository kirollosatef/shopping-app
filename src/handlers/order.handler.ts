import { Request, Response } from "express";
import { orderClass } from "../models/order.model";

const newOrder = new orderClass();

const createOrder = async (req: Request, res: Response) => {
  const orderData = {
    products: req.body.products,
    userId: req.body.userId,
    status: req.body.status,
  };
  try {
    const order = await newOrder.create(orderData);
    res.status(200).json({ message: "DONE!!", order: order });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await newOrder.index();
    res.status(200).json({ message: "DONE!!", orders: orders });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOrder = async (req: Request, res: Response) => {
  const id = req.params.id as unknown as number;
  try {
    const order = await newOrder.show(id);
    res.status(200).json({ message: "DONE!!", order: order });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateOrder = async (req: Request, res: Response) => {
  const id = req.params.id as unknown as number;
  const orderData = {
    products: req.body.products,
    userId: req.body.userId,
    status: req.body.status,
  };
  try {
    const order = await newOrder.update(id, orderData);
    res.status(200).json({ message: "DONE!!", order: order });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  const id = req.params.id as unknown as number;
  try {
    const order = await newOrder.destroy(id);
    res.status(200).json({ message: "DONE!!", order: order });
  } catch (err) {
    res.status(500).json(err);
  }
};

export default {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
};
