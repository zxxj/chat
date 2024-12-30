import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Layoutpage from './views/Layout'
import { ConfigProvider } from 'antd'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: '#E65AFF' },
        components: {
          Tabs: {
            itemHoverColor: '#E65AFF',
            itemSelectedColor: '#E65AFF',
            itemColor: '#999',
            inkBarColor: 'transparent',
            titleFontSize: 18,
            horizontalMargin: '10px 0 20px 0'
          }
        }
      }}
    >
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
