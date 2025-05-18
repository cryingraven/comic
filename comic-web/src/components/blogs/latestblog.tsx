'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import DefaultBackendService from '../../services/default'
import { Blog } from '@/models/blog'
import { getImageUrl } from '@/utils/imageurl'
import Link from 'next/link'
import { clearMarkdown } from '@/utils/cleanmarkdown'

const LatestBlogs = () => {
	const [blogs, setBlogs] = useState<Blog[]>([])

	useEffect(() => {
		const fetchLatestBlogs = async () => {
			const latestBlogs =
				await DefaultBackendService.instance().getLatestUpdate(0, 4)
			setBlogs(latestBlogs)
		}

		fetchLatestBlogs()
	}, [])

	return (
		<div className="container mx-auto mt-4 p-5 md:p-10">
			<h1 className="text-3xl font-bold mb-4">New Updates</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
				{blogs.map((blog) => (
					<Link href={`/news/${blog.blog_id}`} key={blog.blog_id}>
						<div className="border rounded-lg shadow-md">
							<Image
								src={getImageUrl(blog.image)}
								alt={blog.title}
								width={300}
								height={200}
								className="rounded-t-lg w-full"
							/>

							<h2 className="text-xl font-bold mt-2 line-clamp-2">
								{blog.title}
							</h2>
							<p className="text-gray-600 p-2">
								{clearMarkdown(blog.content.substring(0, 100))}
							</p>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default LatestBlogs
