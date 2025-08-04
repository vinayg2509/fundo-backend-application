
import * as UserService from '../services/user.services'

/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const newUser = async(req, res, next) => {
    const data = await UserService.newUser(req.body)
    res.status(data.code).json({
        code: data.code,
        data : data.data,
        message: data.message
    })
}