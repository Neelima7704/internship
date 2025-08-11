import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../utils/axios'

// Async thunks
export const fetchCourses = createAsyncThunk(
  'course/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/courses')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchCourseById = createAsyncThunk(
  'course/fetchCourseById',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/courses/${courseId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const enrollCourse = createAsyncThunk(
  'course/enrollCourse',
  async ({ courseId, enrollmentData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/courses/${courseId}/enroll`, enrollmentData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const fetchEnrolledCourses = createAsyncThunk(
  'course/fetchEnrolledCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/courses/enrolled/my-courses')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// Check if user is enrolled in a specific course
export const checkEnrollmentStatus = createAsyncThunk(
  'course/checkEnrollmentStatus',
  async (courseId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/courses/${courseId}/enrollment-status`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  courses: [],
  currentCourse: null,
  enrolledCourses: [],
  enrollmentStatus: null,
  loading: false,
  error: null,
  enrollmentLoading: false,
  enrollmentError: null,
}

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null
    },
    clearEnrollmentError: (state) => {
      state.enrollmentError = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false
        state.courses = action.payload.courses
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to fetch courses'
      })
      // Fetch Course by ID
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false
        state.currentCourse = action.payload.course
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to fetch course'
      })
      // Enroll Course
      .addCase(enrollCourse.pending, (state) => {
        state.enrollmentLoading = true
        state.enrollmentError = null
      })
      .addCase(enrollCourse.fulfilled, (state, action) => {
        state.enrollmentLoading = false
        state.enrollmentError = null
      })
      .addCase(enrollCourse.rejected, (state, action) => {
        state.enrollmentLoading = false
        state.enrollmentError = action.payload?.message || 'Failed to enroll in course'
      })
      // Fetch Enrolled Courses
      .addCase(fetchEnrolledCourses.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
        state.loading = false
        state.enrolledCourses = action.payload.enrolledCourses
      })
      .addCase(fetchEnrolledCourses.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to fetch enrolled courses'
      })
      // Check Enrollment Status
      .addCase(checkEnrollmentStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(checkEnrollmentStatus.fulfilled, (state, action) => {
        state.loading = false
        state.enrollmentStatus = action.payload.isEnrolled
      })
      .addCase(checkEnrollmentStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to check enrollment status'
      })
  },
})

export const { clearError, clearCurrentCourse, clearEnrollmentError } = courseSlice.actions
export default courseSlice.reducer 