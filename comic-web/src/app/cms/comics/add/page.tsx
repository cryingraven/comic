/* eslint-disable react/jsx-key */
'use client'

import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
	TextField,
	Button,
	Container,
	Typography,
	MenuItem,
	Autocomplete,
	Chip,
	Alert,
	CircularProgress,
} from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import UploadInput from '@/components/upload/input'
import { useRouter } from 'next/navigation'
import moment from 'moment'
import { Genre } from '@/models/genre'
import useStore from '@/store'
import AppService from '@/services/app'
import { DateTimePicker } from '@mui/x-date-pickers'
import { retry } from '@/utils/retry'

interface CreateComicForm {
	title: string
	description: string
	mainGenre: Genre
	subGenre: Genre[]
	comicType: string
	publishAt: Date | null
}

const InputComic: React.FC = () => {
	const router = useRouter()
	const store = useStore()
	const { control, handleSubmit } = useForm<CreateComicForm>()
	const comicTypes = ['series', 'classic']
	const [image, setImage] = useState<File | null>(null)
	const [cover, setCover] = useState<File | null>(null)
	const [banner, setBanner] = useState<File | null>(null)
	const [genres, setGenres] = useState<Genre[]>()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const fetchGenres = async () => {
		const genres = await AppService.instance(store.token || '').get(
			'/cms/genres'
		)
		setGenres(genres)
	}

	useEffect(() => {
		fetchGenres()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const onSubmit = async (data: CreateComicForm) => {
		setIsLoading(true)
		setError(null)

		try {
			if (!image || !cover || !banner) {
				throw new Error('Please upload all required images.')
			}

			let bannerUrl: string | null = null
			let coverUrl: string | null = null
			let imageUrl: string | null = null

			if (image) {
				const formData = new FormData()
				formData.append('file', image)

				const filename = await retry(() =>
					AppService.instance(store.token || '').postMultipart(
						'/file/upload',
						formData
					)
				)

				imageUrl = filename
			}

			if (cover) {
				const formData = new FormData()
				formData.append('file', cover)
				const filename = await retry(() =>
					AppService.instance(store.token || '').postMultipart(
						'/file/upload',
						formData
					)
				)
				coverUrl = filename
			}

			if (banner) {
				const formData = new FormData()
				formData.append('file', banner)
				const filename = await retry(() =>
					AppService.instance(store.token || '').postMultipart(
						'/file/upload',
						formData
					)
				)
				bannerUrl = filename
			}

			const newComic = {
				title: data.title,
				description: data.description,
				genre: data.mainGenre.name,
				subgenres: data.subGenre.map((genre) => genre.name),
				type: data.comicType,
				published_at: moment(data.publishAt).format('YYYY-MM-DDTHH:mm:ss'),
				image: imageUrl,
				cover: coverUrl,
				banner: bannerUrl,
			}

			await retry(() =>
				AppService.instance(store.token || '').post('/cms/comics', newComic)
			)

			router.push('/cms/comics')
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (e: any) {
			setError(e.message)
		}

		setIsLoading(false)
	}

	return (
		<Container maxWidth="md" className="p-5">
			<Typography variant="h4" gutterBottom>
				Create Comic
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
				{error && (
					<Alert severity="error" className="mb-4">
						{error}
					</Alert>
				)}
				<UploadInput
					label={'Main comic / Profile image max. 2MB'}
					showLabel={true}
					onChange={(files: File[]) => {
						if (files.length > 0) {
							setImage(files[0])
						}
					}}
				/>
				<UploadInput
					label="Cover image / Thumbnail max. 2MB"
					showLabel={true}
					onChange={(files: File[]) => {
						if (files.length > 0) {
							setCover(files[0])
						}
					}}
				/>
				<UploadInput
					label="Banner / Background image max. 2MB"
					showLabel={true}
					onChange={(files: File[]) => {
						if (files.length > 0) {
							setBanner(files[0])
						}
					}}
				/>
				<Controller
					name="title"
					control={control}
					defaultValue=""
					rules={{ required: 'Title is required' }}
					render={({ field }) => (
						<TextField {...field} label="Title" fullWidth />
					)}
				/>
				<Controller
					name="description"
					control={control}
					defaultValue=""
					rules={{ required: 'Description is required' }}
					render={({ field }) => (
						<TextField
							{...field}
							label="Description"
							fullWidth
							multiline
							rows={4}
						/>
					)}
				/>

				<Controller
					name="comicType"
					control={control}
					defaultValue=""
					rules={{ required: 'Comic type is required' }}
					render={({ field }) => (
						<TextField {...field} select label="Comic Type" fullWidth>
							{comicTypes.map((type) => (
								<MenuItem key={type} value={type}>
									{type.toUpperCase()}
								</MenuItem>
							))}
						</TextField>
					)}
				/>

				<Controller
					name="mainGenre"
					control={control}
					rules={{ required: 'Main genre is required' }}
					render={({ field }) => (
						<Autocomplete
							{...field}
							options={genres || []}
							freeSolo
							onChange={(_, value) => field.onChange(value)}
							renderTags={(value, getTagProps) =>
								value.map((option, index) => (
									<Chip
										variant="outlined"
										label={option.name}
										{...getTagProps({ index })}
									/>
								))
							}
							getOptionLabel={(option) =>
								typeof option === 'string' ? option : option.name
							}
							renderInput={(params) => (
								<TextField {...params} label="Main Genre" fullWidth />
							)}
						/>
					)}
				/>
				<Controller
					name="subGenre"
					control={control}
					defaultValue={[]}
					render={({ field }) => (
						<Autocomplete
							{...field}
							options={genres || []}
							freeSolo
							multiple
							onChange={(_, value) => field.onChange(value)}
							renderTags={(value, getTagProps) =>
								value.map((option, index) => (
									<Chip
										variant="outlined"
										label={option.name}
										{...getTagProps({ index })}
									/>
								))
							}
							getOptionLabel={(option) =>
								typeof option === 'string' ? option : option.name
							}
							renderInput={(params) => (
								<TextField {...params} label="Sub Genre" fullWidth />
							)}
						/>
					)}
				/>
				<Controller
					name="publishAt"
					control={control}
					defaultValue={null}
					render={({ field }) => (
						<LocalizationProvider dateAdapter={AdapterMoment}>
							<DateTimePicker
								className="w-full"
								{...field}
								label="Publish At"
								format="DD/MM/YYYY HH:mm"
								value={field.value ? moment(field.value) : null}
							/>
						</LocalizationProvider>
					)}
				/>

				<Button
					type="submit"
					variant="contained"
					color="warning"
					className="w-full rounded-full"
					disabled={isLoading}
					startIcon={isLoading ? <CircularProgress size={20} /> : null}
				>
					Save Comic
				</Button>
				<Button
					type="button"
					variant="outlined"
					color="primary"
					className="w-full rounded-full"
					onClick={() => router.back()}
				>
					Cancel
				</Button>
			</form>
		</Container>
	)
}

export default InputComic
