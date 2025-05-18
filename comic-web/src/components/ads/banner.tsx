'use client'

import Image from 'next/image'

const AdsBanner = () => {
	return (
		<div className="container mx-auto my-2">
			<Image
				src={'/default_ads.jpeg'}
				alt={'ads banner'}
				width={1280}
				height={200}
				className="w-full"
			/>
		</div>
	)
}

export default AdsBanner
