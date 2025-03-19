'use client'

import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography, Card, Button } from '@mui/material'
import 'tailwindcss/tailwind.css'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import {
	Comment,
	ChevronLeft,
	ArrowUpwardRounded,
	Favorite,
	ChevronRight,
	List,
} from '@mui/icons-material'
import useSWR from 'swr'
import { Chapter, ChapterNavigation } from '@/models/chapter'
import { Page } from '@/models/page'
import { getImageUrl } from '@/utils/imageurl'
import { Comic } from '@/models/comic'
import Link from 'next/link'
import { formatNumber } from '@/utils/format'
import PurchaseModal from '@/components/modals/purchase'
import useStore from '@/store'
import AppService from '@/services/app'

const ComicReadingPage = () => {
	const store = useStore()
	const router = useRouter()
	const query = useParams()
	const comicId = query.comic_id
	const chapterId = query.chapter_id
	const [showPurchaseModal, setShowPurchaseModal] = useState(true)
	const [pages, setPages] = useState<Page[]>([])

	const { data: comic, isLoading: comicLoading } = useSWR<Comic>(
		`/r/comics/${comicId}`
	)
	const { data: chapter, isLoading: chapterLoading } = useSWR<Chapter>(
		`/r/chapters/${chapterId}`
	)

	const { data: navigation } = useSWR<ChapterNavigation>(
		`/r/navigation/${comicId}/${chapterId}`
	)

	const fetchPages = async () => {
		if (chapter) {
			let newPages: Page[] = []

			if (chapter?.price === 0) {
				newPages = await AppService.instance(store.token || '').get(
					`/r/pages/${chapterId}`
				)
			} else {
				const access = await AppService.instance(store.token || '').get(
					`/r/access/${comicId}/${chapterId}`
				)
				if (access) {
					newPages = await AppService.instance(store.token || '').get(
						`/r/paid-pages/${chapterId}`
					)

					setShowPurchaseModal(false)
				}
			}

			setPages(newPages)
		}
	}

	const buyWithCoin = async () => {
		if (chapter) {
			try {
				await AppService.instance(store.token || '').post(
					`/payment/buy/${comicId}/${chapterId}`,
					{}
				)

				const newPages = await AppService.instance(store.token || '').get(
					`/r/paid-pages/${chapterId}`
				)

				setPages(newPages)
			} catch (err) {
				console.log(err)
			}
		}
	}

	useEffect(() => {
		fetchPages()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chapter])

	const [showAppBar, setShowAppBar] = useState(true)

	const toggleAppBar = () => {
		setShowAppBar(!showAppBar)
	}

	return (
		<div className="w-full flex flex-col bg-black" onClick={toggleAppBar}>
			{showAppBar && (
				<AppBar position="fixed" className="bg-gray-100 text-black">
					<Toolbar className="flex justify-between">
						<div className="flex justify-center items-center space-x-3 overflow-hidden flex-nowrap">
							<Link href={'/'}>
								<Image
									src={'/logo-notext.png'}
									alt="Logo"
									width={60}
									height={100}
									className="w-10"
								/>
							</Link>
							<Link href={`/comics/${comicId}`}>
								<Typography variant="subtitle1" className="hidden md:flex">
									{comic?.title || 'Comic Title'}
								</Typography>
								<Button
									onClick={() => router.replace(`/comics/${comicId}`)}
									className="p-1 md:p-2 flex md:hidden"
									size="small"
								>
									<List />
								</Button>
							</Link>
							<Typography variant="subtitle1" className="hidden md:flex">
								&gt;
							</Typography>
							<Typography
								variant="subtitle1"
								className="hidden md:flex"
								textOverflow={'ellipsis'}
							>
								{chapter?.title || 'Chapter Title'}
							</Typography>
						</div>
						<div className="flex space-x-1">
							{navigation && navigation.previous && (
								<Button
									onClick={() =>
										router.push(
											`/read/${comicId}/${navigation.previous?.chapter_id}`
										)
									}
									className="p-1 md:p-2"
									size="small"
								>
									<ChevronLeft />
								</Button>
							)}
							{navigation && navigation.next && (
								<Button
									onClick={() =>
										router.push(
											`/read/${comicId}/${navigation.next?.chapter_id}`
										)
									}
									className="p-1 md:p-2"
									size="small"
								>
									<ChevronRight />
								</Button>
							)}
							<Button className="p-1 md:p-2" size="small">
								<Comment /> {formatNumber(comic?.comments || 0)}
							</Button>
							<Button className="p-1 md:p-2" size="small">
								<Favorite /> {formatNumber(comic?.likes || 0)}
							</Button>
						</div>
					</Toolbar>
				</AppBar>
			)}
			<div className="flex flex-col items-center container mx-auto max-w-[1024px]">
				{!comicLoading &&
					!chapterLoading &&
					pages &&
					pages.map((page, index) => (
						<Card key={index} className="w-full">
							<Image
								src={getImageUrl(page.image)}
								alt={`Comic Page ${index + 1}`}
								layout="responsive"
								width={800}
								height={800}
								className="w-full"
							/>
						</Card>
					))}
			</div>
			<Button
				className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg"
				onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
			>
				<ArrowUpwardRounded />
			</Button>
			{comic && chapter && chapter.price > 0 && (
				<PurchaseModal
					showModal={showPurchaseModal}
					onClose={() => {
						router.replace(`/comics/${comicId}`)
					}}
					comic={comic}
					onPurchase={() => {
						buyWithCoin()
						setShowPurchaseModal(false)
					}}
					chapter={chapter}
				/>
			)}
		</div>
	)
}

export default ComicReadingPage
