import { useEffect } from 'react'

const Like = ({ activeKey }: { activeKey: string }) => {
  useEffect(() => {
    console.log(222)
  }, [activeKey])
  return <div>liked</div>
}

export default Like
