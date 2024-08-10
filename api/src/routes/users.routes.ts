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
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";

const usersRouter = Router();

usersRouter.get("/list", [verifyToken, isAdmin], getAllUsersController);

usersRouter.get("/one/:id", [verifyToken], getOneUserController);

usersRouter.put("/update/:id", [updateUserDtoMiddleware, verifyToken], updateUserController);

usersRouter.put("/update/password/:id", [updatePasswordUserDtoMiddleware, verifyToken], updatePasswordUserController);

usersRouter.delete("/delete/:id", [verifyToken] , deleteUserController);

export default usersRouter;
