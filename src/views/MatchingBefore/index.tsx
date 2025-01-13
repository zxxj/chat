import HeaderComponent from '@/views/Layout/HeaderComponent'
import { Layout, Modal, Button } from 'antd'
import ChatImg from '@/assets/MatchingBefore/chat.png'
import VoiceImg from '@/assets/MatchingBefore/voice.png'
import VideoImg from '@/assets/MatchingBefore/video.png'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Register from '@/views/Register'
import { register } from '@/http/models/user'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '@/store/modules/user'

const MatchingBefore = () => {
  const { Header, Sider, Content } = Layout
  const navigate = useNavigate()
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const registerFormRef = useRef<any>(null)
  const [infos, setInfos] = useState<any>(null)
  const dispatch = useDispatch()

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

  // 检查注册状态
  useEffect(() => {
    const needRegister = localStorage.getItem('needRegister')
    const savedUserInfo = localStorage.getItem('registerUserInfo')

    if (needRegister === 'true' && savedUserInfo) {
      setInfos(JSON.parse(savedUserInfo))
      setShowRegisterModal(true)
    }
  }, [])

  // 处理注册表单提交
  const handleRegisterOk = async () => {
    try {
      // 先获取表单实例并验证
      const formData = await registerFormRef.current.validateForm()

      if (formData.birthday) {
        formData.birthday = dayjs(formData.birthday).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
      }
      formData.avatar = infos.picture
      formData.familyName = formData.family_name
      formData.givenName = infos.given_name
      formData.character = formData.character?.join(',') || ''
      formData.tagIds = formData.tagIds?.join(',') || ''

      const body = {
        ...formData,
        ...infos
      }

      console.log('Form data:', body)
      // const res = await register(body)
      // if (res.status == 200) {
      //   // 注册成功，更新用户信息和 token
      //   await dispatch(
      //     setUserInfo({
      //       username: formData.username,
      //       picture: infos.picture,
      //       email: infos.email,
      //       token: res.data
      //     })
      //   )
      //   localStorage.removeItem('needRegister')
      //   localStorage.removeItem('registerUserInfo')
      //   Modal.destroyAll()
      //   navigate('/layout/matchingbefore')
      // }
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  // 显示注册弹窗
  useEffect(() => {
    if (showRegisterModal) {
      Modal.confirm({
        width: 1400,
        content: <Register ref={registerFormRef} />,
        onOk: handleRegisterOk,
        footer: [
          <div className="text-center">
            <Button key="ok" className="text-white bg-custom-purple" onClick={handleRegisterOk}>
              Complete
            </Button>
          </div>
        ]
      })
    }
  }, [showRegisterModal])

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
