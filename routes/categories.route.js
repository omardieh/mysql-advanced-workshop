const { getCategories, getCategoryById } = require("../controllers/categories");
const router = require("express").Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);

module.exports = router;
