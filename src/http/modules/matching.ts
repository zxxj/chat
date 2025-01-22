import http from '@/http'

export const createMatching = (data: any) => http.post('/match/create', data)
