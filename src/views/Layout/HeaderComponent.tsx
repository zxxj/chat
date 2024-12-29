import { NavLink } from 'react-router-dom'
import tabActiveIcon from '@/assets/tab-active.png'
import icon from '@/assets/react.svg'
import { Tabs } from '@/types/tabs'
import { useState } from 'react'

const Header = () => {
  const tabs: Tabs[] = [
    {
      path: '/layout/square',
      tabName: '广场'
    },
    {
      path: '/layout/matching',
      tabName: '匹配'
    },
    {
      path: '/layout/profile',
      tabName: '个人中心'
    }
  ]

  const [activePath, setActivePath] = useState('/layout/matching')

  const changeTab = (path: string) => {
    setActivePath(path)
    console.log(path)
  }

  return (
    <div className="flex items-center justify-between h-full">
      <div className="flex items-center h-full logo" style={{ width: '342px' }}>
        <img className="ml-5 icon w-11 h-11 mr-2.5" src={icon} />
        <div className="text-lg title">Meowchats</div>
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
              className={`absolute left-1/2 transform -translate-x-1/2 w-11	 mt-1 ${
                // isActive 判断是否显示图标
                item.path === window.location.pathname ? 'block' : 'hidden'
              }`}
            >
              <img src={tabActiveIcon} style={{ width: '42px', height: '10px' }} />
            </div>
          </NavLink>
        ))}
      </div>

      <div className="h-full profile bg-emerald-500 w-96 "></div>
    </div>
  )
}

export default Header
