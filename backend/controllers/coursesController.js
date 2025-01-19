import CourseModel from '../models/courseModel.js'
import LessonModel from '../models/lessonModel.js';
import mongoose from 'mongoose';


class CourseController {
    static createCourse = async (req, res) => {
        try {
            const { title, description, start_date, end_date ,image} = req.body;
            if (!title || !start_date || !end_date) {
                return res.status(400).json({
                    status: "failed",
                    message: "All fields (title, startdate & enddate) are required.",
                });
            }
            const newCourse = await CourseModel.create({ title, description, start_date, end_date,image });

            res.status(201).json({
                status: "success",
                message: "Course created successfully.",
                data: newCourse,
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: "Error while creating Course.",
                error: error.message,
            });
        }
    }

    static getCourses = async (req, res) => {
        try {
            const courses = await CourseModel.find().populate("lessons");
            res.status(200).json({
                status: "success",
                message: "Courses fetched successfully.",
                data: courses,
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: "Error while getting Courses.",
                error: error.message,
            });
        }
    }

    static updateCourse = async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    status: "failed",
                    message: `Invalid course ID: ${id}.`,
                });
            }

            const updatedCourse = await CourseModel.findByIdAndUpdate(id, req.body, { new: true });
            if (!updatedCourse) {
                return res.status(404).json({
                    status: "failed",
                    message: `Course with found.`,
                });
            }
            res.status(200).json({
                status: "success",
                message: "Courses updated successfully.",
                data: updatedCourse,
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: "Error while updating Courses.",
                error: error.message,
            });
        }
    }

    static deleteCourse = async (req, res) => {
        try {
            const { id } = req.params;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    status: "failed",
                    message: `Invalid course ID: ${id}.`,
                });
            }
            const deletedCourse = await CourseModel.findById(id);
            if (!deletedCourse) {
                return res.status(404).json({
                    status: "failed",
                    message: `Form with ID ${id} not found.`,
                });
            }
            await LessonModel.deleteMany({ course: id });
            await CourseModel.deleteOne();
            res.status(200).json({
                status: "success",
                message: "Course deleted successfully.",
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: "Error while deleting Course.",
                error: error.message,
            });
        }
    }


};
export default CourseController;