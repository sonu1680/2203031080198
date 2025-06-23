import mongoose from "mongoose";

const clickHistorySchema = new mongoose.Schema({
  linkId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Link",
    required: true,
  },
  clickedAt: {
    type: Date,
    default: Date.now,
  },
  source: {
    type: String, // e.g., "Chrome", "Android", etc.
  },
  ip: {
    type: String, //ip address
  },
 
});

const ClickHistory = mongoose.model("ClickHistory", clickHistorySchema);
export default ClickHistory;
