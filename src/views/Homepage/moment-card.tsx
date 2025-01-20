import { useState, useRef, useEffect } from 'react'
import MoreIcon from '@/assets/HomePage/more.png'
import LikeIcon from '@/assets/HomePage/like.png'
import LikedIcon from '@/assets/HomePage/liked.png'
import CommentIcon from '@/assets/HomePage/comment.png'
import LookIcon from '@/assets/HomePage/look.png'
import { Avatar, Image, Input, Dropdown, Button, List, Modal, Popconfirm, message } from 'antd'
import { DownOutlined, RightOutlined, UpOutlined } from '@ant-design/icons'
import { PostVo, CommentVo } from '@/types/momentCard'
import dayjs from 'dayjs'
import {
  likeMomentById,
  viewMomentById,
  commentMoment,
  unlikeMomentById
} from '@/http/modules/common'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import type { MenuProps } from 'antd'
import { deleteMomentById } from '@/http/modules/moment'

const MomentCard: React.FC<{ data: PostVo; onRefresh: () => void; activeKey: string }> = ({
  data,
  activeKey,
  onRefresh
}) => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo)

  const navigate = useNavigate()
  const url = import.meta.env.VITE_BASE_URL_FILE_REVIEW
  const [isExpanded, setIsExpanded] = useState(false)
  const [showMoreButton, setShowMoreButton] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [likes, setLikes] = useState(data.likes || 0)
  const [liked, setLiked] = useState(data.liked || false)
  const [comments, setComments] = useState<CommentVo[]>(data.commentList || [])
  const [newComment, setNewComment] = useState('')
  const [isCommentVisible, setIsCommentVisible] = useState(false)
  const [replyTo, setReplyTo] = useState<CommentVo | null>(null)
  const [commentInputModal, setCommentInputModal] = useState(false)

  const handleDelete = async () => {
    try {
      await deleteMomentById(data.id as number)
      onRefresh() // 调用父组件的刷新函数
      message.success('delete success')
    } catch (error) {
      console.log(error)
      message.error('delete failed')
    }
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Popconfirm
          title="Are you sure to delete it?"
          onConfirm={handleDelete}
          okText="confirm"
          cancelText="cancel"
        >
          <span>Delete</span>
        </Popconfirm>
      )
    },
    {
      key: '2',
      label: 'Permission'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            markAsViewed(data.id)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [data.id])

  useEffect(() => {
    if (textRef.current) {
      const isOverflowing = textRef.current.scrollHeight > textRef.current.clientHeight
      setShowMoreButton(isOverflowing)
    }
  }, [data.content])

  const markAsViewed = async (postId: number) => {
    console.log(`Mark post ${postId} as viewed`)
    await viewMomentById(postId)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const handleLike = async () => {
    if (liked) {
      setLikes(likes - 1)
      await unlikeMomentById(data.id as number)
    } else {
      setLikes(likes + 1)
      await likeMomentById(data.id as number)
    }
    setLiked(!liked)
  }

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      const newCommentObj: CommentVo = {
        username: userInfo.username as string,
        content: newComment,
        postId: data.id as number
      }

      if (replyTo) {
        // 如果是回复某条评论
        const updatedComments = comments.map((comment) => {
          return {
            ...comment,
            replies: [...(comment.replies || []), newCommentObj]
          }
        })
        updatedComments[0].replies[updatedComments[0].replies.length - 1].commentId = replyTo.id
        setComments(updatedComments)
        console.log('回复', updatedComments[0].replies[updatedComments[0].replies.length - 1])
        // debugger
        // bug: 回复评论时，评论内容为空
        await commentMoment(updatedComments[0].replies[updatedComments[0].replies.length - 1])

        // location.reload()
        setReplyTo(null)
      } else {
        // 普通评论
        setComments([...comments, newCommentObj])
        await commentMoment(newCommentObj)
      }

      setNewComment('')
      onRefresh() // 调用父组件的刷新函数
    }
  }

  const renderComments = (comments: CommentVo[], level = 0) => {
    return comments.map((comment) => (
      <List.Item key={comment.id} style={{ marginLeft: level * 20 }}>
        <div className="flex items-start w-full">
          {/* <Avatar
            size={40}
            src={url + comment.username} // 假设有用户头像
            className="mr-3"
          /> */}
          <div className="w-full">
            <div className="flex items-center">
              <span className="mr-2 font-bold text-white">{comment.username} : </span>
              <div className="text-white">{comment.content}</div>
            </div>

            <div className="flex justify-between w-full">
              <div className="text-sm text-gray-500">
                {/* {dayjs(comment.createdAt).format('YYYY-MM-DD HH:mm')} */}
              </div>
              <Button
                type="link"
                className="text-custom-purple"
                onClick={() => {
                  setReplyTo(comment)
                  setNewComment(`@${comment.username} `)
                }}
              >
                <img src={CommentIcon} alt="comment" onClick={() => setCommentInputModal(true)} />
              </Button>
            </div>

            {/* 递归渲染子评论 */}
            {comment.reply && renderComments(comment.reply, level + 1)}
          </div>
        </div>
      </List.Item>
    ))
  }

  const gotoUser = () => {
    navigate(`/layout/user/${data.userId}`)
  }

  const closeModal = () => {
    setCommentInputModal(false)
    setNewComment('')
    setReplyTo(null)
  }

  const handleDropdownClick = (e: any) => {
    console.log(e)
  }

  return (
    <div ref={cardRef} className="flex justify-between mb-12">
      <div className="mr-6 text-center date w-14">
        <Avatar
          size={60}
          src={url + data.avatar}
          className="mb-2 cursor-pointer"
          onClick={gotoUser}
        />
        <div className="text-lg month">{dayjs(data.createdAt).format('MM-DD')}</div>
        <div className="time" style={{ color: '#999' }}>
          {dayjs(data.createdAt).format('HH:mm')}
        </div>
      </div>

      {/* 内容部分 */}
      <div className="flex-1 content">
        <div className="mb-4 text-lg cursor-pointer">{data.username}</div>
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
                top: '1.5em',
                lineHeight: '1.5em'
              }}
            >
              expansion <DownOutlined />
            </div>
          )}
          {isExpanded && showMoreButton && (
            <div className="mt-2 text-right">
              <span className="cursor-pointer text-custom-purple" onClick={toggleExpand}>
                collapse <UpOutlined />
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
        {/* 位置 */}
        <div
          className="flex items-center w-24 h-8 px-3.5 mt-4 city cursor-pointer"
          style={{ color: '#484465', backgroundColor: '#0D0A22', borderRadius: 50 }}
        >
          {data.address || '未知'}
          <RightOutlined className="ml-2" />
        </div>
        <div className="flex mt-5">
          <div className="flex items-center mr-12 cursor-pointer" onClick={handleLike}>
            <img src={liked ? LikedIcon : LikeIcon} className="w-6 h-6 mr-1" />
            <span className="text-lg">{likes}</span>
          </div>

          <div
            className="flex items-center mr-12 cursor-pointer"
            onClick={() => setIsCommentVisible(!isCommentVisible)}
          >
            <img src={CommentIcon} className="w-6 h-6 mr-1" />
            <span className="text-lg">{comments.length}</span>
          </div>

          <div className="flex items-center mr-12 cursor-pointer">
            <img src={LookIcon} className="w-6 h-6 mr-1" />
            <span className="text-lg">{data.views}</span>
          </div>
        </div>

        {/* 评论输入框和列表 */}
        {isCommentVisible && (
          <div className="mt-4">
            {/* 仅在有评论时显示评论列表 */}
            {comments.length > 0 && (
              <List className="mt-4 overflow-y-auto">{renderComments(comments)}</List>
            )}
          </div>
        )}
      </div>

      <div className="w-5 mr-6 handle" style={{ display: activeKey === '1' ? 'block' : 'none' }}>
        <Dropdown
          menu={{ items, onClick: handleDropdownClick }}
          placement="bottomRight"
          arrow={{ pointAtCenter: true }}
          trigger={['click']}
        >
          <img src={MoreIcon} className="w-6 h-6 cursor-pointer" />
        </Dropdown>
      </div>

      <Modal
        title="comment"
        open={commentInputModal}
        onCancel={() => setCommentInputModal(false)}
        footer={null}
        closable={false}
      >
        <div>
          <Input.TextArea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Post your comments"
          />
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={closeModal} className="mr-3">
            cancel
          </Button>
          <Button type="primary" onClick={handleCommentSubmit} className="">
            comment
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default MomentCard
