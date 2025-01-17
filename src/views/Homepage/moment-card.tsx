import { useState, useRef, useEffect } from 'react'
import MoreIcon from '@/assets/HomePage/more.png'
import LikeIcon from '@/assets/HomePage/like.png'
import CommentIcon from '@/assets/HomePage/comment.png'
import LookIcon from '@/assets/HomePage/look.png'
import { Image } from 'antd'
import { DownOutlined, RightOutlined, UpOutlined } from '@ant-design/icons'
import { PostVo } from '@/types/momentCard'
import dayjs from 'dayjs'

const MomentCard: React.FC<PostVo> = ({ data }: PostVo) => {
  const url = import.meta.env.VITE_BASE_URL_FILE_REVIEW
  const [isExpanded, setIsExpanded] = useState(false)
  const [showMoreButton, setShowMoreButton] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  // 检查文本是否需要展开按钮
  useEffect(() => {
    const element = textRef.current
    if (element) {
      const lineHeight = parseInt(window.getComputedStyle(element).lineHeight)
      const height = element.scrollHeight
      setShowMoreButton(height > lineHeight * 3)
    }
  }, [data])

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="flex justify-between mb-12">
      <div className="mr-6 text-center date w-14">
        <div className="text-lg month">{dayjs(data.createdAt).format('MM-DD')}</div>
        <div className="time" style={{ color: '#999' }}>
          {dayjs(data.createdAt).format('HH:mm')}
        </div>
      </div>

      {/* 内容部分 */}
      <div className="flex-1 content">
        <div className="relative">
          <p
            ref={textRef}
            className={isExpanded ? '' : 'line-clamp-2'}
            style={{
              overflow: 'hidden',
              whiteSpace: 'normal',
              textOverflow: 'ellipsis',
              position: 'relative',
              lineHeight: '1.5em',
              maxHeight: isExpanded ? 'none' : '3em',
              paddingRight: showMoreButton && !isExpanded ? '4em' : '0'
            }}
          >
            {data.content}
          </p>
          {showMoreButton && !isExpanded && (
            <div
              className="absolute right-0 pl-2 cursor-pointer text-custom-purple"
              onClick={toggleExpand}
              style={{
                top: '1.4em',
                lineHeight: '1.5em'
              }}
            >
              展开 <DownOutlined />
            </div>
          )}
          {isExpanded && showMoreButton && (
            <div className="mt-2 text-right">
              <span className="cursor-pointer text-custom-purple" onClick={toggleExpand}>
                收起 <UpOutlined />
              </span>
            </div>
          )}
        </div>
        {/* 图片内容 */}
        <div className="mt-4">
          <Image.PreviewGroup
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`)
            }}
          >
            {data.pics.map((fileName: string) => (
              <Image width={87} src={url + fileName} key={fileName} />
            ))}
          </Image.PreviewGroup>
        </div>
        {/* 话题 */}
        {/* <div className="flex mt-4 ">
          {data.topics.map((item: string, index: number) => (
            <div
              key={index}
              className="flex items-center justify-center h-8 px-5 mr-4"
              style={{ backgroundColor: '#0D0A22', borderRadius: 50 }}
            >
              <div
                className="w-5 h-5 mr-2 leading-5 text-center text-white rounded-bl-full "
                style={{ backgroundColor: '#E65AFF', borderRadius: 50 }}
              >
                #
              </div>
              <div style={{ color: '#999' }}>{item}</div>
            </div>
          ))}
        </div> */}
        {/* 位置 */}
        <div
          className="flex items-center w-24 h-8 px-3.5 mt-4 city cursor-pointer"
          style={{ color: '#484465', backgroundColor: '#0D0A22', borderRadius: 50 }}
        >
          {data.address || '未知'}
          <RightOutlined className="ml-2" />
        </div>

        <div className="flex mt-5">
          <div className="flex items-center mr-12 cursor-pointer">
            <img src={LikeIcon} className="w-6 h-6 mr-1" />
            <span className="text-lg">{data.likes}</span>
          </div>

          <div className="flex items-center mr-12 cursor-pointer">
            <img src={CommentIcon} className="w-6 h-6 mr-1" />
            <span className="text-lg">{data.comments}</span>
          </div>

          <div className="flex items-center mr-12 cursor-pointer">
            <img src={LookIcon} className="w-6 h-6 mr-1" />
            <span className="text-lg">{data.views}</span>
          </div>
        </div>
      </div>

      <div className="w-5 ml-4 handle">
        <img src={MoreIcon} className="w-6 h-6 cursor-pointer" />
      </div>
    </div>
  )
}

export default MomentCard
