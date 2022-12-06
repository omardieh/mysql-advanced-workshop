const connection = require("../../db");

const getProductById = async (req, res) => {
  const query =
    "SELECT products.product_id, products.title, products.price, images.url AS image, categories.title AS category FROM products INNER JOIN images ON products.image_id = images.image_id JOIN categories ON products.category_id = categories.category_id WHERE products.product_id= ?";
  const { id } = req.params;
  connection
    .promise()
    .query(query, [id])
    .then(([results]) => {
      res.send(results);
    })
    .catch((e) => console.log(e));
};

module.exports = getProductById;
