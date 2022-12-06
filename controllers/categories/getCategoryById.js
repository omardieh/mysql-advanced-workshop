const connection = require("../../db");

const getCategoryById = async (req, res) => {
  const query =
    "SELECT categories.category_id, categories.title, images.url AS image FROM categories JOIN images ON categories.image_id = images.image_id WHERE categories.category_id= ?";
  const { id } = req.params;
  connection
    .promise()
    .query(query, [id])
    .then(([results]) => {
      res.send(results);
    })
    .catch((e) => console.log(e));
};

module.exports = getCategoryById;
