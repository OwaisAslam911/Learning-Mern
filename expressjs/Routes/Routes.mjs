import express from 'express'
import ProductController from '../Controllers/ProductController.mjs'

const ProductRouter = express.Router();
ProductRouter
.get("/",ProductController.index)
.get("/:id",ProductController.findProduct)
.post("/create", ProductController.CreateProduct)
.delete("/delete/:id", ProductController.deleteProduct)
.patch("/update/:id", ProductController.updateProduct)

export default ProductRouter;