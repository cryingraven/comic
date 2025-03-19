'use client'

import useStore from '@/store'
import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'

const UserMenu = () => {
	const store = useStore()
	const [isOpen, setIsOpen] = useState(false)
	const { data, isLoading } = useSWR('/users/me')
	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	return (
		<>
			<div className="relative">
				{!isLoading && (
					<button
						onClick={toggleMenu}
						className="flex items-center focus:outline-none"
					>
						<Image
							src={store.user?.photoURL || '/default-avatar.png'}
							alt="User Avatar"
							className="w-10 h-10 rounded-full"
							width={40}
							height={40}
						/>
						<span className="ml-2 text-gray-700">
							{store.user?.displayName || 'User'}
						</span>
					</button>
				)}
				{isOpen && (
					<div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
						<Link
							href={'/profile'}
							className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
						>
							Profile
						</Link>
						<Link
							href={'/top-up'}
							className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
						>
							Top Up Balance
						</Link>
						<Link
							href="/cms"
							className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
						>
							CMS
						</Link>
						<Button
							onClick={() => {
								store.signOut()
							}}
							className="block px-4 py-2 text-gray-800 hover:bg-gray-200 capitalize w-full text-left"
						>
							Logout
						</Button>
					</div>
				)}
			</div>
		</>
	)
}

export default UserMenu
