import style from './LoginBox.module.css'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import * as jsontokens from 'jsontokens'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '@/store/modules/user'

const clientId = '1065142607066-e3h0rcj84t8mm5ao9q15s5v1sqvq01ke.apps.googleusercontent.com'

const handleLoginSuccess = async (response: any, dispatch: any) => {
  const { credential } = response
  const decodedToken = jsontokens.decodeToken(credential)
  console.log('Decoded Token:', decodedToken)

  const { name, picture, email } = decodedToken.payload
  dispatch(setUserInfo({ username: name, picture, email }))
}

const handleLoginFailure = (error: any) => {
  console.error('Login Failed:', error)
}

export const LoginBox = () => {
  const dispatch = useDispatch()

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className={style.loginBox}>
        <div className={style.logo}>
          <div className="mr-4 bg-red-500 icon w-11 h-11"></div>
          <div className="title">meowchats</div>
        </div>
        <GoogleLogin
          onSuccess={(response) => handleLoginSuccess(response, dispatch)}
          onError={handleLoginFailure}
        />
      </div>
    </GoogleOAuthProvider>
  )
}
