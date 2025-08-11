import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchEnrolledCourses } from '../store/slices/courseSlice'
import ExternalResources from '../components/ExternalResources'

const MyLearning = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { enrolledCourses, loading } = useSelector((state) => state.course)

  useEffect(() => {
    if (user) {
      dispatch(fetchEnrolledCourses())
    }
  }, [dispatch, user])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          My Learning
        </h1>
        
        {enrolledCourses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
              You haven't enrolled in any courses yet.
            </p>
            <Link to="/courses" className="btn-primary">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {enrolledCourses.map((enrollment) => (
              <div key={enrollment._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                  <img 
                    src={enrollment.courseId?.thumbnail?.url || 'https://via.placeholder.com/400x225'} 
                    alt={enrollment.courseId?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {enrollment.courseId?.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {enrollment.courseId?.description}
                  </p>
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${enrollment.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {enrollment.progress}% Complete
                    </p>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Enrolled: {new Date(enrollment.enrolledAt).toLocaleDateString()}
                    </span>
                    <div className="flex space-x-3">
                      <Link 
                        to={`/courses/${enrollment.courseId?._id}`} 
                        className="btn-secondary"
                      >
                        Course Details
                      </Link>
                      {enrollment.courseId?.externalResources && (
                        <button 
                          onClick={() => {
                            // Redirect to YouTube playlist if available, otherwise to website
                            const resources = enrollment.courseId.externalResources
                            if (resources.youtubePlaylist) {
                              window.open(resources.youtubePlaylist, '_blank')
                            } else if (resources.websiteUrl) {
                              window.open(resources.websiteUrl, '_blank')
                            } else if (resources.documentationUrl) {
                              window.open(resources.documentationUrl, '_blank')
                            }
                          }}
                          className="btn-primary"
                        >
                          Continue Learning
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {/* External Resources Section */}
                  {enrollment.courseId?.externalResources && (
                    <ExternalResources resources={enrollment.courseId.externalResources} />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyLearning 