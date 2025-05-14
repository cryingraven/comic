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
	TablePagination,
	Button,
	CircularProgress,
} from '@mui/material'
import { useParams, useRouter } from 'next/navigation'
import { Chapter } from '@/models/chapter'
import AppService from '@/services/app'
import useStore from '@/store'
import moment from 'moment'
import Image from 'next/image'
import { getImageUrl } from '@/utils/imageurl'

interface ChaptersResponse {
	rows: Chapter[]
	count: number
}

const ManageChapterPage: NextPage = () => {
	const router = useRouter()
	const params = useParams()
	const { comic_id } = params
	const store = useStore()
	const [chapters, setChapters] = useState<ChaptersResponse>({
		rows: [],
		count: 0,
	})
	const [order, setOrder] = useState<'asc' | 'desc'>('asc')
	const [orderBy, setOrderBy] = useState('title')
	const [page, setPage] = useState(0)
	const [loading, setLoading] = useState(false)
	const [rowsPerPage, setRowsPerPage] = useState(10)

	const fetchChapters = async () => {
		if (!comic_id) return
		setLoading(true)
		try {
			const chapters = await AppService.instance(
				store.token || ''
			).getCMSChapters(
				parseInt(comic_id as string),
				page * rowsPerPage,
				rowsPerPage
			)

			setChapters(chapters)
		} catch (error) {
			console.error('Error fetching chapters:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchChapters()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [comic_id, orderBy, order, page, rowsPerPage])

	const handleRequestSort = (property: string) => {
		const isAsc = orderBy === property && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(property)
	}

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	return (
		<div className="p-4 w-full">
			<Head>
				<title>Manage Comic Chapter</title>
			</Head>
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Manage Comic Chapter</h1>
				<Button
					variant="contained"
					color="primary"
					size="small"
					className="rounded-full"
					onClick={() => router.push(`/cms/chapters/${comic_id}/add`)}
				>
					New Chapter
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
									active={orderBy === 'price'}
									direction={orderBy === 'price' ? order : 'asc'}
									onClick={() => handleRequestSort('price')}
								>
									Price
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
								<TableCell colSpan={5} className="text-center">
									<CircularProgress />
								</TableCell>
							</TableRow>
						)}
						{!loading &&
							chapters &&
							chapters.rows &&
							chapters.rows.map((chapter) => (
								<TableRow key={chapter.chapter_id}>
									<TableCell>
										<Image
											src={getImageUrl(chapter.image)}
											alt={chapter.title}
											width={50}
											height={50}
											className="w-16 h-16 object-cover"
										/>
									</TableCell>
									<TableCell>{chapter.title}</TableCell>
									<TableCell>
										<div className="flex flex-col">
											<p>Views: {chapter.views}</p>
											<p>Likes: {chapter.likes}</p>
											<p>Comments: {chapter.comments}</p>
										</div>
									</TableCell>
									<TableCell>
										<div className="text-sm text-orange-500">
											{chapter.price
												? `${chapter.price} Coin - Rp. ${chapter.fiat_price.toLocaleString('id-ID')}`
												: 'Free'}
										</div>
									</TableCell>
									<TableCell>
										{moment(chapter.created_at).format('LLL')}
									</TableCell>
									<TableCell>
										<div className="flex space-x-1">
											<Button
												variant="contained"
												color="primary"
												size="small"
												className="rounded-full"
												onClick={() =>
													router.push(
														`/cms/chapters/${comic_id}/edit/${chapter.chapter_id}`
													)
												}
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
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={chapters.count}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</div>
	)
}
export default ManageChapterPage
