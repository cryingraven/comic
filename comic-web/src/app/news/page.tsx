'use client'

import { useState } from 'react'
import useSWRInfinite from 'swr/infinite'
import { Blog } from '@/models/blog'
import DefaultBackendService from '@/services/default'
import { Button } from '@mui/material'
import Image from 'next/image'
import { getImageUrl } from '@/utils/imageurl'
import moment from 'moment'
import Link from 'next/link'

const Blogs = () => {
	const [loading, setLoading] = useState(false)

	const getKey = (pageIndex: number, previousPageData: Blog[]) => {
		if (previousPageData && !previousPageData.length) return null
		return `blogs-${pageIndex}`
	}

	const fetcher = async (key: string) => {
		const pageIndex = parseInt(key.split('-')[1])
		setLoading(true)
		const data = await DefaultBackendService.instance().getLatestUpdate(
			pageIndex * 10,
			10
		)
		setLoading(false)
		return data
	}

	const { data, size, setSize } = useSWRInfinite(getKey, fetcher)

	const blogs = data ? data.flat() : []

	const loadMore = () => {
		setSize(size + 1)
	}

	const hasLoadMore = blogs.length > 0 && blogs.length % 10 === 0

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-4">Latest Update</h1>
			<div className="flex flex-col gap-2">
				{blogs.map((blog) => (
					<Link href={`/news/${blog.blog_id}`} key={blog.blog_id}>
						<div className="w-full border p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-start md:items-center gap-4">
							<Image
								src={getImageUrl(blog.image)}
								alt={blog.title}
								width={1000}
								height={1000}
								className="rounded-lg w-full md:w-1/4 max-w-[200px] object-cover"
							/>
							<div className="flex flex-col gap-2">
								<h2 className="text-2xl font-bold text-gray-800">
									{blog.title}
								</h2>
								<p className="text-gray-600 text-base">
									{blog.content.substring(0, 100)}
								</p>
								<p className="text-gray-600 text-sm">{blog.tags}</p>
								<p className="text-gray-600 text-sm">
									{moment(blog.created_at).format('DD MMMM YYYY HH:mm')}
								</p>
							</div>
						</div>
					</Link>
				))}
			</div>
			{loading && <p className="text-center mt-4">Loading...</p>}
			{hasLoadMore && !loading && (
				<Button
					variant="outlined"
					onClick={loadMore}
					className="mt-4 px-4 py-2 rounded-full w-full"
				>
					Load More
				</Button>
			)}
		</div>
	)
}

export default Blogs
