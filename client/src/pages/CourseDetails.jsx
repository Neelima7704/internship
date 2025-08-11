import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseById, enrollCourse, checkEnrollmentStatus } from '../store/slices/courseSlice'
import ExternalResources from '../components/ExternalResources'
import CourseVideos from '../components/CourseVideos'
import toast from 'react-hot-toast'
import { Lock, Clock } from 'lucide-react'

const CourseDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { currentCourse, loading, enrollmentLoading, enrollmentError, enrollmentStatus } = useSelector((state) => state.course)
  const { user } = useSelector((state) => state.auth)
  const [showEnrollmentForm, setShowEnrollmentForm] = useState(false)
  const [enrollmentData, setEnrollmentData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(id))
      if (user) {
        dispatch(checkEnrollmentStatus(id))
      }
    }
  }, [dispatch, id, user])

  const handleEnrollClick = () => {
    if (!user) {
      toast.error('Please login to enroll in this course')
      navigate('/login')
      return
    }
    setShowEnrollmentForm(true)
  }

  const handleEnrollmentSubmit = async (e) => {
    e.preventDefault()
    
    if (!enrollmentData.name || !enrollmentData.email || !enrollmentData.phone || !enrollmentData.address) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      await dispatch(enrollCourse({ courseId: id, enrollmentData })).unwrap()
      toast.success('Successfully enrolled in the course!')
      setShowEnrollmentForm(false)
      // Refresh enrollment status after successful enrollment
      dispatch(checkEnrollmentStatus(id))
    } catch (error) {
      toast.error(error.message || 'Failed to enroll in course')
    }
  }

  const handleInputChange = (e) => {
    setEnrollmentData({
      ...enrollmentData,
      [e.target.name]: e.target.value
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!currentCourse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Course not found.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Course Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="aspect-video bg-gray-200 dark:bg-gray-700">
            <img 
              src={currentCourse.thumbnail?.url || 'https://via.placeholder.com/800x450'} 
              alt={currentCourse.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-primary-600 font-medium">
                {currentCourse.category}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {currentCourse.level}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {currentCourse.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {currentCourse.description}
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Course Details
                </h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Price:</span> ${currentCourse.price}</p>
                  <p><span className="font-medium">Category:</span> {currentCourse.category}</p>
                  <p><span className="font-medium">Level:</span> {currentCourse.level}</p>
                  <p><span className="font-medium">Total Lectures:</span> {currentCourse.totalLectures}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  What you'll learn
                </h3>
                <ul className="space-y-2">
                  {currentCourse.lectures?.slice(0, 5).map((lecture, index) => (
                    <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                      <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                      {lecture.title}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Show different content based on enrollment status */}
            {enrollmentStatus ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <p className="text-green-800 dark:text-green-200 font-medium">
                  ✅ You are enrolled in this course! Start learning below.
                </p>
              </div>
            ) : (
              <div className="mt-8">
                <button 
                  onClick={handleEnrollClick}
                  disabled={enrollmentLoading}
                  className="btn-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {enrollmentLoading ? 'Enrolling...' : `Enroll Now - $${currentCourse.price}`}
                </button>
              </div>
            )}
            
            {/* External Resources Section */}
            {currentCourse.externalResources && (
              <div className="mt-8">
                <ExternalResources resources={currentCourse.externalResources} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Course Videos for Enrolled Users */}
      {enrollmentStatus && currentCourse.lectures && (
        <CourseVideos 
          lectures={currentCourse.lectures} 
          courseTitle={currentCourse.title}
        />
      )}

      {/* Course Preview for Non-enrolled Users */}
      {!enrollmentStatus && currentCourse.lectures && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Course Preview
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Enroll in this course to access all {currentCourse.totalLectures} lectures and start learning!
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentCourse.lectures.slice(0, 3).map((lecture, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {lecture.title}
                  </span>
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                  {lecture.description}
                </p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{Math.floor(lecture.duration / 60)}m {lecture.duration % 60}s</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Enrollment Form Modal */}
      {showEnrollmentForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Enroll in Course
            </h3>
            <form onSubmit={handleEnrollmentSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={enrollmentData.name}
                  onChange={handleInputChange}
                  className="input-field w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={enrollmentData.email}
                  onChange={handleInputChange}
                  className="input-field w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={enrollmentData.phone}
                  onChange={handleInputChange}
                  className="input-field w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={enrollmentData.address}
                  onChange={handleInputChange}
                  className="input-field w-full h-20 resize-none"
                  required
                />
              </div>
              
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEnrollmentForm(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={enrollmentLoading}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {enrollmentLoading ? 'Enrolling...' : 'Confirm Enrollment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseDetails 