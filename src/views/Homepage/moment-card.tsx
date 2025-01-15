import { useState } from 'react'
import MoreIcon from '@/assets/HomePage/more.png'
import LikeIcon from '@/assets/HomePage/like.png'
import CommentIcon from '@/assets/HomePage/comment.png'
import LookIcon from '@/assets/HomePage/look.png'
import { Image } from 'antd'
import { DownOutlined, RightOutlined } from '@ant-design/icons'
import { MomentCardProps } from '@/types/momentCard'

const MomentCard: React.FC<MomentCardProps> = ({ data }: MomentCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false) // 控制文本是否展开

  console.log(data)
  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="flex justify-between mb-12">
      <div className="mr-6 text-center date w-14">
        <div className="text-lg month">{data.date}</div>
        <div className="time" style={{ color: '#999' }}>
          {data.time}
        </div>
      </div>

      {/* 内容部分 */}
      <div className="flex-1 content">
        <p
          className={`text-ellipsis ${isExpanded ? '' : 'line-clamp-3'}`}
          style={{
            overflow: 'hidden',
            whiteSpace: 'normal',
            textOverflow: 'ellipsis'
          }}
        >
          {data.content}
        </p>
        {/* “更多”按钮放在文本后面 */}
        <div
          className=" more-button"
          onClick={toggleExpand}
          style={{ display: isExpanded ? 'none' : 'block' }}
        >
          <span className="cursor-pointer text-custom-purple">
            更多 <DownOutlined />
          </span>
        </div>
        {/* 图片内容 */}
        <div className="mt-4">
          <Image.PreviewGroup
            preview={{
              onChange: (current, prev) =>
                console.log(`current index: ${current}, prev index: ${prev}`)
            }}
          >
            {data.imgs.map((img: string, index: number) => (
              <Image width={87} src={img} key={index} />
            ))}
          </Image.PreviewGroup>
        </div>
        {/* 话题 */}
        <div className="flex mt-4 ">
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
        </div>
        {/* 位置 */}
        <div
          className="flex items-center w-24 h-8 px-3.5 mt-4 city cursor-pointer"
          style={{ color: '#484465', backgroundColor: '#0D0A22', borderRadius: 50 }}
        >
          {data.location}
          <RightOutlined className="ml-2" />
        </div>

        <div className="flex mt-5">
          <div className="flex items-center mr-12 cursor-pointer">
            <img src={LikeIcon} className="w-6 h-6 mr-1" />
            <span className="text-lg">{data.like}</span>
          </div>

          <div className="flex items-center mr-12 cursor-pointer">
            <img src={CommentIcon} className="w-6 h-6 mr-1" />
            <span className="text-lg">{data.comment}</span>
          </div>

          <div className="flex items-center mr-12 cursor-pointer">
            <img src={LookIcon} className="w-6 h-6 mr-1" />
            <span className="text-lg">{data.look}</span>
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
