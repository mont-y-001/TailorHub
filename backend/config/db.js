import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Try primary URI first
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log("MongoDB Connected (primary)");
  } catch (err) {
    console.warn("Primary MongoDB connection failed, attempting fallback...");
    try {
      // Fallback non‑SRV URI (set in .env as MONGO_URI_FALLBACK)
      await mongoose.connect(process.env.MONGO_URI_FALLBACK, {
        serverSelectionTimeoutMS: 10000,
      });
      console.log("MongoDB Connected (fallback)");
    } catch (fallbackErr) {
      console.error("MongoDB connection failed:", fallbackErr.message);
      if (process.env.NODE_ENV === "production") {
        console.error("Critical: DB unavailable in production – aborting.");
        process.exit(1);
      }
      console.warn("Continuing without MongoDB – auth, services, and appointments will not work until DB is reachable.");
    }
  }
    console.error("MongoDB connection failed:", err.message);
    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
    console.warn("Continuing without MongoDB — auth, services, and appointments will not work until DB is reachable.");
  }
};

export default connectDB;
