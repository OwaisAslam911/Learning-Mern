import fs from 'node:fs';
import Product from '../Models/ProductModel.mjs';


let index = async (req, res)=>{
    try{
        const products = await Product.getAll();
        if(products.length >0){
            res.status(200).json({message:"Showing products", products})
        }else{
            res.status(404).json({message: "Product not found"})
        }

    }
    catch (error){
        console.log(error);
        res.status(500).json({message: error.message})

    }
}

let CreateProduct = async (req, res) =>{
    try{
 let newProduct = req.body;
    // let addproduct = Product.push(newProduct);
    const result = Product.create(newProduct)
    console.log(result);
    if (result.success) {
      res.status(200).json({ message: "Product added successfully", Product: newProduct })
    } else {
      res.status(500).json({ message: "Something Went Wrong Product not added"})
    }
    }
    catch (error){
        console.log(error);
        res.status(500).json({message:error.message})
    }
}

const ProductController = {
    index,
    CreateProduct
}
export default ProductController;