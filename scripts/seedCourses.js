const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');
require('dotenv').config();

// MERN Stack focused courses data
const sampleCourses = [
  {
    title: "MERN Stack Complete Course - MongoDB, Express, React, Node.js",
    description: "Master the complete MERN stack from scratch. Build full-stack web applications with MongoDB, Express.js, React.js, and Node.js. Learn authentication, API development, and deployment.",
    price: 149.99,
    discountedPrice: 119.99,
    category: "Full Stack Development",
    level: "Advanced",
    externalResources: {
      youtubePlaylist: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6sv3GrAJQLRP6x",
      websiteUrl: "https://www.udemy.com/course/mern-stack-complete-guide/",
      documentationUrl: "https://developer.mozilla.org/en-US/docs/Learn/Full-Stack",
      githubRepo: "https://github.com/your-username/mern-stack-course",
      additionalLinks: [
        {
          title: "MongoDB Official Docs",
          url: "https://docs.mongodb.com/",
          description: "Official MongoDB documentation and tutorials"
        },
        {
          title: "Express.js Guide",
          url: "https://expressjs.com/en/guide/routing.html",
          description: "Express.js routing and middleware guide"
        }
      ]
    },
    thumbnail: {
      public_id: "mern_complete",
      url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "Introduction to MERN Stack",
        description: "Overview of MongoDB, Express, React, and Node.js ecosystem",
        video: {
          public_id: "intro_mern",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 20,
        order: 1
      },
      {
        title: "MongoDB Database Design",
        description: "Learn MongoDB schema design, CRUD operations, and aggregation",
        video: {
          public_id: "mongodb_basics",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 60,
        order: 2
      },
      {
        title: "Express.js Backend Development",
        description: "Build RESTful APIs with Express.js, middleware, and error handling",
        video: {
          public_id: "express_backend",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 90,
        order: 3
      },
      {
        title: "React.js Frontend Development",
        description: "Create dynamic user interfaces with React hooks and components",
        video: {
          public_id: "react_frontend",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 120,
        order: 4
      },
      {
        title: "Full Stack Integration",
        description: "Connect frontend and backend, implement authentication, and deploy",
        video: {
          public_id: "fullstack_integration",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 100,
        order: 5
      }
    ],
    totalLectures: 5,
    totalDuration: 390,
    ratings: 4.8,
    numOfReviews: 45,
    isPublished: true
  },
  {
    title: "React.js Masterclass - From Basics to Advanced",
    description: "Comprehensive React.js course covering hooks, context, Redux, performance optimization, and modern React patterns. Build real-world applications.",
    price: 99.99,
    discountedPrice: 79.99,
    category: "Frontend Development",
    level: "Intermediate",
    externalResources: {
      youtubePlaylist: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gXdV64JQnx1y_17mZVz9VE",
      websiteUrl: "https://react.dev/learn",
      documentationUrl: "https://react.dev/reference/react",
      githubRepo: "https://github.com/your-username/react-masterclass",
      additionalLinks: [
        {
          title: "React Hooks Reference",
          url: "https://react.dev/reference/react/hooks",
          description: "Complete guide to React Hooks"
        },
        {
          title: "Redux Toolkit",
          url: "https://redux-toolkit.js.org/",
          description: "Official Redux Toolkit documentation"
        }
      ]
    },
    thumbnail: {
      public_id: "react_masterclass",
      url: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "React Fundamentals",
        description: "Components, JSX, props, and state management",
        video: {
          public_id: "react_fundamentals",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 45,
        order: 1
      },
      {
        title: "React Hooks Deep Dive",
        description: "useState, useEffect, useContext, and custom hooks",
        video: {
          public_id: "react_hooks",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 90,
        order: 2
      },
      {
        title: "State Management with Redux",
        description: "Redux Toolkit, actions, reducers, and middleware",
        video: {
          public_id: "redux_state",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 120,
        order: 3
      },
      {
        title: "Advanced React Patterns",
        description: "Performance optimization, code splitting, and best practices",
        video: {
          public_id: "react_patterns",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 75,
        order: 4
      }
    ],
    totalLectures: 4,
    totalDuration: 330,
    ratings: 4.9,
    numOfReviews: 32,
    isPublished: true
  },
  {
    title: "Node.js & Express.js Backend Development",
    description: "Build scalable backend APIs with Node.js and Express.js. Learn authentication, database integration, file uploads, testing, and deployment strategies.",
    price: 89.99,
    discountedPrice: 69.99,
    category: "Backend Development",
    level: "Intermediate",
    externalResources: {
      youtubePlaylist: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gUgr39QYmDKBz3DzYu7KYx",
      websiteUrl: "https://nodejs.org/en/learn/",
      documentationUrl: "https://expressjs.com/en/4x/api.html",
      githubRepo: "https://github.com/your-username/node-express-course",
      additionalLinks: [
        {
          title: "Node.js Best Practices",
          url: "https://github.com/goldbergyoni/nodebestpractices",
          description: "Comprehensive Node.js best practices guide"
        },
        {
          title: "JWT Authentication",
          url: "https://jwt.io/introduction",
          description: "JWT token authentication guide"
        }
      ]
    },
    thumbnail: {
      public_id: "node_express",
      url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "Node.js Fundamentals",
        description: "Event loop, modules, npm, and asynchronous programming",
        video: {
          public_id: "node_fundamentals",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 50,
        order: 1
      },
      {
        title: "Express.js Framework",
        description: "Routing, middleware, error handling, and RESTful APIs",
        video: {
          public_id: "express_framework",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 80,
        order: 2
      },
      {
        title: "Authentication & Authorization",
        description: "JWT tokens, bcrypt, role-based access control",
        video: {
          public_id: "auth_jwt",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 70,
        order: 3
      },
      {
        title: "Database Integration",
        description: "MongoDB with Mongoose, validation, and relationships",
        video: {
          public_id: "database_integration",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 90,
        order: 4
      },
      {
        title: "Testing & Deployment",
        description: "Unit testing, API testing, and production deployment",
        video: {
          public_id: "testing_deployment",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 60,
        order: 5
      }
    ],
    totalLectures: 5,
    totalDuration: 350,
    ratings: 4.7,
    numOfReviews: 28,
    isPublished: true
  },
  {
    title: "MongoDB Database Mastery",
    description: "Master MongoDB database design, CRUD operations, aggregation pipelines, indexing, and performance optimization for MERN stack applications.",
    price: 79.99,
    discountedPrice: 59.99,
    category: "Database Development",
    level: "Intermediate",
    externalResources: {
      youtubePlaylist: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gUgr39QYmDKBz3DzYu7KYx",
      websiteUrl: "https://university.mongodb.com/",
      documentationUrl: "https://docs.mongodb.com/manual/",
      githubRepo: "https://github.com/your-username/mongodb-mastery",
      additionalLinks: [
        {
          title: "MongoDB Atlas",
          url: "https://www.mongodb.com/atlas",
          description: "Cloud-hosted MongoDB service"
        },
        {
          title: "Mongoose ODM",
          url: "https://mongoosejs.com/docs/",
          description: "MongoDB object modeling for Node.js"
        }
      ]
    },
    thumbnail: {
      public_id: "mongodb_mastery",
      url: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "MongoDB Basics",
        description: "Introduction to NoSQL, document structure, and basic operations",
        video: {
          public_id: "mongodb_basics",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 40,
        order: 1
      },
      {
        title: "CRUD Operations",
        description: "Create, Read, Update, Delete operations with MongoDB",
        video: {
          public_id: "crud_operations",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 60,
        order: 2
      },
      {
        title: "Aggregation Pipeline",
        description: "Advanced queries, grouping, filtering, and data transformation",
        video: {
          public_id: "aggregation_pipeline",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 90,
        order: 3
      },
      {
        title: "Indexing & Performance",
        description: "Database optimization, indexing strategies, and query performance",
        video: {
          public_id: "indexing_performance",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 70,
        order: 4
      },
      {
        title: "Mongoose ODM",
        description: "Schema design, validation, middleware, and Mongoose best practices",
        video: {
          public_id: "mongoose_odm",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 80,
        order: 5
      }
    ],
    totalLectures: 5,
    totalDuration: 340,
    ratings: 4.6,
    numOfReviews: 18,
    isPublished: true
  },
  {
    title: "MERN Stack Projects - Real-World Applications",
    description: "Build complete MERN stack applications including e-commerce platform, social media app, task management system, and more. Learn practical implementation.",
    price: 129.99,
    discountedPrice: 99.99,
    category: "Project-Based Learning",
    level: "Advanced",
    externalResources: {
      youtubePlaylist: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6sv3GrAJQLRP6x",
      websiteUrl: "https://www.freecodecamp.org/news/mern-stack-tutorial/",
      documentationUrl: "https://www.mongodb.com/developer/languages/javascript/",
      githubRepo: "https://github.com/your-username/mern-projects",
      additionalLinks: [
        {
          title: "Heroku Deployment",
          url: "https://devcenter.heroku.com/categories/nodejs-support",
          description: "Deploy MERN apps to Heroku"
        },
        {
          title: "Netlify Frontend",
          url: "https://docs.netlify.com/",
          description: "Deploy React frontend to Netlify"
        }
      ]
    },
    thumbnail: {
      public_id: "mern_projects",
      url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "E-commerce Platform",
        description: "Build a complete online store with cart, payments, and admin panel",
        video: {
          public_id: "ecommerce_platform",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 180,
        order: 1
      },
      {
        title: "Social Media Application",
        description: "Create a social platform with posts, comments, likes, and user profiles",
        video: {
          public_id: "social_media_app",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 150,
        order: 2
      },
      {
        title: "Task Management System",
        description: "Build a project management tool with real-time updates",
        video: {
          public_id: "task_management",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 120,
        order: 3
      },
      {
        title: "Learning Management System",
        description: "Create an LMS with course management, progress tracking, and assessments",
        video: {
          public_id: "learning_management",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 200,
        order: 4
      },
      {
        title: "Deployment & DevOps",
        description: "Deploy applications to cloud platforms and implement CI/CD",
        video: {
          public_id: "deployment_devops",
          url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4"
        },
        duration: 90,
        order: 5
      }
    ],
    totalLectures: 5,
    totalDuration: 740,
    ratings: 4.9,
    numOfReviews: 25,
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
    console.log(`Successfully seeded ${insertedCourses.length} MERN stack courses`);

    // Display seeded courses
    console.log('\n🎯 MERN Stack Courses Seeded:');
    insertedCourses.forEach(course => {
      console.log(`📚 ${course.title}`);
      console.log(`   💰 Price: $${course.price} (Discounted: $${course.discountedPrice})`);
      console.log(`   ⭐ Rating: ${course.ratings}/5 (${course.numOfReviews} reviews)`);
      console.log(`   📝 Lectures: ${course.totalLectures} | Duration: ${course.totalDuration} minutes`);
      console.log(`   🏷️  Category: ${course.category} | Level: ${course.level}`);
      console.log('');
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding courses:', error);
    process.exit(1);
  }
};

// Run the seed function
seedCourses(); 