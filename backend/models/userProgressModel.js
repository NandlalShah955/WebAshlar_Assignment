import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  completedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }], 
}, {
    timestamps: true,
    versionKey: false
})
const UserProgressModel = mongoose.model("userprogress", userProgressSchema);

export default UserProgressModel;

