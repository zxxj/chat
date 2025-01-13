// import { PlusOutlined } from '@ant-design/icons'
import { DatePicker, Form, Input, Upload } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { getTags } from '@/http/models/user'

const Register = forwardRef((props, ref) => {
  const userInfostr = JSON.parse(localStorage.getItem('persist:user') as any)
  const userInfo = JSON.parse(userInfostr.userInfo)

  const initialValues = {
    username: userInfo.username || '',
    picture: userInfo.picture || ''
  }
  const [form] = Form.useForm()
  const [selectedGender, setSelectedGender] = useState<number | null>(null)
  const genders = ['man', 'woman']
  const characters = [
    'ISTJ',
    'ISFJ',
    'INFJ',
    'INTJ',
    'ISTP',
    'ISFP',
    'INFP',
    'INTP',
    'ESTP',
    'ESFP',
    'ENFP',
    'ENTP',
    'ESTJ',
    'ESFJ',
    'ENFJ',
    'ENTJ'
  ]
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([])
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])
  const [tags, setTags] = useState<any[]>([])

  useEffect(() => {
    getTagsList()
  }, [])

  const getTagsList = async () => {
    try {
      const tagList = await getTags({ current: 1, pageSize: 999 })
      setTags(tagList.records)
      console.log('Tags from API:', tagList.records)
    } catch (error) {
      console.error('Failed to fetch tags:', error)
    }
  }

  const handleCharacters = (val: string, type: string) => {
    if (type === 'tagIds') {
      setSelectedTagIds((prevSelected) => {
        if (prevSelected.includes(val)) {
          // 如果已经选中，取消选中
          const updatedSelected = prevSelected.filter((item) => item !== val)
          form.setFieldsValue({ character: updatedSelected }) // 更新表单的 tagIds 字段
          return updatedSelected
        } else {
          // 如果未选中，添加选中
          const updatedSelected = [...prevSelected, val]
          form.setFieldsValue({ tagIds: updatedSelected }) // 更新表单的 tagIds 字段
          return updatedSelected
        }
      })
    } else {
      setSelectedCharacters((prevSelected) => {
        if (prevSelected.includes(val)) {
          // 如果已经选中，取消选中
          const updatedSelected = prevSelected.filter((item) => item !== val)
          form.setFieldsValue({ character: updatedSelected }) // 更新表单的 characters 字段
          return updatedSelected
        } else {
          // 如果未选中，添加选中
          const updatedSelected = [...prevSelected, val]
          form.setFieldsValue({ character: updatedSelected }) // 更新表单的 characters 字段
          return updatedSelected
        }
      })
    }
  }

  // 暴露表单数据获取方法和验证方法
  useImperativeHandle(ref, () => ({
    getRegsiterFormData: () => form.getFieldsValue(), // 获取表单数据
    validateForm: () => form.validateFields() // 添加验证方法
  }))

  const handleGender = (selectGender: number) => {
    setSelectedGender(selectGender)
    form.setFieldsValue({ sex: genders[selectGender] }) // 设置表单的 gender 字段
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-lg font-medium text-center mb-7 " style={{ color: '#6F00CB' }}>
        Hi, set an image for yourself
      </div>
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <div className="flex">
          <div>
            <div className="text-lg font-medium">Personal details</div>
            <Form.Item className="flex justify-center mt-4" name="picture">
              <img
                src={userInfo.picture}
                alt="avatar"
                style={{ width: '100%', borderRadius: '50%' }}
              />
              {/* <Upload
                action="/upload.do"
                listType="picture-card"
                maxCount={1}
                showUploadList={false}
              >
                {userInfo.picture ? (
                  <img
                    src={userInfo.picture}
                    alt="avatar"
                    style={{ width: '100%', borderRadius: '50%' }}
                  />
                ) : (
                  <button style={{ border: 0, background: 'none' }} type="button">
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                )}
              </Upload> */}
            </Form.Item>

            <Form.Item
              label="Your name"
              name="username"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input className="w-72 rounded-3xl " />
            </Form.Item>

            <Form.Item
              label="Your gender"
              name="sex"
              rules={[{ required: true, message: 'Please select your sex!' }]}
            >
              <div className="flex">
                {genders.map((item, index) => (
                  <div
                    className={`flex items-center justify-center w-20 bg-white h-9 mr-3.5 cursor-pointer ${
                      selectedGender === index ? 'text-custom-purple' : 'text-custom-666'
                    }`}
                    style={{ borderRadius: '19px' }}
                    key={item}
                    onClick={() => handleGender(index)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Form.Item>

            <Form.Item
              label="Your birthday"
              name="birthday"
              rules={[{ required: true, message: 'Please select your birthday!' }]}
            >
              <DatePicker
                prefix={<CalendarOutlined />}
                suffixIcon=""
                placeholder="Select birthday"
                className="w-72 rounded-3xl "
              />
            </Form.Item>
          </div>

          <div className="ml-10" style={{ width: '467px' }}>
            <Form.Item name="character">
              <div className="text-lg font-medium">
                What kind of personality do you think you are?
              </div>

              <div className="flex flex-wrap mt-4">
                {characters.map((item) => (
                  <div
                    className={`flex items-center mt-2.5 justify-center w-20 bg-white h-9 mr-3.5 cursor-pointer ${
                      selectedCharacters.includes(item)
                        ? 'text-custom-purple bg-custom-bg1'
                        : 'text-custom-666 '
                    }`}
                    style={{ borderRadius: '19px' }}
                    key={item}
                    onClick={() => handleCharacters(item, 'character')}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Form.Item>
          </div>

          <div className="ml-10" style={{ width: '467px' }}>
            <Form.Item name="tagIds">
              <div className="text-lg font-medium">Choose your own label</div>

              <div className="flex flex-wrap mt-4">
                {tags.map((item) => (
                  <div
                    className={`flex items-center mt-2.5 justify-center w-20 bg-white h-9 mr-3.5 cursor-pointer ${
                      selectedTagIds.includes(item.id)
                        ? 'text-custom-purple bg-custom-bg1'
                        : 'text-custom-666 '
                    }`}
                    style={{ borderRadius: '19px' }}
                    key={item.id}
                    onClick={() => handleCharacters(item.id, 'tagIds')}
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  )
})

export default Register
