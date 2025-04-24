'use client'

import { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	Button,
	CircularProgress,
} from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Comic } from '@/models/comic'
import AppService from '@/services/app'
import useStore from '@/store'
import moment from 'moment'
import { getImageUrl } from '@/utils/imageurl'
import { formatNumber } from '@/utils/format'

const ManageComicPage: NextPage = () => {
	const router = useRouter()
	const store = useStore()
	const [comics, setComics] = useState<Comic[]>([])
	const [order, setOrder] = useState<'asc' | 'desc'>('asc')
	const [orderBy, setOrderBy] = useState('title')
	const [loading, setLoading] = useState(false)

	const fetchComics = async () => {
		setLoading(true)
		try {
			const comics = await AppService.instance(store.token || '').getCMSComics(
				0,
				50
			)

			console.log(comics)
			setComics(comics)
		} catch (error) {
			console.error('Error fetching comics:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchComics()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orderBy, order])
	const handleRequestSort = (property: string) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	return (
		<div className="p-4 w-full">
			<Head>
				<title>Manage Comic</title>
			</Head>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Manage Comic Page</h1>
				<Button
					variant="contained"
					color="primary"
					size="small"
					className="rounded-full"
					onClick={() => router.push('/cms/comics/add')}
				>
					Add Comic
				</Button>
			</div>
			<TableContainer className="my-4">
				<Table className="w-full">
					<TableHead>
						<TableRow>
							<TableCell>Image</TableCell>
							<TableCell>
								<TableSortLabel
									active={orderBy === 'title'}
									direction={orderBy === 'title' ? order : 'asc'}
									onClick={() => handleRequestSort('title')}
								>
									Title
								</TableSortLabel>
							</TableCell>
							<TableCell>
								<TableSortLabel
									active={orderBy === 'stats'}
									direction={orderBy === 'stats' ? order : 'asc'}
									onClick={() => handleRequestSort('stats')}
								>
									Stats
								</TableSortLabel>
							</TableCell>
							<TableCell>
								<TableSortLabel
									active={orderBy === 'numberOfChapters'}
									direction={orderBy === 'numberOfChapters' ? order : 'asc'}
									onClick={() => handleRequestSort('numberOfChapters')}
								>
									Number of Chapters
								</TableSortLabel>
							</TableCell>
							<TableCell>
								<TableSortLabel
									active={orderBy === 'publishedAt'}
									direction={orderBy === 'publishedAt' ? order : 'asc'}
									onClick={() => handleRequestSort('publishedAt')}
								>
									Published At
								</TableSortLabel>
							</TableCell>
							<TableCell>Action</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{loading && (
							<TableRow>
								<TableCell colSpan={6} className="text-center">
									<CircularProgress />
								</TableCell>
							</TableRow>
						)}
						{!loading &&
							comics.map((comic) => (
								<TableRow key={comic.comic_id}>
									<TableCell>
										<Image
											src={getImageUrl(comic.image)}
											alt={comic.title}
											className="w-16 h-16 object-cover"
											width={100}
											height={100}
										/>
									</TableCell>
									<TableCell>{comic.title}</TableCell>
									<TableCell>
										<div className="flex flex-col">
											<p>Views: {formatNumber(comic.views)}</p>
											<p>Likes: {formatNumber(comic.likes)}</p>
											<p>Comments: {formatNumber(comic.comments)}</p>
										</div>
									</TableCell>
									<TableCell>{comic.total_chapters}</TableCell>
									<TableCell>
										{moment(comic.created_at).format('LLL')}
									</TableCell>
									<TableCell>
										<div className="flex space-x-1">
											<Button
												variant="outlined"
												color="primary"
												size="small"
												className="rounded-full"
												onClick={() =>
													router.push(`/cms/chapters/${comic.comic_id}`)
												}
											>
												Chapters
											</Button>
											<Button
												variant="contained"
												color="primary"
												size="small"
												className="rounded-full"
											>
												Edit
											</Button>
											<Button
												variant="contained"
												color="error"
												size="small"
												className="rounded-full"
											>
												Unpublish
											</Button>
										</div>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	)
}

export default ManageComicPage
