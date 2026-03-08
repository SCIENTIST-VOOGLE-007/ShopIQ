import axios from "axios"

const api = axios.create({

baseURL:"http://localhost:5000/api",

headers:{
"Content-Type":"application/json"
}

})

// user auth
export const registerUserApi = (name, email, password) =>
  api.post('/users/register', { name, email, password })

export const loginUserApi = (email, password) =>
  api.post('/users/login', { email, password })

export const updateProfileApi = (userId, profile) =>
  api.put('/users/profile', { userId, profile })

export const getProfileApi = (userId) =>
  api.get(`/users/profile?userId=${encodeURIComponent(userId)}`)

// ai/chat
export const chatApi = (message) =>
  api.post('/ai/chat', { message })

export default api