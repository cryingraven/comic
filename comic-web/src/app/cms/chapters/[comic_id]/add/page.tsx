/*
eslint-disable @typescript-eslint/no-explicit-any
*/
'use client'

import { useState } from 'react'
import {
	TextField,
	Button,
	Select,
	MenuItem,
	FormControl,
	IconButton,
	Container,
} from '@mui/material'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import Image from 'next/image'
import { useForm, Controller } from 'react-hook-form'
import DeleteIcon from '@mui/icons-material/Delete'
import { ChapterPrice, chapterPrices } from '@/data/price'
import { useRouter } from 'next/navigation'

interface ChapterFormData {
	title: string
	subtitle: string
	price: ChapterPrice
	images: string[]
}

const ChapterCreationPage = () => {
	const router = useRouter()
	const { control, handleSubmit, setValue, getValues } =
		useForm<ChapterFormData>({
			defaultValues: {
				title: '',
				subtitle: '',
				price: {
					fiatPrice: 0,
					coinPrice: 0,
				},
				images: [],
			},
		})
	const [images, setImages] = useState<string[]>([])

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files || [])
		const newImages = files.map((file) => URL.createObjectURL(file))
		setImages([...images, ...newImages])
		setValue('images', [...images, ...newImages])
	}

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

	const onSubmit = (data: ChapterFormData) => {
		console.log(data)
	}

	return (
		<Container maxWidth="md" className="p-5">
			<h1 className="text-2xl font-bold mb-4">Create Chapter</h1>
			<form
				className="space-y-4 flex flex-col"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Controller
					name="title"
					control={control}
					render={({ field }) => (
						<TextField label="Title" {...field} fullWidth />
					)}
				/>
				<Controller
					name="subtitle"
					control={control}
					render={({ field }) => (
						<TextField label="Subtitle" {...field} fullWidth />
					)}
				/>
				<Controller
					name="price"
					control={control}
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
				<input
					type="file"
					multiple
					onChange={handleImageUpload}
					className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
				/>
				<DragDropContext onDragEnd={handleSortEnd}>
					<Droppable droppableId="images" isDropDisabled={false} isCombineEnabled={false}>
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
												<Image
													src={image}
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
				<Button
					variant="contained"
					color="warning"
					type="submit"
					className="rounded-full"
				>
					Create Chapter
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

export default ChapterCreationPage
