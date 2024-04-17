const express = require("express");
const app = express();
require("dotenv").config();
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const connectDB = require("./db/connect");

// JSON middleware
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send('<h1>Store API</h1><a href="api/v1/products">Products</a>');
});

app.get("/api/v1/products", (req, res) => {
  res.send("<h1>Im going to show all my products!</h1>");
});

// MIDDLEWARES
app.use(notFound);
app.use(errorHandlerMiddleware);

// DB
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
/* 
app.listen(port, () => {
  console.log(`Im listening on ... ${port}`);
});*/
