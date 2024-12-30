import { useEffect } from 'react'

const Like = ({ activeKey }: { activeKey: string }) => {
  useEffect(() => {
    console.log(222)
  }, [activeKey])
  return <div>222</div>
}

export default Like
