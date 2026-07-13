import "dotenv/config";   // ✅ ONLY THIS

import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import appointmentRoutes from "./routes/appointmentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import aiAssistantRoutes from "./routes/aiAssistantRoutes.js";

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/users", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/ai", aiAssistantRoutes);

/* ROOT TEST */
app.get("/", (req, res) => {
  res.send("TailorHub Backend Running 🚀");
});

/* DB CONNECT */
connectDB();

/* SERVER */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
  console.log("CLOUDINARY_CLOUD_NAME:", process.env.CLOUDINARY_CLOUD_NAME);
});
