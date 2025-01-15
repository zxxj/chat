import { useState } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import Moment from './moment'
import Like from './like'

const Homepage: React.FC = () => {
  const [activeKey, setActiveKey] = useState('1')

  const onChange = (key: string) => {
    setActiveKey(key)
    console.log(key)
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'moment',
      children: <Moment activeKey={activeKey} />,
      forceRender: true
    },
    {
      key: '2',
      label: 'liked',
      children: <Like activeKey={activeKey} />,
      forceRender: true
    }
  ]

  return (
    <div className="px-6 text-white">
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

export default Homepage
