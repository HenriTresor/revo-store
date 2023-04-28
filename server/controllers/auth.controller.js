import errorResponse from "../utils/error.response.js"
import User from "../models/User.model.js"
import { checkUserByEmail } from "../utils/functions.js"
import bcrypt from 'bcrypt'
import createToken from "../utils/jwt.js"
import _ from 'lodash'

export const loginUser = async (req, res, next) => {
    try {
        let { email, password } = req.body
        if (!email || !password) {
            return next(errorResponse("email and password are both required", 400))
        }

        let { user, status } = await checkUserByEmail(email)
        if (!status) return next(errorResponse("invalid email or password", 404))

        let pwd = await bcrypt.compare(password, user.password)
        if (!pwd) return next(errorResponse("invalid password or email", 404))

        let token = await createToken(user?._id)
        res.status(200).json({
            status: true,
            token,
            user: _.pick(user, ['email', 'fullNames', 'role'])
        })
    } catch (error) {
        next(errorResponse(error.message, 500))
    }
}