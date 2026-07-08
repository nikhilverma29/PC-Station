import Product from '../models/Product.js';

// GET /api/products  — get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({}).select('-__v');
    res.status(200).json({ count: products.length, products });
  } catch (error) {
    console.error('GetAllProducts error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// GET /api/products/:category  — get products by category
export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const validCategories = ['cpu', 'gpu', 'motherboard', 'ram', 'storage', 'pccase', 'psu'];
    if (!validCategories.includes(category)) {
      return res.status(400).json({ message: `Invalid category. Valid options: ${validCategories.join(', ')}` });
    }

    const products = await Product.find({ category }).select('-__v');
    res.status(200).json({ count: products.length, products });
  } catch (error) {
    console.error('GetProductsByCategory error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

// GET /api/products/item/:id  — get single product by its product id string
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id }).select('-__v');
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.status(200).json({ product });
  } catch (error) {
    console.error('GetProductById error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};
