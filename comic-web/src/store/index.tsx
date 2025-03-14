import { create } from 'zustand'
import { devtools, persist, StateStorage } from 'zustand/middleware'
import { createJSONStorage } from 'zustand/middleware'
import { User } from 'firebase/auth'
import { firebaseAuth } from '@/providers/firebase'
import { get, set, del } from 'idb-keyval'

const storage: StateStorage = {
	getItem: async (name: string): Promise<string | null> => {
		return (await get(name)) || null
	},
	setItem: async (name: string, value: string): Promise<void> => {
		await set(name, value)
	},
	removeItem: async (name: string): Promise<void> => {
		await del(name)
	},
}

interface AppState {
	user: User | null
	token: string | null
	setToken: (token: string | null) => void
	setUser: (user: User | null) => void
	signOut: () => void
}

const useStore = create<AppState>()(
	devtools(
		persist(
			(set) => ({
				user: null,
				token: null,
				setUser: (newUser) => set((state) => ({ ...state, user: newUser })),
				setToken: (token) => set((state) => ({ ...state, token })),
				signOut: () => {
					set((state) => ({
						...state,
						user: null,
						token: null,
					}))
					firebaseAuth.signOut()
				},
			}),
			{
				name: '24comic',
				storage: createJSONStorage(() => storage),
				partialize: (state) => {
					const { ...rest } = state
					return rest
				},
			}
		)
	)
)

export default useStore
