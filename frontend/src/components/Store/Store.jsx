import BuyToastStore from './BuyToastStore'
import StreakReminder from './StreakReminder'

const Store = () => {
  return (
    <div className="p-6">
      <h1 className="text-[35px] font-londrina text-center text-green-900">Momentum Store</h1>
      <StreakReminder/>
      <BuyToastStore/>
    </div>
  )
}

export default Store