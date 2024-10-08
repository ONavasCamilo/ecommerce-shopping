import { FiltersUsersDto } from "../dto/filtersUsers.dto";
import updatePasswordUserDto from "../dto/updatePasswordUser.dto";
import UpdateUserDto from "../dto/updateUser.dto";
import OrderModel from "../repositories/order.repository";
import UserModel from "../repositories/user.repository";
import { comparePassword, hashPassword } from "../utils/passwordManager.utils";

export const getAllUsersService = async (params: FiltersUsersDto) => {
  const { limit, offset, name, email } = params;

  return await UserModel.find({
    where: {
      name: name || undefined,
      email: email || undefined,
    },
    relations: {
      role: true,
      orders: true,
    },
    take: limit,
    skip: offset,
  });
};

export const getOneUserService = async (id: string) => {
  return await UserModel.findOne({
    where: { id },
    relations: ["role", "orders"],
  });
};

export const updateUserServices = async (
  id: string,
  updateBody: UpdateUserDto
) => {
  const existUser = await UserModel.findOneBy({ id });
  if (!existUser) throw new Error("Usuario inexistente");
  await UserModel.update(id, updateBody);
  const updateUser = await UserModel.findOne({
    where: { id },
    relations: {
      role: true,
      orders: true,
    }
  });
  return updateUser;
};

export const updatePasswordUserService = async (
  id: string,
  updatePasswordBody: updatePasswordUserDto
) => {
  const existUser = await UserModel.findOne({
    where: { id },
    select: ["id", "password", "address", "email", "name", "phone"],
  });
  if (!existUser) throw new Error("Usuario inexistente");

  const samePassword = await comparePassword(
    updatePasswordBody.password,
    existUser.password
  );
  if (samePassword)
    throw new Error("Contraseña debe ser diferente a la actual");

  const hashedPassword = await hashPassword(updatePasswordBody.password);
  existUser.password = hashedPassword;
  await UserModel.save(existUser);
  const updateUser = await UserModel.findOneBy({ id });
  return updateUser;
};

export const deleteUserService = async (id: string) => {
  const existUser = await UserModel.findOne({
    where: { id },
    relations: ["orders"],
  });
  if (!existUser) throw new Error("Usuario inexistente");
  await OrderModel.delete({ user: existUser });
  await UserModel.delete(existUser);
  return existUser;
};
