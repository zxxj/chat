import { useEffect, useState } from 'react'
import type { PostVo } from '@/types/square'
import { listSquare } from '@/http/modules/square'
import MomentCard from '@/views/Homepage/moment-card'
import { Spin } from 'antd'

const Square: React.FC = () => {
  const [moments, setMoments] = useState<PostVo[]>([])
  const [loading, setLoading] = useState(true)

  const fetchMoments = async () => {
    setLoading(true)
    const res = await listSquare()
    setMoments(res.data?.records || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchMoments()
  }, [])

  return (
    <div className="overflow-y-auto square-content" style={{ height: 'calc(100vh - 110px)' }}>
      <div className="p-6 square-content">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Spin size="large" />
          </div>
        ) : (
          moments.map((moment) => (
            <MomentCard key={moment.id} data={moment} onRefresh={fetchMoments} />
          ))
        )}
      </div>
    </div>
  )
}

export default Square
