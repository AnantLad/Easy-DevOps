import mongoose from "mongoose";

const taskProgressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
    },

    taskId: String,

    completed: {
        type : Boolean,
        default: false,
    },
    
    score: {
        type: Number,
        default: 0,
    },

    attempts: {
        type: Number,
        default: 0,
    },

    completedAt: Date,
});

export default mongoose.model("TaskProgress", taskProgressSchema);