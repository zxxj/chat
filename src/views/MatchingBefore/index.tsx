import HeaderComponent from '@/views/Layout/HeaderComponent'
import { Layout, Modal, Button } from 'antd'
import ChatImg from '@/assets/MatchingBefore/chat.png'
import VoiceImg from '@/assets/MatchingBefore/voice.png'
import VideoImg from '@/assets/MatchingBefore/video.png'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Register from '@/views/Register'
import { register, updateUserInfo, isUsernameAvailable, user } from '@/http/modules/user'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '@/store/modules/user'
import { message } from 'antd'
import { getShengwangRTCToken, getShengwangRTMToken } from '@/http/modules/shengwang'
import { createMatching } from '@/http/modules/matching'

const MatchingBefore: React.FC = () => {
  const { Header } = Layout
  const navigate = useNavigate()
  const userInfo = useSelector((state: any) => state.user.userInfo)
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
      type: '文字匹配',
      img: ChatImg
    },
    {
      type: 'voice',
      img: VoiceImg
    },
    {
      type: '视频匹配',
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
      formData.tagIds = formData.tagIds || []

      const body = {
        ...formData,
        ...infos
      }

      console.log('Form data:', body)
      isUsernameAvailable(formData.username)
        .then((isUsernameAvailable: any) => {
          if (isUsernameAvailable.data) {
            register(body)
              .then((token: any) => {
                localStorage.setItem('token', token.data)
                updateUserInfo(body)
                  .then((res) => {
                    user()
                      .then((info) => {
                        dispatch(
                          setUserInfo({
                            username: info.data.username,
                            picture: info.data.avatar,
                            email: info.data.email,
                            token: info.data.token
                          })
                        )
                        localStorage.removeItem('needRegister')
                        localStorage.removeItem('registerUserInfo')
                        Modal.destroyAll()
                        navigate('/layout/matchingbefore')
                      })
                      .catch(() => {
                        console.log('获取用户信息失败')
                      })

                    message.success('更新用户信息成功', res)
                  })
                  .catch(() => {
                    message.warning('更新用户信息失败')
                  })
              })
              .catch(() => {
                message.warning('注册失败')
              })
          } else {
            message.warning('用户名已被使用')
          }
        })
        .catch(() => {
          message.warning('检测用户名失败')
        })
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

  const handleMatching = async (type: string) => {
    if (type === '文字匹配') {
      const body = {
        character: userInfo.character,
        sex: userInfo.sex,
        type
      }
      const res = await createMatching({ ...body })
      if (res) {
        getShengwangRTMToken().then((rtmToken) => {
          navigate('/layout/chat', {
            state: {
              token: rtmToken.data,
              channelName: res.data.channelName,
              user: res.data.user
            }
          })
        })
      } else {
        message.warning('创建匹配失败')
      }
    } else if (type === 'voice') {
      navigate('/layout/voice')
    } else if (type === '视频匹配') {
      const body = {
        character: userInfo.character,
        sex: userInfo.sex,
        type
      }
      const res = await createMatching({ ...body })
      if (res) {
        getShengwangRTCToken(res.data.channelName).then((channelToken) => {
          navigate('/layout/video', {
            state: {
              channelName: res.data.channelName,
              user: res.data.user,
              channelToken: channelToken.data
            }
          })
        })
      } else {
        console.log('false')
      }
    }
  }

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
            onClick={() => handleMatching(item.type)}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default MatchingBefore
