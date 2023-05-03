import Joi from 'joi'

export const productValidObj = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().min(10).required(),
    stock: Joi.number().min(1).required(),
    price: Joi.string().required(),
    category: Joi.string().required(),
    brand: Joi.string().required(),
    image: Joi.string(),
    vendor:Joi.string().required()
})