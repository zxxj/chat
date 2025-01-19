import { useEffect, useState } from 'react'
import type { PostVo } from '@/types/square'
import { listSquare } from '@/http/modules/square'
import MomentCard from '@/views/Homepage/moment-card'

const Square: React.FC = () => {
  const [moments, setMoments] = useState<PostVo[]>([])

  const fetchMoments = async () => {
    const res = await listSquare()
    setMoments(res.data?.records || [])
  }

  useEffect(() => {
    fetchMoments()
  }, [])

  return (
    <div>
      <div className="p-6 overflow-y-auto square-content" style={{ height: 'calc(100vh - 110px)' }}>
        {moments.map((moment) => (
          <MomentCard key={moment.id} data={moment} onRefresh={fetchMoments} />
        ))}
      </div>
    </div>
  )
}

export default Square
