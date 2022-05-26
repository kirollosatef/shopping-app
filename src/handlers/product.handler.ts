import { Request, Response } from "express";
import { productClass } from "../models/product.model";

const newProduct = new productClass();

const createProduct = async (req: Request, res: Response) => {
  const productData = {
    name: req.body.name,
    price: req.body.price,
  };
  try {
    const product = await newProduct.create(productData);
    res.status(200).json({ message: "DONE!!", product: product });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await newProduct.index();
    res.status(200).json({ message: "DONE!!", products: products });
  } catch (err) {
    res.status(500).json(err);
  }
};

const getProduct = async (req: Request, res: Response) => {
  const productId = req.params.id as unknown as number;
  try {
    const product = await newProduct.show(productId);
    res.status(200).json({ message: "DONE!!", product: product });
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateProduct = async (req: Request, res: Response) => {
  const productId = req.params.id as unknown as number;
  const productData = {
    name: req.body.name,
    price: req.body.price,
  };
  try {
    const product = await newProduct.update(productId, productData);
    res.status(200).json({ message: "DONE!!", product: product });
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id as unknown as number;
  try {
    const product = await newProduct.destroy(productId);
    res.status(200).json({ message: "DONE!!", product: product });
  } catch (err) {
    res.status(500).json(err);
  }
};

export default {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
