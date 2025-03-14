'use client'

import { createContext, ReactNode, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import useStore from '@/store'

const firebaseConfig = {
	apiKey: 'AIzaSyCEirAjgQV6vZ-j3QaOtT7dxjF7mpOX8RQ',
	authDomain: 'comic-faef2.firebaseapp.com',
	projectId: 'comic-faef2',
	storageBucket: 'comic-faef2.firebasestorage.app',
	messagingSenderId: '1035775006048',
	appId: '1:1035775006048:web:b7d3a30303eada3addfa05',
	measurementId: 'G-BJNNSFL8MV',
}
export const firebaseApp = initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(firebaseApp)

type JuraAdmin = User | null | undefined

const FirebaseAuthContext = createContext<JuraAdmin>(undefined)

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
	const store = useStore()

	useEffect(() => {
		onAuthStateChanged(firebaseAuth, (user: User | null) => {
			store.setUser(user)
			if (user) {
				user.getIdToken().then((token) => {
					store.setToken(token)
				})
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<FirebaseAuthContext.Provider value={store.user}>
			{children}
		</FirebaseAuthContext.Provider>
	)
}
