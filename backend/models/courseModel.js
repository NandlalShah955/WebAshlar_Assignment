import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    start_date: { type: Date, trim: true },
    end_date: { type: Date, trim: true },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
}, {
    timestamps: true,
    versionKey: false
})
const CourseModel = mongoose.model("course", courseSchema);

export default CourseModel;