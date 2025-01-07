import { useEffect, useState } from 'react'
import AgoraRTM from 'agora-rtx' // 引入 AgoraRTM 库
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
const appId = '63236b2c9f7a4304add688cd27857809' // 替换为你的 App ID
let userId: any = 'xinxin1' // 用户 ID
let token: string = ''
let receiverId: string = '' // 接收人id
const msChannelName = 'Chat_room' // 房间名

const Chat = () => {
  const [client, setClient] = useState(null) // RTM 客户端
  const [messages, setMessages] = useState([]) // 消息列表
  const [inputText, setInputText] = useState('') // 文本输入框内容
  const [isLoggedIn, setIsLoggedIn] = useState(false) // 用户是否登录

  const userInfo: any = useSelector((state: RootState) => state.user.userInfo)

  console.log(userInfo, 'aaa')
  if (userInfo.email === 'xinxinxinxinxinzzz@gmail.com') {
    const info: any = localStorage.getItem('xinxin1-test-rtm')
    const parsedInfo: { userId: string; token: string } = JSON.parse(info)
    receiverId = 'xinxin2'
    userId = parsedInfo.userId
    token = parsedInfo.token
  } else if (userInfo.email === 'coderzxx2@gmail.com') {
    const info: any = localStorage.getItem('xinxin2-test-rtm')
    const parsedInfo: { userId: string; token: string } = JSON.parse(info)
    userId = parsedInfo.userId
    receiverId = 'xinxin1'
    token = parsedInfo.token
  }

  console.log(userId)
  // 初始化 RTM 客户端并登录
  useEffect(() => {
    const setupRTM = async () => {
      try {
        const { RTM } = AgoraRTM
        const rtm = new RTM(appId, userId)
        setClient(rtm)

        rtm.addEventListener('message', (event) => {
          // 收到消息时更新消息列表
          setMessages((prevMessages) => [...prevMessages, `${event.publisher}: ${event.message}`])
        })

        rtm.addEventListener('presence', (event) => {
          // 处理用户加入或离开
          if (event.eventType === 'SNAPSHOT') {
            setMessages((prevMessages) => [...prevMessages, `INFO: I Join`])
          } else {
            setMessages((prevMessages) => [
              ...prevMessages,
              `INFO: ${event.publisher} is ${event.eventType}`
            ])
          }
        })

        rtm.addEventListener('status', (event) => {
          // 连接状态变化
          setMessages((prevMessages) => [...prevMessages, `INFO: ${JSON.stringify(event)}`])
        })

        // 登录
        const result = await rtm.login({ token })
        console.log('Login Success:', result)
        setIsLoggedIn(true)

        // 订阅频道
        await rtm.subscribe(msChannelName)
        console.log('Subscribed to channel:', msChannelName)
      } catch (status) {
        console.log('Error:', status)
      }
    }

    setupRTM()

    // 清理事件监听器
    return () => {
      if (client) {
        client.removeAllListeners() // 清理 RTM 监听器
      }
    }
  }, []) // 确保只在首次加载时运行一次

  // 发送消息
  const publishMessage = async () => {
    if (inputText.trim() === '') return // 防止发送空消息

    const payload = { type: 'text', message: inputText }
    const publishMessage = JSON.stringify(payload)
    const publishOptions = { channelType: 'USER' } // 使用 USER 类型频道进行点对点消息发送

    try {
      const result = await client.publish(receiverId, publishMessage, publishOptions) // 发送消息到用户频道
      setMessages((prevMessages) => [...prevMessages, `${userId}: ${inputText}`]) // 更新本地消息
      setInputText('') // 清空输入框
      console.log('Publish Result:', result)
    } catch (status) {
      console.log('Publish Error:', status)
    }
  }

  return (
    <div id="container" style={{ width: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Hello RTM!</h1>

      <div
        id="textDisplay"
        style={{
          width: '100%',
          height: '500px',
          border: '1px solid #b0b0b0',
          marginBottom: '20px',
          overflowY: 'auto',
          padding: '10px',
          boxSizing: 'border-box',
          textAlign: 'left'
        }}
      >
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>

      <div id="inputContainer" style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          id="textInput"
          placeholder="Enter text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ width: 'calc(100% - 100px)', padding: '5px', marginRight: '10px' }}
        />
        <button
          id="submitButton"
          onClick={publishMessage}
          style={{ width: '90px', padding: '5px' }}
          disabled={!isLoggedIn} // 禁用按钮，直到登录成功
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat
