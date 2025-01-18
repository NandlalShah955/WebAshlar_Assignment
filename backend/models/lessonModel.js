import mongoose from "mongoose";
const LessonSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
}, {
    timestamps: true,
    versionKey: false
})
const LessonModel = mongoose.model("lesson", LessonSchema);

export default LessonModel;