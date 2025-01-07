import { Layout } from 'antd'
import HeaderComponent from './HeaderComponent'
import Square from '@/views/Square'
import Matching from '@/views/Matching'
import Homepage from '@/views/Homepage'
import Chat from '@/views/Chat'
import EditProfile from '@/views/Homepage/editProfile'
import { Routes, Route } from 'react-router-dom'

const LayoutPage = () => {
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

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    minHeight: 120,
    color: '#fff',
    backgroundColor: '#16132D',
    margin: '20px',
    borderRadius: '14px',
    width: '1063px',
    flex: 'none',
    height: 'calc(100vh - 110px)'
  }

  const siderStyle: React.CSSProperties = {
    width: 342,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#16132D',
    height: 'calc(100vh - 70px)'
  }

  const layoutStyle = {
    overflow: 'hidden',
    backgroundColor: '#0D0A22'
  }

  return (
    <div style={{ backgroundColor: '#0D0A22' }}>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <HeaderComponent />
        </Header>
        <Layout style={layoutStyle}>
          <Sider width={342} style={siderStyle}>
            <Routes>
              <Route path="square" element={<Square />} />
              <Route path="matching" element={<Matching />} />
              <Route path="homepage" element={<EditProfile />} />
              {/* <Route path="Chat" element={<Chat />} /> */}
            </Routes>
          </Sider>
          <Content style={contentStyle}>
            <div className="flex-1">
              <Routes>
                <Route path="square" element={<Square />} />
                <Route path="matching" element={<Matching />} />
                <Route path="homepage" element={<Homepage />} />
                <Route path="Chat" element={<Chat />} />
              </Routes>
            </div>
          </Content>

          <div style={{ width: '450px', marginLeft: '25px', color: '#fff', margin: '25px' }}>2</div>
        </Layout>
      </Layout>
    </div>
  )
}

export default LayoutPage
