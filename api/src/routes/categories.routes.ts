import { Router } from "express";
import { getCategoriesController } from "../controllers/categories.controller";

const categoriesRouter = Router();

categoriesRouter.get("/list", getCategoriesController);

export default categoriesRouter;
