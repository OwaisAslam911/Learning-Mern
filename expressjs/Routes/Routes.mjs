import express from 'express'
import ProductController from '../Controllers/ProductController.mjs'

const ProductRouter = express.Router();
ProductRouter
.get("/",ProductController.index)

export default ProductRouter;