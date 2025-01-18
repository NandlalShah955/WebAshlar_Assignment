import CourseController from '../controllers/coursesController.js';
import LessonController from '../controllers/lessonsController.js';
import express from 'express';
const router=express.Router();
router.post('/', CourseController.createCourse);
router.get('/', CourseController.getCourses);
router.put('/:id', CourseController.updateCourse);
router.delete('/:id', CourseController.deleteCourse);
router.post('/:id/lessons',LessonController.createLesson);
router.get('/:id/lessons',LessonController.getLessons);

export default router;