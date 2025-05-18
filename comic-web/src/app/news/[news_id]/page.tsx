'use client'

import { Blog } from '@/models/blog'
import DefaultBackendService from '@/services/default'
import { getImageUrl } from '@/utils/imageurl'
import moment from 'moment'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function DetailBlogPlage() {
	const { news_id } = useParams()
	const [blog, setBlog] = useState<Blog | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const fetchBlog = async () => {
		if (!news_id) return
		try {
			setIsLoading(true)
			const newBlog = await DefaultBackendService.instance().getBlogById(
				parseInt(news_id as string)
			)
			setBlog(newBlog)
		} catch (error) {
			console.error('Error fetching blog:', error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchBlog()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [news_id])

	return (
		<div className={'container w-full mx-auto'}>
			{isLoading ? (
				<p>Loading...</p>
			) : blog ? (
				<div className="w-full flex flex-col p-4">
					<h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
					<div className="mb-4">
						<Image
							src={getImageUrl(blog.image || '')}
							alt={blog.title}
							width={1000}
							height={1000}
							className="w-1/2 mx-auto h-auto rounded-lg shadow-md"
						/>
					</div>
					<Markdown remarkPlugins={[remarkGfm]}>{blog.content}</Markdown>
					<div className="text-sm text-gray-500 mt-4">
						<p>
							Published on:{' '}
							{moment(blog.created_at).format('DDD, DD MMMM YYYY HH:mm')}
						</p>
						<p>Author: {blog.author}</p>
					</div>
				</div>
			) : (
				<p>Blog not found</p>
			)}
		</div>
	)
}
