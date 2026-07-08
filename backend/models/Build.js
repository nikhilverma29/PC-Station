import mongoose from 'mongoose';

// A single component selection within a build
const selectionSchema = new mongoose.Schema({}, { strict: false });

const buildSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: [true, 'Build name is required'],
      trim: true,
      minlength: [1, 'Build name cannot be empty'],
      maxlength: [100, 'Build name cannot exceed 100 characters'],
    },
    selections: {
      cpu: { type: selectionSchema, default: null },
      gpu: { type: selectionSchema, default: null },
      motherboard: { type: selectionSchema, default: null },
      ram: { type: selectionSchema, default: null },
      storage: { type: selectionSchema, default: null },
      pccase: { type: selectionSchema, default: null },
      psu: { type: selectionSchema, default: null },
    },
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for fast user-specific build lookups
buildSchema.index({ user: 1 });

const Build = mongoose.model('Build', buildSchema);

export default Build;
