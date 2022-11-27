require("dotenv").config();
const express = require("express");
const connection = require("./db");
const { server_port } = process.env;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Main Route");
});

app.listen(server_port, () => {
  console.log("listening..");
});
