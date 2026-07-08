import express from 'express';
import {
  getAllProducts,
  getProductsByCategory,
  getProductById,
} from '../controllers/products.controller.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/item/:id', getProductById);
router.get('/:category', getProductsByCategory);

export default router;
