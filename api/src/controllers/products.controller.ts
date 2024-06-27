import { Request, Response } from "express";
import {
  getAllProductsService,
  getOneProductService,
  updateProductService,
} from "../services/products.services";

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProductsService();
    res.status(200).json(products);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const getOneProductsController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await getOneProductService(id);
    res.status(200).json(product);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const updateProductController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
  try {
    if (!name && !description && !price && !stock) throw new Error("Ingresa name, description, price o stock para actualizar")
    const updateProduct = await updateProductService(id, {
        name, description, price, stock
    });
    res.status(200).json(updateProduct);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
}
