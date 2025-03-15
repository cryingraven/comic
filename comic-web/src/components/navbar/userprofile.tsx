'use client'
import useStore from '@/store'
import { Button } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const NavbarUserProfile = () => {
	const store = useStore()
	const [isOpen, setIsOpen] = useState(false)
	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	return (
		<>
			{store.user ? (
				<div className="relative">
					<button
						onClick={toggleMenu}
						className="flex items-center focus:outline-none"
					>
						<Image
							src={store.user.photoURL || '/default-avatar.png'}
							alt="User Avatar"
							className="w-10 h-10 rounded-full"
							width={40}
							height={40}
						/>
						<span className="ml-2 text-gray-700">
							{store.user.displayName || 'User'}
						</span>
					</button>
					{isOpen && (
						<div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
							<a
								href="#"
								className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
							>
								Profile
							</a>
							<a
								href="#"
								className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
							>
								Setings
							</a>
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
			) : (
				<Link
					href="/login"
					className="bg-blue-500 text-white block px-3 py-2 rounded-full text-lg hover:bg-blue-700"
				>
					Login/Register
				</Link>
			)}
		</>
	)
}

export default NavbarUserProfile
