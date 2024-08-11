import { Router } from "express";
import {
  deleteProductController,
  getAllProductsController,
  getOneProductsController,
  postCreateProductController,
  updateProductController,
} from "../controllers/products.controller";
import updateProductDtoMiddleware from "../middlewares/updateProductDto.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import CreateProductDtoMiddleware from "../middlewares/createProductDto.middleware";

const productsRouter = Router();

productsRouter.get("/list", getAllProductsController);

productsRouter.get("/one/:id", getOneProductsController);

productsRouter.put(
  "/update/:id",
  [updateProductDtoMiddleware, verifyToken, isAdmin],
  updateProductController
);

productsRouter.post(
  "/create",
  [CreateProductDtoMiddleware, verifyToken, isAdmin],
  postCreateProductController
);

productsRouter.delete(
  "/delete/:id",
  [verifyToken, isAdmin],
  deleteProductController
);

export default productsRouter;
