import { useState } from 'react'
import { Play, Clock, CheckCircle, Lock } from 'lucide-react'

const CourseVideos = ({ lectures, courseTitle }) => {
  const [selectedVideo, setSelectedVideo] = useState(lectures?.[0] || null)
  const [watchedVideos, setWatchedVideos] = useState(new Set())

  const handleVideoSelect = (lecture) => {
    setSelectedVideo(lecture)
    // Mark video as watched
    setWatchedVideos(prev => new Set([...prev, lecture._id || lecture.title]))
  }

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  if (!lectures || lectures.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Course Content
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          No lectures available for this course yet.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {/* Video Player Section */}
      <div className="aspect-video bg-gray-900">
        {selectedVideo ? (
          <div className="relative w-full h-full">
            <video
              className="w-full h-full object-cover"
              controls
              poster={selectedVideo.thumbnail?.url || 'https://via.placeholder.com/800x450'}
            >
              <source src={selectedVideo.video?.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded">
              {selectedVideo.order} of {lectures.length}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white">
              <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Select a lecture to start learning</p>
            </div>
          </div>
        )}
      </div>

      {/* Video Information */}
      {selectedVideo && (
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {selectedVideo.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {selectedVideo.description}
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatDuration(selectedVideo.duration)}</span>
            <span className="mx-2">•</span>
            <span>Lecture {selectedVideo.order}</span>
          </div>
        </div>
      )}

      {/* Lecture List */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Course Content ({lectures.length} lectures)
        </h3>
        <div className="space-y-2">
          {lectures.map((lecture, index) => {
            const isWatched = watchedVideos.has(lecture._id || lecture.title)
            const isSelected = selectedVideo && (selectedVideo._id === lecture._id || selectedVideo.title === lecture.title)
            
            return (
              <div
                key={lecture._id || index}
                className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                  isSelected 
                    ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800' 
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleVideoSelect(lecture)}
              >
                <div className="flex-shrink-0 mr-3">
                  {isWatched ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 dark:border-gray-600" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-medium ${
                    isSelected 
                      ? 'text-primary-900 dark:text-primary-100' 
                      : 'text-gray-900 dark:text-white'
                  }`}>
                    {lecture.title}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {lecture.description}
                  </p>
                </div>
                
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{formatDuration(lecture.duration)}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CourseVideos
