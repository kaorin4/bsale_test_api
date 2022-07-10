const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);
router.get('/category/:id', productController.getProductsByCategory);
router.get('/search?', productController.getProductsByName);

module.exports = router;