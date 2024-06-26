import { Router } from "express";
import {
  deleteUserController,
  getAllUsersController,
  getOneUserController,
  updatePasswordUserController,
  updateUserController,
} from "../controllers/users.controller";
import updateUserDtoMiddleware from "../middlewares/updateUserDto.middleware";
import updatePasswordUserDtoMiddleware from "../middlewares/updatePasswordUserDto.middleware";

const usersRouter = Router();

usersRouter.get("/list", getAllUsersController);

usersRouter.get("/one/:id", getOneUserController);

usersRouter.put("/update/:id", [updateUserDtoMiddleware], updateUserController);

usersRouter.put("/update/password/:id", [updatePasswordUserDtoMiddleware], updatePasswordUserController);

usersRouter.delete("/delete/:id", deleteUserController);

export default usersRouter;
