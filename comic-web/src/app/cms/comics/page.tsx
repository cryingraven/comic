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
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Comic } from '@/models/comic'
import AppService from '@/services/app'
import useStore from '@/store'
import moment from 'moment'
import { getImageUrl } from '@/utils/imageurl'

const ManageComicPage: NextPage = () => {
	const router = useRouter()
	const store = useStore()
	const [comics, setComics] = useState<Comic[]>([])
	const [order, setOrder] = useState<'asc' | 'desc'>('asc')
	const [orderBy, setOrderBy] = useState('title')
	const [page, setPage] = useState(0)
	const [loading, setLoading] = useState(false)
	const [rowsPerPage, setRowsPerPage] = useState(5)

	const fetchComics = async () => {
		setLoading(true)
		try {
			const comics = await AppService.instance(store.token || '').getCMSComics(
				page * rowsPerPage,
				rowsPerPage
			)
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
	}, [orderBy, order, page, rowsPerPage])

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
				<title>Manage Comic</title>
			</Head>
			<h1 className="text-2xl font-bold mb-4">Manage Comic Page</h1>
			<TableContainer className="my-4">
				<Table className="w-full">
					<TableHead>
						<TableRow>
							<TableCell>
								<TableSortLabel
									active={orderBy === 'image'}
									direction={orderBy === 'image' ? order : 'asc'}
									onClick={() => handleRequestSort('image')}
								>
									Image
								</TableSortLabel>
							</TableCell>
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
									<TableCell>{comic.likes}</TableCell>
									<TableCell>{comic.comments}</TableCell>
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
												onClick={() => router.push(`/cms/chapters/1`)}
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
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={comics.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</div>
	)
}

export default ManageComicPage
