import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import tabActiveIcon from '@/assets/HeaderComponent/tab-active.png'
import logo from '@/assets/HeaderComponent/logo.png'
import shareIcon from '@/assets/HeaderComponent/share.png'
import messageIcon from '@/assets/HeaderComponent/message.png'
import dropmenuIcon from '@/assets/HeaderComponent/dropmenu.png'
import { Tabs } from '@/types/tabs'
import { Avatar, Dropdown, Space, Modal, message } from 'antd'
import type { MenuProps } from 'antd'
import { logout } from '@/store/modules/user'

const Header: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userInfo: any = useSelector((state: RootState) => state.user.userInfo)
  const url = import.meta.env.VITE_BASE_URL_FILE_REVIEW
  const tabs: Tabs[] = [
    {
      path: '/layout/chat',
      tabName: 'Chat'
    },

    {
      path: '/matchingbefore',
      tabName: 'Matching'
    },
    {
      path: '/layout/homepage',
      tabName: 'Homepage'
    },
    {
      path: '/layout/square',
      tabName: 'Square'
    }
  ]

  const [activePath, setActivePath] = useState('/layout/matching')

  const changeTab = (path: string) => {
    setActivePath(path)
    console.log(activePath)
  }

  const items: MenuProps['items'] = [
    {
      label: 'logout',
      key: '0'
    }
  ]

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '0') {
      showModal()
    }
  }

  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
    setConfirmLoading(true)
    dispatch(logout())
    navigate('/')
    setOpen(false)
    setConfirmLoading(false)
    message.success('You have successfully logged out!')
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <div className="flex items-center justify-between h-full">
      <div className="flex items-center h-full logo" style={{ width: '342px' }}>
        <img className="ml-5 icon mr-2.5 cursor-pointer" src={logo} />
      </div>

      <div className="flex items-center flex-1 h-full pl-8 tab">
        {tabs.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            onClick={() => changeTab(item.path)}
            className={
              ({ isActive }) =>
                isActive
                  ? 'text-custom-purple text-lg mr-14  relative group' // 选中状态
                  : 'text-lg mr-14  group relative' // 非选中状态
            }
          >
            {item.tabName}

            {/* 使用 className 回调根据 isActive 判断是否显示图标 */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-11	 mt-2 ${
                // isActive 判断是否显示图标
                item.path === window.location.pathname ? 'block' : 'hidden'
              }`}
            >
              <img src={tabActiveIcon} style={{ width: '42px', height: '10px' }} />
            </div>
          </NavLink>
        ))}
      </div>

      <div className="flex items-center h-full profile w-96">
        <div className="mr-8 cursor-pointer">
          <img src={shareIcon} />
        </div>

        <div className="cursor-pointer">
          <img src={messageIcon} />
        </div>

        <div className="ml-20 cursor-pointer avatar">
          <Avatar
            style={{ backgroundColor: '#87d068' }}
            src={
              <img
                src={userInfo.avatar !== '' ? url + userInfo.avatar : userInfo.picture}
                alt="avatar"
              />
            }
          />

          <Dropdown menu={{ items, onClick }} trigger={['click']} className="ml-2.5">
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                {userInfo.username}
                <img src={dropmenuIcon} />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>

      <Modal
        title="Logout"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </div>
  )
}

export default Header
