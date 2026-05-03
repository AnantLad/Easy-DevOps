import mongoose from "mongoose";

const labSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  taskId: {
    type: String,
    required: true,
  },
  containerId: String,
  status: {
    type: String,
    enum: ["starting", "running", "stopped", "failed"],
    default: "starting"
  },
  startTime: { type: Date, default: Date.now },
  expireTime: Date,
  endTime: Date,
  logs: [String],
  errorMessage: String,
}, { timestamps: true });

// Index for efficient querying
labSessionSchema.index({ expireTime: 1, status: 1 });

export default mongoose.models.LabSession || mongoose.model("LabSession", labSessionSchema);
