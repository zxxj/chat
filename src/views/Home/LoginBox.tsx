import style from './LoginBox.module.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import * as jsontokens from 'jsontokens'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'
import LogoIcon from '@/assets/HeaderComponent/logo.png'
import { Modal, App } from 'antd'
import { useEffect, useState } from 'react'
import Register from '@/views/Register'

export const LoginBox = () => {
  const dispatch = useDispatch()
  const navigae = useNavigate()
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  const clientId = '1065142607066-e3h0rcj84t8mm5ao9q15s5v1sqvq01ke.apps.googleusercontent.com'

  const handleLoginSuccess = async (response: any, dispatch: any) => {
    const { credential } = response
    const decodedToken = jsontokens.decodeToken(credential)
    console.log('Decoded Token:', decodedToken)

    const { name, picture, email } = decodedToken.payload as any
    await dispatch(setUserInfo({ username: name, picture, email }))

    // 判断用户是否已经注册,如未注册则弹出注册页面
    const currentUserIsRegistered = localStorage.getItem('test-userIsRegistered')
    console.log(currentUserIsRegistered)
    if (currentUserIsRegistered === '222') {
      navigae('/layout/matching')
    } else {
      setTimeout(() => {
        navigae('/layout/matching')
        setShowRegisterModal(true) // 延迟显示弹框
      }, 1000) // 延迟1秒弹框
    }
  }

  // 弹框显示的条件
  useEffect(() => {
    if (showRegisterModal) {
      console.log(111)
      Modal.confirm({
        title: '用户未注册',
        content: <Register />,
        onOk: () => {
          // 在此进行注册流程的逻辑（跳转到注册页面或其他）
          navigae('/layout/matching')
        },
        onCancel: () => {
          // 用户取消注册，可以处理相关逻辑
          // navigae('/layout/matching')
        }
      })
    }
  }, [showRegisterModal, navigae])
  const handleLoginFailure = (error: any) => {
    console.error('Login Failed:', error)
  }

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
