import { useParams } from 'react-router-dom'
import { getUserInfoByUserId, getUserMomentsByUserId } from '@/http/modules/user'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'
import MomentCard from '@/views/Homepage/moment-card'

const UserPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>()

  const [userInfo, setUserInfo] = useState<any>(null)
  const [moments, setMoments] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchUserInfo()
    fetchMoments()
    setLoading(false)
  }, [userId])

  const fetchUserInfo = async () => {
    const res = await getUserInfoByUserId(Number(userId))
    setUserInfo(res.data)
  }

  const fetchMoments = async () => {
    const res = await getUserMomentsByUserId(Number(userId))
    setMoments(res.data.records || [])
  }

  return (
    <div className="overflow-y-auto square-content" style={{ height: 'calc(100vh - 110px)' }}>
      <div className="p-6 square-content">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Spin size="large" />
          </div>
        ) : (
          moments?.map((moment: any) => (
            <MomentCard key={moment.id} data={moment} onRefresh={fetchMoments} />
          )) || <div>No data available</div>
        )}
      </div>
    </div>
  )
}

export default UserPage
