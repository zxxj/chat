import {
  LocalUser,
  RemoteUser,
  useIsConnected,
  useJoin,
  useLocalMicrophoneTrack,
  useLocalCameraTrack,
  usePublish,
  useRemoteUsers
} from 'agora-rtc-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import './styles.css'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export const Video = () => {
  const location = useLocation()
  console.log(location.state)
  const userInfo = useSelector((state: RootState) => state.user.userInfo)
  // debugger
  const [calling, setCalling] = useState(true)
  const isConnected = useIsConnected()
  const [appId, setAppId] = useState('1a75c358653848ab8f8617178d5c52b3')
  const [channel, setChannel] = useState(location.state.channelName)
  const [token, setToken] = useState<string | null>(location.state.channelToken)
  useJoin({ appid: appId, channel: channel, token: token, uid: userInfo.id }, calling)
  //local user
  const [micOn, setMic] = useState(true)
  const [cameraOn, setCamera] = useState(true)
  const { localMicrophoneTrack } = useLocalMicrophoneTrack(micOn)
  const { localCameraTrack } = useLocalCameraTrack(cameraOn)
  usePublish([localMicrophoneTrack, localCameraTrack])
  //remote users
  const remoteUsers = useRemoteUsers()
  console.log(remoteUsers)

  return (
    <>
      <div className="room">
        {isConnected ? (
          <div className="user-list">
            <div className="user">
              <LocalUser
                audioTrack={localMicrophoneTrack}
                cameraOn={cameraOn}
                micOn={micOn}
                videoTrack={localCameraTrack}
                cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
              >
                <samp className="user-name">You</samp>
              </LocalUser>
            </div>
            {remoteUsers.map((user) => (
              <div className="user" key={user.uid}>
                <RemoteUser
                  cover="https://www.agora.io/en/wp-content/uploads/2022/10/3d-spatial-audio-icon.svg"
                  user={user}
                >
                  <samp className="user-name">{user.uid}</samp>
                </RemoteUser>
              </div>
            ))}
          </div>
        ) : (
          <div></div>
          // <div className="join-room">
          //   <img alt="agora-logo" className="logo" src={logo} />
          //   <input
          //     onChange={(e) => setAppId(e.target.value)}
          //     placeholder="<Your app ID>"
          //     value={appId}
          //   />
          //   <input
          //     onChange={(e) => setChannel(e.target.value)}
          //     placeholder="<Your channel Name>"
          //     value={channel}
          //   />
          //   <input
          //     onChange={(e) => setToken(e.target.value)}
          //     placeholder="<Your token>"
          //     value={token}
          //   />

          //   <button
          //     className={`join-channel ${!appId || !channel ? 'disabled' : ''}`}
          //     disabled={!appId || !channel}
          //     onClick={() => setCalling(true)}
          //   >
          //     <span>Join Channel</span>
          //   </button>
          // </div>
        )}
      </div>
      {isConnected && (
        <div className="mt-16 control">
          <div className="left-control">
            <button className="btn" onClick={() => setMic((a) => !a)}>
              <i className={`i-microphone ${!micOn ? 'off' : ''}`} />
            </button>
            <button className="btn" onClick={() => setCamera((a) => !a)}>
              <i className={`i-camera ${!cameraOn ? 'off' : ''}`} />
            </button>
          </div>

          <button
            className="btn btn-phone "
            style={{ backgroundColor: '#2e2c42' }}
            onClick={() => {}}
          >
            <span className="gkbtn">公开</span>
          </button>

          <button
            className={`btn btn-phone ${calling ? 'btn-phone-active' : ''}`}
            onClick={() => setCalling((a) => !a)}
          >
            {calling ? <i className="i-phone-hangup" /> : <i className="i-mdi-phone" />}
          </button>
        </div>
      )}
    </>
  )
}

export default Video
