/**
 * Quick utility: delete a user by email from MongoDB.
 * Usage: node scripts/deleteUser.js <email>
 * Example: node scripts/deleteUser.js nikhilverma2918@gmail.com
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });

import User from '../models/User.js';

const email = process.argv[2];
if (!email) {
  console.error('Usage: node scripts/deleteUser.js <email>');
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URI);
console.log('✅ Connected to MongoDB');

const result = await User.deleteOne({ email });
if (result.deletedCount === 0) {
  console.log(`⚠️  No user found with email: ${email}`);
} else {
  console.log(`✅ Deleted user: ${email}`);
}

await mongoose.disconnect();
process.exit(0);
