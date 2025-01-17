import { useEffect, useState } from 'react'
import type { PostVo } from '@/types/square'
import { listSquare } from '@/http/modules/square'
import MomentCard from '@/views/Homepage/moment-card'

const Square: React.FC = () => {
  const [squareData, setSquareData] = useState<PostVo[]>([])

  useEffect(() => {
    getSquareData()
  }, [])

  const getSquareData = async () => {
    const res = await listSquare()
    console.log(res.data.records)
    setSquareData(res.data.records)
  }
  return (
    <div>
      <div className="p-6">
        {Array.isArray(squareData) &&
          squareData.map((item, index) => <MomentCard data={item} key={index} />)}
      </div>
    </div>
  )
}

export default Square
