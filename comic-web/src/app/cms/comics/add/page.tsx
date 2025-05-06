/* eslint-disable react/jsx-key */
'use client'

import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
	TextField,
	Button,
	Container,
	Typography,
	MenuItem,
	Autocomplete,
	Chip,
} from '@mui/material'
import UploadInput from '@/components/upload/input'
import { useRouter } from 'next/navigation'

interface CreateComicForm {
	title: string
	description: string
	mainGenre: string
	subGenre: string[]
	comicType: string
}

const InputComic: React.FC = () => {
	const router = useRouter()
	const { control, handleSubmit } = useForm<CreateComicForm>()
	const comicTypes = ['series', 'classic']
	const [image, setImage] = useState<File | null>(null)
	const [cover, setCover] = useState<File | null>(null)
	const [banner, setBanner] = useState<File | null>(null)
	const [mainGenres, setMainGenres] = useState<string[]>([
		'Action',
		'Adventure',
		'Comedy',
		'Drama',
		'Fantasy',
		'Horror',
		'Mystery',
		'Romance',
		'Sci-Fi',
		'Slice of Life',
		'Sports',
		'Supernatural',
		'Thriller',
	])
	const [subGenres, setSubGenres] = useState<string[]>([
		'Action',
		'Adventure',
		'Comedy',
		'Drama',
		'Fantasy',
		'Horror',
		'Mystery',
		'Romance',
		'Sci-Fi',
		'Slice of Life',
		'Sports',
		'Supernatural',
		'Thriller',
	])

	const onSubmit = (data: CreateComicForm) => {
		console.log(data)
	}

	return (
		<Container maxWidth="md" className="p-5">
			<Typography variant="h4" gutterBottom>
				Create Comic
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
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
					render={({ field }) => (
						<TextField {...field} label="Title" fullWidth />
					)}
				/>
				<Controller
					name="description"
					control={control}
					defaultValue=""
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
					defaultValue=""
					render={({ field }) => (
						<Autocomplete
							{...field}
							options={mainGenres}
							freeSolo
							onChange={(_, value) => field.onChange(value)}
							renderTags={(value, getTagProps) =>
								value.map((option, index) => (
									<Chip
										variant="outlined"
										label={option}
										{...getTagProps({ index })}
									/>
								))
							}
							getOptionLabel={(option) => option}
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
							options={subGenres}
							freeSolo
							multiple
							onChange={(_, value) => field.onChange(value)}
							renderTags={(value, getTagProps) =>
								value.map((option, index) => (
									<Chip
										variant="outlined"
										label={option}
										{...getTagProps({ index })}
									/>
								))
							}
							getOptionLabel={(option) => option}
							renderInput={(params) => (
								<TextField {...params} label="Sub Genre" fullWidth />
							)}
						/>
					)}
				/>
				<Button
					type="submit"
					variant="contained"
					color="warning"
					className="w-full rounded-full"
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
