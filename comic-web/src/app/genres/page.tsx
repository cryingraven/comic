'use client'

import React, { useEffect, useState } from 'react'
import {
	Tabs,
	Tab,
	Menu,
	MenuItem,
	FormControl,
	InputLabel,
	Select,
} from '@mui/material'
import { Genre } from '@/models/genre'
import DefaultBackendService from '@/services/default'
import ComicItem from '@/components/items/comic'
import useSWRInfinite from 'swr/infinite'
import InfiniteScroll from 'react-infinite-scroll-component'
import AppService from '@/services/app'
import { Comic } from '@/models/comic'

const GenrePage = () => {
	const [value, setValue] = useState(0)
	const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null)
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [genres, setGenres] = useState<Genre[]>([])
	const [sortOrder, setSortOrder] = useState('created_at::desc')

	const fetchGenres = async () => {
		const response = await DefaultBackendService.instance().getAllGenre()

		if (response.length > 0) {
			setSelectedGenre(response[0])
		}

		setGenres(response)
	}

	const fetcher = async (url: string) => {
		const data = await AppService.instance().get(url)
		return data
	}

	const getKey = (pageIndex: number, previousPageData: Comic[]) => {
		if (previousPageData && !previousPageData.length) return null

		const skip = pageIndex * 12
		const limit = 12

		return `/r/comics?genre=${selectedGenre?.name}&skip=${skip}&limit=${limit}&order_by=${sortOrder}`
	}

	const { data, size, setSize, mutate } = useSWRInfinite(getKey, fetcher)

	const comics = data ? [].concat(...data) : []

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)

		if (newValue < 8) {
			setSelectedGenre(genres[newValue])
			mutate()
		}
	}

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
	}

	useEffect(() => {
		fetchGenres()
	}, [])

	return (
		<div className="flex container flex-col mx-auto p-4 md:p-10">
			<h1 className="text-3xl font-bold mb-4">Explore Your Favorite Genres</h1>
			<div className="flex md:flex-row flex-col items-center mb-4">
				<Tabs
					value={value}
					onChange={handleChange}
					variant="scrollable"
					scrollButtons="auto"
					aria-label="comic genres"
					className="md:flex-grow w-full"
					indicatorColor="primary"
				>
					{genres.slice(0, 8).map((genre, index) => (
						<Tab key={index} label={genre.name} className="capitalize" />
					))}
					<Tab label="More" onClick={handleMenuOpen} />
				</Tabs>
				<FormControl
					variant="outlined"
					className="md:ml-4 flex flex-grow w-full md:max-w-32 mt-4 md:mt-0"
				>
					<InputLabel id="sort-label">Sort</InputLabel>
					<Select
						labelId="sort-label"
						id="sort-select"
						value={sortOrder}
						onChange={(sort) => {
							setSortOrder(sort.target.value as string)
							mutate() // Trigger a re-fetch with the new sort order
						}}
						label="Sort"
					>
						<MenuItem value="created_at::asc">Oldest</MenuItem>
						<MenuItem value="created_at::desc">Latest</MenuItem>
						<MenuItem value="views::desc">Popularity</MenuItem>
					</Select>
				</FormControl>
			</div>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleMenuClose}
			>
				{genres.slice(8).map((genre, index) => (
					<MenuItem
						key={index}
						onClick={() => {
							setSelectedGenre(genre)
							setValue(8)
							handleMenuClose()
							mutate()
						}}
					>
						{genre.name}
					</MenuItem>
				))}
			</Menu>
			<InfiniteScroll
				dataLength={comics.length}
				next={() => setSize(size + 1)}
				hasMore={comics.length % 12 === 0}
				loader={<h4>Loading...</h4>}
			>
				<div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
					{comics.map((comic, index) => (
						<ComicItem key={index} data={comic} />
					))}
				</div>
			</InfiniteScroll>
		</div>
	)
}

export default GenrePage
