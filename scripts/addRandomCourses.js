const mongoose = require('mongoose');
const Course = require('../models/Course');
const User = require('../models/User');
require('dotenv').config();

// Random courses data with diverse topics
const randomCourses = [
  {
    title: "JavaScript Fundamentals for Beginners",
    description: "Master JavaScript from the ground up. Learn variables, functions, objects, arrays, and modern ES6+ features. Perfect for web development beginners.",
    price: 49.99,
    discountedPrice: 39.99,
    category: "Programming",
    level: "Beginner",
    thumbnail: {
      public_id: "js_fundamentals",
      url: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "Introduction to JavaScript",
        description: "What is JavaScript and why it's important",
        video: { public_id: "js_intro", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 20,
        order: 1
      },
      {
        title: "Variables and Data Types",
        description: "Understanding variables, strings, numbers, and booleans",
        video: { public_id: "js_variables", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 35,
        order: 2
      },
      {
        title: "Functions and Scope",
        description: "Creating and using functions effectively",
        video: { public_id: "js_functions", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 45,
        order: 3
      }
    ],
    totalLectures: 3,
    totalDuration: 100,
    ratings: 4.6,
    numOfReviews: 18,
    isPublished: true
  },
  {
    title: "UI/UX Design Masterclass",
    description: "Learn the principles of user interface and user experience design. Create beautiful, functional, and user-friendly digital products.",
    price: 129.99,
    discountedPrice: 99.99,
    category: "Design",
    level: "Intermediate",
    thumbnail: {
      public_id: "uiux_design",
      url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "Design Principles",
        description: "Core principles of good design",
        video: { public_id: "design_principles", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 30,
        order: 1
      },
      {
        title: "User Research Methods",
        description: "Understanding your users through research",
        video: { public_id: "user_research", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 60,
        order: 2
      },
      {
        title: "Prototyping with Figma",
        description: "Creating interactive prototypes",
        video: { public_id: "figma_prototyping", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 75,
        order: 3
      }
    ],
    totalLectures: 3,
    totalDuration: 165,
    ratings: 4.8,
    numOfReviews: 25,
    isPublished: true
  },
  {
    title: "Machine Learning with Python",
    description: "Dive into machine learning algorithms, neural networks, and AI applications. Build real-world ML projects from scratch.",
    price: 149.99,
    discountedPrice: 119.99,
    category: "Artificial Intelligence",
    level: "Advanced",
    thumbnail: {
      public_id: "ml_python",
      url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "Introduction to Machine Learning",
        description: "What is ML and its applications",
        video: { public_id: "ml_intro", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 25,
        order: 1
      },
      {
        title: "Supervised Learning Algorithms",
        description: "Linear regression, classification, and more",
        video: { public_id: "supervised_learning", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 90,
        order: 2
      },
      {
        title: "Neural Networks Deep Dive",
        description: "Building and training neural networks",
        video: { public_id: "neural_networks", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 120,
        order: 3
      }
    ],
    totalLectures: 3,
    totalDuration: 235,
    ratings: 4.9,
    numOfReviews: 32,
    isPublished: true
  },
  {
    title: "Digital Marketing Strategy",
    description: "Master digital marketing techniques including SEO, social media, email marketing, and content strategy. Grow your business online.",
    price: 89.99,
    discountedPrice: 69.99,
    category: "Marketing",
    level: "Beginner",
    thumbnail: {
      public_id: "digital_marketing",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "Marketing Fundamentals",
        description: "Understanding the marketing landscape",
        video: { public_id: "marketing_fundamentals", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 40,
        order: 1
      },
      {
        title: "SEO and Content Marketing",
        description: "Search engine optimization strategies",
        video: { public_id: "seo_content", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 65,
        order: 2
      },
      {
        title: "Social Media Marketing",
        description: "Building presence on social platforms",
        video: { public_id: "social_media", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 55,
        order: 3
      }
    ],
    totalLectures: 3,
    totalDuration: 160,
    ratings: 4.4,
    numOfReviews: 15,
    isPublished: true
  },
  {
    title: "Cybersecurity Fundamentals",
    description: "Learn essential cybersecurity concepts, threat detection, and security best practices. Protect yourself and your organization from cyber threats.",
    price: 109.99,
    discountedPrice: 89.99,
    category: "Security",
    level: "Intermediate",
    thumbnail: {
      public_id: "cybersecurity",
      url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "Security Basics",
        description: "Understanding cyber threats and vulnerabilities",
        video: { public_id: "security_basics", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 35,
        order: 1
      },
      {
        title: "Network Security",
        description: "Protecting network infrastructure",
        video: { public_id: "network_security", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 70,
        order: 2
      },
      {
        title: "Incident Response",
        description: "Handling security incidents effectively",
        video: { public_id: "incident_response", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 60,
        order: 3
      }
    ],
    totalLectures: 3,
    totalDuration: 165,
    ratings: 4.7,
    numOfReviews: 22,
    isPublished: true
  },
  {
    title: "Flutter App Development",
    description: "Build beautiful, natively compiled applications for mobile, web, and desktop from a single codebase using Flutter and Dart.",
    price: 139.99,
    discountedPrice: 109.99,
    category: "Mobile Development",
    level: "Intermediate",
    thumbnail: {
      public_id: "flutter_dev",
      url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "Flutter Setup and Basics",
        description: "Setting up Flutter development environment",
        video: { public_id: "flutter_setup", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 30,
        order: 1
      },
      {
        title: "Widgets and UI Components",
        description: "Building user interfaces with Flutter widgets",
        video: { public_id: "flutter_widgets", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 80,
        order: 2
      },
      {
        title: "State Management",
        description: "Managing app state with Provider and Bloc",
        video: { public_id: "state_management", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 90,
        order: 3
      }
    ],
    totalLectures: 3,
    totalDuration: 200,
    ratings: 4.6,
    numOfReviews: 19,
    isPublished: true
  },
  {
    title: "DevOps and CI/CD Pipeline",
    description: "Master DevOps practices, Docker containers, Kubernetes orchestration, and continuous integration/deployment pipelines.",
    price: 159.99,
    discountedPrice: 129.99,
    category: "DevOps",
    level: "Advanced",
    thumbnail: {
      public_id: "devops_cicd",
      url: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "DevOps Fundamentals",
        description: "Understanding DevOps culture and practices",
        video: { public_id: "devops_fundamentals", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 45,
        order: 1
      },
      {
        title: "Docker and Containers",
        description: "Containerization with Docker",
        video: { public_id: "docker_containers", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 85,
        order: 2
      },
      {
        title: "Kubernetes Orchestration",
        description: "Managing containerized applications",
        video: { public_id: "kubernetes", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 100,
        order: 3
      }
    ],
    totalLectures: 3,
    totalDuration: 230,
    ratings: 4.8,
    numOfReviews: 28,
    isPublished: true
  },
  {
    title: "Blockchain and Cryptocurrency",
    description: "Understand blockchain technology, smart contracts, and cryptocurrency development. Build decentralized applications (DApps).",
    price: 179.99,
    discountedPrice: 139.99,
    category: "Blockchain",
    level: "Advanced",
    thumbnail: {
      public_id: "blockchain_crypto",
      url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "Blockchain Basics",
        description: "Understanding distributed ledger technology",
        video: { public_id: "blockchain_basics", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 50,
        order: 1
      },
      {
        title: "Smart Contracts with Solidity",
        description: "Building smart contracts on Ethereum",
        video: { public_id: "smart_contracts", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 95,
        order: 2
      },
      {
        title: "DeFi and DApp Development",
        description: "Decentralized finance applications",
        video: { public_id: "defi_dapps", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 110,
        order: 3
      }
    ],
    totalLectures: 3,
    totalDuration: 255,
    ratings: 4.9,
    numOfReviews: 35,
    isPublished: true
  },
  {
    title: "Game Development with Unity",
    description: "Create 2D and 3D games using Unity game engine. Learn C# programming, game mechanics, and publishing your games.",
    price: 119.99,
    discountedPrice: 89.99,
    category: "Game Development",
    level: "Intermediate",
    thumbnail: {
      public_id: "unity_games",
      url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "Unity Basics",
        description: "Getting started with Unity engine",
        video: { public_id: "unity_basics", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 40,
        order: 1
      },
      {
        title: "C# Programming for Games",
        description: "Scripting game mechanics with C#",
        video: { public_id: "csharp_games", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 75,
        order: 2
      },
      {
        title: "Game Physics and Animation",
        description: "Adding physics and animations to games",
        video: { public_id: "game_physics", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 85,
        order: 3
      }
    ],
    totalLectures: 3,
    totalDuration: 200,
    ratings: 4.5,
    numOfReviews: 16,
    isPublished: true
  },
  {
    title: "Data Analysis with Excel and Power BI",
    description: "Master data analysis using Excel advanced features and Power BI. Create stunning visualizations and business intelligence dashboards.",
    price: 79.99,
    discountedPrice: 59.99,
    category: "Data Analysis",
    level: "Beginner",
    thumbnail: {
      public_id: "excel_powerbi",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
    },
    lectures: [
      {
        title: "Advanced Excel Functions",
        description: "Mastering Excel formulas and functions",
        video: { public_id: "excel_functions", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 50,
        order: 1
      },
      {
        title: "Data Visualization",
        description: "Creating charts and graphs in Excel",
        video: { public_id: "data_viz", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 60,
        order: 2
      },
      {
        title: "Power BI Dashboards",
        description: "Building interactive dashboards",
        video: { public_id: "powerbi_dashboards", url: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" },
        duration: 70,
        order: 3
      }
    ],
    totalLectures: 3,
    totalDuration: 180,
    ratings: 4.3,
    numOfReviews: 12,
    isPublished: true
  }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for adding random courses'))
.catch((err) => console.error('MongoDB connection error:', err));

// Add random courses function
const addRandomCourses = async () => {
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
    const coursesWithInstructor = randomCourses.map(course => ({
      ...course,
      instructor: instructor._id
    }));

    // Insert courses
    const insertedCourses = await Course.insertMany(coursesWithInstructor);
    console.log(`✅ Successfully added ${insertedCourses.length} random courses`);

    // Display added courses
    console.log('\n📚 Added courses:');
    insertedCourses.forEach(course => {
      console.log(`- ${course.title} ($${course.price}) - ${course.category}`);
    });

    // Show total courses in database
    const totalCourses = await Course.countDocuments();
    console.log(`\n📊 Total courses in database: ${totalCourses}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding random courses:', error);
    process.exit(1);
  }
};

// Run the function
addRandomCourses(); 