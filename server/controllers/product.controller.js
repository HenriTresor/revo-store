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


export const getSingleProduct = async (req, res, next) => {
    try {

        let { id } = req.params
        let product = await Product.findById(id).populate('vendor')
        if (!product) return next(errorResponse("product was not found", 404))
        res.status(200).json({ status: true, product })
    } catch (error) {
        next(errorResponse(error.message, 500))
    }
}

export const getProductsByCategory = async (req, res, next) => {
    try {
        let { category } = req.query
        let products = await Product.find({ category: category }).populate('vendor')
        if (!products) return next(errorResponse("no products in this category", 404))
        res.status(200).json({ status: true, products });
    } catch (error) {
        next(errorResponse(error.message, 500))
    }
}