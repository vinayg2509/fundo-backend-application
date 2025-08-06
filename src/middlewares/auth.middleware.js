import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

export const userAuth = async (req, res, next) => {
  try {
    let bearerToken = req.header('Authorization');
    if (!bearerToken) {
      throw {
        code: StatusCodes.BAD_REQUEST,
        message: 'Authorization token is required'
      };
    }

    bearerToken = bearerToken.split(' ')[1];
    const decoded = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_KEY);
    
    res.locals.user = decoded; // decoded = { id, email }
    res.locals.token = bearerToken;

    next();
  } catch (error) {
    next({
      code: StatusCodes.UNAUTHORIZED,
      message: 'Invalid or expired token'
    });
  }
};
