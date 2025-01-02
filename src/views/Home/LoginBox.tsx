import style from './LoginBox.module.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import * as jsontokens from 'jsontokens'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '@/store/modules/user'
import { useNavigate } from 'react-router-dom'
import LogoIcon from '@/assets/HeaderComponent/logo.png'

export const LoginBox = () => {
  const dispatch = useDispatch()
  const navigae = useNavigate()

  const clientId = '1065142607066-e3h0rcj84t8mm5ao9q15s5v1sqvq01ke.apps.googleusercontent.com'

  const handleLoginSuccess = async (response: any, dispatch: any) => {
    const { credential } = response
    const decodedToken = jsontokens.decodeToken(credential)
    console.log('Decoded Token:', decodedToken)

    const { name, picture, email } = decodedToken.payload as any
    await dispatch(setUserInfo({ username: name, picture, email }))

    navigae('/layout/matching')
  }

  const handleLoginFailure = (error: any) => {
    console.error('Login Failed:', error)
  }

  return (
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
  )
}
