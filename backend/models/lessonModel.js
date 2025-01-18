import mongoose from "mongoose";
const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "course", required: true },
}, {
    timestamps: true,
    versionKey: false
})
const LessonModel = mongoose.model("lesson", lessonSchema);

export default LessonModel;