'use client'

import React, { useState } from 'react'
import { TextField, Button, Container, Typography } from '@mui/material'
import UploadInput from '@/components/upload/input'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import useStore from '@/store'
import useSWR from 'swr'
import { User } from '@/models/user'

interface EditProfileForm {
	phone: string
	fullName: string
}

const EditProfilePage = () => {
	const router = useRouter()
	const store = useStore()
	const { data } = useSWR<User>('/users/me')
	const { handleSubmit, register, setValue } = useForm<EditProfileForm>({
		defaultValues: {
			phone: data?.phone_number || '',
			fullName: data?.fullname || '',
		},
	})
	const [newImage, setNewImage] = useState<File | null>(null)

	const onSubmit = async (data: EditProfileForm) => {
		const sanitizedFullName = data.fullName.replace(/[^a-zA-Z\s]/g, '').trim()
		setValue('fullName', sanitizedFullName)
		console.log(data)
		console.log(newImage)
	}

	return (
		<Container className="my-8">
			<Typography variant="h4" gutterBottom className="font-bold">
				Edit Profile
			</Typography>
			<form onSubmit={handleSubmit(onSubmit)} className="mt-4">
				<UploadInput
					oldImage={data?.image || ''}
					onChange={(files: File[]) => {
						if (files.length > 0) {
							setNewImage(files[0])
						}
					}}
				/>
				<TextField
					label="Email"
					variant="outlined"
					fullWidth
					margin="normal"
					value={store.user?.email || ''}
					disabled
				/>
				<TextField
					label="Phone Number"
					variant="outlined"
					fullWidth
					margin="normal"
					type="text"
					{...register('phone', {
						required: 'Phone number is required',
						pattern: {
							value: /^[0-9]{1,15}$/,
							message: 'Phone number must valid format',
						},
					})}
				/>
				<TextField
					label="Full Name"
					variant="outlined"
					fullWidth
					margin="normal"
					{...register('fullName', {
						required: 'Full name is required',
					})}
				/>
				<div className="flex justify-between gap-2 my-4 flex-col-reverse md:flex-row">
					<Button
						type="button"
						onClick={() => {
							router.back()
						}}
						variant="contained"
						color="info"
						fullWidth
						className="rounded-full p-4"
					>
						Cancel
					</Button>
					<Button
						type="submit"
						variant="contained"
						color="warning"
						className="rounded-full p-4"
						fullWidth
					>
						Save Changes
					</Button>
				</div>
			</form>
		</Container>
	)
}

export default EditProfilePage
