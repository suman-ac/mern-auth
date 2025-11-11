// scripts/seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const run = async () => {
  try {
    if (!process.env.SEED_ADMIN_EMAIL || !process.env.SEED_ADMIN_PASSWORD) {
      console.error('Please set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env to seed admin.');
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGO_URI);
    const email = process.env.SEED_ADMIN_EMAIL;
    const password = process.env.SEED_ADMIN_PASSWORD;
    let user = await User.findOne({ email });
    if (user) {
      console.log('Admin user already exists:', email);
      process.exit(0);
    }
    user = new User({ name: 'Admin', email, password, role: 'admin' });
    await user.save();
    console.log('✅ Admin seeded:', email);
    console.log('Use this password to login and demo admin routes.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

run();
