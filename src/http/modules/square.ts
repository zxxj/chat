import http from '@/http'

export const listSquare = () => {
  return http.get('/post/')
}
