import mongoose from 'mongoose';

// Flexible specs schema — different categories have different fields
const specsSchema = new mongoose.Schema({}, { strict: false });

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['cpu', 'gpu', 'motherboard', 'ram', 'storage', 'pccase', 'psu'],
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      default: '',
    },
    specs: {
      type: specsSchema,
      required: true,
    },
    popular: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast category lookups
productSchema.index({ category: 1 });
productSchema.index({ brand: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
