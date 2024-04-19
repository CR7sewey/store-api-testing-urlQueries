const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/connect");

const productsPreMaid = require("./products.json");
const Product = require("./models/product");

// JSON middleware
app.use(express.json());

// DB
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany();
    await Product.create(productsPreMaid);
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};
start();
/* 
app.listen(port, () => {
  console.log(`Im listening on ... ${port}`);
});*/
