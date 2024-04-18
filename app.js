const express = require("express");
const app = express();
require("dotenv").config();
require("express-async-errors"); // caputres async errors!
const errorHandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");
const connectDB = require("./db/connect");
const routes = require("./routes/products");

// JSON middleware
app.use(express.json());

// ROUTES
app.get("/", (req, res) => {
  res.send(
    '<h1>Store API</h1><a href="api/v1/products">Products</a><br /><h1>Store API</h1><a href="api/v1/products/static">S Products</a>'
  );
});

app.use("/api/v1/products/", routes);

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
