import { useState } from 'react'
import { toastStyles } from '../../constants/toastStyles'
import useUserStore from '../../store/useUserStore'
import { useMutation } from '@tanstack/react-query'
import api from '../../utils/axios'
import toast from 'react-hot-toast'

const BuyToastStore = () => {
  const { user, setUser } = useUserStore()
  const [pendingToast, setPendingToast] = useState(null)

  const unlockToastMutation = useMutation({
    mutationFn: async (toastId) => {
      const res = await api.post('/store/unlock-toast', { toastName: toastId })
      return res.data
    },
    onSuccess: (data, toastId) => {
      setUser({
        ...user,
        xp: data.xp,
        unlockedToasts: data.unlockedToasts,
      })
      toast.success(`Unlocked "${toastId}" style!`)
    },
    onError: (err) => {
      const msg = err?.response?.data?.message || 'Unlock failed'
      toast.error(msg)
    },
  })

  const selectToastMutation = useMutation({
    mutationFn: async (toastId) => {
      const res = await api.post('/store/select-toast', { toastName: toastId })
      return res.data
    },
    onSuccess: (data, toastId) => {
      setUser({ ...user, selectedToast: data.selectedToast })
      toast.success(`Activated "${toastId}" style!`)
    },
    onError: (err) => {
      const msg = err?.response?.data?.message || 'Selection failed'
      toast.error(msg)
    },
  })

  const handleUnlock = (toastId, cost) => {
    if (user.xp < cost) {
      toast.error('Not enough XP!')
      return
    }
    unlockToastMutation.mutate(toastId)
  }

  const handleSelect = (toastId) => {
    if (!user.unlockedToasts.includes(toastId)) return
    if (user.selectedToast === toastId) return
    selectToastMutation.mutate(toastId)
  }

  return (
    <>
      <div className="flex justify-center py-6">
        <h2 className="px-3 py-1 rounded-xl bg-green-800 text-white text-xl shadow">
            Check-in Styles
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {toastStyles.map(({ id, icon: Icon, message, xpCost, style }) => {
          const isUnlocked = user.unlockedToasts.includes(id)
          const isSelected = user.selectedToast === id

          return (
            <div
              key={id}
              className={`p-4 rounded-2xl shadow border transition-all duration-200 ${style.bgColor} ${
                isSelected
                  ? 'border-green-500 scale-[1.02]'
                  : isUnlocked
                  ? 'hover:border-green-400'
                  : 'border-transparent'
              }`}
            >
              <div
                className={`mb-3 mx-auto w-fit p-2 rounded-full ${style.iconBg}`}
              >
                <Icon size={36} strokeWidth={2.2} className={style.iconColor} />
              </div>

              <p
                className={`mb-2 text-center text-lg font-semibold ${style.textColor}`}
              >
                {message}
              </p>

              <div className="mt-4">
                {isUnlocked ? (
                  <button
                    className={`w-full py-2 rounded-xl font-medium text-white transition ${
                      isSelected
                        ? 'bg-green-500 cursor-default'
                        : 'bg-green-700 hover:bg-green-800'
                    }`}
                    disabled={isSelected || selectToastMutation.isPending}
                    onClick={() => handleSelect(id)}
                  >
                    {isSelected ? 'In Use' : 'Use Style'}
                  </button>
                ) : (
                  <button
                    className={`w-full py-2 rounded-xl font-medium transition ${style.iconColor} bg-gray-200 hover:opacity-90 hover:cursor-pointer`}
                    onClick={() => setPendingToast({ id, message, xpCost })}
                    disabled={unlockToastMutation.isPending}
                  >
                    Unlock – {xpCost} XP
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Confirm Unlock Modal */}
      {pendingToast && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full mx-4 animate-fadeIn">
            <h3 className="text-lg font-semibold mb-2">Confirm Unlock</h3>
            <p className="mb-4 text-gray-700">
              Unlock <strong>{pendingToast.message}</strong> style for{' '}
              <strong>{pendingToast.xpCost} XP</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md text-sm font-medium bg-gray-200 hover:bg-gray-300"
                onClick={() => setPendingToast(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700"
                onClick={() => {
                  handleUnlock(pendingToast.id, pendingToast.xpCost)
                  setPendingToast(null)
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default BuyToastStore