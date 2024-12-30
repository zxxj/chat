import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Layoutpage from './views/Layout'
import { ConfigProvider } from 'antd'

function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#E65AFF' } }}>
      <Router>
        <div className="relative z-0 bg-primary">
          <div className="relative z-0 bg-black">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/layout/*" element={<Layoutpage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ConfigProvider>
  )
}

export default App
