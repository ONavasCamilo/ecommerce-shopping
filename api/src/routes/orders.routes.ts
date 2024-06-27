import { Router } from "express";
import {
  addNewOrdersController,
  getAllOrdersController,
  getOneOrdersController,
} from "../controllers/orders.controller";
import addNewOrderDtoMiddleware from "../middlewares/addNewOrderDto.middleware";

const ordersRouter = Router();

ordersRouter.get("/list", getAllOrdersController);

ordersRouter.get("/one/:id", getOneOrdersController);

ordersRouter.post("/add", [addNewOrderDtoMiddleware], addNewOrdersController);

export default ordersRouter;
