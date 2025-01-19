import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String,  trim: true },
    start_date: { type: Date,required: true, trim: true },
    end_date: { type: Date,required: true, trim: true },
    image:{type: String, trim: true},
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "lesson" }],
}, {
    timestamps: true,
    versionKey: false
})
const CourseModel = mongoose.model("course", courseSchema);

export default CourseModel;