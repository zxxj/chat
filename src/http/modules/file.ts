import { http } from '@/http'

interface UploadResponse {
  code: number
  data: string // 返回的文件URL
  message: string
}

// 上传文件
export const uploadFile = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)

  return http.post<UploadResponse>('/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 预览文件
export const previewFile = async (fileName: string) => {
  console.log(fileName)
  const res = await http.get(`/file/preview?fileName=${fileName}`, {
    responseType: 'blob',
    headers: {
      Accept: '*/*'
    }
  })

  return URL.createObjectURL(res.data)
}
