import SignUpDto from "../dto/signUp.dto";
import RoleModel from "../repositories/role.repository";
import UserModel from "../repositories/user.repository";
import { comparePassword, hashPassword } from "../utils/passwordManager.utils";

export const signUpService = async (user: SignUpDto) => {
  const existEmail = await UserModel.findOneBy({ email: user.email });
  if (existEmail) throw new Error("Email ya registrado");

  const passwordHash = await hashPassword(user.password);
  const newParticipant = UserModel.create({
    ...user,
    password: passwordHash,
  });
  await RoleModel.asignRole(newParticipant);
  await UserModel.save(newParticipant);

  const dbUser = await UserModel.findOne({
    where: { email: user.email },
    relations: {
      role: true,
      orders: true,
    },
  });
  if (!dbUser) throw new Error("Error obteniendo usuario");
  return dbUser;
};

export const signInService = async (email: string, password: string) => {
  const existUser = await UserModel.findOne({
    where: { email: email },
    select: ["id", "password", "name", "email", "address", "phone"],
    relations: {
      role: true,
      orders: true,
    },
  });
  if (!existUser) throw new Error("Credenciales incorrectas");
  const validPassword = await comparePassword(password, existUser.password);
  if (!validPassword) throw new Error("Credenciales incorrectas");
  const { password: _, ...restOfUser } = existUser;
  return restOfUser;
};
