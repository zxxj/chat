import { useEffect, useState } from 'react'
import { getFriendList } from '@/http/modules/friendList'
import { matchingHistory } from '@/http/modules/matching'
import { Avatar, Spin } from 'antd'

interface FriendListProps {
  onSelectUser: (user: any) => void
}

const FriendList: React.FC<FriendListProps> = ({ onSelectUser }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'address'>('chat')
  const [friendList, setFriendList] = useState([])
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const url = import.meta.env.VITE_BASE_URL_FILE_REVIEW

  const listFriendList = async () => {
    setLoading(true)
    const res = await getFriendList()
    setLoading(false)
  }

  const listMatchingHistory = async () => {
    setLoading(true)
    const res = await matchingHistory()
    setFriendList(res.data)
    setLoading(false)
  }

  useEffect(() => {
    // listFriendList()
    listMatchingHistory()
  }, [])

  return (
    <div>
      <div className="relative flex items-center justify-center m-4 rounded-custom-14 bg-custom-friendlist-bg h-custom-70">
        <div className="relative flex w-full m-3 h-3/4">
          {/* 背景动画滑块 */}
          <div
            className="absolute w-2/4 h-full transition-all duration-300 ease-in-out bg-custom-friendlist-active-bg rounded-custom-14"
            style={{
              transform: `translateX(${activeTab === 'address' ? '100%' : '0%'})`
            }}
          />

          {/* 选项卡按钮 */}
          <div
            className={`relative z-10 w-2/4 text-lg cursor-pointer rounded-custom-14 text-center transition-colors duration-300 ${
              activeTab === 'chat' ? 'text-custom-purple' : ''
            }`}
            style={{ lineHeight: '55px' }}
            onClick={() => setActiveTab('chat')}
          >
            Chat
          </div>
          <div
            className={`relative z-10 w-2/4 text-lg cursor-pointer rounded-custom-14 text-center transition-colors duration-300 ${
              activeTab === 'address' ? 'text-custom-purple' : ''
            }`}
            style={{ lineHeight: '55px' }}
            onClick={() => setActiveTab('address')}
          >
            Address Book
          </div>
        </div>
      </div>

      <div className="overflow-y-auto friendList-content" style={{ height: 'calc(100vh - 200px)' }}>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Spin size="large" />
          </div>
        ) : (
          friendList.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-3 ml-4 mr-4 cursor-pointer rounded-lg ${
                selectedItem === index ? 'bg-selected' : ''
              }`}
              onClick={() => {
                setSelectedItem(index)
                onSelectUser(item)
              }}
            >
              <Avatar className="w-12 h-12 avatar" src={url + item.toAvatar} />
              <div className="flex-1 pl-4 text-left">
                <div className="username">{item.to}</div>
                <div className="message">message</div>
              </div>
              <div className="w-9">
                <div className="time">time</div>
                <div className="num">num</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default FriendList
