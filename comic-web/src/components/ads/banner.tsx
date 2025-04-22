'use client'

import Image from 'next/image'

const AdsBanner = () => {
	return (
		<div className="container mx-auto my-2">
			<Image
				src={'https://placehold.co/1280x200'}
				alt={'ads banner'}
				width={1280}
				height={200}
				className="w-full"
			/>
		</div>
	)
}

export default AdsBanner
