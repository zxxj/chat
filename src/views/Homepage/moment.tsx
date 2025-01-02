import { useEffect, useState } from 'react'
import PushmomentIcon from '@/assets/HomePage/pushmoment.png'
import MomentCard from './moment-card'
import type { MomentParam } from '@/types/momentCard'

const Moment = ({ activeKey }: { activeKey: string }) => {
  useEffect(() => {
    console.log(111)
    getdata()
  }, [activeKey])

  const [momentData, setMomentData] = useState<MomentParam[]>([])

  const getdata = () => {
    setTimeout(() => {
      const data = [
        {
          date: 2024,
          time: '13:21',
          content:
            'What are friends? We often talk about the topic with others. I think friends are thosepeople who can help you when you are in trouble.',
          imgs: [
            'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
            'https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg'
          ],
          topics: ['相亲角', '程序猿', '北京'],
          like: 542,
          comment: 658,
          look: 2974,
          location: '北京市'
        },

        {
          date: 2024,
          time: '12:30',
          content: 'What are friends? We often talk about the topic with others.',
          imgs: ['https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg'],
          topics: ['程序猿', '北京'],
          like: 257,
          comment: 369,
          look: 1635,
          location: '上海市'
        }
      ]

      setMomentData(data)
    }, 500)
  }
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
        {momentData.map((item, index) => (
          <MomentCard data={item} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Moment
