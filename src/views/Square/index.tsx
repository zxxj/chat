import { Upload } from 'antd'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
const Square: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.user.userInfo)

  const customRequest = async (options: any) => {
    const { file, onSuccess, onError } = options
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://49.234.200.97:8080/file/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        onSuccess(data)
      } else {
        onError(new Error('Upload failed'))
      }
    } catch (error) {
      onError(error)
    }
  }
  return (
    <div>
      <Upload
        name="file"
        customRequest={customRequest}
        listType="picture-card"
        maxCount={1}
        showUploadList={false}
        headers={{
          Authorization: `Bearer ${token}`
        }}
      >
        (
        <button style={{ border: 0, background: 'none' }} type="button">
          <div style={{ marginTop: 8 }}>Upload</div>
        </button>
        )
      </Upload>
    </div>
  )
}

export default Square
