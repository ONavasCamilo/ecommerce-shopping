import { Router } from "express";
import {
  getAllProductsController,
  getOneProductsController,
  updateProductController,
} from "../controllers/products.controller";
import updateProductDtoMiddleware from "../middlewares/updateProductDto.middleware";

const productsRouter = Router();

productsRouter.get("/list", getAllProductsController);

productsRouter.get("/one/:id", getOneProductsController);

productsRouter.put("/update/:id", [updateProductDtoMiddleware], updateProductController);

export default productsRouter;
