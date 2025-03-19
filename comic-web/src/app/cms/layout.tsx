'use client'
import CMSMasterLayout from '@/components/layout/cms'
import useStore from '@/store'
import { Button } from '@mui/material'
import Link from 'next/link'

export default function CMSLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const store = useStore()

	if (!store.user) {
		return (
			<div className="flex items-center justify-center h-screen flex-col">
				<p>You are not logged in.</p>
				<Link href="/login">
					<Button
						variant="contained"
						color="primary"
						className="p-4 my-2 rounded-full"
					>
						Login
					</Button>
				</Link>
			</div>
		)
	}

	return (
		<>
			<CMSMasterLayout>{children}</CMSMasterLayout>
		</>
	)
}
