'use client'

import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextField, Button, Container, Typography } from '@mui/material'

interface CreateComicForm {
	title: string
	description: string
	image: File | null
	cover: File | null
	comicType: string
}

const InputComic: React.FC = () => {
	const { control, handleSubmit } = useForm<CreateComicForm>()
	const comicTypes = ['series', 'classic']

	const onSubmit = (data: CreateComicForm) => {
		console.log(data)
	}

	return (
		<Container maxWidth="md" className="p-10">
			<Typography variant="h4" gutterBottom>
				Input Comic
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
					name="image"
					control={control}
					defaultValue={null}
					render={({ field }) => (
						<TextField
							{...field}
							type="file"
							label="Image"
							fullWidth
							InputLabelProps={{ shrink: true }}
						/>
					)}
				/>
				<Controller
					name="cover"
					control={control}
					defaultValue={null}
					render={({ field }) => (
						<TextField
							{...field}
							type="file"
							label="Cover"
							fullWidth
							InputLabelProps={{ shrink: true }}
						/>
					)}
				/>
				<Controller
					name="comicType"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<TextField
							{...field}
							select
							label="Comic Type"
							fullWidth
							SelectProps={{
								native: true,
							}}
						>
							{comicTypes.map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</TextField>
					)}
				/>
				<Button
					type="submit"
					variant="contained"
					color="warning"
					className="w-full rounded-full"
				>
					Submit
				</Button>
			</form>
		</Container>
	)
}

export default InputComic
