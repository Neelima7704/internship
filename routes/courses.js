const express = require('express');
const router = express.Router();
const { 
  createCourse, 
  getAllCourses, 
  getCourseById, 
  updateCourse, 
  deleteCourse, 
  addLecture, 
  getInstructorCourses 
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// Protected routes
router.use(protect);

// Instructor/Admin routes
router.post('/', authorize('instructor', 'admin'), createCourse);
router.put('/:id', authorize('instructor', 'admin'), updateCourse);
router.delete('/:id', authorize('instructor', 'admin'), deleteCourse);
router.post('/:id/lectures', authorize('instructor', 'admin'), addLecture);
router.get('/instructor/my-courses', authorize('instructor', 'admin'), getInstructorCourses);

module.exports = router; 