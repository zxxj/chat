// import { slideIn } from '../../utils/motion'
import EarthCanvas from './canvas/Earth'
// import { motion } from 'framer-motion'
import { LoginBox } from './LoginBox'
import StarsCanvas from '@/views/Home/canvas/Stars'

const Home = () => (
  <div className="w-screen h-screen">
    <div className="flex items-center justify-between">
      {/* <motion.div variants={slideIn('left', 'tween', 3, 1)}> */}
      <EarthCanvas />
      {/* </motion.div> */}

      <LoginBox></LoginBox>
    </div>
    <StarsCanvas />
  </div>
)

export default Home
