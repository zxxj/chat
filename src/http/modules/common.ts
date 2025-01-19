import http from '@/http'

export const likeMomentById = (id: number) => {
  return http.post(`/post/like/${id}`)
}

export const unlikeMomentById = (id: number) => {
  return http.post(`/post/unlike/${id}`)
}

export const viewMomentById = (id: number) => {
  return http.post(`/post/view/${id}`)
}

/**
 * CommentBo
 */
export interface CommentBody {
  commentId?: number
  content?: string
  postId?: number
  [property: string]: any
}

export const commentMoment = (data: CommentBody) => {
  return http.post(`/post/comment`, data)
}
