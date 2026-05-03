import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    category: {
      type: String,
      enum: ['linux', 'docker', 'kubernetes', 'devops'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      default: 'easy',
    },
    points: {
      type: Number,
      default: 10,
    },
    validator: {
      type: String,
      required: true,
    },
    instructions: String,
    hints: [String],
    resources: [String],
    order: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);
