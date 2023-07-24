// @ts-nocheck
import mongoose from "mongoose";

// MongoDB Connection

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const MONGO_URI = process.env.MONGO_URI;
    if (MONGO_URI) await mongoose.connect(MONGO_URI);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error(`An unexpected error occurred: ${error}`);
    }
  }

  const connection = mongoose.connection;

  if (connection.readyState >= 1) {
    console.log("MongoDB Connected");
    return;
  } else {
    connection.on("error", () => {
      console.log("MongoDB Connection Error");
    });
  }
};

export default connectDB;
