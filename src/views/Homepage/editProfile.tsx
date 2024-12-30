import { RootState } from '@/store'
import { Avatar } from 'antd'
import { useSelector } from 'react-redux'
import EditUsernameIcon from '@/assets/HomePage/edit_username.png'
import BrithdayIcon from '@/assets/HomePage/brithday.png'
import VioceIcon from '@/assets/HomePage/vioce.png'
import { RightOutlined } from '@ant-design/icons'
const editProfile = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo)

  const labels = [
    {
      label: '务实家',
      key: 1
    },
    {
      label: '程序猿',
      key: 2
    },
    {
      label: '天生爱自由',
      key: 3
    },
    {
      label: '四季青金丝雀就说尽力了',
      key: 9
    },
    {
      label: '美食家',
      key: 4
    },
    {
      label: '躺平青年',
      key: 5
    }
  ]
  return (
    <div>
      <div className="basic">
        <div className="avatar" style={{ marginTop: '60px' }}>
          <Avatar style={{ width: '92px', height: '92px' }} src={<img src={userInfo.picture} />} />
        </div>

        <div className="flex justify-center mt-4 mb-4 text-lg username ">
          <div className="mr-4">{userInfo.username}</div>
          <img src={EditUsernameIcon} alt="edit" className="cursor-pointer" />
        </div>
        <div className="userid text-custom-id">ID：289767</div>

        <div className="flex items-center justify-center desc mt-3.5">
          <div className="flex cursor-pointer birthday">
            <img src={BrithdayIcon} />
            <div className="ml-1.5 text-custom-profile">{'2024-10-12'}</div>
          </div>
          <div className="flex ml-10 cursor-pointer voice">
            <img src={VioceIcon} />
            <div className="ml-1.5 text-custom-profile">{'voice introduction'}</div>
          </div>
        </div>

        <div className="flex justify-between mr-10 tab ml-14 mt-9">
          <div>
            <div className="text-lg font-bold num ">67</div>
            <div className="text-custom-profile">follow</div>
          </div>

          <div>
            <div className="text-lg font-bold num ">3</div>
            <div className="text-custom-profile">followed</div>
          </div>

          <div>
            <div className="text-lg font-bold num ">80</div>
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
            {labels.map((label) => (
              <div
                className="px-6 mb-4 mr-1.5"
                style={{
                  backgroundColor: '#0D0A22',
                  height: '30px',
                  borderRadius: '15px',
                  lineHeight: '30px',
                  color: '#999'
                }}
              >
                {label.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default editProfile
