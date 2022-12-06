const router = require('express').Router();

router.get("/", (req, res) => {
    connection
      .promise()
      .query(
        "SELECT products.product_id, products.title, products.price, images.url AS image, categories.title AS category FROM products JOIN images ON products.image_id = images.image_id JOIN categories ON products.category_id = categories.category_id"
      )
      .then(([results]) => {
        res.send(results);
      })
      .catch((e) => console.log(e));
  });

  module.exports = router;