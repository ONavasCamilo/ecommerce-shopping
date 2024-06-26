import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { UpdateUserDto } from "../dto/updateUser.dto";

const updateUserDtoMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, address, phone, password } = req.body;

  const valid = new UpdateUserDto();
  valid.name = name;
  valid.email = email;
  valid.address = address;
  valid.phone = phone;
  valid.password = password;

  validate(valid).then((err) => {
    if (err.length > 0) {
      return res.status(400).json({ error: err });
    } else {
      return next();
    }
  });
};

export default updateUserDtoMiddleware;