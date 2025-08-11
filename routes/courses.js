const express = require('express');
const router = express.Router();
const { 
  createCourse, 
  getAllCourses, 
  getCourseById, 
  updateCourse, 
  deleteCourse, 
  addLecture, 
  getInstructorCourses,
  enrollCourse,
  getEnrolledCourses,
  updateCourseProgress,
  checkEnrollmentStatus
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// Protected routes
router.use(protect);

// User enrollment routes
router.post('/:courseId/enroll', enrollCourse);
router.get('/enrolled/my-courses', getEnrolledCourses);
router.get('/:courseId/enrollment-status', checkEnrollmentStatus);
router.put('/:courseId/progress', updateCourseProgress);

// Instructor/Admin routes
router.post('/', authorize('instructor', 'admin'), createCourse);
router.put('/:id', authorize('instructor', 'admin'), updateCourse);
router.delete('/:id', authorize('instructor', 'admin'), deleteCourse);
router.post('/:id/lectures', authorize('instructor', 'admin'), addLecture);
router.get('/instructor/my-courses', authorize('instructor', 'admin'), getInstructorCourses);

module.exports = router; 