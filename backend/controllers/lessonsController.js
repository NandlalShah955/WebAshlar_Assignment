import CourseModel from '../models/courseModel.js'
import LessonModel from '../models/lessonModel.js'
import mongoose from 'mongoose';

class LessonController {
    static createLesson = async (req, res) => {
        try {
            const { id } = req.params;
            const { title, content } = req.body;
            const course = await CourseModel.findById(id);
            if (!course) { 
                return res.status(404).json({ status: "failed", message: "Course not found" });
             }

            const newLesson = await LessonModel.create({ title, content, course: id });
            course.lessons.push(newLesson._id);
            await course.save();
            res.status(201).json({
                status: "success",
                message: "Lesson added successfully.",
                data: newLesson,
            });
           
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: "Error while adding Lesson .",
                error: error.message,
            });
        }
    }

    static getLessons = async (req, res) => {
        try {
            const { id } = req.params;
            const course = await CourseModel.findById(id).populate("lessons");
            if (!course) { 
                return res.status(404).json({ status: "failed", message: "Course not found" });
             }
      
            res.status(200).json({
                status: "success",
                message: "Lessons fetched successfully.",
                data: course,
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: "Error while getting Lessons.",
                error: error.message,
            });
        }
    }

    static updateLesson = async (req, res) => {
        try {
            const { lessonid } = req.params;
            const updatedLesson = await LessonModel.findByIdAndUpdate(lessonid, req.body, { new: true });
            if (!updatedLesson){ 
                return res.status(404).json({status: "failed", message: "Lesson not found" })
            };
            res.status(200).json({
                status: "success",
                message: "Lesson updated successfully.",
                data: updatedLesson,
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: "Error while updating Lesson.",
                error: error.message,
            });
        }
    }

    static deleteLesson = async (req, res) => {
        try {
            const { lessonid } = req.params;
            const lesson = await LessonModel.findById(lessonid);
            if (!lesson) {
                return res.status(404).json({ status: "failed", message: "Lesson not found" })
            };

            await CourseModel.findByIdAndUpdate(lesson.course, { $pull: { lessons: lessonid } });
            await lesson.deleteOne();
            res.status(200).json({
                status: "success",
                message: "lesson deleted successfully.",
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: "Error while deleting lesson.",
                error: error.message,
            });
        }
    }

}
export default LessonController;
