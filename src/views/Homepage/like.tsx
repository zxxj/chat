import { useEffect } from 'react'
interface LikeProps {
  activeKey: string
}
const Like: React.FC<LikeProps> = ({ activeKey }: { activeKey: string }) => {
  useEffect(() => {
    console.log(222)
  }, [activeKey])
  return <div>liked</div>
}

export default Like
