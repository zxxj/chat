// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@/styles/antd.css'
import { store, persistor } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import AgoraRTC, { AgoraRTCProvider } from 'agora-rtc-react'

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' })

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AgoraRTCProvider client={client}>
        <App />
      </AgoraRTCProvider>
    </PersistGate>
  </Provider>
)
