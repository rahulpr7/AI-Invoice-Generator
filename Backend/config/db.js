import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.DATABASE_URL || process.env.MONGO_URI || "";
    if (!uri) throw new Error("DATABASE_URL / MONGO_URI is not set");
    await mongoose.connect(uri, { autoIndex: true });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // rethrow so callers can handle and avoid starting the server when DB is down
    throw error;
  }
};

export default connectDB;