/**
 * PC Station — Database Seeder
 *
 * Imports all product data from the frontend products.js
 * and inserts them into MongoDB.
 *
 * Run: node backend/scripts/seed.js
 */

import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config({ path: join(dirname(fileURLToPath(import.meta.url)), '../.env') });

import Product from '../models/Product.js';

// Import all product arrays from the frontend data file
import {
  cpus,
  gpus,
  motherboards,
  ram,
  storage,
  cases,
  psus,
} from '../../src/data/products.js';

const allProducts = [
  ...cpus,
  ...gpus,
  ...motherboards,
  ...ram,
  ...storage,
  ...cases,
  ...psus,
];

const seedDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing products
    const deleted = await Product.deleteMany({});
    console.log(`🗑️  Cleared ${deleted.deletedCount} existing products`);

    // Insert all products
    const inserted = await Product.insertMany(allProducts, { ordered: false });
    console.log(`✅ Seeded ${inserted.length} products into MongoDB`);

    // Summary by category
    const categories = [...new Set(allProducts.map(p => p.category))];
    for (const cat of categories) {
      const count = allProducts.filter(p => p.category === cat).length;
      console.log(`   ${cat}: ${count} products`);
    }

    console.log('\n🎉 Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
};

seedDB();
