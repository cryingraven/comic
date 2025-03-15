'use client'

import Link from 'next/link'

const NavMenu = () => {
	return (
		<>
			<Link
				href="/"
				className="text-gray-700 sm:block hover:text-black text-lg"
			>
				Home
			</Link>
			<Link
				href="/genre"
				className="text-gray-700 sm:block hover:text-black text-lg"
			>
				Genre
			</Link>
			<Link
				href="/explore"
				className="text-gray-700 sm:block hover:text-black text-lg"
			>
				Explore
			</Link>
		</>
	)
}

export default NavMenu
