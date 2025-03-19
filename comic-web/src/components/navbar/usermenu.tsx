'use client'

import useStore from '@/store'
import { formatNumber } from '@/utils/format'
import { ArrowDropDownOutlined, Diversity2Rounded } from '@mui/icons-material'
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
			<div className="relative w-full">
				{!isLoading && (
					<button
						onClick={toggleMenu}
						className="flex items-center focus:outline-none w-full"
					>
						<Image
							src={store.user?.photoURL || '/default-avatar.png'}
							alt="User Avatar"
							className="w-10 h-10 rounded-full"
							width={40}
							height={40}
						/>
						<div className="ml-2 text-gray-700 flex flex-col sm:flex-grow sm:w-full text-start">
							<p> {store.user?.displayName || 'User'}</p>
							<p className="text-sm text-orange-500">
								{formatNumber(data?.balance || 0)} Coin
							</p>
						</div>
						<ArrowDropDownOutlined className="text-gray-700 md:hidden" />
					</button>
				)}
				{isOpen && (
					<div className="md:absolute right-0 mt-2 md:bg-white border sm:w-full md:w-48 rounded-md md:shadow-lg z-50">
						<Link
							href={'/profile'}
							className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-md"
							onClick={() => setIsOpen(false)}
						>
							Profile
						</Link>
						<Link
							href={'/top-up'}
							className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-md"
							onClick={() => setIsOpen(false)}
						>
							Top Up Balance
						</Link>
						<Link
							href="/cms"
							className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-md"
							onClick={() => setIsOpen(false)}
						>
							CMS
						</Link>
						<div
							onClick={() => {
								store.signOut()
								setIsOpen(false)
							}}
							className="block px-4 py-2 cursor-pointer text-gray-800 hover:bg-gray-200 capitalize w-full text-left text-md"
						>
							Logout
						</div>
					</div>
				)}
			</div>
		</>
	)
}

export default UserMenu
