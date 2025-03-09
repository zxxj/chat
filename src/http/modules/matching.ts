import http from '@/http'

export const createMatching = (data: any) => http.post('/match/create', data)

export const matchingHistory = () => http.get('/match/')