import { useState } from 'react'
import { ExternalLink, Youtube, Globe, BookOpen, Github, ChevronDown, ChevronUp } from 'lucide-react'

const ExternalResources = ({ resources }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!resources || (!resources.youtubePlaylist && !resources.websiteUrl && !resources.documentationUrl && !resources.githubRepo && (!resources.additionalLinks || resources.additionalLinks.length === 0))) {
    return null
  }

  const hasResources = resources.youtubePlaylist || resources.websiteUrl || resources.documentationUrl || resources.githubRepo || (resources.additionalLinks && resources.additionalLinks.length > 0)

  if (!hasResources) {
    return null
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          📚 Learning Resources
        </h3>
        {isExpanded ? (
          <ChevronUp className="h-5 w-5 text-gray-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-500" />
        )}
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-4">
          {/* YouTube Playlist */}
          {resources.youtubePlaylist && (
            <div className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
              <Youtube className="h-6 w-6 text-red-600 mr-3" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">YouTube Playlist</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Video tutorials and walkthroughs</p>
              </div>
              <a
                href={resources.youtubePlaylist}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm px-4 py-2"
              >
                Watch Videos
              </a>
            </div>
          )}

          {/* Website URL */}
          {resources.websiteUrl && (
            <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <Globe className="h-6 w-6 text-blue-600 mr-3" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">Course Website</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Official course platform</p>
              </div>
              <a
                href={resources.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm px-4 py-2"
              >
                Visit Site
              </a>
            </div>
          )}

          {/* Documentation */}
          {resources.documentationUrl && (
            <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <BookOpen className="h-6 w-6 text-green-600 mr-3" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">Documentation</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Official documentation and guides</p>
              </div>
              <a
                href={resources.documentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm px-4 py-2"
              >
                Read Docs
              </a>
            </div>
          )}

          {/* GitHub Repository */}
          {resources.githubRepo && (
            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
              <Github className="h-6 w-6 text-gray-800 dark:text-gray-200 mr-3" />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white">GitHub Repository</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">Source code and examples</p>
              </div>
              <a
                href={resources.githubRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm px-4 py-2"
              >
                View Code
              </a>
            </div>
          )}

          {/* Additional Links */}
          {resources.additionalLinks && resources.additionalLinks.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Additional Resources</h4>
              {resources.additionalLinks.map((link, index) => (
                <div key={index} className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <ExternalLink className="h-5 w-5 text-purple-600 mr-3" />
                  <div className="flex-1">
                    <h5 className="font-medium text-gray-900 dark:text-white">{link.title}</h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{link.description}</p>
                  </div>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-sm px-3 py-1"
                  >
                    Visit
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default ExternalResources
