'use client'

import Image from 'next/image'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
const CarouselComponent = () => {
	const images = [
		'https://placehold.co/1280x460',
		'https://placehold.co/1280x460',
		'https://placehold.co/1280x460',
	]

	return (
		<div className="w-full container">
			<Carousel showThumbs={false} showStatus={false} infiniteLoop>
				{images.map((src, index) => (
					<div key={index}>
						<Image width={1280} height={460} src={src} alt={`Slide ${index}`} />
					</div>
				))}
			</Carousel>
		</div>
	)
}

export default CarouselComponent
