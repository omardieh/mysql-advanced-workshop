const connection = require("../../db");

const getCategories = async (req, res) => {
  const query =
    "SELECT categories.category_id, categories.title, images.url AS image FROM categories JOIN images ON categories.image_id = images.image_id";
  connection
    .promise()
    .query(query)
    .then(([results]) => {
      res.send(results);
    })
    .catch((e) => console.log(e));
};
module.exports = getCategories;
