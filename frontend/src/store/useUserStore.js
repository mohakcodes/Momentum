import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserStore = create(
  persist(
    (set) => ({
      user: {
        id: '',
        username: '',
        xp: 20,
        themes: [],
        unlockedToasts: ['default'],
        selectedToast: 'default',
        rooms: [],
        createdAt: '',
      },
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'momentum-user',
    }
  )
)

export default useUserStore