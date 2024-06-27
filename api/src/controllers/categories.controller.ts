import { Request, Response } from "express";
import { getCategoriesService } from "../services/categories.services";

export const getCategoriesController = async (req: Request, res: Response) => {
  try {
    const categories = await getCategoriesService();
    res.status(200).json(categories);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};
