import express from 'express';
import fs from 'node:fs';



const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
let products = data.products;
// console.log(products);
const app = express();
const PORT = 3000;
app.use(express.json());
// main().catch(err => console.log(err));
// async function main() {
//   // Connect to the database
//   console.log('Connected to the database');
// }
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.get('/', (req, res) => {
  res.send('Hello from Express');
});
app.get("/products", (req, res) => {
  res.json(products);
});
app.get("/product/:id", (req, res) => {
  try {
    let id = req.params.id;
    let product = products.find((prd) => {

      return prd.id == id;
    })
    if (product) {
      res.status(200).json({ message: "Product found", product: product });
    } else {
      res.status(404).json({ message: "Product not found" });
    }


  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
})


app.post("/create", (req, res) => {
  try {
    let newProduct = req.body;
    let addproduct = products.push(newProduct);
    console.log(addproduct);
    if (newProduct) {
      res.status(200).json({ message: "Product added successfully", products: newProduct })
    } else {
      res.status(500).json({ message: "Something Went Wrong Product not added" })
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message })
  }
})

app.delete("/delete/:id", (req, res) => {
  try {
    let id = req.params.id;
    let deleteProduct = products.find((prd) => {
      return prd.id == id
    });
      if (!deleteProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
    let productdeleted = products.filter(item => item.id != id);
    products = productdeleted
    if (productdeleted) {
      res.status(200).json({ message: "Product Deleted Successfully", products: productdeleted })
    } else {
      res.status(500).json({ message: "Can't delete Product Something went wrong" })
    }


  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
})
app.put("/Update/:id", (req, res)=>{
  try{
    let id = req.params.id;
    let updateobj = req.body;
    let index = products.findIndex(prd => prd.id = id);
    if(index == -1){
      res.status(404).json({message:"Product Not Found"});
    }
   products[index] = updateobj

    if(updateobj){
      res.status(200).json({message:"product Updated fully ", product:updateobj})
    }else{
      res.status(404).json({message:"Product didn't updated something went wrong"})
    }

  }catch (error){
    console.log(error);
    res.status(500).json({message: error.message})
  }
})

app.patch("/updatespecific/:id", (req, res) => {
try{
  let id = req.params.id;
  let updateobject = req.body;
  let product = products.find((prd)=> prd.id == id);
  if(!product){
   return res.status(404).json({message:"Product not found"});
  }
  let updates= Object.assign(product, updateobject);
if(updates){
  res.status(200).json({message:"product element updated successfully", product:updates});
}else{
  res.status(500).json({message:"Update product was unsuccessful"});
}
}
catch (error){
  console.log(error);
  res.status(500).json({message:error.message})
}
})