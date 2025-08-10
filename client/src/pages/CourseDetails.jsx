import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourseById } from '../store/slices/courseSlice'

const CourseDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const { currentCourse, loading } = useSelector((state) => state.course)

  useEffect(() => {
    if (id) {
      dispatch(fetchCourseById(id))
    }
  }, [dispatch, id])

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
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
            
            <div className="grid md:grid-cols-2 gap-8">
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
            
            <div className="mt-8">
              <button className="btn-primary w-full md:w-auto">
                Enroll Now - ${currentCourse.price}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails 