'use client'

import { Banner } from '@/models/banner'
import { getImageUrl } from '@/utils/imageurl'
import Image from 'next/image'
import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

export interface CarouselComponentProps {
	banners: Banner[]
}

const CarouselComponent = ({ banners }: CarouselComponentProps) => {
	return (
		<div className="w-full container">
			<Carousel showThumbs={false} showStatus={false} infiniteLoop>
				{banners.map((banner, index) => (
					<div key={index}>
						<Image
							width={1280}
							height={460}
							src={getImageUrl(banner.image)}
							alt={`Slide ${banner.image}`}
						/>
					</div>
				))}
			</Carousel>
		</div>
	)
}

export default CarouselComponent
