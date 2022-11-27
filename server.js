require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const connection = require("./db");

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

app.get("/products", (req, res) => {
  connection
    .promise()
    .query(
      "SELECT products.product_id, products.title, products.price, images.url, categories.title AS category_title FROM products INNER JOIN images ON products.image_id = images.image_id LEFT JOIN categories ON products.category_id = categories.category_id"
    )
    .then(([results]) => {
      res.send(results);
    })
    .catch((e) => console.log(e));
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  connection
    .promise()
    .query(
      "SELECT products.product_id, products.title, products.price, images.url, categories.title AS category_title FROM products INNER JOIN images ON products.image_id = images.image_id LEFT JOIN categories ON products.category_id = categories.category_id WHERE products.product_id= ?",
      [id]
    )
    .then(([results]) => {
      res.send(results);
    })
    .catch((e) => console.log(e));
});

app.get("/categories", (req, res) => {
  connection
    .promise()
    .query(
      "SELECT categories.category_id, categories.title, images.url FROM categories LEFT JOIN images ON categories.image_id = images.image_id"
    )
    .then(([results]) => {
      res.send(results);
    })
    .catch((e) => console.log(e));
});

app.get("/categories/:id", (req, res) => {
  const { id } = req.params;
  connection
    .promise()
    .query(
      "SELECT categories.category_id, categories.title, images.url FROM categories LEFT JOIN images ON categories.image_id = images.image_id WHERE categories.category_id= ?",
      [id]
    )
    .then(([results]) => {
      res.send(results);
    })
    .catch((e) => console.log(e));
});

app.listen(server_port, () => {
  console.log("listening..");
});
