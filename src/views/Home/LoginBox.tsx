import style from './LoginBox.module.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import * as jsontokens from 'jsontokens'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'
import LogoIcon from '@/assets/HeaderComponent/logo.png'
import { App, message } from 'antd'
import { login, user } from '@/http/models/user'

export const LoginBox: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const clientId = '1065142607066-e3h0rcj84t8mm5ao9q15s5v1sqvq01ke.apps.googleusercontent.com'

  const handleLoginSuccess = async (response: any, dispatch: any) => {
    const { credential } = response
    const decodedToken = jsontokens.decodeToken(credential)
    const { name, picture, email, sub } = decodedToken.payload as any

    try {
      const token = await login({ email, sub })

      if (!token) {
        // 如果没有数据，说明用户未注册
        localStorage.setItem('needRegister', 'true') // 未注册用户刷新页面时,确保刷新后注册弹框不消失
        localStorage.setItem('registerUserInfo', JSON.stringify(decodedToken.payload))
        await dispatch(setUserInfo({ username: name, picture, email }))
        navigate('/matchingbefore')
      } else {
        // 登录成功，保存用户信息和 token
        localStorage.setItem('token', token.data)
        const info = await user()
        await dispatch(
          setUserInfo({
            username: info.data.username,
            picture: info.data.avatar,
            email: info.data.email,
            token: info.data.token
          })
        )
        navigate('/matchingbefore')
      }
    } catch (error) {
      console.error('Login failed:', error)
      message.error('Login failed')
    }
  }

  const handleLoginFailure = () => {
    console.error('Login Failed')
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
