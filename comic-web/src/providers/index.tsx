'use client'

import React from 'react'
import { FirebaseProvider } from './firebase'
import { SWRConfig } from 'swr'
import AppService from '@/services/app'
import useStore from '@/store'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function localStorageProvider(): Map<string, any> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const map = new Map<string, any>(
		JSON.parse(localStorage.getItem('24comic-app-cache') || '[]')
	)

	window.addEventListener('beforeunload', () => {
		const appCache = JSON.stringify(Array.from(map.entries()))
		localStorage.setItem('24comic-app-cache', appCache)
	})

	return map
}

const Providers = ({ children }: { children: React.ReactNode }) => {
	const store = useStore()
	return (
		<SWRConfig
			value={{
				refreshInterval: 60000,
				revalidateOnReconnect: true,
				fetcher: AppService.instance(store.token).get,
				provider: localStorageProvider,
			}}
		>
			<FirebaseProvider>{children}</FirebaseProvider>
		</SWRConfig>
	)
}

export default Providers
