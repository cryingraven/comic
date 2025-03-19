'use client'

import useStore from '@/store'
import Link from 'next/link'
import UserMenu from './usermenu'

const NavbarUserProfile = () => {
	const store = useStore()
	return (
		<>
			{store.user ? (
				<UserMenu />
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
