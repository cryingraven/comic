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
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Comic } from '@/models/comic'
import AppService from '@/services/app'
import useStore from '@/store'
import moment from 'moment'
import { getImageUrl } from '@/utils/imageurl'
import { formatNumber } from '@/utils/format'
import TermListPage from '@/components/page/term'

const ManageComicPage: NextPage = () => {
	const router = useRouter()
	const store = useStore()
	const [comics, setComics] = useState<Comic[]>([])
	const [order, setOrder] = useState<'asc' | 'desc'>('asc')
	const [orderBy, setOrderBy] = useState('title')
	const [loading, setLoading] = useState(false)
	const [openDialog, setOpenDialog] = useState(false)
	const [isAgreeTerms, setIsAgreeTerms] = useState(false)
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
	const [openPublishDialog, setOpenPublishDialog] = useState(false)
	const [selectedComicId, setSelectedComicId] = useState<number | null>(null)

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

	const handleUnpublish = async (comicId: number) => {
		try {
			await AppService.instance(store.token || '').unpublishComic(comicId)
			fetchComics()
		} catch (error) {
			console.error('Error unpublishing comic:', error)
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

	const handleOpenDialog = (comicId: number) => {
		setSelectedComicId(comicId)
		setOpenDialog(true)
	}

	const handleCloseDialog = () => {
		setOpenDialog(false)
		setSelectedComicId(null)
	}

	const handleConfirmUnpublish = () => {
		if (selectedComicId !== null) {
			handleUnpublish(selectedComicId)
			handleCloseDialog()
		}
	}

	const handleDeleteComic = async (comicId: number) => {
		try {
			await AppService.instance(store.token || '').deleteComic(comicId)
			fetchComics()
			setOpenDeleteDialog(false)
		} catch (error) {
			console.error('Error deleting comic:', error)
		}
	}

	const handlePublishComic = async (comicId: number) => {
		if (!isAgreeTerms) {
			alert('You must agree to the terms and conditions to publish the comic.')
			return
		}

		try {
			await AppService.instance(store.token || '').publishComic(comicId)
			fetchComics()
			setOpenPublishDialog(false)
		} catch (error) {
			console.error('Error publishing comic:', error)
		}
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
					New Comic
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
									Total Chapter
								</TableSortLabel>
							</TableCell>
							<TableCell>Status</TableCell>
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
									<TableCell
										className={
											comic.status.toLowerCase() === 'unpublished'
												? 'text-red-500'
												: 'text-green-500'
										}
									>
										{comic.status.toLocaleUpperCase()}
									</TableCell>
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
												onClick={() =>
													router.push(`/cms/comics/edit/${comic.comic_id}`)
												}
											>
												Edit
											</Button>
											{comic.status.toLowerCase() !== 'unpublished' && (
												<Button
													variant="contained"
													color="error"
													size="small"
													className="rounded-full"
													onClick={() => handleOpenDialog(comic.comic_id)}
												>
													Unpublish
												</Button>
											)}
											{comic.status.toLowerCase() === 'unpublished' && (
												<Button
													variant="contained"
													color="success"
													size="small"
													className="rounded-full"
													onClick={() => {
														setSelectedComicId(comic.comic_id)
														setOpenPublishDialog(true)
														setIsAgreeTerms(false)
													}}
												>
													Publish
												</Button>
											)}
											{comic.status.toLowerCase() === 'unpublished' && (
												<Button
													variant="contained"
													color="error"
													size="small"
													className="rounded-full"
													onClick={() => {
														setOpenDeleteDialog(true)
														setSelectedComicId(comic.comic_id)
													}}
												>
													Delete
												</Button>
											)}
										</div>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<Dialog open={openDialog} onClose={handleCloseDialog}>
				<DialogTitle>Confirm Unpublish</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to unpublish this comic?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} color="primary">
						Cancel
					</Button>
					<Button onClick={handleConfirmUnpublish} color="error">
						Unpublish
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={openDeleteDialog}
				onClose={() => setOpenDeleteDialog(false)}
			>
				<DialogTitle>Confirm Delete</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure you want to delete this comic? This action cannot be
						undone and will remove all associated data.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenDeleteDialog(false)} color="primary">
						Cancel
					</Button>
					<Button
						onClick={() => handleDeleteComic(selectedComicId || 0)}
						color="error"
					>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
			<Dialog
				open={openPublishDialog}
				onClose={() => setOpenPublishDialog(false)}
			>
				<DialogTitle>Confirm Publish</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<div>
							Are you sure you want to publish this comic? It will be visible to
							all users.
						</div>
						<div className="w-full overflow-y-scroll max-h-96">
							<TermListPage />
						</div>
						<div className="mt-2">
							<label>
								<input
									type="checkbox"
									className="mr-2"
									checked={isAgreeTerms}
									onChange={(e) => setIsAgreeTerms(e.target.checked)}
								/>
								I agree to the Terms and Conditions and approve this comic to be published on 24Comic.
							</label>
						</div>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpenPublishDialog(false)} color="primary">
						Cancel
					</Button>
					<Button
						onClick={() => handlePublishComic(selectedComicId || 0)}
						color="success"
					>
						Publish
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export default ManageComicPage
