import { ReactNode } from 'react'
import Navbar from '../navbar/navbar'
import Footer from './footer'

interface LayoutProps {
	children: ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<div className="min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-grow bg-gray-50">{children}</main>
			<Footer />
		</div>
	)
}

export default Layout
