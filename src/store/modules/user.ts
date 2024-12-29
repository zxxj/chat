import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' // 使用 localStorage 作为存储
import { persistReducer } from 'redux-persist'
import { UserState, UserInfo } from '../modules/user'

const userInfo: UserState = {
  userInfo: {
    username: '',
    email: '',
    picture: ''
  }
}

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['userInfo'],
  serializableCheck: false
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
    },
    getUserInfo: (state) => {
      return state.userInfo
    }
  }
})

export const { setUserInfo, getUserInfo } = userStore.actions
export default persistReducer(persistConfig, userStore.reducer)
