'use client'

import React, { useEffect, useState } from 'react'
import {
	AppBar,
	Toolbar,
	Typography,
	Card,
	Button,
	Drawer,
} from '@mui/material'
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
	FavoriteBorder,
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
import CommentsDrawer from '@/components/drawers/comments'
import clsx from 'clsx'

const ComicReadingPage = () => {
	const store = useStore()
	const router = useRouter()
	const query = useParams()
	const comicId = query.comic_id
	const chapterId = query.chapter_id
	const [showPurchaseModal, setShowPurchaseModal] = useState(true)
	const [pages, setPages] = useState<Page[]>([])
	const [currentPageIndex, setCurrentPageIndex] = useState(0)
	const [showCommentsDrawer, setShowCommentsDrawer] = useState(false)
	const [isLiked, setIsLiked] = useState(false)

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

	const addReadHistory = async () => {
		if (chapter && store.user && store.token) {
			try {
				await AppService.instance(store.token || '').post(`/r/read-history`, {
					comic_id: comicId,
					chapter_id: chapterId,
				})
			} catch (err) {
				console.log(err)
			}
		} else {
			try {
				await AppService.instance().post(`/r/read-history/anonym`, {
					comic_id: comicId,
					chapter_id: chapterId,
				})
			} catch (err) {
				console.log(err)
			}
		}
	}

	const toggleLike = async () => {
		if (chapter && store.user && store.token) {
			try {
				await AppService.instance(store.token || '').toggleLikeChapter(
					chapterId ? parseInt(chapterId as string) : 0
				)
				setIsLiked(!isLiked)
			} catch (err) {
				console.log(err)
			}
		}
	}

	const fetchLikeStatus = async () => {
		if (chapter && store.user && store.token) {
			try {
				const liked = await AppService.instance(
					store.token || ''
				).isLikedChapter(chapterId ? parseInt(chapterId as string) : 0)
				setIsLiked(liked)
			} catch (err) {
				console.log(err)
			}
		}
	}

	useEffect(() => {
		fetchPages()
		addReadHistory()
		fetchLikeStatus()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chapter])

	const [showAppBar, setShowAppBar] = useState(true)

	const toggleAppBar = () => {
		setShowAppBar(!showAppBar)
	}

	const handleNextPage = () => {
		if (currentPageIndex < pages.length - 1) {
			setCurrentPageIndex(currentPageIndex + 1)
		}
	}

	const handlePreviousPage = () => {
		if (currentPageIndex > 0) {
			setCurrentPageIndex(currentPageIndex - 1)
		}
	}

	const handleKeyDown = (event: KeyboardEvent) => {
		if (comicLoading || chapterLoading) return

		console.log(event.key)
		if (comic?.comic_type === 'classic') {
			if (event.key === 'ArrowRight') {
				handleNextPage()
			} else if (event.key === 'ArrowLeft') {
				handlePreviousPage()
			}
		}
	}

	return (
		<div
			className="w-full flex flex-col bg-black"
			onClick={toggleAppBar}
			tabIndex={0}
			onKeyDown={(event) => {
				handleKeyDown(event as unknown as KeyboardEvent)
			}}
		>
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
							<Button className="p-1 md:p-2" size="small" onClick={toggleLike}>
								{isLiked ? <Favorite /> : <FavoriteBorder />}{' '}
								{formatNumber(chapter?.likes || 0)}
							</Button>
							<Button
								className="p-1 md:p-2"
								size="small"
								onClick={() => setShowCommentsDrawer(true)}
							>
								<Comment /> {formatNumber(chapter?.comments || 0)}
							</Button>
						</div>
					</Toolbar>
				</AppBar>
			)}
			<div
				className={clsx(
					'flex flex-col items-center justify-center container mx-auto lg:max-w-[33%]',
					comic?.comic_type === 'classic' ? 'h-screen' : 'h-auto'
				)}
			>
				{!comicLoading &&
					!chapterLoading &&
					comic?.comic_type === 'classic' &&
					pages.length > 0 && (
						<Card className="w-full">
							<Image
								src={getImageUrl(pages[currentPageIndex].image)}
								alt={`Comic Page ${currentPageIndex + 1}`}
								layout="responsive"
								width={800}
								height={800}
								className="w-full"
							/>
						</Card>
					)}
				{!comicLoading &&
					!chapterLoading &&
					comic?.comic_type !== 'classic' &&
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
			{comic?.comic_type === 'classic' && (
				<div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
					{currentPageIndex > 0 && (
						<Button
							className="bg-gray-800 text-white p-2 rounded-full shadow-lg"
							onClick={handlePreviousPage}
						>
							<ChevronLeft />
						</Button>
					)}
					{currentPageIndex < pages.length - 1 && (
						<Button
							className="bg-gray-800 text-white p-2 rounded-full shadow-lg"
							onClick={handleNextPage}
						>
							<ChevronRight />
						</Button>
					)}
				</div>
			)}
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
			<Drawer
				anchor="right"
				open={showCommentsDrawer}
				onClose={() => setShowCommentsDrawer(false)}
			>
				<CommentsDrawer
					chapterId={chapterId as string}
					onClose={() => setShowCommentsDrawer(false)}
				/>
			</Drawer>
		</div>
	)
}

export default ComicReadingPage
