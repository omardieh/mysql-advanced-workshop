require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const connection = require("./db");
const { productRouter, categoriesRouter } = require("./routes");

const { server_port } = process.env;

const app = express();
app.use(express.json());

const initial_db = fs
  .readFileSync(path.join(__dirname, "./schema.sql"))
  .toString();

connection
  .promise()
  .query(initial_db)
  .then(([results]) => console.log(results))
  .catch((e) => console.log(e));

app.use("/products", productRouter);
app.use("/categories", categoriesRouter);

// app.get("/categories/:id", (req, res) => {
//   const { id } = req.params;
//   connection
//     .promise()
//     .query(
//       "SELECT categories.category_id, categories.title, images.url AS image FROM categories JOIN images ON categories.image_id = images.image_id WHERE categories.category_id= ?",
//       [id]
//     )
//     .then(([results]) => {
//       res.send(results);
//     })
//     .catch((e) => console.log(e));
// });

app.get("/images", (req, res) => {
  connection
    .promise()
    .query(
      "SELECT images.image_id, images.title, images.url, products.title AS product, categories.title AS category FROM images LEFT JOIN products ON products.product_id = images.product_id LEFT JOIN categories ON categories.category_id = images.category_id"
    )
    .then(([results]) => {
      res.send(results);
    })
    .catch((e) => console.log(e));
});

app.get("/images/:type", (req, res) => {
  const { type } = req.params;
  if (type === "products") {
    connection
      .promise()
      .query(
        "SELECT images.image_id, images.title, images.url, products.title AS product FROM images JOIN products ON products.product_id = images.product_id"
      )
      .then(([results]) => {
        res.send(results);
      })
      .catch((e) => console.log(e));
  }

  if (type === "categories") {
    connection
      .promise()
      .query(
        "SELECT images.image_id, images.title, images.url, categories.title AS category FROM images JOIN categories ON categories.category_id = images.category_id"
      )
      .then(([results]) => {
        res.send(results);
      })
      .catch((e) => console.log(e));
  }
});

app.listen(server_port, () => {
  console.log("listening..");
});
