import { PlusOutlined } from '@ant-design/icons'
import { DatePicker, Form, Input, Upload } from 'antd'
import { CalendarOutlined } from '@ant-design/icons'
import { forwardRef, useImperativeHandle, useState } from 'react'

const Register = forwardRef((props, ref) => {
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
  const handleCharacters = (val: string) => {
    setSelectedCharacters((prevSelected) => {
      if (prevSelected.includes(val)) {
        // 如果已经选中，取消选中
        const updatedSelected = prevSelected.filter((item) => item !== val)
        form.setFieldsValue({ characters: updatedSelected }) // 更新表单的 characters 字段
        return updatedSelected
      } else {
        // 如果未选中，添加选中
        const updatedSelected = [...prevSelected, val]
        form.setFieldsValue({ characters: updatedSelected }) // 更新表单的 characters 字段
        return updatedSelected
      }
    })
  }

  // 暴露表单数据获取方法
  useImperativeHandle(ref, () => ({
    getRegsiterFormData: () => form.getFieldsValue() // 获取表单数据
  }))

  const handleGender = (selectGender: number) => {
    setSelectedGender(selectGender)
    form.setFieldsValue({ gender: genders[selectGender] }) // 设置表单的 gender 字段
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-lg font-medium text-center mb-7 " style={{ color: '#6F00CB' }}>
        Hi, set an image for yourself
      </div>
      <Form form={form} layout="vertical">
        <div className="flex">
          <div>
            <div className="text-lg font-medium">Personal details</div>
            <Form.Item className="flex justify-center mt-4" name="picture">
              <Upload action="/upload.do" listType="picture-card">
                <button style={{ border: 0, background: 'none' }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Form.Item>

            <Form.Item
              label="Your name"
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input className="w-72 rounded-3xl " />
            </Form.Item>

            <Form.Item label="Your gender" name="gender">
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

            <Form.Item label="Your birthday" name="birthday">
              <DatePicker
                prefix={<CalendarOutlined />}
                suffixIcon=""
                placeholder="Select birthday"
                className="w-72 rounded-3xl "
              />
            </Form.Item>
          </div>

          <div className="ml-10" style={{ width: '467px' }}>
            <Form.Item name="characters">
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
                    onClick={() => handleCharacters(item)}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </Form.Item>
          </div>

          <div className="ml-10" style={{ width: '467px' }}>
            <Form.Item name="characters">
              <div className="text-lg font-medium">Choose your own label</div>

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
                    onClick={() => handleCharacters(item)}
                  >
                    {item}
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
