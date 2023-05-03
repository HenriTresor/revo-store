import User from "../models/User.model.js"
import { userValidObj } from "../validators/user.joi.js"
import errorResponse from "../utils/error.response.js"
import createToken from "../utils/jwt.js"
import _ from 'lodash'
import { checkUserByEmail } from "../utils/functions.js"

export const createUser = async (req, res, next) => {
    try {
        // console.log(req.body);
        let { email, password, role, fullNames } = req.body
        let { error, value } = userValidObj.validate({ email, fullNames, password, role })
        if (error) {
            return next(errorResponse(error.details[0].message, 400))
        }

        // check if user does not already exists
        let userExists = await checkUserByEmail(value.email)
        if (userExists.status) {
            return next(errorResponse(`${value.email} already exists`, 409))
        }
        const newUser = new User({
            email: value.email,
            fullNames: value.fullNames,
            role: value.role,
            password: value.password,
        })
        await newUser.save()
        const token = await createToken(newUser?._id)
        res.status(201).json({
            status: true,
            token,
            user: _.pick(newUser, ['_id', 'email', 'fullNames', 'role'])
        })
    } catch (error) {
        next(errorResponse(error.message, 500))
    }
}

export const getMe = async (req, res, next) => {
    try {
        let { userId } = req
        let user = await User.findById(userId)
        if (!user) return next(errorResponse(`user with id ${userId} was not found
        `))
        console.log(user);
        res.status(200).json({
            status: true,
            user: _.pick(user, ['_id', 'email', 'fullNames', 'role'])
        })
    } catch (error) {
        next(errorResponse(error.message, 500))
    }
} 