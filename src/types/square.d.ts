/**
 * Page«PostVo»
 */
export interface Response {
  countId?: string
  current?: number
  hitCount?: boolean
  maxLimit?: number
  optimizeCountSql?: boolean
  orders?: OrderItem[]
  pages?: number
  records?: PostVo[]
  searchCount?: boolean
  size?: number
  total?: number
  [property: string]: any
}

/**
 * OrderItem
 */
export interface OrderItem {
  asc?: boolean
  column?: string
  [property: string]: any
}

/**
 * PostVo
 */
export interface PostVo {
  /**
   * 地点
   */
  address?: string
  /**
   * 评论
   */
  commentList?: CommentVo[]
  /**
   * 评论数
   */
  comments?: number
  /**
   * 内容
   */
  content?: string
  /**
   * 创建时间
   */
  createdAt?: Date
  id?: number
  /**
   * 喜欢数
   */
  likes?: number
  /**
   * 图片
   */
  pics?: string[]
  /**
   * 话题
   */
  topics?: string[]
  /**
   * 创建人
   */
  userId?: number
  /**
   * 浏览数
   */
  views?: number
  [property: string]: any
}

/**
 * CommentVo
 */
export interface CommentVo {
  /**
   * 评论内容
   */
  content?: string
  id?: number
  /**
   * 回复
   */
  reply?: CommentVo[]
  /**
   * 用户名
   */
  username?: string
  [property: string]: any
}
