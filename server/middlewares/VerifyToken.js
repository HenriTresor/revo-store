import errorResponse from "../utils/error.response.js"
import jwt from 'jsonwebtoken'

export default async function verifyToken(req, res, next) {
    try {
        let authHeader = req.headers['authorization']
        if (!authHeader) return next(errorResponse("authorization header is required", 400))
        let token = authHeader.split(' ')[1]
        if (!token) return next(errorResponse("token is missing", 403))
        jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, payload) => {
            if (err) next(errorResponse(err.message, 403))
            let userId = payload.id
            req.userId = userId
            next()
        })
    } catch (error) {
        next(errorResponse(error.message, 401))
    }
}