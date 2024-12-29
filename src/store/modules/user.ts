import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserInfo {
  username: string
  email: string
  picture: string
}

interface UserState {
  userInfo: UserInfo
}

const userInfo: UserState = {
  userInfo: {
    username: '',
    email: '',
    picture: ''
  }
}

const userStore = createSlice({
  name: 'user',
  initialState: {
    userInfo
  },
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      console.log(action.payload, 'acp')
      state.userInfo = action.payload as any
    }
  }
})

export const { setUserInfo } = userStore.actions
export default userStore.reducer
