import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' // 使用 localStorage 作为存储
import { persistReducer } from 'redux-persist'
import { UserState, UserInfo } from './user.d'

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
    },
    logout: (state) => {
      state.userInfo = {
        username: '',
        email: '',
        picture: ''
      }

      storage.removeItem('persist:user')
    }
  }
})

export const { setUserInfo, getUserInfo, logout } = userStore.actions
export default persistReducer(persistConfig, userStore.reducer)
