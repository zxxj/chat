import style from './LoginBox.module.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import * as jsontokens from 'jsontokens'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'
import LogoIcon from '@/assets/HeaderComponent/logo.png'
import { Modal, App, Button } from 'antd'
import { useEffect, useRef, useState } from 'react'
import Register from '@/views/Register'

export const LoginBox = () => {
  const registerFormRef = useRef<any>(null) // 引用 Register 表单
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const clientId = '1065142607066-e3h0rcj84t8mm5ao9q15s5v1sqvq01ke.apps.googleusercontent.com'

  const handleLoginSuccess = async (response: any, dispatch: any) => {
    const { credential } = response
    const decodedToken = jsontokens.decodeToken(credential)
    console.log('Decoded Token:', decodedToken)

    const { name, picture, email } = decodedToken.payload as any
    await dispatch(setUserInfo({ username: name, picture, email }))

    // 测试chat模块rtm,模拟不同用户登录
    if (email === 'xinxinxinxinxinzzz@gmail.com') {
      console.log('xinxinxinxinxinzzz')
      const obj = {
        userId: 'xinxin1',
        token:
          '007eJxTYDAWCtry7M0UzsL5zYHZh5bYXdA/LMHtUXuMb+JKO/Hb/j8VGMyMjYzNkoySLdPME02MDUwSU1LMLCySU4zMLUzNLQwsve7UpDcEMjL0eD5mYGRgAmJGBhCfnaEiMw+IDAEd4h+f'
      }
      localStorage.setItem('xinxin1-test-rtm', JSON.stringify(obj))
    } else if (email === 'coderzxx2@gmail.com') {
      console.log('coderzxx2')
      const obj = {
        userId: 'xinxin2',
        token:
          '007eJxTYNDbZrvDfJZbT1i91P4G83UWFzVjV36cfPWgyMUt/pab42cqMJgZGxmbJRklW6aZJ5oYG5gkpqSYWVgkpxiZW5iaWxhYqr+vSW8IZGSYrp7FwMjABMSMDCA+O0NFZh4QGQEARtYf0A=='
      }
      localStorage.setItem('xinxin2-test-rtm', JSON.stringify(obj))
    }

    // 判断用户是否已经注册,如未注册则弹出注册页面
    const currentUserIsRegistered = localStorage.getItem('test-userIsRegistered')
    console.log(currentUserIsRegistered)
    if (currentUserIsRegistered === '222') {
      navigate('/layout/matching')
    } else {
      // navigate('/layout/matching')
      navigate('/matchingbefore')
      setShowRegisterModal(true) // 用户未注册，显示注册弹框
    }
  }

  const handleLoginFailure = (error: any) => {
    console.error('Login Failed:', error)
  }

  const handleRegisterOk = () => {
    // 获取子组件的表单数据
    // setShowRegisterModal(false)
    Modal.destroyAll()

    // const formData = registerFormRef.current.getRegsiterFormData()
    // console.log('Register Form Data:', formData)

    // 在这里可以处理注册确认逻辑，存储数据或跳转
    // navigate('/layout/matching')
  }

  // 弹框显示的条件
  useEffect(() => {
    if (showRegisterModal) {
      Modal.confirm({
        width: 1400,
        content: (
          <Register
            ref={registerFormRef} // 传递 ref 给 Register 组件
          />
        ),
        onOk: handleRegisterOk, // 点击 OK 时的操作
        footer: [
          <div className="text-center">
            <Button key="ok" className="text-white bg-custom-purple" onClick={handleRegisterOk}>
              Complete
            </Button>
          </div>
        ]
      })
    }
  }, [showRegisterModal, navigate])

  return (
    <App>
      <GoogleOAuthProvider clientId={clientId}>
        <div className={style.loginBox}>
          <div className={style.logo}>
            <img src={LogoIcon} />
          </div>
          <GoogleLogin
            onSuccess={(response) => handleLoginSuccess(response, dispatch)}
            onError={handleLoginFailure}
          />
        </div>
      </GoogleOAuthProvider>
    </App>
  )
}
