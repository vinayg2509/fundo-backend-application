import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // ✅ Added missing import
import userModels from '../models/user.models';
import { StatusCodes } from 'http-status-codes'; // ✅ Corrected usage

const saltRounds = 10;

export const newUser = async (body) => {
  try {
    const checkUser = await userModels.findOne({ email: body.email });
    if (checkUser) {
      return {
        code: StatusCodes.CONFLICT,
        data: [],
        message: 'User already exists, try with another email',
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
      message: 'User created successfully',
    };
  } catch (error) {
    console.error(error);
    return {
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      data: [],
      message: 'An error occurred while creating user',
    };
  }
};

export const userLogin = async ({ email, password }) => {
  try {
    const checkUser = await userModels.findOne({ email }); // ✅ Corrected model usage
    console.log('User email:', checkUser);

    if (!checkUser) {
      return {
        code: StatusCodes.NOT_FOUND,
        data: [],
        message: 'No user found',
      };
    }

    const isMatch = await bcrypt.compare(password, checkUser.password);
    if (!isMatch) {
      return {
        code: StatusCodes.UNAUTHORIZED,
        data: [],
        message: 'Invalid credentials',
      };
    }

    const token = jwt.sign(
      { email: checkUser.email, id: checkUser._id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: '1h' } // ⏳ Optional: add expiry
    );

    return {
      code: StatusCodes.OK,
      data: {
        id: checkUser._id,
        email: checkUser.email,
        token: token,
      },
      message: 'Login successful and token generated',
    };
  } catch (error) {
    console.error(error);
    return {
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      data: [],
      message: 'Error occurred during login',
    };
  }
};
