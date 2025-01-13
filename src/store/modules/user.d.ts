export interface UserInfo {
  username: string
  email: string
  picture: string
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
