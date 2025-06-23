import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  fullLink: {
    type: String,
    required: true,
  },
  shortLink: {
    type: String,
    required: true,
    unique: true,
  },
  expiry: {
    type: Date,
    default: () => Date.now() + 30 * 60 * 1000, // 30 minutes
    index: { expires: 0 }, 
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Link = mongoose.model("Link", linkSchema);
export default Link;
