import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import userReducer from './modules/user'

const store = configureStore({
  reducer: {
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // 关闭序列化检查
    })
})

const persistor = persistStore(store)
export { store, persistor }
