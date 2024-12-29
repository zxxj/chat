import { Home } from './views/Home'
import StarsCanvas from './views/Home/canvas/Stars'

function App() {
  return (
    <div className="relative z-0 bg-primary">
      <div className="relative z-0 bg-black ">
        <Home />
        <StarsCanvas />
      </div>
    </div>
  )
}

export default App
