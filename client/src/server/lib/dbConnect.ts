import mongoose from 'mongoose';

declare global {
  // This must be `var` to work globally across modules in Node.js
  var mongoose: any;
}

// MongoDB connection string from environment variables
const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in your .env file');
}

// Global caching to prevent redundant connections in serverless environments
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  console.log('Attempting to connect to MongoDB...');

  // Use cached connection if available
  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating a new MongoDB connection...');
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    };

    // Wrap the connection promise with a timeout
    const connectWithTimeout = new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('MongoDB connection timed out.'));
      }, 5000); // 5-second timeout

      mongoose
        .connect(MONGODB_URI, opts)
        .then((mongoose) => {
          clearTimeout(timeout);
          resolve(mongoose);
        })
        .catch((err) => {
          clearTimeout(timeout);
          reject(err);
        });
    });

    cached.promise = connectWithTimeout;
  }

  try {
    cached.conn = await cached.promise;
    console.log('MongoDB connected successfully');
  } catch (error) {
    const err = error as Error; // Explicitly cast error to Error
    console.error('MongoDB connection failed:', err.message);
    cached.promise = null; // Reset cached promise on failure
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
