'use client'

import ChapterItem from '@/components/items/chapter'
import { Comic } from '@/models/comic'
import AppService from '@/services/app'
import { getImageUrl } from '@/utils/imageurl'
import { AttachMoney, Favorite, Share, Visibility } from '@mui/icons-material'
import { Button, CircularProgress, MenuItem, Select } from '@mui/material'
import Image from 'next/image'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import { formatNumber } from '@/utils/format'
import Head from 'next/head'
import { Chapter } from '@/models/chapter'
import { useState } from 'react'
import { ShareSocial } from 'react-share-social'
import useStore from '@/store'
import DonationModal from '@/components/modals/donation'

const ComicPage = () => {
	const store = useStore()
	const params = useParams()
	const query = useSearchParams()
	const sort = query.get('sort') || 'desc'
	const comicId = params.comic_id
	const router = useRouter()
	const [showShare, setShowShare] = useState(false)
	const [showDonationModal, setShowDonationModal] = useState(false)
	const { data, isLoading } = useSWR<Comic>(`/r/comics/${comicId}`)

	const getKey = (pageIndex: number) => {
		const skip = pageIndex * 10
		const limit = 10

		return `/r/comics/${comicId}/${store.token ? 'chapters-with-access' : 'chapters'}?skip=${skip}&limit=${limit}&order_by=created_at::${sort}`
	}

	const getChapters = async (key: string) => {
		try {
			const newChapters = await AppService.instance(store.token || '').get(key)
			return newChapters['results']
		} catch (e) {
			console.log(e)
			throw e
		}
	}

	const {
		data: chaptersData,
		isLoading: isLoadingChapters,
		mutate,
	} = useSWR(getKey(0), getChapters)

	const chapters: Chapter[] = chaptersData || []

	const loadMore = async () => {
		const nextPage = chapters.length / 10
		const newData = await getChapters(getKey(nextPage))
		mutate([...chapters, ...newData], false)
	}

	if (isLoading || isLoadingChapters)
		return (
			<div className="flex justify-center items-center h-screen">
				<CircularProgress />
			</div>
		)

	return (
		<div className={'full-width flex flex-col'}>
			<Head>
				<title>{data?.title || 'Comic'}</title>
				<meta
					name="description"
					content={data?.description || 'Comic description'}
				/>
				<meta property="og:title" content={data?.title || 'Comic'} />
				<meta
					property="og:description"
					content={data?.description || 'Comic description'}
				/>
				<meta property="og:image" content={getImageUrl(data?.banner || '')} />
				<meta property="og:url" content={window.location.href} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:title" content={data?.title || 'Comic'} />
				<meta
					name="twitter:description"
					content={data?.description || 'Comic description'}
				/>
				<meta name="twitter:image" content={getImageUrl(data?.banner || '')} />
			</Head>
			{data && data?.banner && (
				<div className="w-full">
					<Image
						src={getImageUrl(data?.banner)}
						alt={data.title}
						width={1000}
						height={1000}
						className="w-full h-72 md:h-80 object-center relative z-32 rounded-t-lg object-cover"
					/>
				</div>
			)}

			{!data?.banner && <div className="w-full h-72 bg-black-700"></div>}

			<div className="w-full h-72 md:h-80 relative -top-72 md:-top-80 z-30 bg-black bg-opacity-40"></div>
			<div className="container mx-auto z-40 p-5 flex -top-72 md:-top-80 -mt-72 relative justify-center items-center">
				<Image
					src={getImageUrl(data?.image || '')}
					alt={data?.title || ''}
					width={1000}
					height={1000}
					className="w-56 h-56 overflow-y-hidden object-contain rounded-t-lg"
				/>
				<div className="flex-grow p-4 text-white">
					<h4 className="text-sm md:text-md mb-0 md:mb-4 capitalize font-light p-2 rounded-full border border-white w-fit">
						{data?.genre}
					</h4>
					<h1 className="text-xl md:text-3xl font-bold mb-0 md:mb-4 uppercase">
						{data?.title}
					</h1>
					<h3 className="text-sm md:text-md mb-0 md:mb-4 capitalize font-semibold">
						{data?.author?.fullname || 'Akoma'}
					</h3>
					<div className="flex md:hidden flex-col items-start space-y-0 md:space-y-2 text-white">
						<div className="flex gap-2 justify-center items-center">
							<div className="flex justify-center items-center">
								<Visibility className="text-white m-2" />{' '}
								{formatNumber(data?.views || 0)}
							</div>
							<div className="flex justify-center items-center">
								<Favorite className="text-white m-2" />{' '}
								{formatNumber(data?.likes || 0)}
							</div>
						</div>
						<div className="flex space-x-2">
							<Button
								variant="contained"
								color="primary"
								className="rounded-full"
								startIcon={<Share />}
								size="small"
								onClick={() => setShowShare(!showShare)}
							>
								Share
							</Button>
							<Button
								variant="contained"
								color="warning"
								className="rounded-full"
								startIcon={<AttachMoney />}
								size="small"
								onClick={() => setShowDonationModal(true)}
							>
								Donate
							</Button>
						</div>
					</div>
				</div>
				<div className="mt-4 hidden md:flex flex-col items-start space-y-2 text-white">
					<div className="flex space-x-2 justify-center items-center w-full">
						<div className="flex space-x-2 justify-center items-center">
							<Visibility className="text-white m-2" />{' '}
							{formatNumber(data?.views || 0)}
						</div>
						<div className="flex space-x-2 justify-center items-center">
							<Favorite className="text-white m-2" />{' '}
							{formatNumber(data?.likes || 0)}
						</div>
					</div>
					<div className="flex space-x-2">
						<Button
							variant="contained"
							color="primary"
							className="rounded-full"
							startIcon={<Share />}
							onClick={() => {
								setShowShare(!showShare)
							}}
						>
							Share
						</Button>
						<Button
							variant="contained"
							color="warning"
							className="rounded-full"
							startIcon={<AttachMoney />}
							onClick={() => setShowDonationModal(true)}
						>
							Donate
						</Button>
					</div>
				</div>
			</div>
			{showShare && (
				<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
					<div className="bg-white p-2 rounded-md shadow-lg w-full max-w-md">
						<ShareSocial
							url="24comic.com"
							socialTypes={['facebook', 'twitter', 'reddit', 'linkedin']}
						/>
						<Button
							variant="outlined"
							color="info"
							className="mt-4 w-full"
							size="small"
							onClick={() => setShowShare(false)}
						>
							Close
						</Button>
					</div>
				</div>
			)}
			{showDonationModal && (
				<DonationModal
					authorId={data?.author?.user_id || 0}
					open={showDonationModal}
					handleClose={() => setShowDonationModal(false)}
				/>
			)}
			<div className="container mx-auto relative z-40 -top-72 md:-top-80 p-3 md:p-10 mb-5 bg-white rounded-lg">
				<h2 className="text-xl md:text-2xl font-bold mb-4">Description</h2>
				<p className="text-md md:text-lg">{data?.description}</p>
				<div className="flex justify-between items-center">
					<h2 className="text-xl md:text-2xl font-bold my-4">Episodes</h2>
					<Select
						className="m-2 border rounded-full"
						value={sort}
						onChange={(e) => {
							const newSort = e.target.value
							const newSortedChapters = chapters.sort((a, b) => {
								if (newSort === 'desc') {
									return (
										new Date(b.created_at).getTime() -
										new Date(a.created_at).getTime()
									)
								} else {
									return (
										new Date(a.created_at).getTime() -
										new Date(b.created_at).getTime()
									)
								}
							})

							mutate(newSortedChapters, {
								revalidate: false,
							})
							router.push(`/comics/${comicId}?sort=${newSort}`)
						}}
						displayEmpty
						inputProps={{ 'aria-label': 'Without label' }}
					>
						<MenuItem value="asc">Oldest</MenuItem>
						<MenuItem value="desc">Latest</MenuItem>
					</Select>
				</div>
				{chapters &&
					chapters.map((chapter, index) => (
						<ChapterItem key={index} chapter={chapter} />
					))}
				{chapters.length % 10 === 0 && chapters.length > 0 && (
					<div className="flex justify-center items-center my-4">
						<Button
							variant="contained"
							color="warning"
							onClick={loadMore}
							disabled={isLoadingChapters}
							className="p-4 w-full max-w-96 rounded-full"
						>
							{isLoadingChapters ? <CircularProgress size={24} /> : 'Load More'}
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}

export default ComicPage
