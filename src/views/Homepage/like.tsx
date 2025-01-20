import { useEffect, useState } from 'react'
import { getLikedList } from '@/http/modules/user'
import { Spin } from 'antd'
import MomentCard from '@/views/Homepage/moment-card'
interface LikeProps {
  activeKey: string
}
const Like: React.FC<LikeProps> = ({ activeKey }: { activeKey: string }) => {
  const [likedList, setLikedList] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    listLikedList()
  }, [activeKey])

  const listLikedList = async () => {
    setLoading(true)
    const res = await getLikedList()
    setLikedList(res.data?.records || [])
    setLoading(false)
  }
  return (
    <div className="p-6 square-content">
      {loading ? (
        <div className="flex items-center justify-center h-full">
          <Spin size="large" />
        </div>
      ) : (
        likedList.map((moment) => (
          <MomentCard key={moment.id} data={moment} onRefresh={listLikedList} />
        ))
      )}
    </div>
  )
}

export default Like
