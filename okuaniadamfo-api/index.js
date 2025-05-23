import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Debug: Check if environment variables are loaded
console.log('Environment check:');
console.log('PORT:', process.env.PORT || '8080 (default)');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Found ' : 'Missing ');

// Create express app
const okuaniadamfuapp = express();

// Apply middleware
okuaniadamfuapp.use(cors({ 
  credentials: true, 
  origin: '*'
}));
okuaniadamfuapp.use(express.json({ limit: "50mb" }));
okuaniadamfuapp.use(express.urlencoded({ limit: "50mb", extended: true }));

// Basic test route
okuaniadamfuapp.get('/', (req, res) => {
  res.json({ 
    message: 'OkuaniAdamfu API is running!',
    version: '1.0.0',
    status: 'healthy'
  });
});

// Health check endpoint
okuaniadamfuapp.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// DB Connection
if (!process.env.MONGO_URI) {
  console.error(' MONGO_URI is not defined in environment variables');
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

// Listen for incoming requests
const port = process.env.PORT || 8080;

okuaniadamfuapp.listen(port, () => {
  console.log(` OkuaniAdamfu API Server Started on port ${port}!`);
  console.log(` Local URL: http://localhost:${port}`);
});

export default okuaniadamfuapp;
