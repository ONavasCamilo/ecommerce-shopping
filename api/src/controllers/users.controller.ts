import { Request, Response } from "express";
import {
  getAllUsersService,
  getOneUserService,
  updatePasswordUserService,
  updateUserServices,
} from "../services/users.services";

export const getAllUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const getOneUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await getOneUserService(id);
    res.status(200).json(user);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, address, phone } = req.body;
  try {
    if (!name && !email && !address && !phone)
      throw new Error("Ingresa name, email, address o phone a actualizar");
    const updateUser = await updateUserServices(id, {
      name,
      email,
      address,
      phone,
    });
    res.status(200).json(updateUser);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const updatePasswordUserController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { password, confirmpassword } = req.body;
  try {
    const updatePasswordUser = await updatePasswordUserService(id, {
      password,
      confirmpassword,
    });
    res.status(200).json(updatePasswordUser);
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};

export const deleteUserController = (req: Request, res: Response) => {
  try {
  } catch (err) {
    console.log("ERROR:", err);
    if (err instanceof Error) {
      res.status(400).send({ statusCode: 400, message: err.message });
    }
  }
};
