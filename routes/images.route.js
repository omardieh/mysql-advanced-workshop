const { getProducts, getProductById } = require("../controllers/products");
const router = require("express").Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

module.exports = router;
