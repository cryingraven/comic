'use client'

import React, { useState, Suspense } from 'react'
import {
	MenuItem,
	FormControl,
	InputLabel,
	Select,
	TextField,
	Button,
} from '@mui/material'
import ComicItem from '@/components/items/comic'
import useSWRInfinite from 'swr/infinite'
import InfiniteScroll from 'react-infinite-scroll-component'
import AppService from '@/services/app'
import { Comic } from '@/models/comic'
import { useSearchParams } from 'next/navigation'

const SearchResultPageContent = () => {
	const query = useSearchParams().get('q') || ''
	const [sortOrder, setSortOrder] = useState('created_at::desc')
	const [searchQuery, setSearchQuery] = useState(query)

	const fetcher = async (url: string) => {
		const data = await AppService.instance().get(url)
		return data
	}

	const getKey = (pageIndex: number, previousPageData: Comic[]) => {
		if (previousPageData && !previousPageData.length) return null

		const skip = pageIndex * 12
		const limit = 12

		return `/r/comics?skip=${skip}&limit=${limit}&order_by=${sortOrder}&search=${searchQuery}`
	}

	const { data, size, setSize, mutate } = useSWRInfinite(getKey, fetcher)

	const comics = data ? [].concat(...data) : []

	const handleSearch = () => {
		mutate()
	}

	return (
		<div className="flex container flex-col mx-auto p-4 md:p-10">
			<h1 className="text-3xl font-bold mb-4">Search Results</h1>
			<div className="flex md:flex-row flex-col items-center mb-4">
				<TextField
					label="Search"
					variant="outlined"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="md:flex-grow w-full"
				/>
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
							mutate()
						}}
						label="Sort"
					>
						<MenuItem value="created_at::asc">Oldest</MenuItem>
						<MenuItem value="created_at::desc">Latest</MenuItem>
						<MenuItem value="views::desc">Popularity</MenuItem>
					</Select>
				</FormControl>
				<Button
					variant="contained"
					color="primary"
					onClick={handleSearch}
					size="large"
					className="mt-4 md:mt-0 md:ml-4 rounded-full"
				>
					Search
				</Button>
			</div>
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

const SearchResultPage = () => (
	<Suspense fallback={<div>Loading...</div>}>
		<SearchResultPageContent />
	</Suspense>
)

export default SearchResultPage
