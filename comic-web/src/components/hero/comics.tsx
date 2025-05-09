'use client'

import React from 'react'
import { Comic } from '@/models/comic'
import ComicItem from '../items/comic'

export interface TopComicsPageProps {
	comics: Comic[]
	title: string
}

const TopComicsPage = ({ comics, title }: TopComicsPageProps) => {
	return (
		<div className="container mx-auto mt-4 p-5 md:p-10">
			<h1 className="text-3xl font-bold mb-4">{title}</h1>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  gap-4">
				{comics.map((comic, index) => (
					<ComicItem key={index} data={comic} />
				))}
			</div>
		</div>
	)
}

export default TopComicsPage
