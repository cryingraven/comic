'use client'

import React from 'react'
import { FirebaseProvider } from './firebase'
import { SWRConfig } from 'swr'
import AppService from '@/services/app'
import useStore from '@/store'

const Providers = ({ children }: { children: React.ReactNode }) => {
	const store = useStore()
	return (
		<SWRConfig
			value={{
				refreshInterval: 30000,
				fetcher: AppService.instance(store.token).get,
			}}
		>
			<FirebaseProvider>{children}</FirebaseProvider>
		</SWRConfig>
	)
}

export default Providers
