import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCourses } from '../store/slices/courseSlice'

const Courses = () => {
  const dispatch = useDispatch()
  const { courses, loading } = useSelector((state) => state.course)

  useEffect(() => {
    dispatch(fetchCourses())
  }, [dispatch])

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
          All Courses
        </h1>
        
        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              No courses available at the moment.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 dark:bg-gray-700">
                  <img 
                    src={course.thumbnail?.url || 'https://via.placeholder.com/400x225'} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-primary-600 font-medium">
                      {course.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {course.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                        {course.ratings} ({course.numOfReviews} reviews)
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {course.totalLectures} lectures
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      {course.discountedPrice > 0 ? (
                        <div>
                          <span className="text-lg font-bold text-primary-600">
                            ${course.discountedPrice}
                          </span>
                          <span className="text-sm text-gray-500 line-through ml-2">
                            ${course.price}
                          </span>
                        </div>
                      ) : (
                        <span className="text-lg font-bold text-primary-600">
                          ${course.price}
                        </span>
                      )}
                    </div>
                    <Link to={`/courses/${course._id}`} className="btn-primary">
                      View Course
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Courses 