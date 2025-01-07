import HeaderComponent from '@/views/Layout/HeaderComponent'
import { Layout } from 'antd'
import ChatImg from '@/assets/MatchingBefore/chat.png'
import VoiceImg from '@/assets/MatchingBefore/voice.png'
import VideoImg from '@/assets/MatchingBefore/video.png'

const MatchingBefore = () => {
  const { Header, Sider, Content } = Layout

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#fff',
    height: 70,
    lineHeight: '69px',
    backgroundColor: '#16132D',
    borderBottom: '1px solid #0D0A22',
    padding: 0
  }

  const types = [
    {
      type: 'chat',
      img: ChatImg
    },
    {
      type: 'voice',
      img: VoiceImg
    },
    {
      type: 'video',
      img: VideoImg
    }
  ]
  return (
    <div className="w-screen h-screen bg-custom-matchingbefore-bg">
      <Layout>
        <Header style={headerStyle}>
          <HeaderComponent />
        </Header>
      </Layout>

      <div
        className="flex items-center justify-center cursor-pointer"
        style={{ height: 'calc(100% - 70px)' }}
      >
        {types.map((item, index) => (
          <div
            key={item.type}
            style={{
              width: '307px',
              height: '431px',
              backgroundImage: `url(${item.img})`,
              marginLeft: index === 1 ? '73px' : '0',
              marginRight: index === 1 ? '73px' : '0'
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default MatchingBefore
