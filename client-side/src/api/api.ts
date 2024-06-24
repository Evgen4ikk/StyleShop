import axios from 'axios'

import { API_URL } from '../consts/api'

export const api = axios.create({
  baseURL: API_URL
})

api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
  }
  return config
})
