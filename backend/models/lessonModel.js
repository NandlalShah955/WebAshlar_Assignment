import mongoose from "mongoose";
const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String,  trim: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "course", required: true },
    completed:{type:Boolean,default:false},
}, {
    timestamps: true,
    versionKey: false
})
const LessonModel = mongoose.model("lesson", lessonSchema);

export default LessonModel;