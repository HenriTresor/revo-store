import Joi from 'joi'

const userValidObj = Joi.object({
    email: Joi.string().min(5).max(200).email().required(),
    fullNames: Joi.string().min(3).max(60).required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('buyer', 'vendor').required()
})

export { userValidObj }