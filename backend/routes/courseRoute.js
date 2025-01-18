import CourseController from '../controllers/coursesController.js';
import express from 'express';
const router=express.Router();
router.post("/", CourseController.createCourse);
router.get("/", CourseController.getCourses);
router.put("/:id", CourseController.updateCourse);
router.delete("/:id", CourseController.deleteCourse);
export default router;