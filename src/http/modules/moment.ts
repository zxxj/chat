import http from '@/http'

export const listMoment = () => {
  return http.get('/post/my')
}

interface CreateMomentParams {
  content?: string
  pics?: string[]
  address?: string
  topics?: string
}

export const createMoment = (data: CreateMomentParams) => {
  return http.post('/post/create', data)
}
