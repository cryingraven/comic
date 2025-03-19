'use client'

import React, { useEffect, useState } from 'react'
import { Tabs, Tab } from '@mui/material'
import { ArrowForwardIos } from '@mui/icons-material'
import { Genre } from '@/models/genre'
import { Comic } from '@/models/comic'
import DefaultBackendService from '@/services/default'
import ComicItem from '../items/comic'
import Link from 'next/link'

interface ComicGenreTabsProps {
	genres: Genre[]
}

const ComicGenreTabs = ({ genres }: ComicGenreTabsProps) => {
	const [value, setValue] = useState(0)
	const [comics, setComics] = useState<Comic[]>([])

	const fetchComics = async () => {
		if (genres.length > 0) {
			const response = await DefaultBackendService.instance().getComics(
				genres[value].name,
				'',
				0,
				12,
				'created_at::desc'
			)

			setComics(response)
		}
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = (event: any, newValue: any) => {
		console.log(event)
		setValue(newValue)
	}

	useEffect(() => {
		fetchComics()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [value])

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
					<Tab key={index} label={genre.name} className="capitalize" />
				))}
			</Tabs>
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">{genres[value].name}</h2>
				<Link href={'/genres'} className="flex items-center text-orange-500">
					View More <ArrowForwardIos className="ml-1" />
				</Link>
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
				{comics.map((comic, index) => (
					<ComicItem key={index} data={comic} />
				))}
			</div>
		</div>
	)
}

export default ComicGenreTabs
