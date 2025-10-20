import fs from "node:fs";
import Product from "../Models/ProductModel.mjs";

let index = async (req, res) =>{
try{
  const products = await Product.find();
  if(products.length > 0){
  res.status(200).json({message: "showing Products" ,products: products})
  }else{
    res.status(404).json({message:"No Product found"})
  }

}catch (error){
console.log(error);
res.status(500).json({message: error.message})
}
}

let findProduct = async (req, res) =>{
  try{
    let id = req.params.id;
    let product = await Product.findById(id)
    if(product){
      res.status(200).json({message: "Showing Single Product", products: product})
    }else{
      res.status(404).json({message: "No Product Found With This Id"})
    }

  }catch (error){
    console.log(error);
    res.status(500).json({message: error.message})
  }
}

let deleteProduct = async (req, res) =>{
  try{
    let id = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if(deletedProduct){
      res.status(200).json({message: "Product Deleted Successfully", product: deletedProduct})
    }else{
      res.status(404).json({message: "No Product with this id found"})
    }
  }
  catch (error){
    console.log(error);
    res.status(500).json({message:error.message})
  }
}
let updateProduct = async (req, res) =>{
  try{
    let id = req.params.id;
    const update = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, {$set: update}, {new: true});
    // if(updateProduct){
    //   res.status(200).json({message: "Product Updated Successfully", product:updateProduct});
    // }else{
    //   res.status(404).json({message: "Product Not found with id "+ id})
    // }
    if (!updatedProduct) {
      return res.status(404).json({
        message: "No product found with this ID"
      });
    }

    res.status(200).json({
      message: "Product Updated Successfully",
      product: updatedProduct
    });
  }
  catch (error){
    console.log(error),
    res.status(500).json({message: error.message})
  }
}
// {static work crud through data.json file}
// let index = async (req, res) => {
//   try {
//     const products = await Product.getAll();
//     if (products.length > 0) {
//       res.status(200).json({ message: "Showing products", products });
//     } else {
//       res.status(404).json({ message: "Product not found" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// };

// let CreateProduct = async (req, res) =>{
//     try{
//  let newProduct = req.body;
//     // let addproduct = Product.push(newProduct);
//     const result = Product.create(newProduct)
//     console.log(result);
//     if (result.success) {
//       res.status(200).json({ message: "Product added successfully", Product: newProduct })
//     } else {
//       res.status(500).json({ message: "Something Went Wrong Product not added"})
//     }
//     }
//     catch (error){
//         console.log(error);
//         res.status(500).json({message:error.message})
//     }
// }
let CreateProduct = async (req, res) => {
  try {
const {
    title,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images
}= req.body;

const product = new Product({
      title,
      description,
      price,
      discountPercentage,
      rating,
      stock,
      brand,
      category,
      thumbnail,
      images 
});

const addProd = await product.save();
    // mongodb method to save data to database
    // let addProd = await Product.insertOne(product);

    res.status(201).json({
      message: "Product created successfully",
      product: addProd
    });
   
  } catch (error) {
    console.log(error);
     if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: error.message });
  }
};

const ProductController = {
  index,
  CreateProduct,
  findProduct,
  deleteProduct,
  updateProduct
};
export default ProductController;
