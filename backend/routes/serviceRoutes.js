import express from "express";
import Service from "../models/Service.js";
import { protect } from "../middleware/auth.js";
import cloudinary from "../config/cloudinary.js";
import upload from "../middleware/upload.js";

const router = express.Router();

/* ================= ADD SERVICE ================= */
router.post(
  "/",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description, price } = req.body;

      if (!title || !price) {
        return res.status(400).json({ message: "Title & price required" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      // 🔥 Upload to Cloudinary
      const file = req.file;

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "services",
            resource_type: "image",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(file.buffer);
      });

      const service = await Service.create({
        title,
        description,
        price,
        image: result.secure_url, // ✅ CLOUDINARY URL
        provider: req.user._id,
      });

      res.status(201).json({ success: true, service });
    } catch (err) {
      console.error("ADD SERVICE ERROR:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ================= GET ALL SERVICES ================= */
router.get("/", async (req, res) => {
  const services = await Service.find().populate("provider", "name");
  res.json(services);
});

/* ================= GET MY SERVICES ================= */
router.get("/my", protect, async (req, res) => {
  const services = await Service.find({ provider: req.user._id });
  res.json(services);
});

/* ================= UPDATE SERVICE ================= */
router.put(
  "/:id",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {
      const service = await Service.findById(req.params.id);

      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      if (service.provider.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized" });
      }

      const { title, description, price } = req.body;

      if (title) service.title = title;
      if (description) service.description = description;
      if (price) service.price = price;

      if (req.file) {
        const file = req.file;

        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: "services",
              resource_type: "image",
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(file.buffer);
        });

        service.image = result.secure_url;
      }

      await service.save();
      res.json({ success: true, service });
    } catch (err) {
      console.error("UPDATE SERVICE ERROR:", err);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ================= DELETE SERVICE ================= */
router.delete("/:id", protect, async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    if (service.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await service.deleteOne();
    res.json({ success: true, message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
