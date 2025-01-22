import http from '@/http'

export const getShengwangRTCToken = (channelName: string) => {
  return http.post(`/chat/rtc/token?channelName=${channelName}`)
}
