import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import AgoraRTM from 'agora-rtm'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Input, Spin } from 'antd'
import { useLocation } from 'react-router-dom'

const { TextArea } = Input
const appId = '1a75c358653848ab8f8617178d5c52b3'

interface ChatProps {
  selectedUser: any
}

const Chat: React.FC<ChatProps> = ({ selectedUser }) => {
  const [selectedUserInfo, setSelectedUserInfo] = useState<any>(null)
  const location = useLocation()
  const receiverId: string = location.state?.user?.id || '0' // 接收人id
  const msChannelName = location.state?.channelName || '0' // 房间名
  const [client, setClient] = useState<any>(null) // 使用明确的类型
  const [messages, setMessages] = useState<{ publisher: string; message: string }[]>([])
  const [inputText, setInputText] = useState<string>('')
  const [isSending, setIsSending] = useState(false)
  const textAreaRef = useRef<any>(null)

  console.log(location, 'locationsss')
  const userInfo: any = useSelector((state: RootState) => state.user.userInfo)
  const userId: string = String(userInfo.id)
  // const userId = 'test1'
  // const token: string = selectedUser?.token || '0'
  const token: string = location?.state?.token || selectedUser?.token
  // 初始化RTM客户端并登录
  useEffect(() => {
    const setupRTM = async () => {
      try {
        const { RTM } = AgoraRTM
        const rtm = new RTM(appId, userId)
        setClient(rtm)

        rtm.addEventListener('message', (event: any) => {
          console.log(event, 'event')
          // 解析接收到的消息
          let messageContent = event.message

          try {
            messageContent = JSON.parse(event.message) // 解析 JSON 字符串
          } catch {
            console.log('Received non-JSON message:', event.message)
          }

          // 收到消息时更新消息列表
          setMessages((prevMessages) => [
            ...prevMessages,
            { publisher: event.publisher, message: messageContent.message || messageContent }
          ])
        })

        rtm.addEventListener('presence', (event) => {
          // 处理用户加入或离开
          if (event.eventType === 'SNAPSHOT') {
            // ...
          } else {
            setMessages((prevMessages) => [
              ...prevMessages,
              { publisher: 'system', message: `INFO: ${event.publisher} is ${event.eventType}` }
            ])
          }
        })

        rtm.addEventListener('status', (e) => {
          console.log(e, 'eeee')
          // 连接状态变化
          // setMessages((prevMessages) => [...prevMessages, `INFO: ${JSON.stringify(event)}`])
        })

        // 登录
        const result = await rtm.login({ token })
        console.log('Login Success:', result)

        // 订阅频道
        await rtm.subscribe(msChannelName)
        console.log('Subscribed to channel:', msChannelName)
      } catch (status) {
        console.log('Error:', status)
      }
    }

    setupRTM()

    return () => {
      if (client) {
        client.removeAllListeners()
      }
    }
  }, [])

  useEffect(() => {
    if (selectedUser) {
      console.log('Selected User:', selectedUser)
      setSelectedUserInfo(selectedUser)
      // 在这里可以根据 selectedUser 初始化聊天
      // 例如，重新连接到新的聊天频道

      client.history
        .getMessages(msChannelName, 'MESSAGE', {
          messageCount: 50,
          end: Date.now()
        })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [selectedUser])

  // 聚焦
  useEffect(() => {
    if (!isSending) {
      textAreaRef.current?.focus()
    }
  }, [isSending])

  const publishMessage = useCallback(async () => {
    if (inputText.trim() === '') return

    try {
      setIsSending(true)
      const payload = { type: 'text', message: inputText, publisher: userId }
      const publishMessage = JSON.stringify(payload)
      const publishOptions = { channelType: 'MESSAGE' }

      await client.publish(msChannelName, publishMessage, receiverId, publishOptions, {
        channelType: 'MESSAGE',
        customType: 'STRING',
        storeInHistory: true
      })
      setMessages((prevMessages) => [...prevMessages])
      setInputText('')
    } catch (status) {
      console.log('Publish Error:', status)
    } finally {
      setIsSending(false)
    }
  }, [client, inputText, receiverId, userId])

  const renderedMessages = useMemo(
    () =>
      messages.map((msg, index) => {
        const isSelf = msg.publisher === userId
        return (
          <div
            key={index}
            className={`flex ${isSelf ? 'justify-end' : 'justify-start'} p-2 animate-message-in`}
          >
            <div
              className={`max-w-[70%] rounded-2xl px-4 py-2 break-words ${
                isSelf ? 'bg-custom-purple text-white' : 'bg-[#2B2649] text-white'
              } ${isSelf ? 'rounded-tr-none' : 'rounded-tl-none'}`}
            >
              {msg.message}
            </div>
          </div>
        )
      }),
    [messages, userId]
  )

  return (
    <div className="flex flex-col w-full h-full p-6">
      <div className="border-b h-custom-49" style={{ borderColor: '#4D4868', lineHeight: '49px' }}>
        {selectedUserInfo?.to || ''}
      </div>
      <div id="textDisplay" className="flex-1 overflow-y-auto">
        <div>todo</div>
        {renderedMessages}
      </div>
      <div>
        <div className="relative">
          <TextArea
            ref={textAreaRef}
            className="text-white border-custom-chat"
            style={{ background: '#16132D' }}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Press Enter to send the message"
            autoSize={{ minRows: 3, maxRows: 5 }}
            onPressEnter={(e) => {
              e.preventDefault()
              if (!isSending) {
                publishMessage()
              }
            }}
            disabled={isSending} // 发送时禁用输入框
          />
          {isSending && (
            <div className="absolute right-3 bottom-3">
              <Spin size="small" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Chat
