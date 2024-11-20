const express = require('express');
const productController = require('../controllers/productController');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', productController.getProducts);
router.post('/', protect, productController.createProduct);
router.put('/:id', protect, productController.updateProduct);
router.delete('/:id', protect, productController.deleteProduct);

module.exports = router;