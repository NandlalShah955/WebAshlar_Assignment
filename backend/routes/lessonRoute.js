import LessonController from '../controllers/lessonsController.js';
import express from 'express';
const router=express.Router();

router.put('/:lessonid',LessonController.updateLesson);
router.delete('/:lessonid',LessonController.deleteLesson);
router.post('/:lessonid/complete',LessonController.markLessonCompleted);
export default router;