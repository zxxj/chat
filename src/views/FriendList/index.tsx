import { useState } from 'react'

const FriendList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'address'>('chat')

  return (
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
  )
}

export default FriendList
