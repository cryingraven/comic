'use client'

import { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import axios from 'axios'
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
} from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const ManageComicPage: NextPage = () => {
	const router = useRouter()
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const [comics, setComics] = useState<any[]>([])
	const [order, setOrder] = useState<'asc' | 'desc'>('asc')
	const [orderBy, setOrderBy] = useState('title')
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(5)

	useEffect(() => {
		axios.get('https://jsonplaceholder.typicode.com/posts').then((response) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
			const dummyData = response.data.map((item: any, index: number) => ({
				id: item.id,
				image: `https://via.placeholder.com/150?text=Image+${index + 1}`,
				title: item.title,
				stats: Math.floor(Math.random() * 100),
				numberOfChapters: Math.floor(Math.random() * 20),
				publishedAt: new Date().toLocaleDateString(),
			}))
			setComics(dummyData)
		})
	}, [])

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

	const sortedComics = [...comics].sort((a, b) => {
		if (order === 'asc') {
			return a[orderBy] > b[orderBy] ? 1 : -1
		} else {
			return a[orderBy] < b[orderBy] ? 1 : -1
		}
	})

	const paginatedComics = sortedComics.slice(
		page * rowsPerPage,
		page * rowsPerPage + rowsPerPage
	)

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
						{paginatedComics.map((comic) => (
							<TableRow key={comic.id}>
								<TableCell>
									<Image
										src={comic.image}
										alt={comic.title}
										className="w-16 h-16 object-cover"
										width={100}
										height={100}
									/>
								</TableCell>
								<TableCell>{comic.title}</TableCell>
								<TableCell>{comic.stats}</TableCell>
								<TableCell>{comic.numberOfChapters}</TableCell>
								<TableCell>{comic.publishedAt}</TableCell>
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
