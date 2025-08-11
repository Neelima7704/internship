const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');
require('dotenv').config();

// MERN Stack focused random courses
const mernStackCourses = [
  {
    title: "JavaScript Fundamentals for MERN Stack",
    description: "Master JavaScript ES6+, async/await, promises, and modern JavaScript features essential for MERN stack development.",
    price: 69.99,
    discountedPrice: 49.99,
    category: "JavaScript Development",
    level: "Beginner",
    externalResources: {
      youtubePlaylist: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gXdV64JQnx1y_17mZVz9VE",
      websiteUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      documentationUrl: "https://javascript.info/",
      githubRepo: "https://github.com/your-username/js-fundamentals-course",
      additionalLinks: [
        {
          title: "ES6 Features Guide",
          url: "https://es6-features.org/",
          description: "Complete ES6 features reference"
        },
        {
          title: "JavaScript Promises",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
          description: "Promise API documentation"
        }
      ]
    },
    thumbnail: {
      public_id: "js_fundamentals",
      url: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "ES6+ Features",
        description: "Arrow functions, destructuring, spread operator, and template literals",
        video: { public_id: "es6_features", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 45,
        order: 1
      },
      {
        title: "Async JavaScript",
        description: "Promises, async/await, and error handling",
        video: { public_id: "async_js", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 60,
        order: 2
      }
    ],
    totalLectures: 2,
    totalDuration: 105,
    ratings: 4.5,
    numOfReviews: 15,
    isPublished: true
  },
  {
    title: "TypeScript for MERN Stack Development",
    description: "Learn TypeScript to build type-safe MERN stack applications with better code quality and developer experience.",
    price: 89.99,
    discountedPrice: 69.99,
    category: "TypeScript Development",
    level: "Intermediate",
    externalResources: {
      youtubePlaylist: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gUgr39QYmDKBz3DzYu7KYx",
      websiteUrl: "https://www.typescriptlang.org/",
      documentationUrl: "https://www.typescriptlang.org/docs/",
      githubRepo: "https://github.com/your-username/typescript-mern-course",
      additionalLinks: [
        {
          title: "TypeScript Handbook",
          url: "https://www.typescriptlang.org/docs/handbook/intro.html",
          description: "Official TypeScript handbook"
        },
        {
          title: "React with TypeScript",
          url: "https://react-typescript-cheatsheet.netlify.app/",
          description: "TypeScript cheatsheet for React"
        }
      ]
    },
    thumbnail: {
      public_id: "typescript_mern",
      url: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "TypeScript Basics",
        description: "Types, interfaces, and type annotations",
        video: { public_id: "ts_basics", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 50,
        order: 1
      },
      {
        title: "TypeScript with React",
        description: "Typed components, props, and state management",
        video: { public_id: "ts_react", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 75,
        order: 2
      }
    ],
    totalLectures: 2,
    totalDuration: 125,
    ratings: 4.7,
    numOfReviews: 12,
    isPublished: true
  },
  {
    title: "GraphQL with MERN Stack",
    description: "Implement GraphQL APIs with Apollo Server and Apollo Client in your MERN stack applications for efficient data fetching.",
    price: 94.99,
    discountedPrice: 74.99,
    category: "API Development",
    level: "Advanced",
    externalResources: {
      youtubePlaylist: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6sv3GrAJQLRP6x",
      websiteUrl: "https://graphql.org/",
      documentationUrl: "https://www.apollographql.com/docs/",
      githubRepo: "https://github.com/your-username/graphql-mern-course",
      additionalLinks: [
        {
          title: "GraphQL Tutorial",
          url: "https://graphql.org/learn/",
          description: "Official GraphQL tutorial"
        },
        {
          title: "Apollo Server",
          url: "https://www.apollographql.com/docs/apollo-server/",
          description: "Apollo Server documentation"
        }
      ]
    },
    thumbnail: {
      public_id: "graphql_mern",
      url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "GraphQL Schema Design",
        description: "Types, queries, mutations, and resolvers",
        video: { public_id: "graphql_schema", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 80,
        order: 1
      },
      {
        title: "Apollo Server & Client",
        description: "Server setup and client integration with React",
        video: { public_id: "apollo_integration", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 90,
        order: 2
      }
    ],
    totalLectures: 2,
    totalDuration: 170,
    ratings: 4.8,
    numOfReviews: 8,
    isPublished: true
  },
  {
    title: "Real-time Applications with Socket.io",
    description: "Build real-time features like chat, notifications, and live updates in your MERN stack applications using Socket.io.",
    price: 84.99,
    discountedPrice: 64.99,
    category: "Real-time Development",
    level: "Intermediate",
    externalResources: {
      youtubePlaylist: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9gUgr39QYmDKBz3DzYu7KYx",
      websiteUrl: "https://socket.io/",
      documentationUrl: "https://socket.io/docs/v4/",
      githubRepo: "https://github.com/your-username/socketio-mern-course",
      additionalLinks: [
        {
          title: "Socket.io Examples",
          url: "https://github.com/socketio/socket.io/tree/master/examples",
          description: "Official Socket.io examples"
        },
        {
          title: "Real-time Chat Tutorial",
          url: "https://socket.io/get-started/chat",
          description: "Build a real-time chat application"
        }
      ]
    },
    thumbnail: {
      public_id: "socketio_mern",
      url: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "Socket.io Fundamentals",
        description: "Event handling, rooms, and broadcasting",
        video: { public_id: "socketio_basics", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 55,
        order: 1
      },
      {
        title: "Real-time Chat Application",
        description: "Build a complete chat system with user authentication",
        video: { public_id: "chat_app", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 100,
        order: 2
      }
    ],
    totalLectures: 2,
    totalDuration: 155,
    ratings: 4.6,
    numOfReviews: 10,
    isPublished: true
  },
  {
    title: "MERN Stack Testing Strategies",
    description: "Learn comprehensive testing approaches for MERN stack applications including unit tests, integration tests, and end-to-end testing.",
    price: 79.99,
    discountedPrice: 59.99,
    category: "Testing & Quality Assurance",
    level: "Intermediate",
    externalResources: {
      youtubePlaylist: "https://www.youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6sv3GrAJQLRP6x",
      websiteUrl: "https://jestjs.io/",
      documentationUrl: "https://testing-library.com/docs/react-testing-library/intro/",
      githubRepo: "https://github.com/your-username/testing-mern-course",
      additionalLinks: [
        {
          title: "Jest Testing Framework",
          url: "https://jestjs.io/docs/getting-started",
          description: "Jest testing framework documentation"
        },
        {
          title: "React Testing Library",
          url: "https://testing-library.com/docs/guiding-principles",
          description: "Testing library for React components"
        }
      ]
    },
    thumbnail: {
      public_id: "testing_mern",
      url: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "Backend Testing",
        description: "Jest, Supertest, and API testing strategies",
        video: { public_id: "backend_testing", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 70,
        order: 1
      },
      {
        title: "Frontend Testing",
        description: "React Testing Library and component testing",
        video: { public_id: "frontend_testing", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 85,
        order: 2
      }
    ],
    totalLectures: 2,
    totalDuration: 155,
    ratings: 4.4,
    numOfReviews: 14,
    isPublished: true
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for adding MERN stack courses'))
.catch((err) => console.error('MongoDB connection error:', err));

// Add courses function
const addMernStackCourses = async () => {
  try {
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
    const coursesWithInstructor = mernStackCourses.map(course => ({
      ...course,
      instructor: instructor._id
    }));

    // Insert courses
    const insertedCourses = await Course.insertMany(coursesWithInstructor);
    console.log(`Successfully added ${insertedCourses.length} additional MERN stack courses`);

    // Display added courses
    console.log('\n🚀 Additional MERN Stack Courses Added:');
    insertedCourses.forEach(course => {
      console.log(`📚 ${course.title}`);
      console.log(`   💰 Price: $${course.price} (Discounted: $${course.discountedPrice})`);
      console.log(`   ⭐ Rating: ${course.ratings}/5 (${course.numOfReviews} reviews)`);
      console.log(`   📝 Lectures: ${course.totalLectures} | Duration: ${course.totalDuration} minutes`);
      console.log(`   🏷️  Category: ${course.category} | Level: ${course.level}`);
      console.log('');
    });

    // Get total course count
    const totalCourses = await Course.countDocuments();
    console.log(`📊 Total MERN Stack Courses in Database: ${totalCourses}`);

    process.exit(0);
  } catch (error) {
    console.error('Error adding MERN stack courses:', error);
    process.exit(1);
  }
};

// Run the function
addMernStackCourses(); 