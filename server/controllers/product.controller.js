import Product from "../models/Product.model.js";
import errorResponse from '../utils/error.response.js'
import { productValidObj } from "../validators/product.joi.js";

export const getAllProducts = async (req, res, next) => {
    try {

        const products = await Product.find().populate('vendor').sort({createdAt:-1})
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
        let product = await Product.findOne({ _id: id }).populate('vendor')
        if (!product) return next(errorResponse("product was not found", 404))

        res.status(200).json({ status: true, product })
    } catch (error) {
        next(errorResponse(error.message, 500))
    }
}

export const getProductsByCategory = async (req, res, next) => {
    try {
        let { category } = req.query
        console.log(category);
        let products = await Product.find({ category: category }).populate('vendor')
        if (!products) return next(errorResponse("no products in this category", 404))
        res.status(200).json({ status: true, products });
    } catch (error) {
        next(errorResponse(error.message, 500))
    }
}

export const addProduct = async (req, res, next) => {
    try {
        console.log(req.body);
        let { error, value } = productValidObj.validate(req.body)
        if (error) return next(errorResponse(error.details[0].message, 400))
        let newProduct = new Product({
            title: value.title,
            description: value.description,
            stock: value.stock,
            category: value.category,
            brand: value.brand,
            vendor: req.body.vendor,
            price: value.price,
            images: [req.body?.image]
        })

        await newProduct.save()
        return res.status(201).json({ status: true, message: 'product saved', product: newProduct.populate('vendor') })
    } catch (error) {
        next(errorResponse(error.message, 500))
    }
}