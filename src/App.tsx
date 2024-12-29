import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Layoutpage from './views/Layout'

function App() {
  return (
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
  )
}

export default App
