import axios from 'axios'

const API_URL = 'http://localhost:2636/' 

axios.defaults.baseURL = API_URL
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000


axios.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)


export const getAllPublications = async () => {
  try {
    const response = await axios.get(`/publication/getPublications`)
    return response.data
  } catch (error) {
    console.error('Error fetching publications:', error)
    throw error
  }
}

export const getPublicationsByCourse = async (course) => {
  try {
    const response = await axios.post(`/publication/getPublicationsCourse`, {
      course
    })
    return response.data
  } catch (error) {
    console.error('Error fetching publications by course:', error)
    throw error
  }
}


export const saveComment = async (commentData) => {
  try {
    const response = await axios.post(`/comment/newComment`, commentData)
    return response.data
  } catch (error) {
    console.error('Error saving comment:', error)
    throw error
  }
}

export const getCommentsByPublication = async (publicationId) => {
  try {
    const response = await axios.get(`/comment/getCommentsWithPublication`, {
      params: { publicationId }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching comments:', error)
    throw error
  }
}

export const getPublicationWithComments = async (publicationId) => {
  try {
    const response = await axios.get(`/publicationComments/comments/${publicationId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching publication with comments:', error)
    throw error
  }
}
