import mongoose from 'mongoose';

const scoreSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    taskId: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    maxPoints: {
      type: Number,
      required: true,
    },
    percentage: Number,
    attempts: {
      type: Number,
      default: 0,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedAt: Date,
    feedback: String,
  },
  { timestamps: true }
);

// Compound index for userId and taskId
scoreSchema.index({ userId: 1, taskId: 1 }, { unique: true });

export default mongoose.model('Score', scoreSchema);
