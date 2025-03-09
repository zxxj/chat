import { Button } from 'antd'

const Member: React.FC = () => {
  return (
    <div
      className="flex flex-col justify-around p-5 member-container"
      style={{
        width: '340px',
        height: '162px',
        borderRadius: '14px',
        background:
          'conic-gradient( from 28.381783957669295deg at 0% 10.27509942650795%, #E65AFF 0%, #B000F3 100%)'
      }}
    >
      <div className="text-lg">Member Center</div>
      <div>Open members to enjoy more free matches</div>

      <Button className="w-2/4">Go and Activate</Button>
    </div>
  )
}

export default Member
