const Course = require('../models/Course');
const User = require('../models/User');

// Create new course
exports.createCourse = async (req, res) => {
  try {
    const courseData = {
      ...req.body,
      instructor: req.user.id
    };

    const course = await Course.create(courseData);

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .populate('instructor', 'name')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single course
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name')
      .populate('reviews.user', 'name');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    res.status(200).json({
      success: true,
      course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user is the instructor
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this course'
      });
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user is the instructor
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this course'
      });
    }

    await course.remove();

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Add lecture to course
exports.addLecture = async (req, res) => {
  try {
    const { title, description, video, duration } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if user is the instructor
    if (course.instructor.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to add lectures to this course'
      });
    }

    const lecture = {
      title,
      description,
      video,
      duration,
      order: course.lectures.length + 1
    };

    course.lectures.push(lecture);
    course.totalLectures = course.lectures.length;
    course.totalDuration = course.lectures.reduce((total, lecture) => total + lecture.duration, 0);

    await course.save();

    res.status(200).json({
      success: true,
      message: 'Lecture added successfully',
      course
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get instructor courses
exports.getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      courses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Enroll in a course
exports.enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { name, email, phone, address } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!name || !email || !phone || !address) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required enrollment details'
      });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if course is published
    if (!course.isPublished) {
      return res.status(400).json({
        success: false,
        message: 'Course is not available for enrollment'
      });
    }

    // Check if user is already enrolled
    const user = await User.findById(userId);
    const isAlreadyEnrolled = user.enrolledCourses.some(
      enrollment => enrollment.courseId.toString() === courseId
    );

    if (isAlreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: 'You are already enrolled in this course'
      });
    }

    // Update user details if provided
    if (name) user.name = name;
    if (email) user.email = email;

    // Add course to user's enrolled courses with enrollment details
    user.enrolledCourses.push({
      courseId: courseId,
      progress: 0,
      completedLectures: [],
      enrolledAt: new Date(),
      enrollmentDetails: {
        name,
        email,
        phone,
        address
      }
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Successfully enrolled in the course',
      enrolledCourse: {
        courseId: courseId,
        courseTitle: course.title,
        enrolledAt: new Date(),
        enrollmentDetails: {
          name,
          email,
          phone,
          address
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get user's enrolled courses
exports.getEnrolledCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'enrolledCourses.courseId',
        select: 'title description thumbnail price category level totalLectures totalDuration'
      });

    res.status(200).json({
      success: true,
      enrolledCourses: user.enrolledCourses
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update course progress
exports.updateCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { lectureId, completed } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const enrollment = user.enrolledCourses.find(
      enrollment => enrollment.courseId.toString() === courseId
    );

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: 'You are not enrolled in this course'
      });
    }

    if (completed) {
      // Add lecture to completed lectures if not already completed
      if (!enrollment.completedLectures.includes(lectureId)) {
        enrollment.completedLectures.push(lectureId);
      }
    } else {
      // Remove lecture from completed lectures
      enrollment.completedLectures = enrollment.completedLectures.filter(
        lecture => lecture.toString() !== lectureId
      );
    }

    // Calculate progress percentage
    const course = await Course.findById(courseId);
    const totalLectures = course.lectures.length;
    const completedCount = enrollment.completedLectures.length;
    enrollment.progress = totalLectures > 0 ? Math.round((completedCount / totalLectures) * 100) : 0;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Progress updated successfully',
      progress: enrollment.progress,
      completedLectures: enrollment.completedLectures
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Check if user is enrolled in a specific course
exports.checkEnrollmentStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;

    const user = await User.findById(userId);
    const isEnrolled = user.enrolledCourses.some(
      enrollment => enrollment.courseId.toString() === courseId
    );

    res.status(200).json({
      success: true,
      isEnrolled
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 