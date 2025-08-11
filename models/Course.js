const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter course title'],
    trim: true,
    maxLength: [100, 'Course title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please enter course description']
  },
  price: {
    type: Number,
    required: [true, 'Please enter course price']
  },
  discountedPrice: {
    type: Number,
    default: 0
  },
  thumbnail: {
    public_id: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  category: {
    type: String,
    required: [true, 'Please enter course category']
  },
  level: {
    type: String,
    required: [true, 'Please enter course level'],
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // External learning resources
  externalResources: {
    youtubePlaylist: {
      type: String,
      default: ''
    },
    websiteUrl: {
      type: String,
      default: ''
    },
    documentationUrl: {
      type: String,
      default: ''
    },
    githubRepo: {
      type: String,
      default: ''
    },
    additionalLinks: [{
      title: String,
      url: String,
      description: String
    }]
  },
  lectures: [{
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    video: {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    },
    duration: {
      type: Number,
      default: 0
    },
    order: {
      type: Number,
      required: true
    }
  }],
  totalLectures: {
    type: Number,
    default: 0
  },
  totalDuration: {
    type: Number,
    default: 0
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  ratings: {
    type: Number,
    default: 0
  },
  numOfReviews: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema); 