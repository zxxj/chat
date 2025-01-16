interface Gas {
  personnel: number
  platform: number
  total: number
}

interface Match {
  createdAt: string
  degree: number
  to: string
  toAvatar: string
  toSex: string
}

export interface UserInfo {
  picture?: string
  authority?: number
  avatar?: string
  birthday?: string
  character?: string
  email?: string
  familyName?: string
  followers?: number
  follows?: number
  gas?: Gas
  givenName?: string
  id?: number
  jti?: string
  matches?: Match[]
  memberLevel?: string
  nbf?: string
  sex?: string
  tagIds?: string[]
  username?: string
  views?: number
  voice?: string
  token?: string
}

export interface UserState {
  userInfo: UserInfo
}

export interface RootState {
  user: {
    userInfo: UserInfo
  }
}
