'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavbarUserProfile from './userprofile'
import { Search } from '@mui/icons-material'
import NavbarSearch from './search'
import NavMenu from './navmenu'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const Navbar = () => {
	const location = usePathname()
	const [isOpen, setIsOpen] = useState(false)
	const [isSearchOpen, setIsSearchOpen] = useState(false)

	return (
		<nav
			className={clsx('bg-white p-4', location.includes('/read') && 'hidden')}
		>
			<div className="container mx-auto flex items-center justify-between md:justify-center">
				<div className="text-black text-lg">
					<Link href="/" className="text-black text-lg">
						<Image
							src={'/logo.png'}
							alt="Logo"
							width={200}
							height={200}
							className="h-12"
						/>
					</Link>
				</div>
				<div className="hidden md:flex-grow md:flex md:ml-8 space-x-4">
					<NavMenu />
				</div>
				<div className="md:hidden">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="text-gray-700 hover:text-black focus:outline-none"
					>
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16m-7 6h7"
							></path>
						</svg>
					</button>
				</div>
				<div className="hidden md:flex items-center space-x-4">
					<button
						onClick={() => setIsSearchOpen(!isSearchOpen)}
						className="text-gray-700 hover:text-black focus:outline-none"
					>
						<Search />
					</button>
					<NavbarUserProfile />
				</div>
			</div>
			{isOpen && (
				<div className="md:hidden">
					<div className="px-2 pt-2 pb-3 space-y-2 sm:px-3 flex flex-col">
						<NavMenu />
						<NavbarUserProfile />
						<NavbarSearch />
					</div>
				</div>
			)}
			{isSearchOpen && (
				<div className="md:block mt-4 hidden container mx-auto">
					<NavbarSearch />
				</div>
			)}
		</nav>
	)
}

export default Navbar
