import http from '@/http'

export const getFriendList = () => http.get('/userChat/')
