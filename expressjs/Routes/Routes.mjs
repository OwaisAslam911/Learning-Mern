import express from 'express'
import ProductController from '../Controllers/ProductController.mjs'

const ProductRouter = express.Router();
ProductRouter
.get("/",ProductController.index)
.post("/create", ProductController.CreateProduct)

export default ProductRouter;