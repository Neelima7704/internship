const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');
require('dotenv').config();

// Sample courses data
const sampleCourses = [
  {
    title: "Complete Web Development Bootcamp",
    description: "Learn web development from scratch with HTML, CSS, JavaScript, React, and Node.js. Build real-world projects and become a full-stack developer.",
    price: 89.99,
    discountedPrice: 69.99,
    category: "Web Development",
    level: "Beginner",
    thumbnail: {
      public_id: "sample_thumbnail_1",
      url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "Introduction to Web Development",
        description: "Overview of web development and course structure",
        video: {
          public_id: "sample_video_1",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 15,
        order: 1
      },
      {
        title: "HTML Fundamentals",
        description: "Learn HTML basics and semantic markup",
        video: {
          public_id: "sample_video_2",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 45,
        order: 2
      },
      {
        title: "CSS Styling",
        description: "Master CSS for beautiful web design",
        video: {
          public_id: "sample_video_3",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 60,
        order: 3
      }
    ],
    totalLectures: 3,
    totalDuration: 120,
    ratings: 4.5,
    numOfReviews: 12,
    isPublished: true
  },
  {
    title: "React.js Masterclass",
    description: "Master React.js with hooks, context, and advanced patterns. Build modern, scalable applications with the most popular JavaScript library.",
    price: 79.99,
    discountedPrice: 59.99,
    category: "Frontend Development",
    level: "Intermediate",
    thumbnail: {
      public_id: "sample_thumbnail_2",
      url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "React Basics",
        description: "Introduction to React and JSX",
        video: {
          public_id: "sample_video_4",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 30,
        order: 1
      },
      {
        title: "Hooks Deep Dive",
        description: "Master useState, useEffect, and custom hooks",
        video: {
          public_id: "sample_video_5",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 75,
        order: 2
      },
      {
        title: "State Management",
        description: "Context API and Redux patterns",
        video: {
          public_id: "sample_video_6",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 90,
        order: 3
      }
    ],
    totalLectures: 3,
    totalDuration: 195,
    ratings: 4.8,
    numOfReviews: 8,
    isPublished: true
  },
  {
    title: "Node.js Backend Development",
    description: "Build robust backend APIs with Node.js, Express, and MongoDB. Learn authentication, file uploads, and deployment strategies.",
    price: 99.99,
    discountedPrice: 79.99,
    category: "Backend Development",
    level: "Intermediate",
    thumbnail: {
      public_id: "sample_thumbnail_3",
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "Node.js Fundamentals",
        description: "Introduction to Node.js and npm",
        video: {
          public_id: "sample_video_7",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 25,
        order: 1
      },
      {
        title: "Express.js Framework",
        description: "Building RESTful APIs with Express",
        video: {
          public_id: "sample_video_8",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 60,
        order: 2
      },
      {
        title: "MongoDB Integration",
        description: "Database design and CRUD operations",
        video: {
          public_id: "sample_video_9",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 80,
        order: 3
      }
    ],
    totalLectures: 3,
    totalDuration: 165,
    ratings: 4.6,
    numOfReviews: 15,
    isPublished: true
  },
  {
    title: "Python for Data Science",
    description: "Learn Python programming for data analysis, machine learning, and scientific computing. Master pandas, numpy, and matplotlib.",
    price: 119.99,
    discountedPrice: 89.99,
    category: "Data Science",
    level: "Beginner",
    thumbnail: {
      public_id: "sample_thumbnail_4",
      url: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "Python Basics",
        description: "Introduction to Python programming",
        video: {
          public_id: "sample_video_10",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 40,
        order: 1
      },
      {
        title: "Data Manipulation with Pandas",
        description: "Working with dataframes and series",
        video: {
          public_id: "sample_video_11",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 90,
        order: 2
      },
      {
        title: "Data Visualization",
        description: "Creating charts and graphs with matplotlib",
        video: {
          public_id: "sample_video_12",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 70,
        order: 3
      }
    ],
    totalLectures: 3,
    totalDuration: 200,
    ratings: 4.7,
    numOfReviews: 20,
    isPublished: true
  },
  {
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile apps with React Native. Learn to create iOS and Android apps with a single codebase.",
    price: 129.99,
    discountedPrice: 99.99,
    category: "Mobile Development",
    level: "Advanced",
    thumbnail: {
      public_id: "sample_thumbnail_5",
      url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "React Native Setup",
        description: "Environment setup and project creation",
        video: {
          public_id: "sample_video_13",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 35,
        order: 1
      },
      {
        title: "Components and Navigation",
        description: "Building UI components and navigation",
        video: {
          public_id: "sample_video_14",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 85,
        order: 2
      },
      {
        title: "State Management",
        description: "Managing app state and data flow",
        video: {
          public_id: "sample_video_15",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 95,
        order: 3
      }
    ],
    totalLectures: 3,
    totalDuration: 215,
    ratings: 4.9,
    numOfReviews: 6,
    isPublished: true
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch((err) => console.error('MongoDB connection error:', err));

// Seed function
const seedCourses = async () => {
  try {
    // Clear existing courses
    await Course.deleteMany({});
    console.log('Cleared existing courses');

    // Find or create a default instructor
    let instructor = await User.findOne({ role: 'instructor' });
    if (!instructor) {
      instructor = await User.create({
        name: 'John Doe',
        email: 'instructor@example.com',
        password: 'password123',
        role: 'instructor'
      });
      console.log('Created default instructor');
    }

    // Add instructor ID to all courses
    const coursesWithInstructor = sampleCourses.map(course => ({
      ...course,
      instructor: instructor._id
    }));

    // Insert courses
    const insertedCourses = await Course.insertMany(coursesWithInstructor);
    console.log(`Successfully seeded ${insertedCourses.length} courses`);

    // Display seeded courses
    console.log('\nSeeded courses:');
    insertedCourses.forEach(course => {
      console.log(`- ${course.title} ($${course.price})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding courses:', error);
    process.exit(1);
  }
};

// Run the seed function
seedCourses(); 