'use client'

import React, { useState } from 'react'
import { Tabs, Tab } from '@mui/material'
import { ArrowForwardIos } from '@mui/icons-material'
import Image from 'next/image'

const genres = ['Action', 'Adventure', 'Comedy', 'Drama']
const comics = [
	[
		{
			title: 'Comic 1',
			description: 'Description 1',
			cover:
				'https://images.pexels.com/photos/1234567/pexels-photo-1234567.jpeg',
		},
		{
			title: 'Comic 2',
			description: 'Description 2',
			cover:
				'https://images.pexels.com/photos/1234568/pexels-photo-1234568.jpeg',
		},
	],
	[
		{
			title: 'Comic 3',
			description: 'Description 3',
			cover:
				'https://images.pexels.com/photos/1234569/pexels-photo-1234569.jpeg',
		},
		{
			title: 'Comic 4',
			description: 'Description 4',
			cover:
				'https://images.pexels.com/photos/1234570/pexels-photo-1234570.jpeg',
		},
	],
	[
		{
			title: 'Comic 5',
			description: 'Description 5',
			cover:
				'https://images.pexels.com/photos/1234571/pexels-photo-1234571.jpeg',
		},
		{
			title: 'Comic 6',
			description: 'Description 6',
			cover:
				'https://images.pexels.com/photos/1234572/pexels-photo-1234572.jpeg',
		},
	],
	[
		{
			title: 'Comic 7',
			description: 'Description 7',
			cover:
				'https://images.pexels.com/photos/1234573/pexels-photo-1234573.jpeg',
		},
		{
			title: 'Comic 8',
			description: 'Description 8',
			cover:
				'https://images.pexels.com/photos/1234574/pexels-photo-1234574.jpeg',
		},
	],
]

const ComicGenreTabs = () => {
	const [value, setValue] = useState(0)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = (event: any, newValue: any) => {
		console.log(event)
		setValue(newValue)
	}

	return (
		<div className="flex container flex-col mx-auto p-4 md:p-10 mt-4">
			<h1 className="text-3xl font-bold mb-4">Explore Your Favorite Genres</h1>
			<Tabs
				value={value}
				onChange={handleChange}
				variant="scrollable"
				scrollButtons="auto"
				aria-label="comic genres"
				className="mb-4"
				indicatorColor="primary"
			>
				{genres.map((genre, index) => (
					<Tab key={index} label={genre} className="capitalize" />
				))}
			</Tabs>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">{genres[value]}</h2>
				<button className="flex items-center text-orange-500">
					View More <ArrowForwardIos className="ml-1" />
				</button>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
				{comics[value].map((comic, index) => (
					<div key={index} className="bg-white p-4 shadow rounded">
						<Image
							src={comic.cover}
							alt={comic.title}
							width={500}
							height={300}
							className="w-full h-64 object-cover rounded"
						/>
						<h3 className="text-lg font-semibold mt-2">{comic.title}</h3>
						<p className="text-gray-600">{comic.description}</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default ComicGenreTabs
