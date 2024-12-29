// import { slideIn } from '../../utils/motion'
import EarthCanvas from './canvas/Earth'
// import { motion } from 'framer-motion'
import { LoginBox } from './LoginBox'

export const Home = () => (
  <div className="w-screen h-screen">
    <div className="flex items-center justify-between">
      {/* <motion.div variants={slideIn('left', 'tween', 3, 1)}> */}
      <EarthCanvas />
      {/* </motion.div> */}

      <LoginBox></LoginBox>
    </div>
  </div>
)
