import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useUserStore =  create(
    persist(
        (set) => ({
            user: null,
            setUser: (userData) => set({user: userData}),
            clearUser: () => set({user: null}),
        }),
        {
            name: 'momentum-user',
        }
    )
)

export default useUserStore;