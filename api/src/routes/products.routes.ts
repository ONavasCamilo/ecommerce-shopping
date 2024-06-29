import { Router } from "express";
import {
  getAllProductsController,
  getOneProductsController,
  updateProductController,
} from "../controllers/products.controller";
import updateProductDtoMiddleware from "../middlewares/updateProductDto.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";

const productsRouter = Router();

productsRouter.get("/list", getAllProductsController);

productsRouter.get("/one/:id", getOneProductsController);

productsRouter.put("/update/:id", [updateProductDtoMiddleware, verifyToken, isAdmin], updateProductController);

export default productsRouter;
