const router = require("express").Router();

const productController = require("../controllers/productController");

router.get("/", productController.getProducts);

router.get("/:productId", productController.getProductById);


module.exports = router;