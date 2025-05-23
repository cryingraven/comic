'use client'

import { useState, useEffect } from 'react'
import {
	TextField,
	Button,
	Select,
	MenuItem,
	FormControl,
	IconButton,
	Container,
	Alert,
	CircularProgress,
	Modal,
	Box,
} from '@mui/material'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Image from 'next/image'
import { useForm, Controller } from 'react-hook-form'
import DeleteIcon from '@mui/icons-material/Delete'
import { chapterPrices } from '@/data/price'
import { useParams, useRouter } from 'next/navigation'
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import UploadInput from '@/components/upload/input'
import AppService from '@/services/app'
import { retry } from '@/utils/retry'
import useStore from '@/store'
import { Chapter } from '@/models/chapter'
import { getImageUrl } from '@/utils/imageurl'

interface ChapterFormData {
	title: string
	subtitle: string
	price: number
	images: Page[]
	publishedAt: Date | null
}

interface Page {
	url: string
	file: File
}

const ChapterEditPage = () => {
	const router = useRouter()
	const { comic_id, chapter_id } = useParams()
	const { control, handleSubmit, setValue, reset } = useForm<ChapterFormData>({
		defaultValues: {
			title: '',
			subtitle: '',
			price: 0,
			images: [],
			publishedAt: null,
		},
	})
	const [thumb, setThumb] = useState<File | null>(null)
	const [images, setImages] = useState<Page[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [chapter, setChapter] = useState<Chapter | null>(null)
	const [oldImages, setOldImages] = useState<string[]>([])
	const [showOldImagesModal, setShowOldImagesModal] = useState(false)
	const store = useStore()

	const fetchChapter = async () => {
		setIsLoading(true)
		try {
			const chapter = (await AppService.instance(store.token || '').get(
				`/cms/chapters/${chapter_id}`
			)) as Chapter

			setChapter(chapter)
			reset({
				title: chapter.title,
				subtitle: chapter.subtitle,
				price: chapter.price || 0,
				images: [],
				publishedAt: chapter.published_at
					? new Date(chapter.published_at)
					: null,
			})
			setThumb(null)
			setImages([])

			const pages = await AppService.instance(store.token || '').get(
				`/cms/chapters/${chapter_id}/pages`
			)
			setOldImages(pages.map((page: { image: string }) => page.image))
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
			setError(e.message)
		}
		setIsLoading(false)
	}

	useEffect(() => {
		fetchChapter()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chapter_id, store.token])

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || [])
		const newImages = files.map((file) => ({
			url: URL.createObjectURL(file),
			file,
		}))
		setImages([...images, ...newImages])
		setValue('images', newImages)
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSortEnd = (result: any) => {
		if (!result.destination) return

		const newImages = Array.from(images)
		const [movedImage] = newImages.splice(result.source.index, 1)
		newImages.splice(result.destination.index, 0, movedImage)
		setImages(newImages)
		setValue('images', newImages)
	}

	const handleDeleteImage = (index: number) => {
		const newImages = images.filter((_, i) => i !== index)
		setImages(newImages)
		setValue('images', newImages)
	}

	const onSubmit = async (data: ChapterFormData) => {
		setIsLoading(true)
		setError(null)
		try {
			let imageUrl: string | null = null
			if (thumb) {
				const formData = new FormData()
				formData.append('file', thumb)

				const filename = await retry(() =>
					AppService.instance(store.token || '').postMultipart(
						'/file/upload',
						formData
					)
				)

				imageUrl = filename
			}

			const pages = []

			for (const page of data.images) {
				const formData = new FormData()
				formData.append('file', page.file)
				const filename = await retry(() =>
					AppService.instance(store.token || '').postMultipart(
						'/file/upload',
						formData
					)
				)
				pages.push(filename)
			}

			const price = chapterPrices.find((p) => p.coinPrice === data.price)

			const updatedChapter = {
				title: data.title,
				subtitle: data.subtitle,
				price: price?.coinPrice || 0,
				fiat_price: price?.fiatPrice || 0,
				pages: pages.length > 0 ? pages : oldImages,
				published_at: data.publishedAt,
				image: imageUrl ? imageUrl : chapter ? chapter.image : null,
				comic_id: parseInt(comic_id as string),
			}

			await retry(() =>
				AppService.instance(store.token || '').post(
					`/cms/chapters/${chapter_id}`,
					updatedChapter
				)
			)

			router.push(`/cms/chapters/${comic_id}`)
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
			setError(e.message)
		}
		setIsLoading(false)
	}

	return (
		<Container maxWidth="md" className="p-5">
			<h1 className="text-2xl font-bold mb-4">Edit Chapter</h1>
			<form
				className="space-y-4 flex flex-col"
				onSubmit={handleSubmit(onSubmit)}
			>
				{error && (
					<Alert severity="error" className="mb-4">
						{error}
					</Alert>
				)}

				<UploadInput
					label={'Thumbnail max. 2MB'}
					showLabel={true}
					oldImage={chapter?.image ? getImageUrl(chapter.image) : ''}
					onChange={(files: File[]) => {
						if (files.length > 0) {
							setThumb(files[0])
						}
					}}
				/>

				<Controller
					name="title"
					control={control}
					rules={{ required: 'Title is required' }}
					render={({ field }) => (
						<TextField label="Title" {...field} fullWidth />
					)}
				/>
				<Controller
					name="subtitle"
					rules={{ required: 'Subtitle is required' }}
					control={control}
					render={({ field }) => (
						<TextField label="Subtitle" {...field} fullWidth />
					)}
				/>
				<Controller
					name="price"
					control={control}
					rules={{ required: 'Price is required' }}
					render={({ field }) => (
						<FormControl fullWidth>
							<Select {...field} value={field.value}>
								{chapterPrices.map((price) => (
									<MenuItem key={price.fiatPrice} value={price.coinPrice}>
										Rp. {price.fiatPrice.toLocaleString('id-ID')} -{' '}
										{price.coinPrice} Coins
									</MenuItem>
								))}
							</Select>
						</FormControl>
					)}
				/>
				<Controller
					name="publishedAt"
					control={control}
					render={({ field }) => (
						<LocalizationProvider dateAdapter={AdapterMoment}>
							<DatePicker
								label="Published At"
								value={field.value ? moment(field.value) : moment()}
								onChange={(date) => field.onChange(date)}
								defaultValue={moment()}
							/>
						</LocalizationProvider>
					)}
				/>

				<Button
					onClick={() => setShowOldImagesModal(true)}
					variant="outlined"
					color="secondary"
					type="button"
					className="rounded-full"
				>
					Show Current Pages
				</Button>
				<input
					type="file"
					multiple
					onChange={handleImageUpload}
					className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
				/>
				<DragDropContext onDragEnd={handleSortEnd}>
					<Droppable
						droppableId={'droppable'}
						type="group"
						isDropDisabled={false}
						isCombineEnabled={true}
						ignoreContainerClipping={false}
						direction="vertical"
					>
						{(provided) => (
							<ul
								{...provided.droppableProps}
								ref={provided.innerRef}
								className="space-y-2"
							>
								{images.map((image, index) => (
									<Draggable
										key={index}
										draggableId={String(index)}
										index={index}
									>
										{(provided) => (
											<li
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												className="p-2 border rounded flex flex-col items-center"
											>
												<p className="text-center text-blue-300 font-bold">
													{index + 1}
												</p>
												<Image
													src={image.url}
													alt={`Image ${index}`}
													width={1024}
													height={1024}
													className="w-1/3 h-auto mx-auto"
												/>
												<IconButton
													onClick={() => handleDeleteImage(index)}
													className="ml-auto"
												>
													<DeleteIcon />
												</IconButton>
											</li>
										)}
									</Draggable>
								))}
								{provided.placeholder}
							</ul>
						)}
					</Droppable>
				</DragDropContext>
				<p className="text-gray-500 text-sm my-2">
					Note: Max pages per chapter is 100. If you have more than 100 pages,
					please create another chapter.
				</p>
				<Button
					variant="contained"
					color="warning"
					type="submit"
					className="rounded-full"
					disabled={isLoading}
					startIcon={isLoading ? <CircularProgress size={20} /> : null}
				>
					Update Chapter
				</Button>

				<Button
					onClick={() => {
						router.back()
					}}
					variant="outlined"
					color="primary"
					type="button"
					className="rounded-full"
				>
					Cancel
				</Button>
			</form>

			<Modal
				open={showOldImagesModal}
				onClose={() => setShowOldImagesModal(false)}
				aria-labelledby="old-images-modal"
				aria-describedby="old-images-modal-description"
			>
				<Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-1/3 min-w-[400px] max-w-[600px]">
					<h2
						id="old-images-modal"
						className="text-center text-blue-300 font-bold"
					>
						PREVIEW
					</h2>
					<ul>
						{oldImages.map((image, index) => (
							<li key={index}>
								<Image
									src={getImageUrl(image)}
									alt={`Old Image ${index}`}
									width={1024}
									height={1024}
									className="w-full h-auto mb-2"
								/>
							</li>
						))}
					</ul>
					<p className="text-sm">
						Note: This is the old images, you can&apos;t edit it. If you want to
						edit, please upload new images.
					</p>
					<Button
						onClick={() => setShowOldImagesModal(false)}
						variant="contained"
						color="primary"
						className="rounded-full w-full mt-2"
					>
						Close
					</Button>
				</Box>
			</Modal>
		</Container>
	)
}

export default ChapterEditPage
