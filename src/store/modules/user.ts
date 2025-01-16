import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' // 使用 localStorage 作为存储
import { persistReducer } from 'redux-persist'
import { UserState, UserInfo } from './user.d'

const initialState: UserState = {
  userInfo: {
    picture: '',
    authority: 0,
    avatar: '',
    birthday: '',
    character: '',
    email: '',
    familyName: '',
    followers: 0,
    follows: 0,
    gas: {
      personnel: 0,
      platform: 0,
      total: 0
    },
    givenName: '',
    id: 0,
    jti: '',
    matches: [],
    memberLevel: '',
    nbf: '',
    sex: '',
    tagIds: [],
    username: '',
    views: 0,
    voice: '',
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
    getUserInfo: (state) => state.userInfo,
    logout: (state) => {
      state.userInfo = {
        picture: '',
        authority: 0,
        avatar: '',
        birthday: '',
        character: '',
        email: '',
        familyName: '',
        followers: 0,
        follows: 0,
        gas: {
          personnel: 0,
          platform: 0,
          total: 0
        },
        givenName: '',
        id: 0,
        jti: '',
        matches: [],
        memberLevel: '',
        nbf: '',
        sex: '',
        tagIds: [],
        username: '',
        views: 0,
        voice: '',
        token: ''
      }
      storage.removeItem('persist:user')
      localStorage.clear()
    }
  }
})

export const { setUserInfo, getUserInfo, logout } = userStore.actions
export default persistReducer(persistConfig, userStore.reducer)
