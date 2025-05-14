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
} from '@mui/material'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Image from 'next/image'
import { useForm, Controller } from 'react-hook-form'
import DeleteIcon from '@mui/icons-material/Delete'
import { ChapterPrice, chapterPrices } from '@/data/price'
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
	price: ChapterPrice
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
			price: {
				fiatPrice: 0,
				coinPrice: 0,
			},
			images: [],
			publishedAt: null,
		},
	})
	const [thumb, setThumb] = useState<File | null>(null)
	const [images, setImages] = useState<Page[]>([])
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [chapter, setChapter] = useState<Chapter | null>(null)
	const store = useStore()

	useEffect(() => {
		const fetchChapter = async () => {
			setIsLoading(true)
			try {
				const chapter = (await retry(() =>
					AppService.instance(store.token || '').get(
						`/cms/chapters/${chapter_id}`
					)
				)) as Chapter

				setChapter(chapter)
				reset({
					title: chapter.title,
					subtitle: chapter.subtitle,
					price: {
						fiatPrice: chapter.fiat_price,
						coinPrice: chapter.price,
					},
					// images: chapter.pages.map((page: string) => ({
					// 	url: page,
					// 	file: null,
					// })),
					publishedAt: chapter.published_at
						? new Date(chapter.published_at)
						: null,
				})
				// setImages(
				// 	chapter.pages.map((page: string) => ({
				// 		url: page,
				// 		file: null,
				// 	}))
				// )
				setThumb(null)
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
			} catch (e: any) {
				setError(e.message)
			}
			setIsLoading(false)
		}

		fetchChapter()
	}, [chapter_id, reset, store.token])

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
			if (!thumb) throw new Error('Thumbnail is required')

			if (data.images.length === 0) throw new Error('Images are required')

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

			const chapter = {
				title: data.title,
				subtitle: data.subtitle,
				price: data.price.coinPrice || 0,
				fiat_price: data.price.fiatPrice || 0,
				pages: pages,
				published_at: data.publishedAt,
				image: imageUrl,
				comic_id: parseInt(comic_id as string),
			}

			await retry(() =>
				AppService.instance(store.token || '').post(
					`/cms/chapters/${chapter_id}`,
					chapter
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
							<Select {...field}>
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
		</Container>
	)
}

export default ChapterEditPage
