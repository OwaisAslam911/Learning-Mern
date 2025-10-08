// import mongoose from "mongoose";
// // const Schema= mongoose.Schema;
// const { Schema } = mongoose;
// const productSchema = new Schema({
//   title: { type: String, required: [true, "Title is Required"] },
//   description: { type: String },
//     price: {
//       type: Number,
//       required: [true, "Price is Required"],
//     },
//     discountPercentage: {
//       type: Number,
//       min: [0, "Minimum discount of product must be 0"],
//       required: [true, "discount is Required"],
//       max: [50, "Maximum price of discount must be under 50"],
//     },
//     rating: {
//       type: Number,
//       min: [0, "Minimum rating of product must be 0"],
//       max: [5, "Maximum rating of product must be under 5"],
//       default: 0,
//     },
//     stock: { type: Number, min: [0, "Minimum stock of product must be 0"] },
//     brand: { type: String, required: [true, "Brand is Required"] },
//     category: { type: String, required: [true, "Category is Required"] },
//     thumbnail: { type: String, required: [true, "Thumbnail is Required"] },
//     images: { type: String, required: [true, "Thumbnail is Required"] },


// });
// const Product = mongoose.model("Product", productSchema);
// export default Product; 
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../data.json");

// --- Helper to read data.json ---
function readProducts() {
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, JSON.stringify({ products: [] }));
  }
  const data = fs.readFileSync(dataPath, "utf-8");
  const jsonData = JSON.parse(data);
  return jsonData.products || [];
}

// --- Helper to write data.json ---
function writeProducts(products) {
  const data = { products };
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// --- Product validation (same as before) ---
function validateProduct(product) {
  const errors = [];

  if (!product.title) errors.push("Title is required");
  if (product.price == null) errors.push("Price is required");
  if (product.discountPercentage == null) errors.push("Discount is required");
  if (product.discountPercentage < 0 || product.discountPercentage > 50)
    errors.push("Discount must be between 0 and 50");
  if (product.rating != null && (product.rating < 0 || product.rating > 5))
    errors.push("Rating must be between 0 and 5");
  if (product.stock != null && product.stock < 0)
    errors.push("Stock cannot be negative");
  if (!product.brand) errors.push("Brand is required");
  if (!product.category) errors.push("Category is required");
  if (!product.thumbnail) errors.push("Thumbnail is required");
  if (!product.images) errors.push("Images are required");

  return errors;
}

// --- Model-like CRUD API ---
const Product = {
  getAll() {
    return readProducts();
  },

  getById(id) {
    const products = readProducts();
    return products.find((p) => p.id == id);
  },

  create(product) {
    const errors = validateProduct(product);
    if (errors.length > 0) return { success: false, errors };

    const products = readProducts();
    product.id = products.length ? products[products.length - 1].id + 1 : 1;
    product.rating = product.rating || 0;

    products.push(product);
    writeProducts(products);

    return { success: true, product };
  },

  update(id, updateData) {
    const products = readProducts();
    const index = products.findIndex((p) => p.id == id);
    if (index === -1) return { success: false, message: "Product not found" };

    products[index] = { ...products[index], ...updateData };
    writeProducts(products);

    return { success: true, product: products[index] };
  },

  delete(id) {
    const products = readProducts();
    const index = products.findIndex((p) => p.id == id);
    if (index === -1) return { success: false, message: "Product not found" };

    const deleted = products.splice(index, 1);
    writeProducts(products);

    return { success: true, deleted: deleted[0] };
  },
};

export default Product;
