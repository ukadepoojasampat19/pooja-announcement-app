import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    shopId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Announcement =
  mongoose.models.Announcement ||
  mongoose.model("Announcement", announcementSchema);