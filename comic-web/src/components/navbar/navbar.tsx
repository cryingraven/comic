'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [isSearchOpen, setIsSearchOpen] = useState(false)

	return (
		<nav className="bg-white p-4">
			<div className="container mx-auto flex justify-between items-center">
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
				<div className="hidden md:flex space-x-4">
					<Link href="/" className="text-gray-700 hover:text-black text-lg">
						Home
					</Link>
					<Link
						href="/genre"
						className="text-gray-700 hover:text-black text-lg"
					>
						Genre
					</Link>
					<Link
						href="/explore"
						className="text-gray-700 hover:text-black text-lg"
					>
						Explore
					</Link>
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
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							></path>
						</svg>
					</button>
					<Link
						href="/login"
						className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 text-lg"
					>
						Login / Register
					</Link>
				</div>
			</div>
			{isOpen && (
				<div className="md:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
						<Link
							href="/"
							className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-lg"
						>
							Home
						</Link>
						<Link
							href="/genre"
							className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-lg"
						>
							Genre
						</Link>
						<Link
							href="/explore"
							className="text-gray-700 hover:text-black block px-3 py-2 rounded-md text-lg"
						>
							Explore
						</Link>
						<Link
							href="/login"
							className="bg-blue-500 text-white block px-3 py-2 rounded-md text-lg hover:bg-blue-700"
						>
							Login / Register
						</Link>
					</div>
				</div>
			)}
			{isSearchOpen && (
				<div className="md:block mt-4">
					<input
						type="text"
						placeholder="Search..."
						className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>
			)}
		</nav>
	)
}

export default Navbar
