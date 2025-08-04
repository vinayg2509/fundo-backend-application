import bcrypt from 'bcrypt';
import userModels from '../models/user.models';
import { StatusCodes } from 'http-status-codes'; // Use `StatusCodes` instead of individual imports

const saltRounds = 10;

export const newUser = async (body) => {
  try {
    const checkUser = await userModels.findOne({ email: body.email });
    if (checkUser) {
      return {
        code: StatusCodes.CONFLICT,
        data: [],
        message: "User already exists, try with another email",
      };
    }

    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    const data = await userModels.create({
      ...body,
      password: hashedPassword,
    });

    return {
      code: StatusCodes.CREATED,
      data,
      message: "User created successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      data: [],
      message: "An error occurred while creating user",
    };
  }
};
