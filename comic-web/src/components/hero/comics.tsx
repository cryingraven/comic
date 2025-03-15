'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'

const TopComicsPage = () => {
	const comics = Array.from({ length: 8 }, (_, i) => ({
		title: `Comic ${i + 1}`,
		image: `https://via.placeholder.com/500x300?text=Comic+${i + 1}`,
	}))

	return (
		<div className="container mx-auto mt-4 p-5 md:p-10">
			<h1 className="text-3xl font-bold mb-4">Top Comics</h1>
			<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
				{comics.map((comic, index) => (
					<div key={index} className={`p-4 border rounded-lg bg-gray-200`}>
						<Image
							src={comic.image}
							alt={comic.title}
							width={500}
							height={300}
							className="w-full h-48 object-cover mb-4"
						/>
						<h2 className="text-xl font-semibold">{comic.title}</h2>
						<p>Description of {comic.title}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default TopComicsPage
