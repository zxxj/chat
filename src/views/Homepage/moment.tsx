import { useEffect } from 'react'
import PushmomentIcon from '@/assets/HomePage/pushmoment.png'
import MomentCard from './moment-card'

const Moment = ({ activeKey }: { activeKey: string }) => {
  useEffect(() => {
    console.log(111)
  }, [activeKey])

  const a = [1, 2, 3]
  return (
    <div>
      <div
        className="flex flex-col items-center justify-center w-64 h-32 cursor-pointer mt-9 mb-14"
        style={{ border: '1px dashed #E65AFF' }}
      >
        <img className="w-6 h-6" src={PushmomentIcon} />
        <div className="mt-4 text-lg text-custom-purple">发布瞬间</div>
      </div>

      <div>
        {a.map((item) => (
          <MomentCard />
        ))}
      </div>
    </div>
  )
}

export default Moment
