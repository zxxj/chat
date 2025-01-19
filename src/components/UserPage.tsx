import { useParams } from 'react-router-dom'

const UserPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>()
  console.log('user/', userId)
  return (
    <div>
      <h1>User Page</h1>
    </div>
  )
}

export default UserPage
