import { useEffect, useState } from 'react'
import PushmomentIcon from '@/assets/HomePage/pushmoment.png'
import MomentCard from './moment-card'
import type { PostVo } from '@/types/momentCard'
import { Spin, Modal, Form, Input, Upload, message, Image } from 'antd'
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons'
import { createMoment, listMoment } from '@/http/modules/moment'
import type { GetProp, UploadFile, UploadProps, RcFile } from 'antd/es/upload/interface'
import LocationIcon from '@/assets/Moment/location.png'
import { uploadFile } from '@/http/modules/file'

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })

interface MomentProps {
  activeKey: string
}

const Moment: React.FC<MomentProps> = ({ activeKey }: { activeKey: string }) => {
  useEffect(() => {
    listMomentByusertoken()
  }, [activeKey])

  const [momentData, setMomentData] = useState<PostVo[]>([])
  const [loading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form] = Form.useForm()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)

  const listMomentByusertoken = async () => {
    setLoading(true)
    try {
      const res = await listMoment()
      const data = res.data?.records || []
      setMomentData(data)
      console.log(momentData)
    } catch (error) {
      console.error('Failed to fetch moments:', error)
      setMomentData([])
    } finally {
      setLoading(false)
    }
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields()
      if (imageUrls.length === 0 && !values.content) return message.error('请上传图片或输入内容')

      values.pics = imageUrls
      createMoment(values).then(() => {
        message.success('发布成功')
        setIsModalOpen(false)
        form.resetFields()
        setFileList([])
        setImageUrls([])
        listMomentByusertoken()
      })
    } catch (error) {
      console.error('发布失败:', error)
      message.error('发布失败')
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    form.resetFields()
    setFileList([])
    setImageUrls([])
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const customUpload = async (options: any) => {
    const { file, onSuccess, onError, onProgress } = options
    setUploading(true)

    try {
      const interval = setInterval(() => {
        onProgress({ percent: Math.random() * 100 })
      }, 100)

      const res: any = await uploadFile(file as File)
      clearInterval(interval)

      if (res.status === 200) {
        const fileUrl = res.data
        setImageUrls((prev) => [...prev, fileUrl])
        onSuccess({ url: fileUrl })
      } else {
        onError(new Error('上传失败'))
      }
    } catch (error) {
      onError(new Error('上传失败'))
    } finally {
      setUploading(false)
    }
  }

  const beforeUpload = (file: RcFile) => {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
      message.error('只能上传图片文件!')
    }
    const isLt5M = file.size / 1024 / 1024 < 5
    if (!isLt5M) {
      message.error('图片必须小于5MB!')
    }
    return isImage && isLt5M
  }

  const uploadButton = (
    <div className="text-center">
      {uploading ? <LoadingOutlined /> : <UploadOutlined />}
      <div className="mt-2">{uploading ? '上传中...' : 'upload'}</div>
    </div>
  )

  const uploadProps: UploadProps = {
    name: 'file',
    listType: 'picture-card',
    fileList: fileList,
    customRequest: customUpload,
    beforeUpload: beforeUpload,
    onPreview: handlePreview,
    onChange: ({ fileList: newFileList }) => {
      setFileList(
        newFileList.map((file) => ({
          ...file,
          status: file.status === 'uploading' ? 'uploading' : file.status
        }))
      )
    },
    multiple: true,
    maxCount: 9,
    accept: 'image/*',
    onRemove: (file) => {
      const url = file.response?.url
      if (url) {
        setImageUrls((prev) => prev.filter((item) => item !== url))
      }
      return true
    }
  }

  return (
    <>
      <div>
        <div
          className="flex flex-col items-center justify-center w-64 h-32 cursor-pointer mt-9 mb-14"
          style={{ border: '1px dashed #E65AFF' }}
          onClick={showModal}
        >
          <img className="w-6 h-6" src={PushmomentIcon} />
          <div className="mt-4 text-lg text-custom-purple">发布瞬间</div>
        </div>

        <Spin spinning={loading}>
          <div>
            {Array.isArray(momentData) &&
              momentData.map((item, index) => <MomentCard data={item} key={index} />)}
          </div>
        </Spin>
      </div>

      <Modal
        title="发布瞬间"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <div
          className="p-4 border border-dashed border-fuchsia-500"
          style={{ height: 'auto', minHeight: '400px' }}
        >
          <Form form={form}>
            <Form.Item name="content">
              <Input.TextArea
                autoSize={{ minRows: 4, maxRows: 8 }}
                placeholder="分享你的想法..."
                maxLength={500}
                showCount
              />
            </Form.Item>

            <Form.Item>
              <Upload {...uploadProps}>{fileList.length >= 9 ? null : uploadButton}</Upload>
            </Form.Item>

            {/* <Form.Item>
              <div
                className="flex items-center justify-center h-8 text-white border-r-4 rounded-full w-28"
                style={{ backgroundColor: '#0D0A22' }}
              >
                <img src={TopicsIcon} className="w-6" />
                <span className="ml-1 mr-1.5">加话题</span>
                <RightOutlined />
              </div>
            </Form.Item> */}

            <Form.Item>
              <div
                className="flex items-center justify-center h-8 text-white border-r-4 rounded-full cursor-pointer w-28"
                style={{ backgroundColor: '#0D0A22' }}
              >
                <img src={LocationIcon} className="w-6 mr-1.5" />
                location
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>

      {previewImage && (
        <Image
          style={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage('')
          }}
          src={previewImage}
        />
      )}
    </>
  )
}

export default Moment
