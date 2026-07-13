import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  image: {
    type: String, // Cloudinary image URL
  },

  price: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Service", ServiceSchema);
