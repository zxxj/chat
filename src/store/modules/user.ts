import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' // 使用 localStorage 作为存储
import { persistReducer } from 'redux-persist'
import { UserState, UserInfo } from './user.d'

const initialState: UserState = {
  userInfo: {
    username: '',
    email: '',
    picture: '',
    token: ''
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
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      console.log(action.payload, 'acp')
      state.userInfo = action.payload
    },
    getUserInfo: (state) => state,
    logout: (state) => {
      state.userInfo = {
        username: '',
        email: '',
        picture: '',
        token: ''
      }
      storage.removeItem('persist:user')
      localStorage.clear()
    }
  }
})

export const { setUserInfo, getUserInfo, logout } = userStore.actions
export default persistReducer(persistConfig, userStore.reducer)
