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
				href="/genres"
				className="text-gray-700 sm:block hover:text-black text-lg"
			>
				Genre
			</Link>
			<Link
				href="/news"
				className="text-gray-700 sm:block hover:text-black text-lg"
			>
				News Update
			</Link>
		</>
	)
}

export default NavMenu
