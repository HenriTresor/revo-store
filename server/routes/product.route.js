import Router from 'express'
import { addProduct, getAllProducts, getProductsByCategory, getSingleProduct } from '../controllers/product.controller.js'

const router = Router()

router.get('/', getAllProducts)
router.get('/search', getProductsByCategory)
router.get('/:id', getSingleProduct)
router.post('/', addProduct)

export default router