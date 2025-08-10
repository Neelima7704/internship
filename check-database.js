const mongoose = require('mongoose');
const Course = require('./models/Course');
require('dotenv').config();

async function checkDatabase() {
  try {
    console.log('🔍 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Check all courses
    const allCourses = await Course.find({});
    console.log(`📊 Total courses in database: ${allCourses.length}`);

    // Check published courses
    const publishedCourses = await Course.find({ isPublished: true });
    console.log(`✅ Published courses: ${publishedCourses.length}`);

    // Check unpublished courses
    const unpublishedCourses = await Course.find({ isPublished: false });
    console.log(`❌ Unpublished courses: ${unpublishedCourses.length}\n`);

    if (publishedCourses.length > 0) {
      console.log('📚 Published courses:');
      publishedCourses.forEach((course, index) => {
        console.log(`${index + 1}. ${course.title} - $${course.price} (${course.category}) - Published: ${course.isPublished}`);
      });
    }

    if (unpublishedCourses.length > 0) {
      console.log('\n⚠️ Unpublished courses:');
      unpublishedCourses.forEach((course, index) => {
        console.log(`${index + 1}. ${course.title} - $${course.price} (${course.category}) - Published: ${course.isPublished}`);
      });
    }

    console.log('\n🎉 Database check completed!');
    
  } catch (error) {
    console.error('❌ Error checking database:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

checkDatabase(); 