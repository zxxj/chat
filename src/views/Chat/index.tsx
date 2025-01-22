import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import AgoraRTM from 'agora-rtx'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { Input, Spin } from 'antd'

const { TextArea } = Input
const appId = '1a75c358653848ab8f8617178d5c52b3'
const receiverId: string = '' // 接收人id
const msChannelName = 'Chat_room' // 房间名

const Chat: React.FC = () => {
  const [client, setClient] = useState<any>(null) // 使用明确的类型
  const [messages, setMessages] = useState<{ publisher: string; message: string }[]>([])
  const [inputText, setInputText] = useState<string>('')
  const [isSending, setIsSending] = useState(false)
  const textAreaRef = useRef<any>(null)

  const userInfo: any = useSelector((state: RootState) => state.user.userInfo)
  const userId: string = String(userInfo.id)
  const token: string = localStorage.getItem('swtk') as string
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
      const publishOptions = { channelType: 'USER' }

      await client?.publish(receiverId, publishMessage, publishOptions)
      setMessages((prevMessages) => [...prevMessages, { publisher: userId, message: inputText }])
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
        111
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
