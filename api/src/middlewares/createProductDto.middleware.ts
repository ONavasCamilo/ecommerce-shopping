import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import CreateProductDto from "../dto/createProduct.dto";
import { plainToClass } from "class-transformer";

const CreateProductDtoMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, description, price, stock, category } = req.body;

  // const valid = new CreateProductDto();
  // valid.name = name;
  // valid.description = description;
  // valid.price = price;
  // valid.stock = stock;
  // valid.category = category;

  const plainObject = {
    name,
    description,
    price: parseFloat(price),  // Convertir el precio a número
    stock: parseInt(stock, 10), // Convertir el stock a número
    category,
  };

  const validTransform = plainToClass(CreateProductDto, plainObject);

  validate(validTransform).then((err) => {
    if (err.length > 0) {
      return res.status(400).json({ error: err });
    } else {
      return next();
    }
  });
};

export default CreateProductDtoMiddleware;