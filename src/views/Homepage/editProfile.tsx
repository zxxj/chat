import { RootState } from '@/store'
import { Avatar, Modal, Upload, Form, Input, DatePicker, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { uploadFile } from '@/http/modules/file'
import { updateUserInfo, isUsernameAvailable, user, getTags } from '@/http/modules/user'
import EditUsernameIcon from '@/assets/HomePage/edit_username.png'
import BrithdayIcon from '@/assets/HomePage/brithday.png'
import VioceIcon from '@/assets/HomePage/vioce.png'
import { RightOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { setUserInfo } from '@/store/modules/user'
import dayjs from 'dayjs'

const EditProfile: React.FC = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector((state: RootState) => state.user.userInfo)
  const [form] = Form.useForm()
  const [uploadAvatarTemp, setUploadAvatarTemp] = useState<string>('')
  const [tags, setTags] = useState<any[]>([])
  const [selectedTagNames, setSelectedTagNames] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [myTags, setMyTags] = useState<any[]>([])
  const url = import.meta.env.VITE_BASE_URL_FILE_REVIEW

  useEffect(() => {
    getTagsList()
  }, [userInfo.tagIds, userInfo])

  const getTagsList = async () => {
    try {
      const tagList = await getTags({ current: 1, pageSize: 999 })
      const myTags = tagList.data.records.filter((tag: any) =>
        (userInfo.tagIds || []).includes(tag.id)
      )
      setMyTags(myTags)
      setTags(tagList.data.records)
    } catch (error) {
      console.error('Failed to fetch tags:', error)
      message.error('Failed to load tags')
    }
  }

  const showModal = () => {
    console.log(userInfo)
    form.setFieldsValue({
      username: userInfo.username,
      birthday: dayjs(userInfo.birthday),
      avatar: userInfo.avatar
    })

    setSelectedTagNames(userInfo.tagIds || [])
    setIsModalOpen(true)
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      if (values.avatar?.file?.response) {
        values.avatar = values.avatar.file.response
      }
      values.birthday = dayjs(values.birthday).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')

      console.log('Form values:', values)
      if (values.username !== userInfo.username) {
        const usernameAvailable = await isUsernameAvailable(values.username)
        if (usernameAvailable.data) {
          try {
            const newUserInfo = {
              ...userInfo,
              picture: '',
              avatar: values.avatar,
              birthday: values.birthday,
              username: values.username,
              tagIds: selectedTagNames
            }
            await updateUserInfo(newUserInfo)
            const info = await user()
            dispatch(setUserInfo(info.data))
            setIsModalOpen(false)
            message.success('Update success')
          } catch (error) {
            message.warning('Update failed', error)
          }
        } else {
          message.warning('The user name already exists')
        }
      } else {
        try {
          const newUserInfo = {
            ...userInfo,
            picture: '',
            avatar: values.avatar,
            birthday: values.birthday,
            username: values.username,
            tagIds: selectedTagNames
          }
          await updateUserInfo(newUserInfo)
          const info = await user()
          dispatch(setUserInfo(info.data))
          setIsModalOpen(false)
          message.success('Update success')
        } catch (error) {
          message.warning('Update failed', error)
        }
      }
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  const handleCancel = () => {
    form.resetFields()
    setUploadAvatarTemp('')
    setIsModalOpen(false)
  }

  // 处理上传前
  const beforeUpload = (file: File) => {
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    // if (!isJpgOrPng) {
    //   message.error('只能上传 JPG/PNG 格式的图片!')
    // }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片大小不能超过 2MB!')
    }
    return isLt2M
  }

  // 处理上传变化
  const handleChange = async (info: any) => {
    if (info.file.status === 'done') {
      // const res = await previewFile(info.file.response)
      // console.log(res)
      setUploadAvatarTemp(info.file.response)
    } else if (info.file.status === 'error') {
      message.error('头像上传失败')
    }
  }

  const showAvatar = () => {
    if (uploadAvatarTemp !== '') {
      return url + uploadAvatarTemp
    } else if (uploadAvatarTemp === '') {
      if (userInfo.avatar !== '') {
        return url + userInfo.avatar
      } else {
        return userInfo.picture
      }
    }
  }

  const handleTagIds = (val: string) => {
    setSelectedTagNames((prevSelected) => {
      if (prevSelected.includes(val)) {
        // 如果已经选中，取消选中
        const updatedSelected = prevSelected.filter((item) => item !== val)
        form.setFieldsValue({ tagIds: updatedSelected }) // 更新表单的 tagIds 字段
        return updatedSelected
      } else {
        // 如果未选中，添加选中
        const updatedSelected = [...prevSelected, val]
        form.setFieldsValue({ tagIds: updatedSelected }) // 更新表单的 tagIds 字段
        return updatedSelected
      }
    })
  }

  return (
    <div>
      <div className="basic">
        <div className="avatar" style={{ marginTop: '60px' }}>
          <Avatar
            style={{ width: '92px', height: '92px' }}
            src={<img src={userInfo.avatar !== '' ? url + userInfo.avatar : userInfo.picture} />}
          />
        </div>

        <div className="flex justify-center mt-4 mb-4 text-lg username ">
          <div className="mr-4">{userInfo.username}</div>
          <img src={EditUsernameIcon} alt="edit" className="cursor-pointer" onClick={showModal} />
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

        <div className="flex justify-between mr-10 tab ml-14 mt-9">
          <div>
            <div className="text-lg font-bold num ">{userInfo.follows}</div>
            <div className="text-custom-profile">follows</div>
          </div>

          <div>
            <div className="text-lg font-bold num ">{userInfo.followers}</div>
            <div className="text-custom-profile">followers</div>
          </div>

          <div>
            <div className="text-lg font-bold num ">{userInfo.views}</div>
            <div className="text-custom-profile">read mine</div>
          </div>
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
            {'我的标签'} <RightOutlined />
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

      <Modal title="Edit Profile" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          name="changeProfileForm"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={handleOk}
          autoComplete="off"
        >
          <Form.Item
            label="avatar"
            name="avatar"
            rules={[{ required: true, message: 'Please upload your avatar!' }]}
          >
            <Upload
              customRequest={async (options) => {
                const { file, onSuccess, onError } = options
                try {
                  const res = await uploadFile(file as File)
                  onSuccess?.(res.data)
                } catch (error) {
                  onError?.(error as Error)
                }
              }}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              showUploadList={false}
              maxCount={1}
            >
              <Avatar className="ml-16 cursor-pointer" size={130} src={showAvatar()} />
            </Upload>
          </Form.Item>
          <Form.Item
            label="username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="birthday"
            name="birthday"
            rules={[{ required: true, message: 'Please input your birthday!' }]}
          >
            <DatePicker placeholder="" />
          </Form.Item>
          <Form.Item name="tagIds" label="label">
            <div className="flex flex-wrap">
              {tags.map((item) => (
                <div
                  className={`flex items-center mt-2.5 justify-center w-20 bg-white h-9 mr-3.5 cursor-pointer ${
                    selectedTagNames.includes(item.id)
                      ? 'text-custom-purple bg-custom-bg1'
                      : 'text-custom-666 '
                  }`}
                  style={{ borderRadius: '19px' }}
                  key={item.id}
                  onClick={() => handleTagIds(item.id)}
                >
                  {item.name}
                </div>
              ))}
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default EditProfile
