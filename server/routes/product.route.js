import Router from 'express'
import { getAllProducts, getProductsByCategory, getSingleProduct } from '../controllers/product.controller.js'

const router = Router()

router.get('/', getAllProducts)
router.get('/search', getProductsByCategory)
router.get('/:id', getSingleProduct)

export default router