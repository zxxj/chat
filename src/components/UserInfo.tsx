import { Avatar, message } from 'antd'
import { getTags } from '@/http/modules/user'
import BrithdayIcon from '@/assets/HomePage/brithday.png'
import VioceIcon from '@/assets/HomePage/vioce.png'
import { RightOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { getUserInfoByUserId } from '@/http/modules/user'
import { useParams } from 'react-router-dom'

const EditProfile: React.FC = () => {
  const [tags, setTags] = useState<any[]>([])
  const [myTags, setMyTags] = useState<any[]>([])
  const [userInfo, setUserInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const url = import.meta.env.VITE_BASE_URL_FILE_REVIEW
  const { userId } = useParams<{ userId: string }>()

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchUserInfo()
      } catch (error) {
        console.error('Error fetching user info:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [userId])

  useEffect(() => {
    if (userInfo) {
      getTagsList()
    }
  }, [userInfo])

  const getTagsList = async () => {
    try {
      if (!userInfo || !userInfo.tagIds) {
        console.warn('userInfo or userInfo.tagIds is null or undefined')
        return
      }

      const tagList = await getTags({ current: 1, pageSize: 999 })
      const myTags = tagList.data.records.filter((tag: any) => userInfo.tagIds.includes(tag.id))
      setMyTags(myTags)
      setTags(tagList.data.records)
    } catch (error) {
      console.error('Failed to fetch tags:', error)
      message.error('Failed to load tags')
    }
  }

  const fetchUserInfo = async () => {
    try {
      const res = await getUserInfoByUserId(Number(userId))
      setUserInfo(res.data)
    } catch (error) {
      console.error('Error fetching user info:', error)
    }
  }

  // 添加空值检查

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="basic">
        <div className="avatar" style={{ marginTop: '60px' }}>
          <Avatar
            style={{ width: '92px', height: '92px' }}
            src={<img src={url + userInfo.avatar} />}
          />
        </div>

        <div className="flex justify-center mt-4 mb-4 text-lg username ">
          <div className="mr-4">{userInfo.username}</div>
          {/* <img src={EditUsernameIcon} alt="edit" className="cursor-pointer" /> */}
        </div>
        <div className="userid text-custom-id">ID：{userInfo.id}</div>

        <div className="flex items-center justify-center desc mt-3.5">
          <div className="flex cursor-pointer birthday">
            <img src={BrithdayIcon} />
            <div className="ml-1.5 text-custom-profile">
              {dayjs(userInfo.birthday).format('YYYY-MM-DD')}
            </div>
          </div>
          <div className="flex ml-10 cursor-pointer voice">
            <img src={VioceIcon} />
            <div className="ml-1.5 text-custom-profile">{'voice introduction'}</div>
          </div>
        </div>

        <div className="flex justify-around mr-10 tab ml-14 mt-9">
          <div>
            <div className="text-lg font-bold num ">{userInfo.follows}</div>
            <div className="text-custom-profile">follows</div>
          </div>

          <div>
            <div className="text-lg font-bold num ">{userInfo.followers}</div>
            <div className="text-custom-profile">followers</div>
          </div>

          {/* <div>
            <div className="text-lg font-bold num ">{userInfo.views}</div>
            <div className="text-custom-profile">read mine</div>
          </div> */}
        </div>

        <div
          style={{
            width: '302px',
            height: '1px',
            background: '#4D4868',
            margin: 'auto',
            marginTop: '31px'
          }}
        ></div>

        {/* my label */}
        <div className="mt-4 ml-5 text-left cursor-pointer w-80">
          <div>
            {`${userInfo.sex === 'man' ? '他的标签' : '她的标签'}`} <RightOutlined />
          </div>

          <div className="flex flex-wrap mt-4">
            {myTags.map((tag) => (
              <div
                className="px-6 mb-4 mr-1.5"
                key={tag.id}
                style={{
                  backgroundColor: '#0D0A22',
                  height: '30px',
                  borderRadius: '15px',
                  lineHeight: '30px',
                  color: '#999'
                }}
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
