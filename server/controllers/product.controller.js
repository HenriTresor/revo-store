import Product from "../models/Product.model.js";
import errorResponse from '../utils/error.response.js'

export const getAllProducts = async (req, res, next) => {
    try {

        const products = await Product.find().populate('vendor')
        res.status(200).json(
            {
                status: true,
                products
            }
        )
    } catch (error) {
        next(errorResponse(error.message, 500))
    }
}