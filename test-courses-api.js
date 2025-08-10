const http = require('http');

function testCoursesAPI() {
  console.log('🔍 Testing Courses API...\n');
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/courses',
    method: 'GET',
    timeout: 5000
  };

  const req = http.request(options, (res) => {
    console.log('📡 Response received from server');
    console.log('Status Code:', res.statusCode);
    console.log('Headers:', res.headers);
    
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      console.log('\n📄 Raw response data length:', data.length);
      
      try {
        const response = JSON.parse(data);
        
        console.log('✅ API Response Status:', res.statusCode);
        console.log('📊 Number of courses returned:', response.courses.length);
        
        if (response.courses.length > 0) {
          console.log('\n📚 First 3 courses:');
          response.courses.slice(0, 3).forEach((course, index) => {
            console.log(`${index + 1}. ${course.title} - $${course.price} (${course.category})`);
          });
          
          if (response.courses.length > 3) {
            console.log(`... and ${response.courses.length - 3} more courses`);
          }
        }
        
        console.log('\n🎉 Courses API is working correctly!');
        console.log('🌐 Your website should display all courses at: http://localhost:5177/courses');
        
      } catch (error) {
        console.error('❌ Error parsing response:', error.message);
        console.log('Raw response (first 500 chars):', data.substring(0, 500));
      }
    });
  });

  req.on('error', (error) => {
    console.error('❌ Error testing Courses API:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Make sure your backend server is running on port 5000');
      console.log('   Run: npm run server');
    } else if (error.code === 'ETIMEDOUT') {
      console.log('\n⏰ Request timed out. Server might be overloaded.');
    }
  });

  req.on('timeout', () => {
    console.log('⏰ Request timed out');
    req.destroy();
  });

  req.end();
}

testCoursesAPI(); 