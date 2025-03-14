import Image from 'next/image'

export default function Home() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<Image src="/logo.png" alt="Logo" width={500} height={500} />
		</div>
	)
}
