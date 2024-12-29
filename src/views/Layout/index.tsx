import { Layout } from 'antd'
import HeaderComponent from './HeaderComponent'
import Square from '@/views/Square'
import Matching from '@/views/Matching'
import Profile from '@/views/Profile'
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
    minHeight: 120,
    color: '#fff',
    backgroundColor: '#16132D',
    margin: '20px',
    borderRadius: '14px'
  }

  const siderStyle: React.CSSProperties = {
    width: 342,
    textAlign: 'center',
    lineHeight: '120px',
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
            Sider
          </Sider>
          <Content style={contentStyle}>
            <Routes>
              <Route path="square" element={<Square />} />
              <Route path="matching" element={<Matching />} />
              <Route path="profile" element={<Profile />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
}

export default LayoutPage
