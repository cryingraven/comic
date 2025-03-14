import React from 'react'
import { FirebaseProvider } from './firebase'

const Providers = ({ children }: { children: React.ReactNode }) => {
	return <FirebaseProvider>{children}</FirebaseProvider>
}

export default Providers
