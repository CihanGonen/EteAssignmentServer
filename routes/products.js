const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { getOneElementWithId } = require("../middlewares/generalMiddleware");

const getProductWithId = (req, res, next) =>
  getOneElementWithId(req, res, next, "product");

router.get("/", getAllProducts);
router.get("/:id", getProductWithId, getProduct);
router.post("/", createProduct);
router.patch("/:id", getProductWithId, updateProduct);
router.delete("/:id", getProductWithId, deleteProduct);

module.exports = router;
